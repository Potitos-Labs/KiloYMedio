import { Role } from "@prisma/client";
import { createContextInner } from "@server/trpc/context";
import { appRouter } from "@server/trpc/router/_app";

export async function getClientTrpcMock(role: Role) {
  const ctxAdminMock = await createContextInner({
    session: { user: { id: "1", role }, expires: "" },
  });

  return appRouter.createCaller(ctxAdminMock);
}
