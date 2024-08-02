-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_profileId_fkey";

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;
