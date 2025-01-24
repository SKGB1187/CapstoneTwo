/*
  Warnings:

  - A unique constraint covering the columns `[userId,word,listName]` on the table `UserProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserProgress_userId_word_listName_key" ON "UserProgress"("userId", "word", "listName");
