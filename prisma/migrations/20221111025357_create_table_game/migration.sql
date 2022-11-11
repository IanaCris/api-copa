-- CreateTable
CREATE TABLE "games" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "firstCountryId" TEXT NOT NULL,
    "secondCountryId" TEXT NOT NULL,
    "firstCountryPoints" INTEGER NOT NULL DEFAULT 0,
    "secondCountryPoints" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
