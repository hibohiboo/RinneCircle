-- CreateTable
CREATE TABLE "RinneScenario" (
    "id" VARCHAR(64) NOT NULL,
    "authorId" VARCHAR(64) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT,

    CONSTRAINT "RinneScenario_pkey" PRIMARY KEY ("id")
);
