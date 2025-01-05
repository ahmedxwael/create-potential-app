import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 256 }).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  content: text("content").notNull(),
  imageUrl: varchar("image_url", { length: 256 }).notNull(),
  authorId: varchar("author_id", { length: 256 }).notNull(),
  categoryId: varchar("category_id", { length: 256 }).notNull(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow(),
});

export const categories = pgTable("categories", {
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
});

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
  category: one(categories, {
    fields: [posts.categoryId],
    references: [categories.id],
  }),
}));
