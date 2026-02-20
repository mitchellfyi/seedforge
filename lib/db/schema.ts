import type { InferSelectModel } from "drizzle-orm";
import {
  boolean,
  date,
  foreignKey,
  integer,
  json,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// =============================================================================
// Existing Chat SDK Tables (preserved)
// =============================================================================

export const user = pgTable("User", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  email: varchar("email", { length: 64 }).notNull(),
  password: varchar("password", { length: 64 }),
});

export type User = InferSelectModel<typeof user>;

export const chat = pgTable("Chat", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  createdAt: timestamp("createdAt").notNull(),
  title: text("title").notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id),
  visibility: varchar("visibility", { enum: ["public", "private"] })
    .notNull()
    .default("private"),
});

export type Chat = InferSelectModel<typeof chat>;

// DEPRECATED: The following schema is deprecated and will be removed in the future.
export const messageDeprecated = pgTable("Message", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  chatId: uuid("chatId")
    .notNull()
    .references(() => chat.id),
  role: varchar("role").notNull(),
  content: json("content").notNull(),
  createdAt: timestamp("createdAt").notNull(),
});

export type MessageDeprecated = InferSelectModel<typeof messageDeprecated>;

export const message = pgTable("Message_v2", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  chatId: uuid("chatId")
    .notNull()
    .references(() => chat.id),
  role: varchar("role").notNull(),
  parts: json("parts").notNull(),
  attachments: json("attachments").notNull(),
  createdAt: timestamp("createdAt").notNull(),
});

export type DBMessage = InferSelectModel<typeof message>;

// DEPRECATED
export const voteDeprecated = pgTable(
  "Vote",
  {
    chatId: uuid("chatId")
      .notNull()
      .references(() => chat.id),
    messageId: uuid("messageId")
      .notNull()
      .references(() => messageDeprecated.id),
    isUpvoted: boolean("isUpvoted").notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.chatId, table.messageId] }),
    };
  },
);

export type VoteDeprecated = InferSelectModel<typeof voteDeprecated>;

export const vote = pgTable(
  "Vote_v2",
  {
    chatId: uuid("chatId")
      .notNull()
      .references(() => chat.id),
    messageId: uuid("messageId")
      .notNull()
      .references(() => message.id),
    isUpvoted: boolean("isUpvoted").notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.chatId, table.messageId] }),
    };
  },
);

export type Vote = InferSelectModel<typeof vote>;

export const document = pgTable(
  "Document",
  {
    id: uuid("id").notNull().defaultRandom(),
    createdAt: timestamp("createdAt").notNull(),
    title: text("title").notNull(),
    content: text("content"),
    kind: varchar("text", { enum: ["text", "image"] })
      .notNull()
      .default("text"),
    userId: uuid("userId")
      .notNull()
      .references(() => user.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.id, table.createdAt] }),
    };
  },
);

export type Document = InferSelectModel<typeof document>;

export const suggestion = pgTable(
  "Suggestion",
  {
    id: uuid("id").notNull().defaultRandom(),
    documentId: uuid("documentId").notNull(),
    documentCreatedAt: timestamp("documentCreatedAt").notNull(),
    originalText: text("originalText").notNull(),
    suggestedText: text("suggestedText").notNull(),
    description: text("description"),
    isResolved: boolean("isResolved").notNull().default(false),
    userId: uuid("userId")
      .notNull()
      .references(() => user.id),
    createdAt: timestamp("createdAt").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id] }),
    documentRef: foreignKey({
      columns: [table.documentId, table.documentCreatedAt],
      foreignColumns: [document.id, document.createdAt],
    }),
  }),
);

export type Suggestion = InferSelectModel<typeof suggestion>;

export const stream = pgTable(
  "Stream",
  {
    id: uuid("id").notNull().defaultRandom(),
    chatId: uuid("chatId").notNull(),
    createdAt: timestamp("createdAt").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id] }),
    chatRef: foreignKey({
      columns: [table.chatId],
      foreignColumns: [chat.id],
    }),
  }),
);

export type Stream = InferSelectModel<typeof stream>;

// =============================================================================
// Seedforge Tables
// =============================================================================

