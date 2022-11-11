-- CreateTable
CREATE TABLE "countries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "groupId" TEXT NOT NULL,
    CONSTRAINT "countries_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "countries_name_key" ON "countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "countries_groupId_key" ON "countries"("groupId");
