/* eslint-disable @typescript-eslint/no-unused-vars */
import { hashPassword } from "../src/server/auth/password";
import { IngredientUnit, Prisma, PrismaClient } from "@prisma/client";

export async function seed(prisma: PrismaClient, adminPassword: string) {
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
      supraCategoryName: "Arroces y pastas",
      SupraCategoryRelation: {
        createMany: {
          data: [{ category: "rice" }, { category: "pastas" }],
        },
      },
    },
  });

  const HarinasYLevaduras = await prisma.supraCategory.create({
    data: {
      supraCategoryName: "Harinas y Levaduras",
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
      supraCategoryName: "Cereales y legumbres",
      SupraCategoryRelation: {
        createMany: {
          data: [{ category: "grano" }, { category: "legumes" }],
        },
      },
    },
  });

  const aceitesYVinagres = await prisma.supraCategory.create({
    data: {
      supraCategoryName: "aceites y vinagres",
      SupraCategoryRelation: {
        createMany: {
          data: [{ category: "oils" }, { category: "vinegar" }],
        },
      },
    },
  });

  const cafesYInfusiones = await prisma.supraCategory.create({
    data: {
      supraCategoryName: "cafés e infusiones",
      SupraCategoryRelation: {
        createMany: {
          data: [{ category: "teas" }, { category: "coffee" }],
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
        imageURL: "/api/images/seed/36b55d94-f827-412f-a441-69df6bbeb348.jpg",
        categoryInSpanish: "Fruta deshidratada",
      },
      /* 2 */ {
        category: "flours",
        imageURL: "/api/images/seed/1334f066-7236-473d-a52c-9a4a7b983257.jpg",
        categoryInSpanish: "Harinas",
      },
      /* 3 */ {
        category: "jams",
        imageURL: "/api/images/seed/6ae2146c-454b-493e-a9ef-f2edbc86366d.jpg",
        categoryInSpanish: "Mermeladas",
      },
      /* 4 */ {
        category: "legumes",
        imageURL: "/api/images/seed/38fc57b7-2cc9-4278-a2cc-fcec62da5018.jpg",
        categoryInSpanish: "Legumbres",
      },
      /* 5 */ {
        category: "nuts",
        imageURL: "/api/images/seed/9de6cbbe-8860-419a-a280-8fb441a8ead9.jpg",
        categoryInSpanish: "Frutos secos",
      },
      /* 6 */ {
        category: "oils",
        imageURL: "/api/images/seed/9b6f6e26-b565-4c1a-a3b2-ced32dd98d5c.jpg",
        categoryInSpanish: "Aceites",
      },
      /* 7 */ {
        category: "pastas",
        imageURL: "/api/images/seed/ca0e4e3e-504d-4697-a142-2a7bf19f2d76.jpg",
        categoryInSpanish: "Pastas",
      },
      /* 8 */ {
        category: "syrups",
        imageURL: "/api/images/seed/71e8ce85-4791-4fe7-a565-35bb76361012.jpg",
        categoryInSpanish: "Siropes",
      },
      /* 9 */ {
        category: "teas",
        imageURL: "/api/images/seed/bfb85c2e-393f-4740-ab1c-f2d6bfeb2a6e.jpg",
        categoryInSpanish: "Infusiones",
      },
      /* 10 */ {
        category: "yeast",
        imageURL: "/api/images/seed/6697db92-ee59-43a5-a9d7-3e7a56ab3a59.jpg",
        categoryInSpanish: "Levaduras",
      },
      /* 11 */ {
        category: "grano",
        imageURL: "/api/images/seed/5323934d-5fe8-424d-ae88-7eb454a32b6e.jpg",
        categoryInSpanish: "Cereales",
      },
      /* 12 */ {
        category: "rice",
        imageURL: "/api/images/seed/10cb55e6-7f1b-491f-ad25-59706afc1741.jpg",
        categoryInSpanish: "Arroces",
      },
      /* 13 */ {
        category: "coffee",
        imageURL: "/api/images/seed/efba5830-b9ed-49b6-a833-d4ecc8280c9e.jpg",
        categoryInSpanish: "Cafés",
      },
      /* 13 */ {
        category: "vinegar",
        imageURL: "/api/images/seed/85b901dd-bd78-4685-a494-e1543ead6b28.jpg",
        categoryInSpanish: "Vinagres",
      },
    ],
  });
  const neCategoryInSpanish = await prisma.nECategoryInSpanish.createMany({
    data: [
      /* 1 */ {
        category: "cleaningProducts",
        imageURL: "/api/images/seed/05964ecc-7f74-4411-ac52-88f7de2e2a71.jpg",
        categoryInSpanish: "Productos de limpieza",
      },
      /* 2 */ {
        category: "accessories",
        imageURL: "/api/images/seed/804e2d6e-f777-4679-a4ab-73b407d69301.jpg",
        categoryInSpanish: "Accesorios",
      },
      /* 3 */ {
        category: "home",
        imageURL: "/api/images/seed/05964ecc-7f74-4411-ac52-88f7de2e2a71.jpg",
        categoryInSpanish: "Hogar",
      },
      /* 4 */ {
        category: "personalCare",
        imageURL: "/api/images/seed/804e2d6e-f777-4679-a4ab-73b407d69301.jpg",
        categoryInSpanish: "Cuidado personal",
      },
    ],
  });

  //#region Users
  const daniel = await prisma.user.create({
    data: {
      name: "Daniel",
      email: "Daniel@Potitos.com",
      passwordHash: await hashPassword(adminPassword),
      role: "admin",
      image: "/api/images/media/3cf2ada1-59d8-3377-0101-3161f401e096.png",
      Admin: { create: {} },
    },
  });

  const alicia = await prisma.user.create({
    data: {
      name: "Alicia",
      email: "Alicia@Potitos.com",
      passwordHash: await hashPassword(adminPassword),
      role: "admin",
      image: "/api/images/media/3cf2ada1-59d8-3377-0101-3161f401e096.png",
      Admin: { create: {} },
    },
  });

  const patricio = await prisma.user.create({
    data: {
      name: "Patricio",
      email: "Patricio@worki.com",
      passwordHash: await hashPassword(adminPassword),
      role: "admin",
      Admin: { create: {} },
      image: "/api/images/media/3cf2ada1-59d8-3377-0101-3161f401e096.png",
      Client: { create: { cart: { create: {} } } },
    },
  });
  const sandra = await prisma.user.create({
    data: {
      name: "Sandra",
      email: "Sandra@Potitos.com",
      passwordHash: await hashPassword("potitos2022"),
      role: "client",
      image: "/api/images/media/3cf2ada1-59d8-3377-0101-3161f401e096.png",
      Client: { create: { cart: { create: {} } } },
    },
  });

  const pilar = await prisma.user.create({
    data: {
      name: "Pilar",
      email: "Pilar@Potitos.com",
      passwordHash: await hashPassword(adminPassword),
      role: "admin",
      Admin: { create: {} },
      image: "/api/images/media/3cf2ada1-59d8-3377-0101-3161f401e096.png",
      Client: { create: { cart: { create: {} } } },
    },
  });

  const alberto = await prisma.user.create({
    data: {
      name: "Alberto",
      email: "Alberto@Potitos.com",
      passwordHash: await hashPassword("potitos2022"),
      role: "client",
      image: "/api/images/media/3cf2ada1-59d8-3377-0101-3161f401e096.png",
      Client: { create: { cart: { create: {} } } },
    },
  });

  const marta = await prisma.user.create({
    data: {
      name: "Marta",
      email: "Marta@Potitos.com",
      passwordHash: await hashPassword(adminPassword),
      role: "admin",
      Admin: { create: {} },
      image: "/api/images/media/3cf2ada1-59d8-3377-0101-3161f401e096.png",
      Client: { create: { cart: { create: {} } } },
    },
  });

  const juan = await prisma.user.create({
    data: {
      name: "Juan",
      email: "Juan@Potitos.com",
      passwordHash: await hashPassword("potitos2022"),
      role: "client",
      image: "/api/images/media/3cf2ada1-59d8-3377-0101-3161f401e096.png",
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

  const coposDeAvena = await prisma.product.create({
    data: {
      name: "copos de avena",
      plainName: "copos de avena",
      description: "Copos de avena 100% naturales",
      stock: 375,
      imageURL: "/api/images/seed/5323934d-5fe8-424d-ae88-7eb454a32b6e.jpg",
      Edible: {
        create: {
          category: "grano",
          priceByWeight: 16.2,
          allergens: {},
          nutritionFacts: {
            create: {
              ingredients: "grano",
              energy: 108,
              fat: 25,
              carbohydrates: 12,
              protein: 2,
            },
          },
          Ingredient: { create: { name: "copos de avena" } },
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
  const germenTrigo = await prisma.product.create({
    data: {
      name: "germen de trigo",
      plainName: "germen de trigo",
      description: "Germen de trigo 100% natural",
      stock: 375,
      imageURL: "/api/images/seed/f74b6fd8-c033-4528-a25b-83a8c4e5c465.jpg",
      Edible: {
        create: {
          category: "grano",
          priceByWeight: 3.8,
          nutritionFacts: {
            create: {
              ingredients: "germen de trigo",
              energy: 220,
              fat: 0.3,
              carbohydrates: 17,
              protein: 2.4,
            },
          },
          Ingredient: { create: { name: "germen de trigo" } },
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

  const arrozIntegral = await prisma.product.create({
    data: {
      name: "arroz integral",
      plainName: "arroz integral",
      description: "arroz 100% integral",
      stock: 375,
      imageURL: "/api/images/seed/b89f7370-2772-4f9b-af5c-083b4140504c.jpg",
      Edible: {
        create: {
          category: "rice",
          priceByWeight: 3.8,
          nutritionFacts: {
            create: {
              ingredients: "arroz integral",
              energy: 120,
              fat: 0.1,
              carbohydrates: 27,
              protein: 1.2,
            },
          },
          Ingredient: { create: { name: "arroz integral" } },
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
  const vinegar = await prisma.product.create({
    data: {
      name: "vinagre de manzana",
      plainName: "vinagre de manzana",
      description:
        "vinagre de manzana realizado en una comarca gallega desde hace más de un siglo, el envase es 100% reciclado con productos del mar cantábrico.",
      stock: 150,
      imageURL: "/api/images/seed/85b901dd-bd78-4685-a494-e1543ead6b28.jpg",
      Edible: {
        create: {
          category: "vinegar",
          priceByWeight: 25,
          nutritionFacts: {
            create: {
              ingredients: "vinagre de manzana",
              energy: 300,
              fat: 5,
              carbohydrates: 0,
              protein: 0,
            },
          },
          Ingredient: { create: { name: "vinagre de manzana" } },
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
  const coffee = await prisma.product.create({
    data: {
      name: "café",
      plainName: "cafe",
      description: "café 100% colombiano",
      stock: 375,
      imageURL: "/api/images/seed/efba5830-b9ed-49b6-a833-d4ecc8280c9e.jpg",
      Edible: {
        create: {
          category: "coffee",
          priceByWeight: 3.8,
          nutritionFacts: {
            create: {
              ingredients: "café",
              energy: 320,
              fat: 140,
              carbohydrates: 2,
              protein: 1,
            },
          },
          Ingredient: { create: { name: "café" } },
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

  const pistachos = await prisma.product.create({
    data: {
      name: "pistachos",
      plainName: "pistachos",
      description: "pistachos ecológicos",
      stock: 10.5,
      imageURL: "/api/images/seed/9a83101b-9556-41f7-ab23-dd5ac20b1fbd.jpg",
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
      imageURL: "/api/images/seed/9de6cbbe-8860-419a-a280-8fb441a8ead9.jpg",
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

  const arrozArborio = await prisma.product.create({
    data: {
      name: "arroz arborio",
      plainName: "arroz arborio",
      description: "arroz arborio",
      stock: 21,
      imageURL: "/api/images/seed/b6d1bbf7-f7d5-41d9-a7ac-50b4d0bbeefa.jpg",
      Edible: {
        create: {
          category: "rice",
          priceByWeight: 3.7,
          nutritionFacts: {
            create: {
              ingredients: "arroz arborio",
              energy: 130,
              fat: 0.2,
              carbohydrates: 29,
              protein: 2.4,
            },
          },
          Ingredient: { create: { name: "arroz arborio" } },
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
  const arrozbomba = await prisma.product.create({
    data: {
      name: "arroz bomba",
      plainName: "arroz bomba",
      description: "arroz redondo 100% valenciano ",
      stock: 50,
      imageURL: "/api/images/seed/10cb55e6-7f1b-491f-ad25-59706afc1741.jpg",
      Edible: {
        create: {
          category: "rice",
          priceByWeight: 3.1,
          nutritionFacts: {
            create: {
              ingredients: "arroz bomba",
              energy: 130,
              fat: 0.2,
              carbohydrates: 29,
              protein: 2.4,
            },
          },
          Ingredient: { create: { name: "arroz bomba" } },
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
      imageURL: "/api/images/seed/4204821b-482e-4413-a89d-db7bc6e15805.jpg",
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
      imageURL: "/api/images/seed/15f7beec-89a1-4d23-a9b9-b45a206c48b6.jpg",
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
      imageURL: "/api/images/seed/6697db92-ee59-43a5-a9d7-3e7a56ab3a59.jpg",
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
      imageURL: "/api/images/seed/402f5c18-983a-416f-ac28-33deff4c9530.jpg",
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
      imageURL: "/api/images/seed/38fc57b7-2cc9-4278-a2cc-fcec62da5018.jpg",
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
      imageURL: "/api/images/seed/84d0710a-263f-48a4-a230-759b3aa6f6ff.jpg",
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
      imageURL: "/api/images/seed/1334f066-7236-473d-a52c-9a4a7b983257.jpg",
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
      imageURL: "/api/images/seed/35504e48-a3b0-4ac4-a337-a0115c15247a.jpg",
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
      imageURL: "/api/images/seed/33dad0b8-e04a-4ad0-a167-50bebca1316c.jpg",
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
      imageURL: "/api/images/seed/ca0e4e3e-504d-4697-a142-2a7bf19f2d76.jpg",
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
      imageURL: "/api/images/seed/dbf5d93b-cec6-4a99-a1bc-b6cb81dd9721.jpg",
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
      imageURL: "/api/images/seed/36b55d94-f827-412f-a441-69df6bbeb348.jpg",
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
      imageURL: "/api/images/seed/bfb85c2e-393f-4740-ab1c-f2d6bfeb2a6e.jpg",
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
      imageURL: "/api/images/seed/7d8f634e-3b19-4f60-ace4-d790af5d5c2a.jpg",
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
        "Los jarabes, llamados también siropes en el ámbito culinario, son líquidos de consistencia viscosa que por lo general contienen soluciones concentradas de azúcares.",
      stock: 23,
      imageURL: "/api/images/seed/71e8ce85-4791-4fe7-a565-35bb76361012.jpg",
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
      name: "mermelada de melocotón",
      plainName: "mermelada de melocoton",
      description:
        "Las mermeladas industriales están dulces y ricas, pero nunca se pueden comparar a las mermeladas caseras, hechas por nosotros mismos con ingredientes de calidad y de temporada.",
      stock: 23,
      imageURL: "/api/images/seed/6ae2146c-454b-493e-a9ef-f2edbc86366d.jpg",
      Edible: {
        create: {
          category: "jams",
          priceByWeight: 2.3,
          nutritionFacts: {
            create: {
              ingredients: "mermelada de melocotón",
              energy: 300,
              fat: 0,
              carbohydrates: 70,
              protein: 2,
            },
          },
          Ingredient: { create: { name: "mermelada de melocotón" } },
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
      imageURL: "/api/images/seed/9b6f6e26-b565-4c1a-a3b2-ced32dd98d5c.jpg",
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
      imageURL: "/api/images/seed/804e2d6e-f777-4679-a4ab-73b407d69301.jpg",
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
      imageURL: "/api/images/seed/05964ecc-7f74-4411-ac52-88f7de2e2a71.jpg",
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
        amount: 250,
        cartId: carrito_de_sandra.id,
        productId: lentejas.id,
      },
      {
        amount: 500,
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
          data: [
            {
              direction: "Cortar el pan sin gluten en cuadritos.",
              number: 1,
            },
            {
              direction:
                "Freír el pan en una sartén con aceite y cascara de limón. Es importante colocar el pan con la sartén en frío para que se fría por dentro y por fuera.",
              number: 2,
            },
            {
              direction:
                "Retirar el pan cuando esté dorado y dejarlo en papel de cocina para que escurra.",
              number: 3,
            },
            {
              direction:
                "Con la cocina apagada, colocar el anís en grano en la sartén en la que se frió el pan para que se dore con el calor restante del aceite.",
              number: 4,
            },
            {
              direction:
                "Cuando esté frío, colar el contenido de la sartén y reservar el anís.",
              number: 5,
            },
            {
              direction: "Mezclar la leche y el agua en un bol.",
              number: 6,
            },
            {
              direction:
                "Colocar mitad de la mezcla de leche y agua en un cazo. Agregar la canela y hervir.",
              number: 7,
            },
            {
              direction:
                "Disolver la maicena en una de las mitades de leche y agua.",
              number: 8,
            },
            {
              direction:
                "Colocar la otra mitad en un cazo. Agregar la canela y el azúcar y hervir.",
              number: 9,
            },
            {
              direction: "Retirar la rama de canela una vez que haga infusión.",
              number: 10,
            },
            {
              direction:
                "Moviendo para que espese, añadimos al cazo el anís tostado y la mezcla de la maicena diluida.",
              number: 11,
            },
            {
              direction:
                "Dejar de mover una vez que espese y salgan burbujas con pompas grandes.",
              number: 12,
            },
            {
              direction: "Servir añadiendo la canela en polvo y el pan.",
              number: 13,
            },
          ],
        },
      },
      imageURL: "/api/images/recipes/bd975a67-f3c2-45e4-a325-06463f9921f6.jpg",
      portions: 2,
      cookingTime: 20,
      preparationTime: 10,
      description:
        "Una receta tradicional como las gachas no puede faltar en tu colección. Adaptada para celíacos.",
      User: { connect: { id: marta.id } },
      createdAt: new Date(),
      allergens: { create: { allergen: "milk" } },
      Comment: {
        createMany: {
          data: [
            {
              rating: 5,
              description: "¡Qué rico 🤤!",
              userId: alberto.id,
              imageURL: alberto.image,
            },
          ],
        },
      },
    },
  });

  const gachasIngredients = [
    {
      amount: 1,
      unit: IngredientUnit.milliliters,
      Ingredient: { create: { name: "leche" } },
      Recipe: gachas,
    },
    {
      amount: 500,
      unit: IngredientUnit.milliliters,
      Ingredient: { create: { name: "agua" } },
      Recipe: gachas,
    },
    {
      amount: 1,
      unit: IngredientUnit.unit,
      Ingredient: { create: { name: "rama de canela" } },
      Recipe: gachas,
    },
    {
      amount: 3,
      unit: IngredientUnit.tablespoon,
      Ingredient: { create: { name: "maicena" } },
      Recipe: gachas,
    },
    {
      amount: 3,
      unit: IngredientUnit.tablespoon,
      Ingredient: { create: { name: "azúcar" } },
      Recipe: gachas,
    },
    {
      amount: 1,
      unit: IngredientUnit.teaspoon,
      Ingredient: { connect: { id: aceiteOliva.Edible?.Ingredient.id } },
      Recipe: gachas,
    },
    {
      amount: 1,
      unit: IngredientUnit.unit,
      Ingredient: { create: { name: "limón" } },
      Recipe: gachas,
    },
    {
      amount: 2,
      unit: IngredientUnit.tablespoon,
      Ingredient: { create: { name: "anís en grano" } },
      Recipe: gachas,
    },
    {
      amount: 1,
      unit: IngredientUnit.unit,
      Ingredient: { create: { name: "rebanada de pan sin gluten" } },
      Recipe: gachas,
    },
    {
      amount: 1,
      unit: IngredientUnit.tablespoon,
      Ingredient: { create: { name: "canela en polvo" } },
      Recipe: gachas,
    },
  ].map(
    async (i) =>
      await prisma.recipeIngredient.create({
        data: {
          amount: i.amount,
          Ingredient: i.Ingredient,
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
          data: [
            {
              direction: "Untar las rebanadas de pan con mantequilla.",
              number: 1,
            },
            {
              direction: "Tostar el pan unos minutos.",
              number: 2,
            },
            {
              direction:
                "Colocar el aguacate en una de las rebanadas de pan y aplastar con un tenedor hasta que quede uniforme.",
              number: 3,
            },
            {
              direction:
                "Añadir parte de la sal, sésamo, pimentón y tomillo al pan con el aguacate.",
              number: 4,
            },
            {
              direction: "Colocar el salmón ahumado sobre el aguacate.",
              number: 5,
            },
            {
              direction:
                "Hervir el huevo en una olla hasta que la clara cuaje y la yema se mantenga líquida.",
              number: 6,
            },
            {
              direction: "Pelar el huevo y colocarlo sobre el salmón.",
              number: 7,
            },
            {
              direction:
                "Añadir el resto de las especias y el queso rallado sobre el huevo.",
              number: 8,
            },
            {
              direction:
                "Colocar la otra rebanada de pan sobre el huevo y disfrutar de la receta.",
              number: 9,
            },
          ],
        },
      },
      imageURL: "/api/images/recipes/9b46cd23-95b8-4cee-a4ac-f77e18246c72.jpg",
      portions: 1,
      cookingTime: 10,
      preparationTime: 5,
      description:
        "Si no sabes qué desayunar o almorzar, prueba a hacer este sencillo sándwich de salmón con aguacate y huevo que no te defraudará.",
      User: { connect: { id: marta.id } },
      allergens: {
        createMany: {
          data: [
            { allergen: "cereals" },
            { allergen: "eggs" },
            { allergen: "milk" },
            { allergen: "fish" },
            { allergen: "sesameSeeds" },
          ],
        },
      },
      createdAt: new Date(),
      Comment: {
        createMany: {
          data: [
            {
              rating: 4,
              description: "Tiene muy buena pinta, lo probaré.",
              userId: juan.id,
              imageURL: juan.image,
            },
            {
              rating: 5,
              description: "Está muy bueno, pero más bueno estoy yo 🥵🔥",
              userId: alberto.id,
              imageURL: alberto.image,
            },
            {
              rating: 1,
              description: "No es vegano ni sin gluten ☹",
              userId: alicia.id,
              imageURL: alicia.image,
            },
            {
              rating: 5,
              description:
                "Cambiaron mi vida estas tostadas, 100% recomendadas 👍🏻.",
              userId: pilar.id,
              imageURL: pilar.image,
            },
            {
              rating: 3,
              description:
                "Ni fu ni fa, no me ha gustado mucho, pero no está mal.",
              userId: daniel.id,
              imageURL: daniel.image,
            },
          ],
        },
      },
    },
  });

  const sandwichIngredients = [
    {
      amount: 2,
      unit: IngredientUnit.unit,
      Ingredient: { create: { name: "rebanadas de pan de molde" } },
      Recipe: sandwich,
    },
    {
      amount: 10,
      unit: IngredientUnit.grams,
      Ingredient: { create: { name: "mantequilla" } },
      Recipe: sandwich,
    },
    {
      amount: 1,
      unit: IngredientUnit.unit,
      Ingredient: { create: { name: "medio aguacate" } },
      Recipe: sandwich,
    },
    {
      amount: 1,
      unit: IngredientUnit.pinch,
      Ingredient: { create: { name: "sal" } },
      Recipe: sandwich,
    },
    {
      amount: 1,
      unit: IngredientUnit.pinch,
      Ingredient: { create: { name: "semillas de sésamo" } },
      Recipe: sandwich,
    },
    {
      amount: 1,
      unit: IngredientUnit.pinch,
      Ingredient: { create: { name: "pimentón de la Vera dulce" } },
      Recipe: sandwich,
    },
    {
      amount: 1,
      unit: IngredientUnit.pinch,
      Ingredient: { create: { name: "tomillo seco picado" } },
      Recipe: sandwich,
    },
    {
      amount: 50,
      unit: IngredientUnit.grams,
      Ingredient: { create: { name: "salmón ahumado" } },
      Recipe: sandwich,
    },
    {
      amount: 1,
      unit: IngredientUnit.unit,
      Ingredient: { create: { name: "huevo campero" } },
      Recipe: sandwich,
    },
    {
      amount: 10,
      unit: IngredientUnit.grams,
      Ingredient: { create: { name: "queso parmesano rallado" } },
      Recipe: sandwich,
    },
  ].map(
    async (i) =>
      await prisma.recipeIngredient.create({
        data: {
          amount: i.amount,
          Ingredient: i.Ingredient,
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
              direction: "Derretiremos el chocolate en el microondas.",
              number: 1,
            },
            {
              direction:
                "Le añadiremos al chocolate la mantequilla hasta conseguir una salsa ligera repleta de dulzor.",
              number: 2,
            },
            {
              direction:
                "Llega el turno de endulzar esta base, le ponemos el azúcar, se deberá fundir perfectamente con el resto de los ingredientes.",
              number: 3,
            },
            {
              direction:
                "Batiremos los huevos hasta que doble su tamaño y les incorporamos la cucharada de mantequilla.",
              number: 4,
            },
            {
              direction:
                "Mezclamos con la otra base y tendremos lista la base ideal. Colocamos esta masa en un molde engrasado.",
              number: 5,
            },
            {
              direction:
                "Lo ponemos al horno al baño maría a 190º durante unos 35 minutos. Este bizcocho ligero queda impresionante.",
              number: 6,
            },
            {
              direction:
                "Ponemos la nata en un cazo y cuando esté caliente lo ponemos el chocolate. Cubriremos la base con esta mezcla.",
              number: 7,
            },
            {
              direction:
                "Por encima vamos a colocar el chocolate en polvo y rallado. La explosión de sabor y de alegría de esta tarta es increíble.",
              number: 8,
            },
          ],
        },
      },
      imageURL: "/api/images/recipes/92c89dda-0049-4a58-ac71-cbf1daf18372.jpg",
      portions: 6,
      cookingTime: 50,
      preparationTime: 20,
      description:
        "Este pastel de chocolate desbanca a la tarta de galletas y chocolate en los cumpleaños.",
      User: { connect: { id: marta.id } },
      createdAt: new Date(),
      allergens: {
        createMany: {
          data: [
            { allergen: "cereals" },
            { allergen: "eggs" },
            { allergen: "milk" },
          ],
        },
      },
    },
  });

  const tartaIngredientsProducts = [
    {
      amount: 250,
      unit: IngredientUnit.grams,
      Ingredient: { create: { name: "chocolate" } },
      Recipe: tarta,
    },
    {
      amount: 250,
      unit: IngredientUnit.grams,
      Ingredient: {
        connectOrCreate: {
          where: { name: "mantequilla" },
          create: { name: "mantequilla" },
        },
      },
      Recipe: tarta,
    },
    {
      amount: 250,
      unit: IngredientUnit.grams,
      Ingredient: {
        connectOrCreate: {
          where: { name: "azúcar" },
          create: { name: "azúcar" },
        },
      },
      Recipe: tarta,
    },
    {
      amount: 4,
      unit: IngredientUnit.unit,
      Ingredient: { create: { name: "huevo" } },
      Recipe: tarta,
    },
    {
      amount: 1,
      unit: IngredientUnit.tablespoon,
      Ingredient: { connect: { id: harinaTrigo.Edible?.Ingredient.id } },
      Recipe: tarta,
    },
    {
      amount: 200,
      unit: IngredientUnit.grams,
      Ingredient: { create: { name: "chocolate para fundir" } },
      Recipe: tarta,
    },
    {
      amount: 200,
      unit: IngredientUnit.grams,
      Ingredient: { create: { name: "nata para montar" } },
      Recipe: tarta,
    },
    {
      amount: 2,
      unit: IngredientUnit.tablespoon,
      Ingredient: { create: { name: "cacao en polvo" } },
      Recipe: tarta,
    },
    {
      amount: 50,
      unit: IngredientUnit.grams,
      Ingredient: { create: { name: "chocolate rallado" } },
      Recipe: tarta,
    },
  ].map(
    async (i) =>
      await prisma.recipeIngredient.create({
        data: {
          amount: i.amount,
          Ingredient: i.Ingredient,
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
          data: [
            {
              direction:
                "Calentar el aceite de oliva en una sartén para saltear. Agregue la cebolla, las zanahorias y el apio. Hornear 10 minutos. Añadir el vino y dejar evaporar.",
              number: 1,
            },
            {
              direction:
                "Añadir las lentejas, las patatas y el caldo. Añadir la hoja de laurel, el perejil y el tomillo. Cocine a fuego lento, tapado, unos 30 minutos, revolviendo ocasionalmente, agregando más caldo si es necesario para que las lentejas apenas se cubran con líquido.",
              number: 2,
            },
            {
              direction:
                "Cuando las lentejas y las patatas estén tiernas, tritúralas ligeramente para obtener una mezcla cremosa.",
              number: 3,
            },
            {
              direction:
                "Retire las hierbas, agregue la nata líquida y las espinacas. Mezclar, sazonar y servir.",
              number: 4,
            },
          ],
        },
      },
      imageURL: "/api/images/recipes/19227bbb-eb44-42b3-a0bd-781af0c1a705.jpg",
      portions: 6,
      cookingTime: 40,
      preparationTime: 10,
      description:
        "Los lácteos y las lentejas son excelentes fuentes de proteínas, y ambos toman protagonismo en este cremoso guiso.",
      User: { connect: { id: marta.id } },
      allergens: {
        createMany: {
          data: [
            { allergen: "milk" },
            { allergen: "sulphurDioxideAndSulphites" },
          ],
        },
      },
      createdAt: new Date(),
    },
  });

  const lentejasCremosasIngredients = [
    {
      amount: 30,
      unit: IngredientUnit.milliliters,
      Ingredient: { connect: { id: aceiteOliva.Edible?.Ingredient.id } },
      Recipe: lentejasCremosas,
    },
    {
      amount: 1,
      unit: IngredientUnit.unit,
      Ingredient: { create: { name: "media cebolla" } },
      Recipe: lentejasCremosas,
    },
    {
      amount: 300,
      unit: IngredientUnit.grams,
      Ingredient: { create: { name: "zanahoria" } },
      Recipe: lentejasCremosas,
    },
    {
      amount: 2,
      unit: IngredientUnit.unit,
      Ingredient: { create: { name: "tallo de apio" } },
      Recipe: lentejasCremosas,
    },
    {
      amount: 200,
      unit: IngredientUnit.milliliters,
      Ingredient: { create: { name: "vino blanco" } },
      Recipe: lentejasCremosas,
    },
    {
      amount: 250,
      unit: IngredientUnit.grams,
      Ingredient: { connect: { id: lentejas.Edible?.Ingredient.id } },
      Recipe: lentejasCremosas,
    },
    {
      amount: 300,
      unit: IngredientUnit.grams,
      Ingredient: { create: { name: "patata" } },
      Recipe: lentejasCremosas,
    },
    {
      amount: 1,
      unit: IngredientUnit.liters,
      Ingredient: { create: { name: "caldo de verduras" } },
      Recipe: lentejasCremosas,
    },
    {
      amount: 1,
      unit: IngredientUnit.unit,
      Ingredient: { create: { name: "hoja de laurel" } },
      Recipe: lentejasCremosas,
    },
    {
      amount: 2,
      unit: IngredientUnit.unit,
      Ingredient: { create: { name: "rama de tomillo" } },
      Recipe: lentejasCremosas,
    },
    {
      amount: 2,
      unit: IngredientUnit.tablespoon,
      Ingredient: { create: { name: "perejil" } },
      Recipe: lentejasCremosas,
    },
    {
      amount: 200,
      unit: IngredientUnit.milliliters,
      Ingredient: { create: { name: "nata líquida" } },
      Recipe: lentejasCremosas,
    },
    {
      amount: 300,
      unit: IngredientUnit.grams,
      Ingredient: { create: { name: "espinacas" } },
      Recipe: lentejasCremosas,
    },
  ].map(
    async (i) =>
      await prisma.recipeIngredient.create({
        data: {
          amount: i.amount,
          Ingredient: i.Ingredient,
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
      imageURL: "/api/images/recipes/5949e69b-0e45-409b-a6bf-e5e0fad28920.jpg",
      portions: 10,
      cookingTime: 0,
      preparationTime: 15,
      description:
        "Delicioso entrante para ir abirendo el apetito. Fresco y sabroso.",
      User: { connect: { id: marta.id } },
      createdAt: new Date(),
    },
  });

  const brochetasIngredientsProducts = [
    {
      amount: 1,
      unit: IngredientUnit.unit,
      Ingredient: { create: { name: "medio melón" } },
      Recipe: brochetas,
    },
    {
      amount: 4,
      unit: IngredientUnit.unit,
      Ingredient: { create: { name: "lonchas de jamón serrano" } },
      Recipe: brochetas,
    },
  ].map(
    async (i) =>
      await prisma.recipeIngredient.create({
        data: {
          amount: i.amount,
          Ingredient: i.Ingredient,
          Recipe: { connect: { id: i.Recipe.id } },
          unit: i.unit,
        },
      }),
  );

  const risotto = await prisma.recipe.create({
    data: {
      name: "Risotto de ajo negro con crujiente de Parmesano",
      difficulty: "moderate",
      directions: {
        createMany: {
          data: [
            {
              direction:
                "Rallamos el queso Parmesano y preparamos los crujientes colocando cuatro pequeños montoncitos sobre una bandeja de horno cubierta con papel sulfurizado.",
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
      imageURL: "/api/images/recipes/2df97f76-2b8f-40b4-a028-e5f82879849d.jpg",
      portions: 2,
      cookingTime: 20,
      preparationTime: 15,
      description:
        "Receta para enamorar, perfecta para una comida o cena romántica de San Valentín, si eres de los que celebra la ocasión, para una celebración o para darse un homenaje.",
      User: { connect: { id: marta.id } },
      allergens: {
        createMany: {
          data: [
            { allergen: "milk" },
            { allergen: "sulphurDioxideAndSulphites" },
          ],
        },
      },
      createdAt: new Date(),
    },
  });

  const risottoIngredientsProducts = [
    {
      amount: 100,
      unit: IngredientUnit.grams,
      Ingredient: { create: { name: "cebolla" } },
      Recipe: risotto,
    },
    {
      amount: 700,
      unit: IngredientUnit.milliliters,
      Ingredient: {
        connectOrCreate: {
          where: { name: "caldo de verduras" },
          create: { name: "caldo de verduras" },
        },
      },
      Recipe: risotto,
    },
    {
      amount: 1,
      unit: IngredientUnit.unit,
      Ingredient: { create: { name: "ajo negro" } },
      Recipe: risotto,
    },
    {
      amount: 40,
      unit: IngredientUnit.grams,
      Ingredient: {
        connectOrCreate: {
          where: { name: "mantequilla" },
          create: { name: "mantequilla" },
        },
      },
      Recipe: risotto,
    },
    {
      amount: 60,
      unit: IngredientUnit.grams,
      Ingredient: { create: { name: "queso parmesano" } },
      Recipe: risotto,
    },
    {
      amount: 200,
      unit: IngredientUnit.grams,
      Ingredient: { connect: { id: arrozArborio.Edible?.Ingredient.id } },
      Recipe: risotto,
    },
    {
      amount: 1,
      unit: IngredientUnit.unit,
      Ingredient: { create: { name: "lima" } },
      Recipe: risotto,
    },
    {
      amount: 50,
      unit: IngredientUnit.milliliters,
      Ingredient: {
        connectOrCreate: {
          where: { name: "vino blanco" },
          create: { name: "vino blanco" },
        },
      },
      Recipe: risotto,
    },
    {
      amount: 1,
      unit: IngredientUnit.pinch,
      Ingredient: {
        connectOrCreate: {
          where: { name: "sal" },
          create: { name: "sal" },
        },
      },
      Recipe: risotto,
    },
  ].map(
    async (i) =>
      await prisma.recipeIngredient.create({
        data: {
          amount: i.amount,
          Ingredient: i.Ingredient,
          Recipe: { connect: { id: i.Recipe.id } },
          unit: i.unit,
        },
      }),
  );
  /* END NUESTRAS RECETAS */

  /* RECETAS DE LA COMUNIDAD */
  const cebollas = await prisma.recipe.create({
    data: {
      name: "cebollas moradas rellenas",
      difficulty: "easy",
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
      imageURL: "/api/images/recipes/7ced13fe-02d2-4410-abb4-c4555ec49d13.jpg",
      portions: 3,
      cookingTime: 20,
      preparationTime: 20,
      description:
        "Cebollas moradas rellenas, receta versátil que es perfecta como guarnición o entrante navideño",
      User: { connect: { id: juan.id } },
      allergens: {
        createMany: {
          data: [
            { allergen: "nuts" },
            { allergen: "cereals" },
            { allergen: "milk" },
          ],
        },
      },
      createdAt: new Date(),
    },
  });

  const cebollasIngredientsProducts = [
    {
      amount: 3,
      unit: IngredientUnit.unit,
      Ingredient: { create: { name: "cebolla morada" } },
      Recipe: cebollas,
    },
    {
      amount: 3,
      unit: IngredientUnit.unit,
      Ingredient: {
        connectOrCreate: {
          where: { name: "tomates" },
          create: { name: "tomates" },
        },
      },
      Recipe: cebollas,
    },
    {
      amount: 30,
      unit: IngredientUnit.grams,
      Ingredient: { create: { name: "pan rallado" } },
      Recipe: cebollas,
    },
    {
      amount: 40,
      unit: IngredientUnit.grams,
      Ingredient: {
        connectOrCreate: {
          where: { name: "queso parmesano rallado" },
          create: { name: "queso parmesano rallado" },
        },
      },
      Recipe: cebollas,
    },
    {
      amount: 12,
      unit: IngredientUnit.unit,
      Ingredient: { connect: { id: almendra.Edible?.Ingredient.id } },
      Recipe: cebollas,
    },
    {
      amount: 1,
      unit: IngredientUnit.pinch,
      Ingredient: {
        connectOrCreate: {
          where: { name: "sal" },
          create: { name: "sal" },
        },
      },
      Recipe: cebollas,
    },
    {
      amount: 1,
      unit: IngredientUnit.pinch,
      Ingredient: { create: { name: "pimienta negra molida" } },
      Recipe: cebollas,
    },
    {
      amount: 1,
      unit: IngredientUnit.pinch,
      Ingredient: { create: { name: "tomillo fresco" } },
      Recipe: cebollas,
    },
    {
      amount: 1,
      unit: IngredientUnit.teaspoon,
      Ingredient: { connect: { id: aceiteOliva.Edible?.Ingredient.id } },
      Recipe: cebollas,
    },
  ].map(
    async (i) =>
      await prisma.recipeIngredient.create({
        data: {
          amount: i.amount,
          Ingredient: i.Ingredient,
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
          data: [
            {
              direction:
                "Ponemos una cazuela con agua y calentamos, cuando rompa a hervir introducimos la zanahoria pelada unos 15 minutos para que se cueza.",
              number: 1,
            },
            {
              direction:
                "Picamos la cebolla y la echamos en una sartén con el aceite de oliva. Cuando se poche la cebolla (cuando esté translúcida) añadimos la cerne picada y procuramos separarla bien con ayuda de una cuchara de madera. Echamos una pizca de sal y dejamos que la carne y la cebolla lleguen a dorarse.",
              number: 2,
            },
            {
              direction:
                "Si la carne y la cebolla se han dorado, es el momento de verter el vino (tinto o blanco) hasta que se evapore por completo. Una vez evaporado el vino añadimos la leche, un poco de nuez moscada y pimienta y dejamos a fuego muy suave para que la carne coja el gusto, aproximadamente 20 minutos.",
              number: 3,
            },
            {
              direction:
                "Mientras que la leche se rebaja, pelamos los tomates y los troceamos, juntamos junto a la zanahoria cocida troceada. Una vez se haya reducido casi del todo la leche, añadimos la zanahoria y el tomate troceados y dejamos a fuego lento para que la salsa se haga durante otros 20 minutos aproximadamente.",
              number: 4,
            },
            {
              direction:
                "Cocemos los espagueti al dente, recuerda, justo antes de que nos queden muy blandos, con algo de firmeza pero no duros. Dejamos escurrir.",
              number: 5,
            },
            {
              direction:
                "Servimos en un plato y añadimos salsa muy generosamente y mezclamos. ¡Plato listo para saciar nuestro apetito!",
              number: 6,
            },
          ],
        },
      },
      imageURL: "/api/images/recipes/50c642c6-3c0d-451d-abd6-52bc5e8b1030.jpg",
      portions: 2,
      cookingTime: 40,
      preparationTime: 10,
      description:
        "Disfruta con estos deliciosos tallarines acompañados de nuestra salsa boloñesa especial.",
      User: { connect: { id: sandra.id } },
      createdAt: new Date(),
      allergens: {
        createMany: {
          data: [
            { allergen: "nuts" },
            { allergen: "cereals" },
            { allergen: "milk" },
            { allergen: "sulphurDioxideAndSulphites" },
          ],
        },
      },
    },
  });

  const espaguetisBoloñesaIngredients = [
    {
      amount: 400,
      unit: IngredientUnit.grams,
      Ingredient: { connect: { id: espaguetis.Edible?.Ingredient.id } },
      Recipe: espaguetisBoloñesa,
    },
    {
      amount: 400,
      unit: IngredientUnit.grams,
      Ingredient: { create: { name: "carne picada" } },
      Recipe: espaguetisBoloñesa,
    },
    {
      amount: 800,
      unit: IngredientUnit.grams,
      Ingredient: {
        connectOrCreate: {
          where: { name: "tomates" },
          create: { name: "tomates" },
        },
      },
      Recipe: espaguetisBoloñesa,
    },
    {
      amount: 200,
      unit: IngredientUnit.grams,
      Ingredient: {
        connectOrCreate: {
          where: { name: "cebolla" },
          create: { name: "cebolla" },
        },
      },
      Recipe: espaguetisBoloñesa,
    },
    {
      amount: 2,
      unit: IngredientUnit.unit,
      Ingredient: {
        connectOrCreate: {
          where: { name: "zanahoria" },
          create: { name: "zanahoria" },
        },
      },
      Recipe: espaguetisBoloñesa,
    },
    {
      amount: 120,
      unit: IngredientUnit.milliliters,
      Ingredient: {
        connectOrCreate: {
          where: { name: "vino blanco" },
          create: { name: "vino blanco" },
        },
      },
      Recipe: espaguetisBoloñesa,
    },
    {
      amount: 120,
      unit: IngredientUnit.milliliters,
      Ingredient: {
        connectOrCreate: {
          where: { name: "leche" },
          create: { name: "leche" },
        },
      },
      Recipe: espaguetisBoloñesa,
    },
    {
      amount: 15,
      unit: IngredientUnit.tablespoon,
      Ingredient: { connect: { id: aceiteOliva.Edible?.Ingredient.id } },
      Recipe: espaguetisBoloñesa,
    },
    {
      amount: 1,
      unit: IngredientUnit.teaspoon,
      Ingredient: {
        connectOrCreate: {
          where: { name: "sal" },
          create: { name: "sal" },
        },
      },
      Recipe: espaguetisBoloñesa,
    },
    {
      amount: 1,
      unit: IngredientUnit.teaspoon,
      Ingredient: {
        connectOrCreate: {
          where: { name: "pimienta" },
          create: { name: "pimienta" },
        },
      },
      Recipe: espaguetisBoloñesa,
    },
    {
      amount: 1,
      unit: IngredientUnit.teaspoon,
      Ingredient: { create: { name: "nuez moscada" } },
      Recipe: espaguetisBoloñesa,
    },
  ].map(
    async (i) =>
      await prisma.recipeIngredient.create({
        data: {
          amount: i.amount,
          Ingredient: i.Ingredient,
          Recipe: { connect: { id: i.Recipe.id } },
          unit: i.unit,
        },
      }),
  );

  const panPueblo = await prisma.recipe.create({
    data: {
      name: "pan de pueblo tradicional",
      difficulty: "easy",
      directions: {
        createMany: {
          data: [
            {
              direction:
                "La noche anterior preparamos la masa madre. Para ello, ponemos el agua en un bol y desleímos en ella la levadura, añadimos la harina y mezclamos. Tapamos con papel film y la dejamos reposar dentro de la nevera hasta el día siguiente.",
              number: 1,
            },
            {
              direction:
                "Para hacer el pan, ponemos el agua y la levadura en un bol grande y los mezclamos bien. Añadimos el resto de ingredientes, incluida la masa madre, y amasamos hasta conseguir una masa blanda y algo pegajosa. La colocamos en un bol untado con aceite, la cubrimos con un paño limpio y dejamos que doble su volumen (unos 30 minutos).",
              number: 2,
            },
            {
              direction:
                "Volcamos la masa sobre una superficie de trabajo espolvoreada de harina y la amasamos ligeramente para sacarle el aire. Le damos la forma deseada y la colocamos en una fuente de horno forrada con papel de hornear. Hacemos un corte sobre la superficie, la espolvoreamos de harina y dejamos reposar de nuevo hasta que doble su volumen (otros 30 minutos).",
              number: 3,
            },
            {
              direction:
                "Precalentamos el horno a 250ºC. Colocamos una bandeja en la solera del horno con agua y la rejilla a media altura. Colocamos el pan sobre la rejilla y horneamos unos diez minutos. Después, bajamos la temperatura a 200º C y dejamos cocer unos 40 minutos más. Retiramos del horno y dejamos enfriar.",
              number: 4,
            },
          ],
        },
      },
      imageURL: "/api/images/recipes/050486b5-bff6-4783-ac86-00943a7646db.jpg",
      portions: 2,
      cookingTime: 30,
      preparationTime: 80,
      description:
        "Reconozco que hacer pan casero me atrae más cada día. Hoy utilizamos ingredientes normales para hacer un pan de escándalo y con pocos condicionantes.",
      User: { connect: { id: juan.id } },
      createdAt: new Date(),
      allergens: { create: { allergen: "cereals" } },
    },
  });

  const panPuebloIngredients = [
    {
      amount: 380,
      unit: IngredientUnit.grams,
      Ingredient: {
        connectOrCreate: {
          where: { name: "agua" },
          create: { name: "agua" },
        },
      },
      Recipe: panPueblo,
    },
    {
      amount: 20,
      unit: IngredientUnit.grams,
      Ingredient: {
        connectOrCreate: {
          where: { name: "levadura prensada" },
          create: { name: "levadura prensada" },
        },
      },
      Recipe: panPueblo,
    },
    {
      amount: 100,
      unit: IngredientUnit.grams,
      Ingredient: {
        connectOrCreate: {
          where: { name: "harina de reposteria" },
          create: { name: "harina de reposteria" },
        },
      },
      Recipe: panPueblo,
    },
    {
      amount: 500,
      unit: IngredientUnit.grams,
      Ingredient: {
        connectOrCreate: {
          where: { name: "harina de fuerza" },
          create: { name: "harina de fuerza" },
        },
      },
      Recipe: panPueblo,
    },
    {
      amount: 10,
      unit: IngredientUnit.grams,
      Ingredient: {
        connectOrCreate: {
          where: { name: "sal" },
          create: { name: "sal" },
        },
      },
      Recipe: panPueblo,
    },
    {
      amount: 1,
      unit: IngredientUnit.pinch,
      Ingredient: { connect: { id: aceiteOliva.Edible?.Ingredient.id } },
      Recipe: panPueblo,
    },
  ].map(
    async (i) =>
      await prisma.recipeIngredient.create({
        data: {
          amount: i.amount,
          Ingredient: i.Ingredient,
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
          data: [
            {
              direction:
                "Preparar los ingredientes. Retirar huesecillos sueltos de las carnes. Lavar las verduras y rallar el tomate.",
              number: 1,
            },
            {
              direction:
                "Depositar todo el aceite en la paella y nivelarla observando cómo este se queda en el centro.",
              number: 2,
            },
            {
              direction:
                "Añadir sal a la paella alrededor del aceite, y comenzar a dorar la carne a fuego medio solo en el centro de la paella. Añadir los higadillos al final.",
              number: 3,
            },
            {
              direction:
                "Cuando la carne esté completamente dorada en toda su superficie, apartar al borde de la paella y sofreír en el centro primero las judías planas y luego el garrofó.",
              number: 4,
            },
            {
              direction:
                "Una vez cocinadas las verduras apartar al borde de la paella y sofreír en el centro de la paella el tomate rallado. Integrar bien con los jugos que ha soltado la carne. Cuando el tomate comience a caramelizarse, integrar con todos los demás ingredientes de la paella.",
              number: 5,
            },
            {
              direction:
                "Añadir el pimentón y el azafrán a la paella. Integrar.",
              number: 6,
            },
            {
              direction:
                "Inmediatamente, para evitar que el pimentón se queme, añadir a la paella el volumen de agua correspondiente a la proporción adecuada agua-arroz para la variedad de arroz que hayamos escogido. Tomar referencia de ese volumen.",
              number: 7,
            },
            {
              direction:
                "A continuación, llenar la paella con agua hasta el borde. Repartir el fuego por toda la base de la paella y dejar cocinar el caldo en la propia paella a fuego medio-bajo, sin que deje de borbotear.",
              number: 8,
            },
            {
              direction:
                "Cuando el caldo haya llegado al nivel de referencia tomado, añadir el arroz y repartirlo por toda la paella.",
              number: 9,
            },
            {
              direction:
                "Dejar cocer el arroz sin tocarlo: durante los primeros 4-5 minutos a fuego alto, a continuación, a fuego medio y a partir del minuto 10, a fuego bajo. Cuando el arroz comience a asomarse, colocar unas ramitas de romero.",
              number: 10,
            },
            {
              direction:
                "Cuando el arroz esté seco, a final de cocción, dejar formar el socarrat y a continuación apagar el fuego. Dejar reposar la paella unos 5 minutos y… ¡a disfrutar!",
              number: 11,
            },
          ],
        },
      },
      imageURL: "/api/images/recipes/d2948a10-956f-4cbd-a79c-d59086ea81e6.jpg",
      portions: 4,
      cookingTime: 105,
      preparationTime: 15,
      description:
        "El otro día hice esta deliciosa paella al estilo de Valencia, ¡mirad qué pintaza!",
      User: { connect: { id: sandra.id } },
      createdAt: new Date(),
    },
  });

  const paellaIngredients = [
    {
      amount: 400,
      unit: IngredientUnit.grams,
      Ingredient: { connect: { id: arrozbomba.Edible?.Ingredient.id } },
      Recipe: paella,
    },
    {
      amount: 900,
      unit: IngredientUnit.grams,
      Ingredient: { create: { name: "pollo" } },
      Recipe: paella,
    },
    {
      amount: 500,
      unit: IngredientUnit.grams,
      Ingredient: { create: { name: "conejo" } },
      Recipe: paella,
    },
    {
      amount: 1,
      unit: IngredientUnit.unit,
      Ingredient: { create: { name: "hígado de conejo" } },
      Recipe: paella,
    },
    {
      amount: 200,
      unit: IngredientUnit.grams,
      Ingredient: { create: { name: "judías verdes planas" } },
      Recipe: paella,
    },
    {
      amount: 100,
      unit: IngredientUnit.grams,
      Ingredient: { create: { name: "garrofó" } },
      Recipe: paella,
    },
    {
      amount: 100,
      unit: IngredientUnit.milliliters,
      Ingredient: { connect: { id: aceiteOliva.Edible?.Ingredient.id } },
      Recipe: paella,
    },
    {
      amount: 2,
      unit: IngredientUnit.unit,
      Ingredient: {
        connectOrCreate: {
          where: { name: "tomates" },
          create: { name: "tomates" },
        },
      },
      Recipe: paella,
    },
    {
      amount: 15,
      unit: IngredientUnit.grams,
      Ingredient: {
        connectOrCreate: {
          where: { name: "sal" },
          create: { name: "sal" },
        },
      },
      Recipe: paella,
    },
    {
      amount: 1,
      unit: IngredientUnit.grams,
      Ingredient: { create: { name: "azafrán" } },
      Recipe: paella,
    },
    {
      amount: 1,
      unit: IngredientUnit.teaspoon,
      Ingredient: { create: { name: "pimentón dulce" } },
      Recipe: paella,
    },
    {
      amount: 1,
      unit: IngredientUnit.unit,
      Ingredient: { create: { name: "ramita de romero" } },
      Recipe: paella,
    },
  ].map(
    async (i) =>
      await prisma.recipeIngredient.create({
        data: {
          amount: i.amount,
          Ingredient: i.Ingredient,
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
          data: [
            {
              direction:
                "Colocar los 7 primeros ingredientes de la lista en un bol amplio y mezclar, es decir, el aceite, los huevos, el azúcar, la vainilla, el bicarbonato, la sal y la canela.",
              number: 1,
            },
            {
              direction:
                "Incorpora la harina de trigo tamizada y continúa batiendo a máxima velocidad hasta conseguir una masa homogénea y cremosa.",
              number: 2,
            },
            {
              direction:
                "Añade la zanahoria y, después de batir bien, agrega las nueces y remueve este último ingrediente con una cuchara de madera para terminar con la masa de la torta de zanahoria y nueces.",
              number: 3,
            },
            {
              direction:
                "Vacía la masa en un molde previamente engrasado y cocina el pastel de zanahoria y nueces en el horno a 350 ºF o 180 ºC por 1 hora aproximadamente o hasta que al introducir un palillo este salga limpio y seco.",
              number: 4,
            },
            {
              direction:
                "Deja que la torta de zanahoria y nueces con canela se enfríe una vez la saques del horno para después desmoldarla y decorarla con un frosting de vainilla fácil de hacer y que combinará perfectamente como relleno y como cobertura de este delicioso bizcocho de zanahoria y nueces.",
              number: 5,
            },
          ],
        },
      },
      imageURL: "/api/images/recipes/70df52a9-284b-474f-ace6-35a402f1333e.jpg",
      portions: 16,
      cookingTime: 90,
      preparationTime: 25,
      description:
        "Tenéis que probar esta receta de tarta de zanahoria, cremosa y exquisita, con un toque a almendra.",
      User: { connect: { id: sandra.id } },
      createdAt: new Date(),

      allergens: {
        createMany: {
          data: [
            { allergen: "eggs" },
            { allergen: "cereals" },
            { allergen: "nuts" },
          ],
        },
      },
    },
  });

  const tartaZanahoriaIngredients = [
    {
      amount: 4,
      unit: IngredientUnit.unit,
      Ingredient: {
        connectOrCreate: {
          where: { name: "huevo campero" },
          create: { name: "huevo campero" },
        },
      },
      Recipe: tartaZanahoria,
    },
    {
      amount: 2,
      unit: IngredientUnit.cup,
      Ingredient: {
        connectOrCreate: {
          where: { name: "azúcar" },
          create: { name: "azúcar" },
        },
      },
      Recipe: tartaZanahoria,
    },
    {
      amount: 1,
      unit: IngredientUnit.cup,
      Ingredient: { connect: { id: aceiteOliva.Edible?.Ingredient.id } },
      Recipe: tartaZanahoria,
    },
    {
      amount: 1,
      unit: IngredientUnit.teaspoon,
      Ingredient: {
        connectOrCreate: {
          where: { name: "esencia de vainilla" },
          create: { name: "esencia de vainilla" },
        },
      },
      Recipe: tartaZanahoria,
    },
    {
      amount: 1,
      unit: IngredientUnit.teaspoon,
      Ingredient: {
        connectOrCreate: {
          where: { name: "bicarbonato" },
          create: { name: "bicarbonato" },
        },
      },
      Recipe: tartaZanahoria,
    },
    {
      amount: 1,
      unit: IngredientUnit.pinch,
      Ingredient: {
        connectOrCreate: {
          where: { name: "sal" },
          create: { name: "sal" },
        },
      },
      Recipe: tartaZanahoria,
    },
    {
      amount: 1,
      unit: IngredientUnit.teaspoon,
      Ingredient: {
        connectOrCreate: {
          where: { name: "canela en polvo" },
          create: { name: "canela en polvo" },
        },
      },
      Recipe: tartaZanahoria,
    },
    {
      amount: 2,
      unit: IngredientUnit.cup,
      Ingredient: { connect: { id: harinaTrigo.Edible?.Ingredient.id } },
      Recipe: tartaZanahoria,
    },
    {
      amount: 2,
      unit: IngredientUnit.cup,
      Ingredient: {
        connectOrCreate: {
          where: { name: "zanahoria rallada" },
          create: { name: "zanahoria rallada" },
        },
      },
      Recipe: tartaZanahoria,
    },
    {
      amount: 2,
      unit: IngredientUnit.cup,
      Ingredient: {
        connectOrCreate: {
          where: { name: "nueces picadas" },
          create: { name: "nueces picadas" },
        },
      },
      Recipe: tartaZanahoria,
    },
  ].map(
    async (i) =>
      await prisma.recipeIngredient.create({
        data: {
          amount: i.amount,
          Ingredient: i.Ingredient,
          Recipe: { connect: { id: i.Recipe.id } },
          unit: i.unit,
        },
      }),
  );

  const quesoVegano = await prisma.recipe.create({
    data: {
      name: "Queso vegano de anacardos",
      difficulty: "easy",
      directions: {
        createMany: {
          data: [
            {
              direction: "Activamos los anacardos durante 6-8 horas.",
              number: 1,
            },
            {
              direction:
                "Una vez tengamos los anacardos activados, los procesamos con el resto de ingredientes de la masa, en un procesador de alimentos. Tiene que quedar una textura sin grumos, similar a una crema de cacahuete pero más seca.",
              number: 2,
            },
            {
              direction:
                "Damos forma al queso y lo horneamos a 90 grados durante 45 minutos.",
              number: 3,
            },
            {
              direction:
                "Una vez horneado, el queso ya estaría listo para su maduración, lo dejaremos en una recipiente con rejilla en la nevera, sin tapa. Lo ideal es dejarlo entre dos semanas y un mes. Cuanto más tiempo lo dejemos, má s firme será su textura y más intenso su sabor.",
              number: 4,
            },
          ],
        },
      },
      imageURL: "/api/images/recipes/d6cbc5b9-fd8d-4daa-a36c-013418852521.jpg",
      portions: 8,
      cookingTime: 45,
      preparationTime: 20,
      description:
        "Queso vegano de anacardos cremoso, untable y muy fácil de hacer.",
      User: { connect: { id: sandra.id } },
      createdAt: new Date(),
      allergens: {
        create: { allergen: "nuts" },
      },
    },
  });

  const quesoVeganoIngredients = [
    {
      amount: 250,
      unit: IngredientUnit.grams,
      Ingredient: {
        connectOrCreate: {
          where: { name: "anacardos" },
          create: { name: "anacardos" },
        },
      },
      Recipe: quesoVegano,
    },
    {
      amount: 0.5,
      unit: IngredientUnit.cup,
      Ingredient: {
        connect: { id: levaduraNutricional.Edible?.Ingredient.id },
      },
      Recipe: quesoVegano,
    },
    {
      amount: 1,
      unit: IngredientUnit.teaspoon,
      Ingredient: {
        connectOrCreate: {
          where: { name: "romero fresco" },
          create: { name: "romero fresco" },
        },
      },
      Recipe: quesoVegano,
    },
    {
      amount: 1,
      unit: IngredientUnit.teaspoon,
      Ingredient: {
        connectOrCreate: {
          where: { name: "ajo en polvo" },
          create: { name: "ajo en polvo" },
        },
      },
      Recipe: quesoVegano,
    },
    {
      amount: 1,
      unit: IngredientUnit.teaspoon,
      Ingredient: {
        connectOrCreate: {
          where: { name: "cebolla en polvo" },
          create: { name: "cebolla en polvo" },
        },
      },
      Recipe: quesoVegano,
    },
    {
      amount: 1,
      unit: IngredientUnit.teaspoon,
      Ingredient: {
        connectOrCreate: {
          where: { name: "sal" },
          create: { name: "sal" },
        },
      },
      Recipe: quesoVegano,
    },
    {
      amount: 2,
      unit: IngredientUnit.tablespoon,
      Ingredient: { connect: { id: aceiteOliva.Edible?.Ingredient.id } },
      Recipe: quesoVegano,
    },
  ].map(
    async (i) =>
      await prisma.recipeIngredient.create({
        data: {
          amount: i.amount,
          Ingredient: i.Ingredient,
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

  const date1 = new Date();
  date1.setDate(date1.getDate() + 10);
  const date2 = new Date();
  date2.setDate(date2.getDate() + 20);
  const date3 = new Date();
  date3.setDate(date3.getDate() + 30);
  const date4 = new Date();
  date4.setDate(date4.getDate() + 40);
  const date5 = new Date();
  date5.setDate(date5.getDate() + 8);
  const date6 = new Date();
  date6.setDate(date6.getDate() + 15);

  const pastaItaliana = await prisma.workshop.create({
    data: {
      name: "Pasta italiana",
      imageURL: "/api/images/media/30112726-4b43-baa2-ad45-7a3092a3254f.jpg",
      description:
        "Vuelve al origen de una de las cocinas más aclamadas del mundo. ¡Mánchate las manos y descubre los secretos de las pastas!",
      OnSiteWorkshop: {
        create: {
          date: date1,
          places: 50,
        },
      },
    },
  });
  const cocinaJapo = await prisma.workshop.create({
    data: {
      name: "Cocina Japonesa",
      imageURL: "/api/images/media/30e42526-32d9-5be9-0161-8b6a3bf00d3d.jpg",
      description:
        "Únete a este taller para aprender a cocinar riquísimos platos del país del sol naciente. ¡No te arrepentirás!",
      OnSiteWorkshop: {
        create: {
          date: date2,
          places: 50,
        },
      },
    },
  });

  const galletas = await prisma.workshop.create({
    data: {
      name: "Galletitas navideñas",
      imageURL: "/api/images/media/8aa048dc-f3a6-610c-a598-feee2aafb439.jpg",
      description:
        "Aprende junto a un equipo profesional a cocinar alucinantes casitas de hombrecillos de jengibre. Sorprende a tus comensales estas navidades con auténticas obras de arte comestibles.",
      OnSiteWorkshop: {
        create: {
          date: date3,
          places: 50,
        },
      },
    },
  });

  const master_chef = await prisma.workshop.create({
    data: {
      name: "MasterChef",
      imageURL: "/api/images/media/14de0d2a-203d-74b2-5cd3-bfbe6db9cca8.jpg",
      description: "Competición fuertemente inspirada en MasterChef",
      OnSiteWorkshop: {
        create: {
          date: date4,
          places: 50,
        },
      },
    },
  });
  const reposteria = await prisma.workshop.create({
    data: {
      name: "Respostería",
      imageURL: "/api/images/media/9a1f3cc8-39fa-5e7b-6462-0a5555a3dca5.jpg",
      description:
        "En nuestros talleres aprenderás a elaborar postres ecológicos, sin azúcares refinados ni colorantes, y a elaborar dulces veganos, sin lactosa o sin gluten.",
      OnSiteWorkshop: {
        create: {
          date: date5,
          places: 50,
        },
      },
    },
  });
  const corquetasVegetarianas = await prisma.workshop.create({
    data: {
      name: "Croquetas Vegetarianas",
      imageURL: "/api/images/media/8aee1b2f-fac1-7ea9-8f50-a11ad74d9d88.jpg",
      description: "Cómo hacer unas buenas croquetas vegetarianas",
      OnlineWorkshop: {
        create: {
          videoURL: "https://www.youtube.com/watch?v=Hcj3EYYVkNM",
        },
      },
    },
  });
  const ComidaSaludable = await prisma.workshop.create({
    data: {
      name: "Comida Saludable",
      imageURL: "/api/images/media/7e1560a2-0d52-36ad-7f49-682bac72339f.jpg",
      description: "Aprende sobre recetas saludables",
      OnlineWorkshop: {
        create: {
          videoURL: "https://www.youtube.com/watch?v=cei3JhG72bg",
        },
      },
    },
  });
  const Reciclaje = await prisma.workshop.create({
    data: {
      name: "Reciclaje",
      imageURL: "/api/images/media/62b02d7d-0a82-f42e-d7d6-2aa7f1f4c557.jpg",
      description: "Consejos sobre reciclaje para el día a día",
      OnlineWorkshop: {
        create: {
          videoURL: "https://www.youtube.com/watch?v=FdVfYfpxgF4",
        },
      },
    },
  });
  const Alergenos = await prisma.workshop.create({
    data: {
      name: "Cómo afectan los alérgenos en tu vida",
      imageURL: "/api/images/media/62b02d7d-0a82-f42e-d7d6-2aa7f1f4c557.jpg",
      description:
        "Todo lo que necesitas saber sobre las personas con condiciones alimenticias y cómo afectan los alimentos en su día a día.",
      OnlineWorkshop: {
        create: {
          videoURL: "https://www.youtube.com/watch?v=k3o3RDeuzyE",
        },
      },
    },
  });
  const Compras_A_Granel = await prisma.workshop.create({
    data: {
      name: "Ventajas de las compras a granel",
      imageURL: "/api/images/media/8e69d54a-d7a2-a74f-4faf-46f29e194f15.jpg",
      description:
        "Te enseñamos los beneficios ecológicos y psicólogicos de la compra a granel.",
      OnlineWorkshop: {
        create: {
          videoURL: "https://www.youtube.com/watch?v=lwjsi9zWRCI",
        },
      },
    },
  });
  const Te_macha = await prisma.workshop.create({
    data: {
      name: "Cómo hacer Té matcha",
      imageURL: "/api/images/media/ab5a4317-c1d7-489d-9227-8cfcd454d2f2.jpg",
      description:
        "Desde Japón hasta tu casa, aprende a preparar el té matcha.",
      OnlineWorkshop: {
        create: {
          videoURL: "https://www.youtube.com/watch?v=VvAtjQv_eVA",
        },
      },
    },
  });
}
