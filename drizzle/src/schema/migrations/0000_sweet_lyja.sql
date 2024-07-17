DO $$ BEGIN
 CREATE TYPE "public"."evidenceType" AS ENUM('IE_IMAGE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "embeds" (
	"id" uuid PRIMARY KEY NOT NULL,
	"evidenceId" uuid,
	"reportId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "evidences" (
	"id" uuid PRIMARY KEY NOT NULL,
	"evidenceType" "evidenceType",
	"sourceHost" varchar NOT NULL,
	"sourcePath" varchar NOT NULL,
	"accountId" uuid NOT NULL,
	"workspaceId" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "embeds" ADD CONSTRAINT "embeds_evidenceId_evidences_id_fk" FOREIGN KEY ("evidenceId") REFERENCES "public"."evidences"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "evidences" USING btree ("id","accountId","workspaceId");