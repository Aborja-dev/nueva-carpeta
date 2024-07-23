/*
  Warnings:

  - You are about to drop the column `attachments` on the `TalkProposal` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_TalkProposalToTopic" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_TalkProposalToTopic_A_fkey" FOREIGN KEY ("A") REFERENCES "TalkProposal" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TalkProposalToTopic_B_fkey" FOREIGN KEY ("B") REFERENCES "Topic" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "startingDate" DATETIME NOT NULL,
    "endingDate" DATETIME NOT NULL,
    "bannerUrl" TEXT,
    "url" TEXT,
    "location" TEXT,
    "statusId" INTEGER NOT NULL DEFAULT 1,
    "proposalsStartingDate" DATETIME,
    "proposalsEndingDate" DATETIME,
    "timezone" TEXT NOT NULL,
    CONSTRAINT "Event_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "EventType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Event_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "EventStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("bannerUrl", "description", "endingDate", "id", "location", "name", "proposalsEndingDate", "proposalsStartingDate", "startingDate", "statusId", "timezone", "typeId", "url") SELECT "bannerUrl", "description", "endingDate", "id", "location", "name", "proposalsEndingDate", "proposalsStartingDate", "startingDate", "statusId", "timezone", "typeId", "url" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE TABLE "new_TalkProposal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "topicId" INTEGER NOT NULL,
    "abstract" TEXT NOT NULL,
    "estimatedDuration" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "streamed" BOOLEAN NOT NULL,
    "uniqueCode" TEXT NOT NULL,
    CONSTRAINT "TalkProposal_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TalkProposal_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TalkProposal_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "ProposalStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TalkProposal" ("abstract", "candidateId", "estimatedDuration", "eventId", "id", "statusId", "streamed", "title", "topicId", "uniqueCode") SELECT "abstract", "candidateId", "estimatedDuration", "eventId", "id", "statusId", "streamed", "title", "topicId", "uniqueCode" FROM "TalkProposal";
DROP TABLE "TalkProposal";
ALTER TABLE "new_TalkProposal" RENAME TO "TalkProposal";
CREATE UNIQUE INDEX "TalkProposal_uniqueCode_key" ON "TalkProposal"("uniqueCode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_TalkProposalToTopic_AB_unique" ON "_TalkProposalToTopic"("A", "B");

-- CreateIndex
CREATE INDEX "_TalkProposalToTopic_B_index" ON "_TalkProposalToTopic"("B");
