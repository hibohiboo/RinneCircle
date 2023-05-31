
CREATE TABLE "RinneUser" (
    "id" varchar(64) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,
    "imageUrl" TEXT ,
    "twitterAccount" TEXT,
    CONSTRAINT "RinneUser_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "RinneScenario" (
    "id" varchar(64) NOT NULL,
    "authorId" varchar(64) NOT NULL,
    "title" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "imageUrl" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RinneScenario_pkey" PRIMARY KEY ("id")
);