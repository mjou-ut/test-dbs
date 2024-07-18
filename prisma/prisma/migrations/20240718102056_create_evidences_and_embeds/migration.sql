-- CreateEnum
CREATE TYPE "EvidenceType" AS ENUM ('IE_IMAGE');

-- CreateTable
CREATE TABLE "Evidence" (
    "id" TEXT NOT NULL,
    "evidenceType" "EvidenceType" NOT NULL,
    "sourceHost" TEXT NOT NULL,
    "sourcePath" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "Evidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Embed" (
    "id" TEXT NOT NULL,
    "evidenceId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Embed_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Embed" ADD CONSTRAINT "Embed_evidenceId_fkey" FOREIGN KEY ("evidenceId") REFERENCES "Evidence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
