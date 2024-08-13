import { sql } from "drizzle-orm";
import { serial, text, boolean, pgTable } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(), // Auto-incrementing integer ID
  title: text("title").notNull(),
  description: text("description").notNull(),
  done: boolean("done").default(false).notNull(),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
