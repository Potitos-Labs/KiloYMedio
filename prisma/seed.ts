/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma, PrismaClient } from "@prisma/client";
import { hash } from "argon2";

const prisma = new PrismaClient();
async function main() {
  const hashedPassword = await hash("potitos2022");

  const allergenInSpanish = await prisma.allergenInSpanish.createMany({
    data: [
      /* 1 */ { allergen: "celery", allergenInSpanish: "Apio" },
      /* 2 */ { allergen: "cereals", allergenInSpanish: "Gluten" },
      /* 3 */ { allergen: "crustaceans", allergenInSpanish: "Crustáceos" },
      /* 4 */ { allergen: "eggs", allergenInSpanish: "Huevos" },
      /* 5 */ { allergen: "fish", allergenInSpanish: "Pescado" },
      /* 6 */ { allergen: "lupin", allergenInSpanish: "Altramuces" },
      /* 7 */ { allergen: "milk", allergenInSpanish: "Leche" },
      /* 8 */ { allergen: "molluscs", allergenInSpanish: "Moluscos" },
      /* 9 */ { allergen: "mustard", allergenInSpanish: "Mostaza" },
      /* 10 */ { allergen: "nuts", allergenInSpanish: "Frutos con cáscara" },
      /* 11 */ { allergen: "peanuts", allergenInSpanish: "Cacahuetes" },
      /* 12 */ { allergen: "sesameSeeds", allergenInSpanish: "Sésamo" },
      /* 13 */ { allergen: "soybeans", allergenInSpanish: "Soja" },
      /* 14 */ {
        allergen: "sulphurDioxideAndSulphites",
        allergenInSpanish: "Dióxido de azufre y sulfitos",
      },
    ],
  });

  const ecategoryInSpanish = await prisma.eCategoryInSpanish.createMany({
    data: [
      /* 1 */ {
        category: "driedFruits",
        imageURL:
          "https://img.freepik.com/fotos-premium/pasas-sobre-fondo-gris-texturizado-primer-plano-uvas-secas-amarillas-negras_338311-2310.jpg?w=2000",
        categoryInSpanish: "Fruta deshidratada",
      },
      /* 2 */ {
        category: "flours",
        imageURL:
          "https://www.pngall.com/wp-content/uploads/8/Flour-Cereal-PNG.png",
        categoryInSpanish: "Harinas",
      },
      /* 3 */ {
        category: "jams",
        imageURL:
          "https://assets.stickpng.com/images/5aaba15d7603fc558cffbfcf.png",
        categoryInSpanish: "Mermeladas",
      },
      /* 4 */ {
        category: "legumes",
        imageURL:
          "https://www.frutasluisi.eu/wp-content/uploads/2021/05/lenteja.jpg",
        categoryInSpanish: "Legumbres",
      },
      /* 5 */ {
        category: "nuts",
        imageURL:
          "https://assets.jumpseller.com/store/amapolas/themes/249680/options/16899457/FRUTOSECOSPORTADA.png?1623097828",
        categoryInSpanish: "Frutos secos",
      },
      /* 6 */ {
        category: "oils",
        imageURL:
          "https://images.vexels.com/media/users/3/195085/isolated/preview/118e2d4013081d13f76859af0eb72ccc-dibujado-a-mano-jarra-de-aceite-de-oliva.png",
        categoryInSpanish: "Aceites",
      },
      /* 7 */ {
        category: "pastas",
        imageURL:
          "https://us.123rf.com/450wm/amylv/amylv1608/amylv160800142/61281077-sin-cocer-la-pasta-en-el-saco-pipe-rigate.jpg?ver=6",
        categoryInSpanish: "Pastas",
      },
      /* 8 */ {
        category: "syrups",
        imageURL:
          "https://www.pngall.com/wp-content/uploads/5/Maple-Syrup-PNG-HD-Image.png",
        categoryInSpanish: "Siropes",
      },
      /* 9 */ {
        category: "teas",
        imageURL:
          "https://www.elhombredelsaco.eu/media/img/product/201811011854348855310_crop2.png",
        categoryInSpanish: "Tés",
      },
      /* 10 */ {
        category: "yeast",
        imageURL:
          "https://us.123rf.com/450wm/wabeno/wabeno1803/wabeno180300017/98916036-levadura-seca-en-cuchara-de-madera-sobre-fondo-blanco-.jpg?ver=6",
        categoryInSpanish: "Levaduras",
      },
    ],
  });
  const neCategoryInSpanish = await prisma.nECategoryInSpanish.createMany({
    data: [
      /* 1 */ {
        category: "cleaningProducts",
        imageURL:
          "https://images-na.ssl-images-amazon.com/images/I/91NRiLtf6yL._AC._SR360,460.jpg",
        categoryInSpanish: "Productos de limpieza",
      },
      /* 2 */ {
        category: "accessories",
        imageURL:
          "https://i.etsystatic.com/18604877/r/il/91a159/2514110643/il_570xN.2514110643_cab6.jpg",
        categoryInSpanish: "Accesorios",
      },
      /* 3 */ {
        category: "home",
        imageURL:
          "https://www.vilmupa.com/catalogo/22225/lampara-bola-bambu.jpg",
        categoryInSpanish: "Hogar",
      },
      /* 4 */ {
        category: "personalCare",
        imageURL:
          "https://los40.com/los40/imagenes/2022/07/27/moda/1658916427_930712_1658916578_gigante_normal.jpg",
        categoryInSpanish: "Cuidado personal",
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
      description: "pistachos ecológicos",
      stock: 10.5,
      imageURL:
        "https://www.atida.com/es-es/blog/wp-content/uploads/2022/02/33-nuevo-blog.png",
      Edible: {
        create: {
          category: "nuts",
          priceByWeight: 8.3,
          allergens: { create: { allergen: "nuts" } },
          nutritionFacts: {
            create: {
              ingredients: "nuts",
              energy: 400,
              fat: 90,
              carbohydrates: 3,
              protein: 2,
            },
          },
          Ingredient: { create: { name: "nuts" } },
        },
      },
    },
  });

  const levaduraNutricional = await prisma.product.create({
    data: {
      name: "levadura nutricional",
      description: "levadura nutricional ecológica",
      stock: 22.8,
      imageURL:
        "https://as01.epimg.net/buenavida/imagenes/2017/04/10/portada/1491836256_032482_1491837182_noticia_normal.jpg",
      Edible: {
        create: {
          category: "yeast",
          priceByWeight: 30,
          nutritionFacts: {
            create: {
              ingredients: "levadura",
              energy: 200,
              fat: 1,
              carbohydrates: 70,
              protein: 0,
            },
          },
          Ingredient: { create: { name: "levadura nutricional" } },
        },
      },
    },
  });

  const lentejas = await prisma.product.create({
    data: {
      name: "lentejas",
      description: "lentejas ecológicas",
      stock: 48.1,
      imageURL:
        "https://estaticos.muyinteresante.es/uploads/images/gallery/56014df93eafe829aea881a3/lentejas3.jpg",
      Edible: {
        create: {
          category: "legumes",
          priceByWeight: 9.1,
          nutritionFacts: {
            create: {
              ingredients: "lentejas",
              energy: 400,
              fat: 0,
              carbohydrates: 30,
              protein: 20,
            },
          },
          Ingredient: { create: { name: "lentejas" } },
        },
      },
    },
  });

  const harinaTrigo = await prisma.product.create({
    data: {
      name: "harina de trigo",
      description: "harina de trigo",
      stock: 18,
      imageURL:
        "https://www.mundorganico.co/wp-content/uploads/2020/05/harina-kamut-1.jpg",
      Edible: {
        create: {
          category: "flours",
          priceByWeight: 5.3,
          nutritionFacts: {
            create: {
              ingredients: "harina de trigo",
              energy: 300,
              fat: 0,
              carbohydrates: 70,
              protein: 2,
            },
          },
          allergens: { create: { allergen: "cereals" } },
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
      description: "cepillo de dientes",
      stock: 7,
      imageURL:
        "https://www.adonianatur.com/media/catalog/product/c/e/cepillo-dientes-azul-adultos-nordics-bambu.jpg",
      NonEdible: {
        create: {
          category: "personalCare",
          price: 3.5,
        },
      },
    },
  });

  const jabon = await prisma.product.create({
    data: {
      name: "jabón",
      description: "jabón artesanal",
      stock: 12,
      imageURL:
        "https://http2.mlstatic.com/jabones-artesanales-100gr-D_NQ_NP_727085-MLM31223991710_062019-F.jpg",
      NonEdible: {
        create: {
          category: "personalCare",
          price: 4.6,
        },
      },
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

  /*
  const macarronesConTomatico = await prisma.recipe.create({
    data: {
      name: "Macarrones con Tomatico",
      difficulty: "easy",
      Directions: {
        create: {
          directions: "Poner un cazo de agua a hervir a 180º",
          number: 1,
        },
      },
    },
  });
  */

  //   const paellaValencia = await prisma.recipe.create({
  //     data: {
  //       name: "Paella Valenciana",
  //       directions: `
  // Tenía yo ganas de publicar la receta tradicional de paella valenciana a leña, tal y como se prepara los domingos, ya sea en el chalet o en algún paellero de los que aún quedan, porque la antigua receta paella de pollo y conejo que ya hay en Directo al Paladar, aunque fidedigna, no tiene fotos que le hagan justicia.
  // Como todos sabéis, la receta de paella valenciana tradicional tiene unos ingredientes muy concretos, y sólo admite pequeñas variaciones en función de la temporada. Hasta está estipulado el tipo de leña que debe utilizarse para el fuego, la del naranjo.
  // Si somos puristas —como vamos a ser hoy— la paella valenciana solo debe tener arroz, una pizca de pimentón, azafrán, conejo, pollo y, en la parte verde, bajoqueta —una judía verde plana—, tomate y garrofó. Amén de sal y una pizca de aceite, claro. El uso del romero y del caracol va en gustos, aunque siempre queda bastante bien.
  // Plato estrella de nuestra cocina junto a la tortilla de patatas o el gazpacho, la realidad es que no somos exclusivistas en el uso del arroz, pues otras grandes recetas del mundo también hacen de él su bandera como es el jambalaya o el risotto, ni tampoco quedarnos en exclusiva con el azafrán.
  // Toda paella que se precie comienza por un buen sofrito. En una paella cuanto más grande mejor, se sofríe en abundante aceite el pollo, el conejo, las judías, las alcachofas y los caracoles (la que veis en la foto no tiene garrofó porque no es temporada y el congelado no es igual), sazonando con un poco de sal y pimentón hacia el final. Cuando esté bien dorado se añade el tomate triturado y se rehoga.
  // Con el sofrito listo se debe de añadir el agua. Las proporciones dependen mucho del fuego, del calor que haga, del grado de humedad y de lo grande que sea la paella, pero para comenzar, una buena proporción es la de añadir tres veces el volumen de agua que de arroz, aunque es la experiencia la que os hará ajustar y perfeccionar estas cantidades, que acabaréis haciendo a ojo, como hicieron la tía y la madre de mi novia, que eran las encargadas de esta paella (a pesar de que la tradición marca que sea el hombre de la casa el que la prepare).
  // Echamos ahora algunos troncos más al fuego para que suba de potencia y se haga bien el caldo durante 25 o 30 minutos. Es un buen momento de echar el azafrán o, en su defecto, el sazonador de paella (el más popular es "el paellador), que lleva sal, ajo, colorante y un poco de azafrán.
  // Luego añadimos el arroz "en caballete" (en diagonal) y lo distribuimos por la paella. Cocemos entre 17 y 20 minutos, aunque aquí el tiempo lo marca de nuevo el grano de arroz y la potencia del fuego, que debemos ir dejando consumirse. Tiene que quedar completamente seco y suelto. Mi recomendación para los primerizos es que tengáis un cazo con agua hirviendo al lado, por si hay que añadir agua. A mitad cocción también podemos poner unas ramitas de romero, que retiraremos antes de servir.
  // Por último, conviene dejar la paella reposar unos minutos tapada con un gran paño o papel de periódico --no es bueno porque con la humedad se puede liberar algo de tinta, pero toda la vida lo he visto usar-- antes de servirla y recibir el aplauso de los presentes.
  //     `,
  //       user: { connect: { id: daniel.id } },
  //       RecipeComment: {
  //         createMany: { data: [{ commentId: comentarioPaella.id }] },
  //       },
  //     },
  //   });

  // const recipeIngredient = await prisma.recipeIngredient.create({
  //   data: {
  //     amount: 10,
  //     ingredient: {
  //       create: {
  //         Edible: { connect: { productId: levaduraNutricional.id } }, //Se puede hacer desde levaduraNutricional.Edible.Ingredient¿?
  //         name: "levadura",
  //       },
  //     },
  //     recipe: { connect: { id: paellaValencia.id } },
  //   },
  // });

  const ordenDeClienteNoRegistrado = await prisma.order.create({
    data: {
      price: "10€",
      shipmentAddress: "Calle de Paquito Calvo, 33",
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
