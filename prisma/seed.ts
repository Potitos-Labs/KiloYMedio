/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma, PrismaClient } from "@prisma/client";
import { hash } from "argon2";
const prisma = new PrismaClient();
async function main() {
  const hashedPassword = await hash("potitos2022");

  const allergenInSpanish = await prisma.allergenInSpanish.createMany({
    data: [
      /* 1 */ { allergen: "celery", allergenInSpanish: "apio" },
      /* 2 */ { allergen: "cereals", allergenInSpanish: "gluten" },
      /* 3 */ { allergen: "crustaceans", allergenInSpanish: "crustáceos" },
      /* 4 */ { allergen: "eggs", allergenInSpanish: "huevos" },
      /* 5 */ { allergen: "fish", allergenInSpanish: "pescado" },
      /* 6 */ { allergen: "lupin", allergenInSpanish: "altramuces" },
      /* 7 */ { allergen: "milk", allergenInSpanish: "leche" },
      /* 8 */ { allergen: "molluscs", allergenInSpanish: "moluscos" },
      /* 9 */ { allergen: "mustard", allergenInSpanish: "mostaza" },
      /* 10 */ { allergen: "nuts", allergenInSpanish: "frutos con cáscara" },
      /* 11 */ { allergen: "peanuts", allergenInSpanish: "cacahuetes" },
      /* 12 */ { allergen: "sesameSeeds", allergenInSpanish: "sésamo" },
      /* 13 */ { allergen: "soybeans", allergenInSpanish: "soja" },
      /* 14 */ {
        allergen: "sulphurDioxideAndSulphites",
        allergenInSpanish: "Dióxido de azufre y sulfitos",
      },
    ],
  });

  //#region Users
  const daniel = await prisma.user.create({
    data: {
      name: "Daniel",
      email: "Daniel@Potitos.com",
      passwordHash: hashedPassword,
      role: "admin",
      Admin: { create: {} },
    },
  });

  const alicia = await prisma.user.create({
    data: {
      name: "Alicia",
      email: "Alicia@Potitos.com",
      passwordHash: hashedPassword,
      role: "admin",
      Admin: { create: {} },
    },
  });

  const sandra = await prisma.user.create({
    data: {
      name: "Sandra",
      email: "Sandra@Potitos.com",
      passwordHash: hashedPassword,
      role: "client",
      Client: { create: { cart: { create: {} } } },
    },
  });

  const pilar = await prisma.user.create({
    data: {
      name: "Pilar",
      email: "Pilar@Potitos.com",
      passwordHash: hashedPassword,
      role: "admin",
      Client: { create: { cart: { create: {} } } },
    },
  });

  const alberto = await prisma.user.create({
    data: {
      name: "Alberto",
      email: "Alberto@Potitos.com",
      passwordHash: hashedPassword,
      role: "client",
      Client: { create: { cart: { create: {} } } },
    },
  });

  const marta = await prisma.user.create({
    data: {
      name: "Marta",
      email: "Marta@Potitos.com",
      passwordHash: hashedPassword,
      role: "admin",
      Client: { create: { cart: { create: {} } } },
    },
  });

  const juan = await prisma.user.create({
    data: {
      name: "Juan",
      email: "Juan@Potitos.com",
      passwordHash: hashedPassword,
      role: "client",
      Client: { create: { cart: { create: {} } } },
    },
  });

  const clienteNoRegistrado = await prisma.unregisteredClient.create({
    data: {
      name: "Anonymous",
      address: "Area 51",
      email: "hacker@man.com",
      phoneNumber: "123456789",
    },
  });

  console.log(`🧒 Usuarios creados...`);
  console.log(
    daniel.name,
    alicia.name,
    sandra.name,
    pilar.name,
    alberto.name,
    marta.name,
    juan.name,
  );

  //#endregion

  //#region Products
  //#region Edible
  const pistachos = await prisma.product.create({
    data: {
      name: "pistachos",
      Category: "nuts",
      description: "pistachos ecológicos",
      stock: 10.5,
      imageURL:
        "https://www.atida.com/es-es/blog/wp-content/uploads/2022/02/33-nuevo-blog.png",
      Edible: {
        create: {
          priceByWeight: 8.3,
          EdibleAllergen: { create: { allergen: "nuts" } },
          Ingredient: { create: { name: "pistachos" } },
        },
      },
    },
  });

  const levaduraNutricional = await prisma.product.create({
    data: {
      name: "levadura nutricional",
      Category: "yeast",
      description: "levadura nutricional ecológica",
      stock: 22.8,
      imageURL:
        "https://as01.epimg.net/buenavida/imagenes/2017/04/10/portada/1491836256_032482_1491837182_noticia_normal.jpg",
      Edible: {
        create: {
          priceByWeight: 30,
          Ingredient: { create: { name: "levadura nutricional" } },
        },
      },
    },
  });

  const lentejas = await prisma.product.create({
    data: {
      name: "lentejas",
      Category: "legumes",
      description: "lentejas ecológicas",
      stock: 48.1,
      imageURL:
        "https://estaticos.muyinteresante.es/uploads/images/gallery/56014df93eafe829aea881a3/lentejas3.jpg",
      Edible: {
        create: {
          priceByWeight: 9.1,
          nutritionFacts: {},
          Ingredient: { create: { name: "lentejas" } },
        },
      },
    },
  });

  const harinaTrigo = await prisma.product.create({
    data: {
      name: "harina de trigo",
      Category: "flours",
      description: "harina de trigo",
      stock: 18,
      imageURL:
        "https://www.mundorganico.co/wp-content/uploads/2020/05/harina-kamut-1.jpg",
      Edible: {
        create: {
          priceByWeight: 5.3,
          EdibleAllergen: { create: { allergen: "cereals" } },
          Ingredient: { create: { name: "harina de trigo" } },
        },
      },
    },
  });
  //#endregion Edible

  //#region NonEdible
  const cepilloDeDientes = await prisma.product.create({
    data: {
      name: "cepillo de dientes",
      Category: "personalCare",
      description: "cepillo de dientes",
      stock: 7,
      imageURL:
        "https://www.adonianatur.com/media/catalog/product/c/e/cepillo-dientes-azul-adultos-nordics-bambu.jpg",
      NonEdible: { create: { price: 3.5 } },
    },
  });

  const jabon = await prisma.product.create({
    data: {
      name: "jabón",
      Category: "personalCare",
      description: "jabón artesanal",
      stock: 12,
      imageURL:
        "https://http2.mlstatic.com/jabones-artesanales-100gr-D_NQ_NP_727085-MLM31223991710_062019-F.jpg",
      NonEdible: { create: { price: 4.6 } },
    },
  });

  console.log(`📦 Productos creados...`);
  console.log(
    pistachos.name,
    levaduraNutricional.name,
    harinaTrigo.name,
    cepilloDeDientes.name,
  );

  //#endregion NonEdible
  //#endregion Products

  const { cart: carrito_de_sandra } = await prisma.client.findFirstOrThrow({
    where: { userId: sandra.id },
    select: { cart: true },
  });

  const { cart: carrito_de_marta } = await prisma.client.findFirstOrThrow({
    where: { userId: marta.id },
    select: { cart: true },
  });

  // No encuentra el carrito
  if (!carrito_de_sandra || !carrito_de_marta) {
    throw Error;
  }

  const carritos = await prisma.cartProduct.createMany({
    data: [
      {
        amount: 1,
        cartId: carrito_de_sandra.id,
        productId: cepilloDeDientes.id,
      },
      {
        amount: 2.5,
        cartId: carrito_de_sandra.id,
        productId: lentejas.id,
      },
      {
        amount: 0.5,
        cartId: carrito_de_marta.id,
        productId: harinaTrigo.id,
      },
    ],
  });

  const comentarioPaella = await prisma.comment.create({
    data: {
      rating: 5,
      user: { connect: { id: alicia.id } },
      description: "Que bello es mi novio <3",
    },
  });
  const paellaValencia = await prisma.recipe.create({
    data: {
      name: "Paella Valenciana",
      directions: `
Tenía yo ganas de publicar la receta tradicional de paella valenciana a leña, tal y como se prepara los domingos, ya sea en el chalet o en algún paellero de los que aún quedan, porque la antigua receta paella de pollo y conejo que ya hay en Directo al Paladar, aunque fidedigna, no tiene fotos que le hagan justicia.
Como todos sabéis, la receta de paella valenciana tradicional tiene unos ingredientes muy concretos, y sólo admite pequeñas variaciones en función de la temporada. Hasta está estipulado el tipo de leña que debe utilizarse para el fuego, la del naranjo.
Si somos puristas —como vamos a ser hoy— la paella valenciana solo debe tener arroz, una pizca de pimentón, azafrán, conejo, pollo y, en la parte verde, bajoqueta —una judía verde plana—, tomate y garrofó. Amén de sal y una pizca de aceite, claro. El uso del romero y del caracol va en gustos, aunque siempre queda bastante bien.   
Plato estrella de nuestra cocina junto a la tortilla de patatas o el gazpacho, la realidad es que no somos exclusivistas en el uso del arroz, pues otras grandes recetas del mundo también hacen de él su bandera como es el jambalaya o el risotto, ni tampoco quedarnos en exclusiva con el azafrán.
Toda paella que se precie comienza por un buen sofrito. En una paella cuanto más grande mejor, se sofríe en abundante aceite el pollo, el conejo, las judías, las alcachofas y los caracoles (la que veis en la foto no tiene garrofó porque no es temporada y el congelado no es igual), sazonando con un poco de sal y pimentón hacia el final. Cuando esté bien dorado se añade el tomate triturado y se rehoga.
Con el sofrito listo se debe de añadir el agua. Las proporciones dependen mucho del fuego, del calor que haga, del grado de humedad y de lo grande que sea la paella, pero para comenzar, una buena proporción es la de añadir tres veces el volumen de agua que de arroz, aunque es la experiencia la que os hará ajustar y perfeccionar estas cantidades, que acabaréis haciendo a ojo, como hicieron la tía y la madre de mi novia, que eran las encargadas de esta paella (a pesar de que la tradición marca que sea el hombre de la casa el que la prepare).
Echamos ahora algunos troncos más al fuego para que suba de potencia y se haga bien el caldo durante 25 o 30 minutos. Es un buen momento de echar el azafrán o, en su defecto, el sazonador de paella (el más popular es "el paellador), que lleva sal, ajo, colorante y un poco de azafrán.
Luego añadimos el arroz "en caballete" (en diagonal) y lo distribuimos por la paella. Cocemos entre 17 y 20 minutos, aunque aquí el tiempo lo marca de nuevo el grano de arroz y la potencia del fuego, que debemos ir dejando consumirse. Tiene que quedar completamente seco y suelto. Mi recomendación para los primerizos es que tengáis un cazo con agua hirviendo al lado, por si hay que añadir agua. A mitad cocción también podemos poner unas ramitas de romero, que retiraremos antes de servir.
Por último, conviene dejar la paella reposar unos minutos tapada con un gran paño o papel de periódico --no es bueno porque con la humedad se puede liberar algo de tinta, pero toda la vida lo he visto usar-- antes de servirla y recibir el aplauso de los presentes.
    `,
      user: { connect: { id: daniel.id } },
      RecipeComment: {
        createMany: { data: [{ commentId: comentarioPaella.id }] },
      },
    },
  });

  const receipteIngredient = await prisma.recipeIngredient.create({
    data: {
      amount: 10,
      ingredient: {
        create: {
          Edible: { connect: { productId: levaduraNutricional.id } }, //Se puede hacer desde levaduraNutricional.Edible.Ingredient¿?
          name: "levadura",
        },
      },
      recipe: { connect: { id: paellaValencia.id } },
    },
  });

  const ordenDeClienteNoRegistrado = await prisma.order.create({
    data: {
      price: "10€",
      UnregisteredClient: { connect: { id: clienteNoRegistrado.id } },
      ProductOrder: {
        createMany: {
          data: [
            { productId: jabon.id, amount: 1 },
            { productId: pistachos.id, amount: 0.4 },
          ],
        },
      },
    },
  });

  const date = new Date();
  date.setDate(date.getDate() + 2);

  const master_chef = await prisma.workshop.create({
    data: {
      name: "MasterChef",
      imageURL:
        "https://s3-eu-west-1.amazonaws.com/verema/images/valoraciones/0013/2050/logo-master-chef.jpg?1393416884",
      description: "Competición fuertemente inspirada en MasterChef",
      OnSiteWorkshop: {
        create: {
          date,
          OnSiteWorkshopAttendance: {
            createMany: {
              data: [{ clientId: juan.id }, { clientId: pilar.id }],
            },
          },
        },
      },
    },
  });
}

main()
  .then(async () => {
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