// --- Project ---
export const project = pgTable("Project", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id),
  chatId: uuid("chatId").references(() => chat.id),
  coachChatId: uuid("coachChatId").references(() => chat.id),
  title: text("title").notNull(),
  drivingQuestion: text("drivingQuestion").notNull(),
  artifactDescription: text("artifactDescription").notNull(),
  artifactType: varchar("artifactType", { length: 50 })
    .notNull()
    .default("guide"),
  learningIntent: text("learningIntent").notNull(),
  estimatedMinutes: integer("estimatedMinutes").notNull().default(45),
  status: varchar("status", {
    enum: ["draft", "active", "completed", "abandoned"],
  })
    .notNull()
    .default("draft"),
  documentId: uuid("documentId"),
  metadata: json("metadata").$type<{
    targetAudience?: string;
    tone?: string;
    complexity?: string;
  }>(),
  gpEarned: integer("gpEarned").notNull().default(0),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  completedAt: timestamp("completedAt"),
});

export type Project = InferSelectModel<typeof project>;

// --- Step ---
export const step = pgTable("Step", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  projectId: uuid("projectId")
    .notNull()
    .references(() => project.id, { onDelete: "cascade" }),
  orderIndex: integer("orderIndex").notNull(),
  title: text("title").notNull(),
  teachingObjective: text("teachingObjective").notNull(),
  makingObjective: text("makingObjective").notNull(),
  instructions: text("instructions").notNull(),
  checkpoint: text("checkpoint").notNull(),
  checkpointType: varchar("checkpointType", { length: 30 })
    .notNull()
    .default("content_review"),
  estimatedMinutes: integer("estimatedMinutes").notNull().default(10),
  status: varchar("status", {
    enum: ["locked", "available", "in_progress", "completed"],
  })
    .notNull()
    .default("locked"),
  gpValue: integer("gpValue").notNull().default(50),
  completedAt: timestamp("completedAt"),
  metadata: json("metadata").$type<{
    scaffoldingLevel?: string;
    contentTemplate?: string;
  }>(),
});

export type Step = InferSelectModel<typeof step>;

// --- Need to Know ---
export const needToKnow = pgTable("NeedToKnow", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  projectId: uuid("projectId")
    .notNull()
    .references(() => project.id, { onDelete: "cascade" }),
  stepId: uuid("stepId").references(() => step.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 50 })
    .notNull()
    .default("knowledge"),
  isAddressed: boolean("isAddressed").notNull().default(false),
});

export type NeedToKnow = InferSelectModel<typeof needToKnow>;

// --- Learner Profile ---
export const learnerProfile = pgTable("LearnerProfile", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id)
    .unique(),
  displayName: varchar("displayName", { length: 100 }),
  interests: json("interests").$type<string[]>().default([]),
  priorExperience: json("priorExperience").$type<string[]>().default([]),
  preferredComplexity: varchar("preferredComplexity", { length: 20 }).default(
    "beginner",
  ),
  initialScaffoldingLevel: varchar("initialScaffoldingLevel", {
    length: 20,
  }).default("full_guidance"),
  avatarPreset: varchar("avatarPreset", { length: 50 }).default("grower-1"),
  totalGp: integer("totalGp").notNull().default(0),
  level: integer("level").notNull().default(1),
  currentStreak: integer("currentStreak").notNull().default(0),
  longestStreak: integer("longestStreak").notNull().default(0),
  lastActiveDate: date("lastActiveDate"),
  completedProjectCount: integer("completedProjectCount").notNull().default(0),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export type LearnerProfile = InferSelectModel<typeof learnerProfile>;

// --- Garden Plant ---
export const gardenPlant = pgTable("GardenPlant", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id),
  projectId: uuid("projectId")
    .notNull()
    .references(() => project.id),
  plantType: varchar("plantType", { length: 50 }).notNull().default("flower"),
  domain: varchar("domain", { length: 50 }).notNull().default("general"),
  growthStage: varchar("growthStage", { length: 20 })
    .notNull()
    .default("planted"),
  positionX: integer("positionX").notNull().default(0),
  positionY: integer("positionY").notNull().default(0),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export type GardenPlant = InferSelectModel<typeof gardenPlant>;
