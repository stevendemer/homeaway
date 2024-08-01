/*
  Warnings:

  - You are about to drop the `Favorite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_propertyId_fkey";

-- DropTable
DROP TABLE "Favorite";

-- CreateTable
CREATE TABLE "favorites" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "favorites_profileId_propertyId_idx" ON "favorites"("profileId", "propertyId");

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
