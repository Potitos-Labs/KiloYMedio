import type { D1Database } from "@cloudflare/workers-types";
import type { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { linePrice, unitDivisor } from "./pricing";

export async function createDemoOrder(
  db: D1Database,
  prisma: PrismaClient,
  clientId: string,
  shipmentAddress: string,
  requestId: string,
) {
  const existing = await prisma.order.findUnique({ where: { id: requestId } });
  if (existing) {
    if (existing.clientId !== clientId)
      throw new TRPCError({ code: "FORBIDDEN" });
    return existing;
  }
  const client = await prisma.client.findUniqueOrThrow({
    where: { userId: clientId },
    select: { cartId: true },
  });
  const lines = await prisma.cartProduct.findMany({
    where: { cartId: client.cartId },
    include: { product: { include: { Edible: true, NonEdible: true } } },
  });
  if (!lines.length)
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "El carrito está vacío.",
    });
  if (
    lines.some(
      (line) =>
        !Number.isFinite(line.amount) ||
        line.amount <= 0 ||
        line.amount >
          line.product.stock * unitDivisor[line.product.ProductUnit] ||
        (line.product.ProductUnit === "unit" && !Number.isInteger(line.amount)),
    )
  ) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Revisa las cantidades y el stock del carrito.",
    });
  }
  const price =
    lines
      .reduce((total, line) => total + linePrice(line.product, line.amount), 0)
      .toFixed(2) + " €";
  // D1 batch is atomic. Prisma's D1 adapter does not provide transaction guarantees.
  // Create the order only if the complete cart still matches the snapshot.
  const unchanged = lines
    .map(
      () =>
        "(SELECT amount FROM CartProduct WHERE cartId = ? AND productId = ?) = ?",
    )
    .join(" AND ");
  const statements = [
    db
      .prepare(
        `INSERT INTO "Order" (id, dateTime, price, clientId, shipmentAddress)
    SELECT ?, ?, ?, ?, ? WHERE (SELECT count(*) FROM CartProduct WHERE cartId = ?) = ? AND ${unchanged}`,
      )
      .bind(
        requestId,
        Date.now(),
        price,
        clientId,
        shipmentAddress,
        client.cartId,
        lines.length,
        ...lines.flatMap((line) => [
          client.cartId,
          line.productId,
          line.amount,
        ]),
      ),
  ];
  for (const line of lines) {
    statements.push(
      db
        .prepare(
          "INSERT INTO ProductOrder (orderId, productId, amount) VALUES (?, ?, ?)",
        )
        .bind(requestId, line.productId, line.amount),
    );
    statements.push(
      db
        .prepare("UPDATE Product SET stock = stock - ? WHERE id = ?")
        .bind(
          line.amount / unitDivisor[line.product.ProductUnit],
          line.productId,
        ),
    );
  }
  statements.push(
    db.prepare("DELETE FROM CartProduct WHERE cartId = ?").bind(client.cartId),
  );
  try {
    await db.batch(statements);
  } catch (cause) {
    const completed = await prisma.order.findUnique({
      where: { id: requestId },
    });
    if (completed?.clientId === clientId) return completed;
    throw new TRPCError({
      code: "CONFLICT",
      message: "El carrito o el stock ha cambiado. Revisa tu pedido.",
      cause,
    });
  }
  return prisma.order.findUniqueOrThrow({ where: { id: requestId } });
}
