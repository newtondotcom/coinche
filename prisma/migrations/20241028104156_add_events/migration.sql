-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "p1" TEXT NOT NULL,
    "p2" TEXT NOT NULL,
    "p3" TEXT NOT NULL,
    "p4" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);
