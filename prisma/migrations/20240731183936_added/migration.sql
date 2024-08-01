-- CreateTable
CREATE TABLE "properties" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "guests" INTEGER NOT NULL,
    "beds" INTEGER NOT NULL,
    "amenities" TEXT NOT NULL,
    "baths" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "properties_name_idx" ON "properties"("name");

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;
