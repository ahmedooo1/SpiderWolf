-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_gameId_fkey";

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
