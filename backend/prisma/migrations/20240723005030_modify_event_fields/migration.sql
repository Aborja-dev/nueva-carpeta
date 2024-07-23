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
    "statusId" INTEGER NOT NULL,
    "proposalsStartingDate" DATETIME,
    "proposalsEndingDate" DATETIME,
    "timezone" TEXT NOT NULL,
    CONSTRAINT "Event_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "EventType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Event_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "EventStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("bannerUrl", "description", "endingDate", "id", "location", "name", "proposalsEndingDate", "proposalsStartingDate", "startingDate", "statusId", "timezone", "typeId", "url") SELECT "bannerUrl", "description", "endingDate", "id", "location", "name", "proposalsEndingDate", "proposalsStartingDate", "startingDate", "statusId", "timezone", "typeId", "url" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
