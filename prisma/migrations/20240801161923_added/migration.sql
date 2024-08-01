-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
