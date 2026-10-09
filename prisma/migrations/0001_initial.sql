-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AllergenInSpanish" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "allergen" TEXT NOT NULL,
    "allergenInSpanish" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AllergenClient" (
    "clientId" TEXT NOT NULL,
    "allergen" TEXT NOT NULL,

    PRIMARY KEY ("clientId", "allergen"),
    CONSTRAINT "AllergenClient_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "passwordHash" TEXT,
    "image" TEXT DEFAULT 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png',
    "name" TEXT NOT NULL,
    "nif" TEXT,
    "role" TEXT NOT NULL DEFAULT 'client'
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Admin" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "CartProduct" (
    "cartId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "productId" TEXT NOT NULL,

    PRIMARY KEY ("cartId", "productId"),
    CONSTRAINT "CartProduct_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CartProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ECategoryInSpanish" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "categoryInSpanish" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Client" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT,
    "numberOfReports" INTEGER NOT NULL DEFAULT 0,
    "phoneNumber" TEXT,
    "points" INTEGER NOT NULL DEFAULT 0,
    "location" TEXT,
    "CP" INTEGER,
    "cartId" TEXT NOT NULL,
    CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Client_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "adminId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "imageURL" TEXT,
    "rating" REAL NOT NULL,
    "reported" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT,
    "userId" TEXT,
    "recipeId" TEXT,
    CONSTRAINT "Comment_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin" ("userId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Comment_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Edible" (
    "productId" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "priceByWeight" REAL NOT NULL,
    "origin" TEXT,
    "conservation" TEXT,
    "ingredientId" TEXT NOT NULL,
    "nutritionFactsId" TEXT NOT NULL,
    CONSTRAINT "Edible_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Edible_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Edible_nutritionFactsId_fkey" FOREIGN KEY ("nutritionFactsId") REFERENCES "NutritionFacts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EdibleAllergen" (
    "edibleId" TEXT NOT NULL,
    "allergen" TEXT NOT NULL,

    PRIMARY KEY ("edibleId", "allergen"),
    CONSTRAINT "EdibleAllergen_edibleId_fkey" FOREIGN KEY ("edibleId") REFERENCES "Edible" ("productId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "IngredientUnitInSpanish" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ingredientUnit" TEXT NOT NULL,
    "unitInSpanish" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "NECategoryInSpanish" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "categoryInSpanish" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "NonEdible" (
    "productId" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "price" REAL NOT NULL,
    CONSTRAINT "NonEdible_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NutritionFacts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ingredients" TEXT NOT NULL,
    "energy" REAL NOT NULL,
    "fat" REAL NOT NULL,
    "carbohydrates" REAL NOT NULL,
    "protein" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "OnlineWorkshop" (
    "videoURL" TEXT NOT NULL,
    "workshopId" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "OnlineWorkshop_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "Workshop" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OnSiteWorkshop" (
    "date" DATETIME NOT NULL,
    "places" INTEGER NOT NULL,
    "workshopId" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "OnSiteWorkshop_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "Workshop" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OnlineWorkshopViews" (
    "clientId" TEXT NOT NULL,
    "onlineWorkshopId" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,

    PRIMARY KEY ("onlineWorkshopId", "clientId"),
    CONSTRAINT "OnlineWorkshopViews_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OnlineWorkshopViews_onlineWorkshopId_fkey" FOREIGN KEY ("onlineWorkshopId") REFERENCES "OnlineWorkshop" ("workshopId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OnSiteWorkshopAttendance" (
    "clientId" TEXT NOT NULL,
    "onSiteWorkshopId" TEXT NOT NULL,

    PRIMARY KEY ("onSiteWorkshopId", "clientId"),
    CONSTRAINT "OnSiteWorkshopAttendance_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OnSiteWorkshopAttendance_onSiteWorkshopId_fkey" FOREIGN KEY ("onSiteWorkshopId") REFERENCES "OnSiteWorkshop" ("workshopId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" TEXT NOT NULL,
    "clientId" TEXT,
    "shipmentAddress" TEXT NOT NULL,
    "unregisteredClientId" TEXT,
    CONSTRAINT "Order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("userId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Order_unregisteredClientId_fkey" FOREIGN KEY ("unregisteredClientId") REFERENCES "UnregisteredClient" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "adminUserId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "publicationDate" DATETIME NOT NULL,
    "finalDate" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    CONSTRAINT "Post_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "Admin" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "plainName" TEXT NOT NULL,
    "ProductUnit" TEXT NOT NULL,
    "stock" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "ProductComment" (
    "commentId" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    CONSTRAINT "ProductComment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductComment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductOrder" (
    "amount" REAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    PRIMARY KEY ("orderId", "productId"),
    CONSTRAINT "ProductOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "difficulty" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "portions" INTEGER NOT NULL,
    "preparationTime" INTEGER NOT NULL,
    "cookingTime" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RecipeAllergen" (
    "allergen" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,

    PRIMARY KEY ("recipeId", "allergen"),
    CONSTRAINT "RecipeAllergen_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RecipeDifficultyInSpanish" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "difficulty" TEXT NOT NULL,
    "difficultyInSpanish" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RecipeDirections" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "direction" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    CONSTRAINT "RecipeDirections_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "amount" REAL NOT NULL,
    "ingredientId" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "unit" TEXT NOT NULL,

    PRIMARY KEY ("recipeId", "ingredientId"),
    CONSTRAINT "RecipeIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RecipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RecipeUser" (
    "recipeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("recipeId", "userId"),
    CONSTRAINT "RecipeUser_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RecipeUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReportedComment" (
    "clientUserId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    PRIMARY KEY ("clientUserId", "commentId"),
    CONSTRAINT "ReportedComment_clientUserId_fkey" FOREIGN KEY ("clientUserId") REFERENCES "Client" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ReportedComment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SuggestionForm" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SupraCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "supraCategoryName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SupraCategoryRelation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "supraCategoryId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    CONSTRAINT "SupraCategoryRelation_supraCategoryId_fkey" FOREIGN KEY ("supraCategoryId") REFERENCES "SupraCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "adminId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,
    "ticketType" TEXT NOT NULL,
    CONSTRAINT "Ticket_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ticket_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UnregisteredClient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Workshop" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DemoSeed" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "AllergenInSpanish_allergen_key" ON "AllergenInSpanish"("allergen");

-- CreateIndex
CREATE INDEX "AllergenClient_clientId_idx" ON "AllergenClient"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_nif_key" ON "User"("nif");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE INDEX "Admin_userId_idx" ON "Admin"("userId");

-- CreateIndex
CREATE INDEX "CartProduct_cartId_idx" ON "CartProduct"("cartId");

-- CreateIndex
CREATE INDEX "CartProduct_productId_idx" ON "CartProduct"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "ECategoryInSpanish_category_key" ON "ECategoryInSpanish"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Client_cartId_key" ON "Client"("cartId");

-- CreateIndex
CREATE INDEX "Client_userId_idx" ON "Client"("userId");

-- CreateIndex
CREATE INDEX "Comment_adminId_idx" ON "Comment"("adminId");

-- CreateIndex
CREATE INDEX "Comment_userId_idx" ON "Comment"("userId");

-- CreateIndex
CREATE INDEX "Comment_recipeId_idx" ON "Comment"("recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "Edible_ingredientId_key" ON "Edible"("ingredientId");

-- CreateIndex
CREATE UNIQUE INDEX "Edible_nutritionFactsId_key" ON "Edible"("nutritionFactsId");

-- CreateIndex
CREATE INDEX "Edible_productId_idx" ON "Edible"("productId");

-- CreateIndex
CREATE INDEX "EdibleAllergen_edibleId_idx" ON "EdibleAllergen"("edibleId");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "IngredientUnitInSpanish_ingredientUnit_key" ON "IngredientUnitInSpanish"("ingredientUnit");

-- CreateIndex
CREATE UNIQUE INDEX "NECategoryInSpanish_category_key" ON "NECategoryInSpanish"("category");

-- CreateIndex
CREATE INDEX "NonEdible_productId_idx" ON "NonEdible"("productId");

-- CreateIndex
CREATE INDEX "OnlineWorkshop_workshopId_idx" ON "OnlineWorkshop"("workshopId");

-- CreateIndex
CREATE INDEX "OnSiteWorkshop_workshopId_idx" ON "OnSiteWorkshop"("workshopId");

-- CreateIndex
CREATE INDEX "OnlineWorkshopViews_clientId_idx" ON "OnlineWorkshopViews"("clientId");

-- CreateIndex
CREATE INDEX "OnlineWorkshopViews_onlineWorkshopId_idx" ON "OnlineWorkshopViews"("onlineWorkshopId");

-- CreateIndex
CREATE INDEX "OnSiteWorkshopAttendance_clientId_idx" ON "OnSiteWorkshopAttendance"("clientId");

-- CreateIndex
CREATE INDEX "OnSiteWorkshopAttendance_onSiteWorkshopId_idx" ON "OnSiteWorkshopAttendance"("onSiteWorkshopId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_unregisteredClientId_key" ON "Order"("unregisteredClientId");

-- CreateIndex
CREATE INDEX "Order_clientId_idx" ON "Order"("clientId");

-- CreateIndex
CREATE INDEX "Post_adminUserId_idx" ON "Post"("adminUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_plainName_key" ON "Product"("plainName");

-- CreateIndex
CREATE INDEX "ProductComment_commentId_idx" ON "ProductComment"("commentId");

-- CreateIndex
CREATE INDEX "ProductComment_productId_idx" ON "ProductComment"("productId");

-- CreateIndex
CREATE INDEX "ProductOrder_orderId_idx" ON "ProductOrder"("orderId");

-- CreateIndex
CREATE INDEX "ProductOrder_productId_idx" ON "ProductOrder"("productId");

-- CreateIndex
CREATE INDEX "Recipe_userId_idx" ON "Recipe"("userId");

-- CreateIndex
CREATE INDEX "RecipeAllergen_recipeId_idx" ON "RecipeAllergen"("recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeDifficultyInSpanish_difficulty_key" ON "RecipeDifficultyInSpanish"("difficulty");

-- CreateIndex
CREATE INDEX "RecipeDirections_recipeId_idx" ON "RecipeDirections"("recipeId");

-- CreateIndex
CREATE INDEX "RecipeIngredient_ingredientId_idx" ON "RecipeIngredient"("ingredientId");

-- CreateIndex
CREATE INDEX "RecipeIngredient_recipeId_idx" ON "RecipeIngredient"("recipeId");

-- CreateIndex
CREATE INDEX "RecipeUser_recipeId_idx" ON "RecipeUser"("recipeId");

-- CreateIndex
CREATE INDEX "RecipeUser_userId_idx" ON "RecipeUser"("userId");

-- CreateIndex
CREATE INDEX "ReportedComment_clientUserId_idx" ON "ReportedComment"("clientUserId");

-- CreateIndex
CREATE INDEX "ReportedComment_commentId_idx" ON "ReportedComment"("commentId");

-- CreateIndex
CREATE UNIQUE INDEX "SupraCategory_supraCategoryName_key" ON "SupraCategory"("supraCategoryName");

-- CreateIndex
CREATE INDEX "SupraCategoryRelation_supraCategoryId_idx" ON "SupraCategoryRelation"("supraCategoryId");

-- CreateIndex
CREATE INDEX "Ticket_clientId_idx" ON "Ticket"("clientId");

-- CreateIndex
CREATE INDEX "Ticket_adminId_idx" ON "Ticket"("adminId");
