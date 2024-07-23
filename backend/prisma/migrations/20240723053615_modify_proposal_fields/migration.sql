/*
  Warnings:

  - You are about to drop the column `topicId` on the `TalkProposal` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TalkProposal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "estimatedDuration" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "streamed" BOOLEAN NOT NULL,
    "uniqueCode" TEXT NOT NULL,
    CONSTRAINT "TalkProposal_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TalkProposal_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TalkProposal_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "ProposalStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TalkProposal" ("abstract", "candidateId", "estimatedDuration", "eventId", "id", "statusId", "streamed", "title", "uniqueCode") SELECT "abstract", "candidateId", "estimatedDuration", "eventId", "id", "statusId", "streamed", "title", "uniqueCode" FROM "TalkProposal";
DROP TABLE "TalkProposal";
ALTER TABLE "new_TalkProposal" RENAME TO "TalkProposal";
CREATE UNIQUE INDEX "TalkProposal_uniqueCode_key" ON "TalkProposal"("uniqueCode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
