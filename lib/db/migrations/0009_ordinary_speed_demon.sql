CREATE TABLE IF NOT EXISTS "GardenPlant" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"projectId" uuid NOT NULL,
	"plantType" varchar(50) DEFAULT 'flower' NOT NULL,
	"domain" varchar(50) DEFAULT 'general' NOT NULL,
	"growthStage" varchar(20) DEFAULT 'planted' NOT NULL,
	"positionX" integer DEFAULT 0 NOT NULL,
	"positionY" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "LearnerProfile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"displayName" varchar(100),
	"interests" json DEFAULT '[]'::json,
	"priorExperience" json DEFAULT '[]'::json,
	"preferredComplexity" varchar(20) DEFAULT 'beginner',
	"initialScaffoldingLevel" varchar(20) DEFAULT 'full_guidance',
	"avatarPreset" varchar(50) DEFAULT 'grower-1',
	"totalGp" integer DEFAULT 0 NOT NULL,
	"level" integer DEFAULT 1 NOT NULL,
	"currentStreak" integer DEFAULT 0 NOT NULL,
	"longestStreak" integer DEFAULT 0 NOT NULL,
	"lastActiveDate" date,
	"completedProjectCount" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "LearnerProfile_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "NeedToKnow" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"stepId" uuid,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"category" varchar(50) DEFAULT 'knowledge' NOT NULL,
	"isAddressed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Project" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"chatId" uuid,
	"coachChatId" uuid,
	"title" text NOT NULL,
	"drivingQuestion" text NOT NULL,
	"artifactDescription" text NOT NULL,
	"artifactType" varchar(50) DEFAULT 'guide' NOT NULL,
	"learningIntent" text NOT NULL,
	"estimatedMinutes" integer DEFAULT 45 NOT NULL,
	"status" varchar DEFAULT 'draft' NOT NULL,
	"documentId" uuid,
	"metadata" json,
	"gpEarned" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"completedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Step" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"orderIndex" integer NOT NULL,
	"title" text NOT NULL,
	"teachingObjective" text NOT NULL,
	"makingObjective" text NOT NULL,
	"instructions" text NOT NULL,
	"checkpoint" text NOT NULL,
	"checkpointType" varchar(30) DEFAULT 'content_review' NOT NULL,
	"estimatedMinutes" integer DEFAULT 10 NOT NULL,
	"status" varchar DEFAULT 'locked' NOT NULL,
	"gpValue" integer DEFAULT 50 NOT NULL,
	"completedAt" timestamp,
	"metadata" json
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "GardenPlant" ADD CONSTRAINT "GardenPlant_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "GardenPlant" ADD CONSTRAINT "GardenPlant_projectId_Project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "LearnerProfile" ADD CONSTRAINT "LearnerProfile_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "NeedToKnow" ADD CONSTRAINT "NeedToKnow_projectId_Project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "NeedToKnow" ADD CONSTRAINT "NeedToKnow_stepId_Step_id_fk" FOREIGN KEY ("stepId") REFERENCES "public"."Step"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Project" ADD CONSTRAINT "Project_chatId_Chat_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Project" ADD CONSTRAINT "Project_coachChatId_Chat_id_fk" FOREIGN KEY ("coachChatId") REFERENCES "public"."Chat"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Step" ADD CONSTRAINT "Step_projectId_Project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
