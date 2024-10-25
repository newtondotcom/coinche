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
    "gameId" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "author" TEXT NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);
