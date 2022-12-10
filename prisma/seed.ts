/* eslint-disable @typescript-eslint/no-unused-vars */
import { IngredientUnit, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  const hashedPassword = "potitos2022";

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

  const frutosSecosYFrutasDeshidratas = await prisma.supraCategory.create({
    data: {
      supraCategoryName: "Frutos secos y frutas deshidratas",
      SupraCategoryRelation: {
        createMany: {
          data: [{ category: "nuts" }, { category: "driedFruits" }],
        },
      },
    },
  });

  const Pastas = await prisma.supraCategory.create({
    data: {
      supraCategoryName: "Harinas y pastas",
      SupraCategoryRelation: {
        createMany: {
          data: [{ category: "pastas" }],
        },
      },
    },
  });

  const HarinasYLevaduras = await prisma.supraCategory.create({
    data: {
      supraCategoryName: "Harinas, Levaduras y grano",
      SupraCategoryRelation: {
        createMany: {
          data: [{ category: "flours" }, { category: "yeast" }],
        },
      },
    },
  });

  // const CuidadoPersonal = await prisma.supraCategory.create({
  //   data: {
  //     supraCategoryName: "Productos cuidado",
  //     SupraCategoryRelation: {
  //       createMany: {
  //         data: [{ category: "flours" }, { category: "yeast" }],
  //       },
  //     },
  //   },
  // });

  const legumbresYArroces = await prisma.supraCategory.create({
    data: {
      supraCategoryName: "legumbre y arroces",
      SupraCategoryRelation: {
        createMany: {
          data: [{ category: "legumes" }],
        },
      },
    },
  });

  const aceitesYVinagres = await prisma.supraCategory.create({
    data: {
      supraCategoryName: "aceites y vinagres",
      SupraCategoryRelation: {
        createMany: {
          data: [{ category: "oils" }],
        },
      },
    },
  });

  const cafesYInfusiones = await prisma.supraCategory.create({
    data: {
      supraCategoryName: "cafés, tés e infusiones",
      SupraCategoryRelation: {
        createMany: {
          data: [{ category: "teas" }],
        },
      },
    },
  });

  const mermeladasYSiropes = await prisma.supraCategory.create({
    data: {
      supraCategoryName: "mermeladas y siropes",
      SupraCategoryRelation: {
        createMany: {
          data: [{ category: "jams" }, { category: "syrups" }],
        },
      },
    },
  });

  const ecategoryInSpanish = await prisma.eCategoryInSpanish.createMany({
    data: [
      /* 1 */ {
        category: "driedFruits",
        imageURL:
          "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/frutas-desidratas.jpg",
        categoryInSpanish: "Fruta deshidratada",
      },
      /* 2 */ {
        category: "flours",
        imageURL:
          "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/harias.png",
        categoryInSpanish: "Harinas",
      },
      /* 3 */ {
        category: "jams",
        imageURL:
          "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/mermeladas.png",
        categoryInSpanish: "Mermeladas",
      },
      /* 4 */ {
        category: "legumes",
        imageURL:
          "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/legumbres.jpg",
        categoryInSpanish: "Legumbres",
      },
      /* 5 */ {
        category: "nuts",
        imageURL:
          "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/frutos-secos.png",
        categoryInSpanish: "Frutos secos",
      },
      /* 6 */ {
        category: "oils",
        imageURL:
          "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/aceites.png",
        categoryInSpanish: "Aceites",
      },
      /* 7 */ {
        category: "pastas",
        imageURL:
          "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/pastas.jpg",
        categoryInSpanish: "Pastas",
      },
      /* 8 */ {
        category: "syrups",
        imageURL:
          "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/siropes.png",
        categoryInSpanish: "Siropes",
      },
      /* 9 */ {
        category: "teas",
        imageURL:
          "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/tes.png",
        categoryInSpanish: "Tés",
      },
      /* 10 */ {
        category: "yeast",
        imageURL:
          "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/levaduras.jpg",
        categoryInSpanish: "Levaduras",
      },
    ],
  });
  const neCategoryInSpanish = await prisma.nECategoryInSpanish.createMany({
    data: [
      /* 1 */ {
        category: "cleaningProducts",
        imageURL:
          "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/producto-de-limpieza.jpg",
        categoryInSpanish: "Productos de limpieza",
      },
      /* 2 */ {
        category: "accessories",
        imageURL:
          "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/accesorios.jpg",
        categoryInSpanish: "Accesorios",
      },
      /* 3 */ {
        category: "home",
        imageURL:
          "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/hogar.jpg",
        categoryInSpanish: "Hogar",
      },
      /* 4 */ {
        category: "personalCare",
        imageURL:
          "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/cuidado-personal.jpg",
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
      plainName: "pistachos",
      description: "pistachos ecológicos",
      stock: 10.5,
      imageURL:
        "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/pistachos.png",
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
          Ingredient: { create: { name: "pistachos" } },
        },
      },
      ProductUnit: "grams",
    },
    select: {
      id: true,
      name: true,
      Edible: { select: { Ingredient: { select: { id: true } } } },
    },
  });

  const almendra = await prisma.product.create({
    data: {
      name: "almendras",
      plainName: "almendras",
      description:
        "Las almendras son indicadas para su alto contenido de calcio y de grasas saludables, así como para disminuir el índice de azúcar en sangre.",
      stock: 16.5,
      imageURL:
        "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/almendras.png",
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
          Ingredient: { create: { name: "almendras" } },
        },
      },
      ProductUnit: "grams",
    },
    select: {
      id: true,
      name: true,
      Edible: { select: { Ingredient: { select: { id: true } } } },
    },
  });

  const quicos = await prisma.product.create({
    data: {
      name: "quicos",
      plainName: "quicos",
      description:
        "El maíz tostado, por ejemplo, conocido habitualmente como quicos, es toda una delícia. Es un aperitivo muy común en la cocina peruana, aunque su consumo está extendido por todo el mundo.",
      stock: 16.5,
      imageURL:
        "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/quicos.png?t=2022-11-28T17%3A26%3A58.679Z",
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
          Ingredient: { create: { name: "quicos" } },
        },
      },
      ProductUnit: "grams",
    },
    select: {
      id: true,
      name: true,
      Edible: { select: { Ingredient: { select: { id: true } } } },
    },
  });

  const cacahuetes = await prisma.product.create({
    data: {
      name: "cacahuetes",
      plainName: "cacahuetes",
      description:
        "El cacahuete es, en realidad, una legumbre: una familia de semillas comestibles que crecen en vainas de plantas (como los guisantes, judías y lentejas).",
      stock: 10.5,
      imageURL:
        "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/cacahuetes.png?t=2022-11-28T17%3A27%3A31.769Z",
      Edible: {
        create: {
          category: "nuts",
          priceByWeight: 8.3,
          allergens: { create: { allergen: "peanuts" } },
          nutritionFacts: {
            create: {
              ingredients: "nuts",
              energy: 400,
              fat: 90,
              carbohydrates: 3,
              protein: 2,
            },
          },
          Ingredient: { create: { name: "cacahuetes" } },
        },
      },
      ProductUnit: "grams",
    },
    select: {
      id: true,
      name: true,
      Edible: { select: { Ingredient: { select: { id: true } } } },
    },
  });

  const levaduraNutricional = await prisma.product.create({
    data: {
      name: "levadura nutricional",
      plainName: "levadura nutricional",
      description: "levadura nutricional ecológica",
      stock: 22.8,
      imageURL:
        "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/levadura%20nutricional.png",
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
      ProductUnit: "grams",
    },
    select: {
      id: true,
      name: true,
      Edible: { select: { Ingredient: { select: { id: true } } } },
    },
  });

  const lentejas = await prisma.product.create({
    data: {
      name: "lentejas",
      plainName: "lentejas",
      description: "lentejas ecológicas",
      stock: 48.1,
      imageURL:
        "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/lentejas.png",
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
      ProductUnit: "grams",
    },
    select: {
      id: true,
      name: true,
      Edible: { select: { Ingredient: { select: { id: true } } } },
    },
  });

  const garbanzos = await prisma.product.create({
    data: {
      name: "garbanzos",
      plainName: "garbanzos",
      description: "Que ricos los garbanzos ñam",
      stock: 48.1,
      imageURL:
        "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/garbanzos.png",
      Edible: {
        create: {
          category: "legumes",
          priceByWeight: 5.1,
          nutritionFacts: {
            create: {
              ingredients: "garbanzos",
              energy: 400,
              fat: 0,
              carbohydrates: 30,
              protein: 20,
            },
          },
          Ingredient: { create: { name: "garbanzos" } },
        },
      },
      ProductUnit: "grams",
    },
    select: {
      id: true,
      name: true,
      Edible: { select: { Ingredient: { select: { id: true } } } },
    },
  });

  const judias = await prisma.product.create({
    data: {
      name: "judía blanca",
      plainName: "judia blanca",
      description:
        "Judía o alubia, esta legumbre originaria de Perú y México se conoce desde la Antigüedad y se cultiva en todo el mundo.",
      stock: 48.1,
      imageURL:
        "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/judia%20blanca.png",
      Edible: {
        create: {
          category: "legumes",
          priceByWeight: 5.1,
          nutritionFacts: {
            create: {
              ingredients: "judias",
              energy: 400,
              fat: 0,
              carbohydrates: 30,
              protein: 20,
            },
          },
          Ingredient: { create: { name: "judía blanca" } },
        },
      },
      ProductUnit: "grams",
    },
    select: {
      id: true,
      name: true,
      Edible: { select: { Ingredient: { select: { id: true } } } },
    },
  });

  const harinaTrigo = await prisma.product.create({
    data: {
      name: "harina de trigo",
      plainName: "harina de trigo",
      description: "harina de trigo",
      stock: 18,
      imageURL:
        "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/harina%20de%20trigo.png?t=2022-11-28T17%3A30%3A39.365Z",
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
      ProductUnit: "grams",
    },
    select: {
      id: true,
      name: true,
      Edible: { select: { Ingredient: { select: { id: true } } } },
    },
  });
  const harinaMaiz = await prisma.product.create({
    data: {
      name: "harina de maíz",
      plainName: "harina de maiz",
      description:
        "Se denomina harina de maíz al polvo fino que se obtiene moliendo el cereal. Se destaca el alto contenido en fibras que posee este cereal molido.",
      stock: 18,
      imageURL:
        "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/harina%20de%20maiz.png?t=2022-11-28T17%3A31%3A03.807Z",
      Edible: {
        create: {
          category: "flours",
          priceByWeight: 4.3,
          nutritionFacts: {
            create: {
              ingredients: "harina de maiz",
              energy: 300,
              fat: 0,
              carbohydrates: 70,
              protein: 2,
            },
          },
          Ingredient: { create: { name: "harina de maíz" } },
        },
      },
      ProductUnit: "grams",
    },
    select: {
      id: true,
      name: true,
      Edible: { select: { Ingredient: { select: { id: true } } } },
    },
  });
  const harinaAlmendra = await prisma.product.create({
    data: {
      name: "harina de almendra",
      plainName: "harina de almendra",
      description:
        "La harina de almendra se hace moliendo almendras dulces. Suele hacerse con almendra pelada (sin piel) o con la almendra entera.",
      stock: 18,
      imageURL:
        "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/harina%20de%20almendra.png",
      Edible: {
        create: {
          category: "flours",
          priceByWeight: 7.3,
          nutritionFacts: {
            create: {
              ingredients: "harina de almendra",
              energy: 300,
              fat: 0,
              carbohydrates: 70,
              protein: 2,
            },
          },
          Ingredient: { create: { name: "harina de almendra" } },
        },
      },
      ProductUnit: "grams",
    },
    select: {
      id: true,
      name: true,
      Edible: { select: { Ingredient: { select: { id: true } } } },
    },
  });
  const espaguetis = await prisma.product.create({
    data: {
      name: "espaguetis",
      plainName: "espaguetis",
      description:
        "El espagueti es un tipo de pasta italiana elaborada con harina de grano duro y agua.",
      stock: 18,
      imageURL:
        "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/espaguetis.png",
      Edible: {
        create: {
          category: "pastas",
          priceByWeight: 1.1,
          nutritionFacts: {
            create: {
              ingredients: "espaguetis",
              energy: 300,
              fat: 0,
              carbohydrates: 70,
              protein: 2,
            },
          },
          allergens: { create: { allergen: "cereals" } },
          Ingredient: { create: { name: "espaguetis" } },
        },
      },
      ProductUnit: "grams",
    },
    select: {
      id: true,
      name: true,
      Edible: { select: { Ingredient: { select: { id: true } } } },
    },
  });
  const macarrones = await prisma.product.create({
    data: {
      name: "macarrones",
      plainName: "macarrones",
      description:
        "Los macarrones es un tipo de pasta italiana elaborada con harina de grano duro y agua.",
      stock: 18,
      imageURL:
        "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/macarrones.png",
      Edible: {
        create: {
          category: "pastas",
          priceByWeight: 1.1,
          nutritionFacts: {
            create: {
              ingredients: "macarrones",
              energy: 300,
              fat: 0,
              carbohydrates: 70,
              protein: 2,
            },
          },
          allergens: { create: { allergen: "cereals" } },
          Ingredient: { create: { name: "macarrones" } },
        },
      },
      ProductUnit: "grams",
    },
    select: {
      id: true,
      name: true,
      Edible: { select: { Ingredient: { select: { id: true } } } },
    },
  });
  const pasas = await prisma.product.create({
    data: {
      name: "uva pasa",
      plainName: "uva pasa",
      description:
        "Una pasa es una fruta seca obtenida del proceso de secado de una uva, con el objetivo de disminuir su humedad para lograr así su conservación por un periodo prolongado.",
      stock: 10,
      imageURL:
        "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/pasas.png",
      Edible: {
        create: {
          category: "driedFruits",
          priceByWeight: 2.3,
          nutritionFacts: {
            create: {
              ingredients: "uva pasa",
              energy: 300,
              fat: 0,
              carbohydrates: 70,
              protein: 2,
            },
          },
          Ingredient: { create: { name: "uva pasa" } },
        },
      },
      ProductUnit: "grams",
    },
    select: {
      id: true,
      name: true,
      Edible: { select: { Ingredient: { select: { id: true } } } },
    },
  });
  const teVerde = await prisma.product.create({
    data: {
      name: "té verde",
      plainName: "te verde",
      description:
        "El té verde (en chino tradicional, 綠茶; en chino simplificado, 绿茶; pinyin, Lǜ chá) proviene de la planta Camellia sinensis; «es el tipo de té no fermentado.",
      stock: 10,
      imageURL:
        "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/te%20verde.png?t=2022-11-28T17%3A32%3A53.906Z",
      Edible: {
        create: {
          category: "teas",
          priceByWeight: 2.3,
          nutritionFacts: {
            create: {
              ingredients: "té verde",
              energy: 300,
              fat: 0,
              carbohydrates: 70,
              protein: 2,
            },
          },
          Ingredient: { create: { name: "té verde" } },
        },
      },
      ProductUnit: "grams",
    },
    select: {
      id: true,
      name: true,
      Edible: { select: { Ingredient: { select: { id: true } } } },
    },
  });
  const rooibos = await prisma.product.create({
    data: {
      name: "rooibos",
      plainName: "rooibos",
      description:
        "El rooibos (nombre científico Aspalathus linearis) es una planta de origen sudafricano cuyo nombre en afrikáans significa arbusto rojo y se pronuncia «roibos».",
      stock: 10,
      imageURL:
        "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/rooibos.png?t=2022-11-28T17%3A33%3A10.365Z",
      Edible: {
        create: {
          category: "teas",
          priceByWeight: 2.3,
          nutritionFacts: {
            create: {
              ingredients: "rooibos",
              energy: 300,
              fat: 0,
              carbohydrates: 70,
              protein: 2,
            },
          },
          Ingredient: { create: { name: "rooibos" } },
        },
      },
      ProductUnit: "grams",
    },
    select: {
      id: true,
      name: true,
      Edible: { select: { Ingredient: { select: { id: true } } } },
    },
  });

  const sirope = await prisma.product.create({
    data: {
      name: "sirope de arce",
      plainName: "sirope de arce",
      description:
        "Los jarabes  llamados también siropes en el ámbito culinario, son líquidos de consistencia viscosa que por lo general contienen soluciones concentradas de azúcares.",
      stock: 23,
      imageURL:
        "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/sirope%20de%20arce.png?t=2022-11-28T17%3A33%3A30.371Z",
      Edible: {
        create: {
          category: "syrups",
          priceByWeight: 2.3,
          nutritionFacts: {
            create: {
              ingredients: "sirope de arce",
              energy: 300,
              fat: 0,
              carbohydrates: 70,
              protein: 2,
            },
          },
          Ingredient: { create: { name: "sirope de arce" } },
        },
      },
      ProductUnit: "liters",
    },
    select: {
      id: true,
      name: true,
      Edible: { select: { Ingredient: { select: { id: true } } } },
    },
  });

  const mermeladaMelon = await prisma.product.create({
    data: {
      name: "mermelada de melón",
      plainName: "mermelada de melon",
      description:
        "Las mermeladas industriales estan dulces y ricas, pero nunca se pueden comparar a las mermeladas caseras, hechas por nosotros mismos con ingredientes de calidad y de temporada.",
      stock: 23,
      imageURL:
        "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/mermelada%20de%20melon.jpeg?t=2022-11-28T17%3A33%3A56.871Z",
      Edible: {
        create: {
          category: "jams",
          priceByWeight: 2.3,
          nutritionFacts: {
            create: {
              ingredients: "mermelada de melon",
              energy: 300,
              fat: 0,
              carbohydrates: 70,
              protein: 2,
            },
          },
          Ingredient: { create: { name: "mermelada de melon" } },
        },
      },
      ProductUnit: "grams",
    },
    select: {
      id: true,
      name: true,
      Edible: { select: { Ingredient: { select: { id: true } } } },
    },
  });
  const aceiteOliva = await prisma.product.create({
    data: {
      name: "aceite de oliva virgen extra",
      plainName: "aceite de oliva virgen extra",
      description:
        "El aceite de oliva es típico de la cuenca mediterránea, siendo España el primer productor mundial. Se usa a diario en la cocina mediterránea.",
      stock: 23,
      imageURL:
        "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/aceite%20de%20oliva%20virgen%20extra.png?t=2022-11-28T17%3A34%3A12.965Z",
      Edible: {
        create: {
          category: "oils",
          priceByWeight: 2.3,
          nutritionFacts: {
            create: {
              ingredients: "aceite de oliva virgen extra",
              energy: 300,
              fat: 0,
              carbohydrates: 70,
              protein: 2,
            },
          },
          Ingredient: { create: { name: "aceite de oliva virgen extra" } },
        },
      },
      ProductUnit: "milliliters",
    },
    select: {
      id: true,
      name: true,
      Edible: { select: { Ingredient: { select: { id: true } } } },
    },
  });
  //#endregion Edible

  //#region NonEdible
  const cepilloDeDientes = await prisma.product.create({
    data: {
      name: "cepillo de dientes",
      plainName: "cepillo de dientes",
      description: "cepillo de dientes",
      stock: 7,
      imageURL:
        "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/cepillo%20dientes.png?t=2022-11-28T17%3A34%3A26.608Z",
      NonEdible: {
        create: {
          category: "personalCare",
          price: 3.5,
        },
      },
      ProductUnit: "unit",
    },
  });

  const jabon = await prisma.product.create({
    data: {
      name: "jabón",
      plainName: "jabon",
      description: "jabón artesanal",
      stock: 12,
      imageURL:
        "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/jabon%20artesanal.png?t=2022-11-28T17%3A34%3A41.195Z",
      NonEdible: {
        create: {
          category: "personalCare",
          price: 4.6,
        },
      },
      ProductUnit: "unit",
    },
  });

  console.log(`📦 Productos creados...`);
  console.log(
    pistachos.name,
    almendra.name,
    cacahuetes.name,
    quicos.name,
    garbanzos.name,
    judias.name,
    levaduraNutricional.name,
    harinaTrigo.name,
    harinaAlmendra.name,
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

  /*const comentarioPaella = await prisma.comment.create({
    data: {
      rating: 5,
      user: { connect: { id: alicia.id } },
      description: "Que bello es mi novio <3",
    },
  });*/

  /* NUESTRAS RECETAS */
  const gachas = await prisma.recipe.create({
    data: {
      name: "gachas dulces andaluzas al anís",
      difficulty: "hard",
      directions: {
        createMany: {
          data: {
            direction: "Paso para la receta",
            number: 1,
          },
        },
      },
      imageURL:
        "https://cocinatuimaginacion.com/wp-content/uploads/2017/10/pat%C3%A9-de-nueces-y-champi%C3%B1ones.jpg",
      portions: 4,
      cookingTime: 20,
      preparationTime: 30,
      description:
        "Una receta tradicional como las gachas no puede faltar en tu colección. Adaptada para celíacos.",
      User: { connect: { id: marta.id } },
      createdAt: new Date(),
      allergens: { create: { allergen: "nuts" } },
    },
  });

  const gachasIngredients = [
    {
      amount: 50,
      unit: IngredientUnit.grams,
      Ingredient: harinaAlmendra.Edible?.Ingredient,
      Recipe: gachas,
    },
    {
      amount: 10,
      unit: IngredientUnit.grams,
      Ingredient: levaduraNutricional.Edible?.Ingredient,
      Recipe: gachas,
    },
  ].map(
    async (i) =>
      await prisma.recipeIngredient.create({
        data: {
          amount: i.amount,
          Ingredient: { connect: { id: i.Ingredient?.id } },
          Recipe: { connect: { id: i.Recipe.id } },
          unit: i.unit,
        },
      }),
  );

  const sandwich = await prisma.recipe.create({
    data: {
      name: "sándwich de salmón con aguacate y huevo",
      difficulty: "easy",
      directions: {
        createMany: {
          data: {
            direction: "Paso para la receta",
            number: 1,
          },
        },
      },
      imageURL:
        "https://www.tapasmagazine.es/wp-content/uploads/2019/04/fprincipal-3.jpg",
      portions: 1,
      cookingTime: 0,
      preparationTime: 10,
      description:
        "Si no sabes qué desayunar o almorzar, prueba a hacer este sencillo sándwich de salmón con aguacate y huevo que no te defraudará.",
      User: { connect: { id: marta.id } },
      createdAt: new Date(),
    },
  });

  const sandwichIngredients = [
    {
      amount: 10,
      unit: IngredientUnit.milliliters,
      Ingredient: aceiteOliva.Edible?.Ingredient,
      Recipe: sandwich,
    },
  ].map(
    async (i) =>
      await prisma.recipeIngredient.create({
        data: {
          amount: i.amount,
          Ingredient: { connect: { id: i.Ingredient?.id } },
          Recipe: { connect: { id: i.Recipe.id } },
          unit: i.unit,
        },
      }),
  );

  const tarta = await prisma.recipe.create({
    data: {
      name: "tarta de bizcocho de chocolate",
      difficulty: "moderate",
      directions: {
        createMany: {
          data: [
            {
              direction: "Hacer la tartita",
              number: 1,
            },
            {
              direction: "Comerse la tartita",
              number: 2,
            },
          ],
        },
      },
      imageURL:
        "https://i.pinimg.com/564x/c5/56/fd/c556fd3f703b64952159f1720538f122.jpg",
      portions: 4,
      cookingTime: 30,
      preparationTime: 10,
      description:
        "Este pastel de chocolate desbanca a la tarta de galletas y chocolate en los cumpleaños.",
      User: { connect: { id: marta.id } },
      createdAt: new Date(),
      allergens: { create: { allergen: "cereals" } },
    },
  });

  const tartaIngredients = [
    {
      amount: 200,
      unit: IngredientUnit.grams,
      Ingredient: "chocolate",
      Recipe: tarta,
    },
  ];

  const tartaIngredientsProducts = [
    {
      amount: 100,
      unit: IngredientUnit.grams,
      Ingredient: harinaTrigo.Edible?.Ingredient,
      Recipe: tarta,
    },
  ].map(
    async (i) =>
      await prisma.recipeIngredient.create({
        data: {
          amount: i.amount,
          Ingredient: { connect: { id: i.Ingredient?.id } },
          Recipe: { connect: { id: i.Recipe.id } },
          unit: i.unit,
        },
      }),
  );

  const lentejasCremosas = await prisma.recipe.create({
    data: {
      name: "Lentejas Cremosas con Espinacas",
      difficulty: "hard",
      directions: {
        createMany: {
          data: {
            direction: "Paso para la receta",
            number: 1,
          },
        },
      },
      imageURL:
        "https://pinchofyum.com/wp-content/uploads/One-Pot-Creamy-Spinach-Lentils-6-960x1440.jpg",
      portions: 3,
      cookingTime: 20,
      preparationTime: 15,
      description:
        "Los lácteos y las lentejas son excelentes fuentes de proteínas, y ambos toman protagonismo en este cremoso guiso.",
      User: { connect: { id: marta.id } },
      createdAt: new Date(),
    },
  });

  const lentejasCremosasIngredients = [
    {
      amount: 250,
      unit: IngredientUnit.grams,
      Ingredient: lentejas.Edible?.Ingredient,
      Recipe: lentejasCremosas,
    },
    {
      amount: 20,
      unit: IngredientUnit.milliliters,
      Ingredient: aceiteOliva.Edible?.Ingredient,
      Recipe: lentejasCremosas,
    },
  ].map(
    async (i) =>
      await prisma.recipeIngredient.create({
        data: {
          amount: i.amount,
          Ingredient: { connect: { id: i.Ingredient?.id } },
          Recipe: { connect: { id: i.Recipe.id } },
          unit: i.unit,
        },
      }),
  );

  const brochetas = await prisma.recipe.create({
    data: {
      name: "Brochetas de melón con crujiente de jamón",
      difficulty: "easy",
      directions: {
        createMany: {
          data: [
            {
              direction:
                "Colocamos una hoja de papel absorbente en el plato de nuestro microondas y, sobre ella, dos lonchas de jamón.",
              number: 1,
            },
            {
              direction:
                "Cubrimos con otra hoja de papel, colocamos dos lonchas más y terminamos tapando con una tercera hoja de papel.",
              number: 2,
            },
            {
              direction:
                "Introducimos en el microondas y programamos dos minutos a máxima potencia.",
              number: 3,
            },
            {
              direction:
                "Dejamos enfriar y trituramos con un mortero, picadora o pasando un rodillo por encima.",
              number: 4,
            },
            {
              direction:
                "Sacamos bolas de melón, secamos ligeramente, ensartamos dos por brocheta y reservamos.",
              number: 5,
            },
            {
              direction:
                "En el momento de consumir (no antes, para que el jamón se mantenga crujiente), espolvoreamos generosamente con el jamón triturado y listo para servir.",
              number: 6,
            },
          ],
        },
      },
      imageURL: "https://i.blogs.es/ee0ad8/1366_2000/1366_2000.jpg",
      portions: 10,
      cookingTime: 15,
      preparationTime: 15,
      description:
        "Delicioso entrante para ir abirendo el apetito. Fresco y sabroso.",
      User: { connect: { id: marta.id } },
      createdAt: new Date(),
    },
  });

  const brochetasIngredients = [
    {
      amount: 4,
      unit: IngredientUnit.unit,
      Ingredient: "jamón serrano loncheado",
      Recipe: brochetas,
    },
    {
      amount: 0.5,
      unit: IngredientUnit.unit,
      Ingredient: "melón",
      Recipe: brochetas,
    },
  ];

  const risotto = await prisma.recipe.create({
    data: {
      name: "Risotto de ajo negro con crujiente de Parmesano",
      difficulty: "moderate",
      directions: {
        createMany: {
          data: [
            {
              direction:
                "Rallamos el queso Parmesano y preparamos los crujientes colocando cuatro pequeños montoncitos sobre una baandeja de horno cubierta con papel sulfurizado.",
              number: 1,
            },
            {
              direction:
                "Horneamos a 180ºC durante 5 minutos o hasta que comiencen a dorarse. Dejamos enfriar hasta el momento de servir.",
              number: 2,
            },
            {
              direction:
                "Trituramos los dientes de ajo junto con el caldo de verduras, lo transferimos a una cacerola y lo mantenemos caliente a fuego muy suave mientras continuanos prepararando el resto.",
              number: 3,
            },
            {
              direction:
                "Lo siguiente será pelar y cortar la cebolla brunoise fina y pocharla en una cacerola usando la mitad de la mantequilla como grasa.",
              number: 4,
            },
            {
              direction:
                "Cuando la cebolla esté traslúcida añadimos el arroz, removemos y sofreímos un minuto.",
              number: 5,
            },
            {
              direction:
                "Removemos durante todo el proceso para que el arroz suelte su almidón y ligue los granos, convirtiéndolo en un cremoso bocado.",
              number: 6,
            },
            {
              direction:
                "A los 18 minutos, nuestro risotto estará casi listo y solo nos quedará incorporar el queso Parmesano rallado y el resto de la mantequilla.",
              number: 6,
            },
            {
              direction:
                "Removemos, ajustamos el punto de sal y dejamos reposar unos minutos antes de servir con los crujientes de parmesano y ralladura de lima por toda la superficie.",
              number: 6,
            },
          ],
        },
      },
      imageURL:
        "https://i.blogs.es/621992/risotto-de-ajo-negro-con-galletas-de-parmesano/1366_2000.jpg",
      portions: 2,
      cookingTime: 20,
      preparationTime: 15,
      description:
        "Receta para enamorar, perfecta para una comida o cena romántica de San Valentín, si eres de los que celebra la ocasión, para una celebración o para darse un homenaje.",
      User: { connect: { id: marta.id } },
      createdAt: new Date(),
    },
  });

  const risottoIngredients = [
    {
      amount: 100,
      unit: IngredientUnit.grams,
      Ingredient: "cebolla",
      Recipe: risotto,
    },
    {
      amount: 700,
      unit: IngredientUnit.milliliters,
      Ingredient: "caldo de verduras",
      Recipe: risotto,
    },
    {
      amount: 10,
      unit: IngredientUnit.unit,
      Ingredient: "diente de ajo negro",
      Recipe: risotto,
    },
    {
      amount: 40,
      unit: IngredientUnit.grams,
      Ingredient: "mantequilla",
      Recipe: risotto,
    },
    {
      amount: 60,
      unit: IngredientUnit.grams,
      Ingredient: "queso parmesano",
      Recipe: risotto,
    },
    {
      amount: 200,
      unit: IngredientUnit.grams,
      Ingredient: "arroz arborio",
      Recipe: risotto,
    },
    {
      amount: 1,
      unit: IngredientUnit.unit,
      Ingredient: "lima",
      Recipe: risotto,
    },
  ];
  /* END NUESTRAS RECETAS */

  /* RECETAS DE LA COMUNIDAD */
  const cebollas = await prisma.recipe.create({
    data: {
      name: "cebollas moradas rellenas",
      difficulty: "moderate",
      directions: {
        createMany: {
          data: [
            {
              direction:
                "Pelamos las cebollas y cortamos un poco de los extremos superior e inferior para que sirvan de base y no se vuelquen.",
              number: 1,
            },
            {
              direction:
                "Cortamos por la mitad y vaciamos con mucho cuidado, dejando las dos capas exteriores intactas.",
              number: 2,
            },
            {
              direction:
                "Picamos los trozos de cebolla que hemos vaciado y los pochamos en una sartén con un poco de aceite de oliva virgen extra durante 10 minutos.",
              number: 3,
            },
            {
              direction:
                "Añadimos el pan rallado, los tomates secos y las almendras, ambos bien picados, y el queso parmesano rallado. Salpimentamos al gusto.",
              number: 4,
            },
            {
              direction:
                "Rellenamos las cebollas con la mezcla y cubrimos con un poco más de queso parmesano rallado.",
              number: 5,
            },
            {
              direction:
                "Colocamos en una fuente de horno y rociamos con un chorrito de aceite. Cocemos en el horno, precalentado a 200 ºC con calor arriba y abajo, durante 20 minutos.",
              number: 6,
            },
            {
              direction:
                "Retiramos del horno, decoramos con tomillo fresco y servimos inmediatamente.",
              number: 6,
            },
          ],
        },
      },
      imageURL: "https://i.blogs.es/d70dad/1024_682-1/1366_2000.jpg",
      portions: 3,
      cookingTime: 20,
      preparationTime: 20,
      description:
        "Cebollas moradas rellenas, receta versátil que es perfecta como guarnición o entrante navideño",
      User: { connect: { id: juan.id } },
      createdAt: new Date(),
    },
  });

  const cebollasIngredients = [
    {
      amount: 3,
      unit: IngredientUnit.unit,
      Ingredient: "cebolla morada",
      Recipe: cebollas,
    },
    {
      amount: 3,
      unit: IngredientUnit.unit,
      Ingredient: "tomate seco en aceite",
      Recipe: cebollas,
    },
    {
      amount: 30,
      unit: IngredientUnit.grams,
      Ingredient: "pan rallado",
      Recipe: cebollas,
    },
    {
      amount: 40,
      unit: IngredientUnit.grams,
      Ingredient: "queso parmesano rallado",
      Recipe: cebollas,
    },
    {
      amount: 10,
      unit: IngredientUnit.grams,
      Ingredient: "sal",
      Recipe: cebollas,
    },
    {
      amount: 30,
      unit: IngredientUnit.grams,
      Ingredient: "pimienta negra molida",
      Recipe: cebollas,
    },
    {
      amount: 20,
      unit: IngredientUnit.grams,
      Ingredient: "tomillo fresco",
      Recipe: cebollas,
    },
  ];

  const cebollasIngredientsProducts = [
    {
      amount: 12,
      unit: IngredientUnit.unit,
      Ingredient: almendra.Edible?.Ingredient,
      Recipe: cebollas,
    },
    {
      amount: 20,
      unit: IngredientUnit.milliliters,
      Ingredient: aceiteOliva.Edible?.Ingredient,
      Recipe: cebollas,
    },
  ].map(
    async (i) =>
      await prisma.recipeIngredient.create({
        data: {
          amount: i.amount,
          Ingredient: { connect: { id: i.Ingredient?.id } },
          Recipe: { connect: { id: i.Recipe.id } },
          unit: i.unit,
        },
      }),
  );

  const espaguetisBoloñesa = await prisma.recipe.create({
    data: {
      name: "Espaguetis con salsa boloñesa especial",
      difficulty: "easy",
      directions: {
        createMany: {
          data: {
            direction: "Paso para la receta",
            number: 1,
          },
        },
      },
      imageURL:
        "https://www.laespanolaaceites.com/wp-content/uploads/2019/05/espaguetis-a-la-bolonesa-1080x671.jpg",
      portions: 3,
      cookingTime: 10,
      preparationTime: 7,
      description:
        "Disfruta con estos deliciosos tallarines acompañados de nuestra salsa boloñesa especial.",
      User: { connect: { id: sandra.id } },
      createdAt: new Date(),
      allergens: { create: { allergen: "cereals" } },
    },
  });

  const espaguetisBoloñesaIngredients = [
    {
      amount: 2,
      unit: IngredientUnit.grams,
      Ingredient: espaguetis.Edible?.Ingredient,
      Recipe: espaguetisBoloñesa,
    },
  ].map(
    async (i) =>
      await prisma.recipeIngredient.create({
        data: {
          amount: i.amount,
          Ingredient: { connect: { id: i.Ingredient?.id } },
          Recipe: { connect: { id: i.Recipe.id } },
          unit: i.unit,
        },
      }),
  );

  const panPueblo = await prisma.recipe.create({
    data: {
      name: "pan de pueblo tradicional",
      difficulty: "moderate",
      directions: {
        createMany: {
          data: {
            direction: "Paso para la receta",
            number: 1,
          },
        },
      },
      imageURL:
        "https://www.comedera.com/wp-content/uploads/2022/03/pan-de-pueblo.jpg",
      portions: 2,
      cookingTime: 40,
      preparationTime: 25,
      description:
        "Reconozco que hacer pan casero me atrae más cada día. Hoy utilizamos ingredientes normales para hacer un pan de escándalo y con pocos condicionantes.",
      User: { connect: { id: juan.id } },
      createdAt: new Date(),
      allergens: { create: { allergen: "cereals" } },
    },
  });

  const panPuebloIngredients = [
    {
      amount: 200,
      unit: IngredientUnit.grams,
      Ingredient: harinaTrigo.Edible?.Ingredient,
      Recipe: panPueblo,
    },
    {
      amount: 2,
      unit: IngredientUnit.teaspoon,
      Ingredient: levaduraNutricional.Edible?.Ingredient,
      Recipe: panPueblo,
    },
  ].map(
    async (i) =>
      await prisma.recipeIngredient.create({
        data: {
          amount: i.amount,
          Ingredient: { connect: { id: i.Ingredient?.id } },
          Recipe: { connect: { id: i.Recipe.id } },
          unit: i.unit,
        },
      }),
  );

  const paella = await prisma.recipe.create({
    data: {
      name: "paella valenciana",
      difficulty: "hard",
      directions: {
        createMany: {
          data: {
            direction: "Paso para la receta",
            number: 1,
          },
        },
      },
      imageURL:
        "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2021%2F06%2F04%2Fpaella-valenciana.jpg&q=60",
      portions: 5,
      cookingTime: 20,
      preparationTime: 30,
      description:
        "El otro día hice esta deliciosa paella al estilo de Valencia, ¡mirad qué pintaza!",
      User: { connect: { id: sandra.id } },
      createdAt: new Date(),
    },
  });

  const paellaIngredients = [
    {
      amount: 100,
      unit: IngredientUnit.milliliters,
      Ingredient: aceiteOliva.Edible?.Ingredient,
      Recipe: paella,
    },
  ].map(
    async (i) =>
      await prisma.recipeIngredient.create({
        data: {
          amount: i.amount,
          Ingredient: { connect: { id: i.Ingredient?.id } },
          Recipe: { connect: { id: i.Recipe.id } },
          unit: i.unit,
        },
      }),
  );

  const tartaZanahoria = await prisma.recipe.create({
    data: {
      name: "tarta de zanahoria con nueces",
      difficulty: "moderate",
      directions: {
        createMany: {
          data: {
            direction: "Paso para la receta",
            number: 1,
          },
        },
      },
      imageURL:
        "https://www.guatemala.com/fotos/2020/07/reto-culinario-municipalidad-768x436.jpg",
      portions: 4,
      cookingTime: 45,
      preparationTime: 25,
      description:
        "Tenéis que probar esta receta de tarta de zanahoria, cremosa y exquisita, con un toque a almendra.",
      User: { connect: { id: sandra.id } },
      createdAt: new Date(),

      allergens: {
        createMany: {
          data: [{ allergen: "cereals" }, { allergen: "nuts" }],
        },
      },
    },
  });

  const tartaZanahoriaIngredients = [
    {
      amount: 150,
      unit: IngredientUnit.grams,
      Ingredient: harinaTrigo.Edible?.Ingredient,
      Recipe: tartaZanahoria,
    },
    {
      amount: 40,
      unit: IngredientUnit.grams,
      Ingredient: almendra.Edible?.Ingredient,
      Recipe: tartaZanahoria,
    },
  ].map(
    async (i) =>
      await prisma.recipeIngredient.create({
        data: {
          amount: i.amount,
          Ingredient: { connect: { id: i.Ingredient?.id } },
          Recipe: { connect: { id: i.Recipe.id } },
          unit: i.unit,
        },
      }),
  );
  /* END RECETAS DE LA COMUNIDAD */

  const unidadesDeMedida = await prisma.ingredientUnitInSpanish.createMany({
    data: [
      /*  1 **/ { ingredientUnit: "grams", unitInSpanish: "gramos" },
      /*  2 **/ { ingredientUnit: "liters", unitInSpanish: "litros" },
      /*  3 **/ { ingredientUnit: "unit", unitInSpanish: "unidades" },
      /*  4 **/ { ingredientUnit: "cup", unitInSpanish: "tazas" },
      /*  5 **/ { ingredientUnit: "kilograms", unitInSpanish: "kilogramos" },
      /*  6 **/ { ingredientUnit: "milliliters", unitInSpanish: "mililitros" },
      /*  7 **/ { ingredientUnit: "ounce", unitInSpanish: "onzas" },
      /* 11 **/ { ingredientUnit: "pinch", unitInSpanish: "pizca" },
      /*  8 **/ { ingredientUnit: "pound", unitInSpanish: "libras" },
      /*  9 **/ { ingredientUnit: "tablespoon", unitInSpanish: "cucharadas" },
      /* 10 **/ { ingredientUnit: "teaspoon", unitInSpanish: "cucharaditas" },
    ],
  });

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
        "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/accesorios.jpg",
      description: "Competición fuertemente inspirada en MasterChef",
      OnSiteWorkshop: {
        create: {
          date: new Date(),
          places: 50,
        },
      },
    },
  });
  const Taller2 = await prisma.workshop.create({
    data: {
      name: "Cocina Japonesa",
      imageURL:
        "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/hogar.jpg",
      description:
        "Únete a este taller para aprender a cocinar riquísimos platos del país del sol naciente. ¡No te arrepentirás!",
      OnSiteWorkshop: {
        create: {
          date: new Date(),
          places: 50,
        },
      },
    },
  });

  const Taller3 = await prisma.workshop.create({
    data: {
      name: "Galletitas navideñas",
      imageURL:
        "https://grjkjrkjpycphptekssf.supabase.co/storage/v1/object/public/images/seed/cuidado-personal.jpg",
      description:
        "Aprende junto a un equipo profesional a cocinar alucinantes casitas de hombrecillos de jengibre. Sorprende a tus comensales estas navidades con autenticas obras de arte comestibles.",
      OnSiteWorkshop: {
        create: {
          date: new Date(),
          places: 50,
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
