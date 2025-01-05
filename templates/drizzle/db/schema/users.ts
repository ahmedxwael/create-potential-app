import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { posts } from "./posts";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    password: varchar("password", { length: 256 }).notNull(),
    name: text("name"),
    jobTitle: text("job_title"),
    avatarUrl: text("avatar_url"),
    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp().defaultNow(),
  },
  (table) => ({
    emailKey: uniqueIndex("users_email_key").on(table.email),
  })
);

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));
