import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const apartmentsTable = pgTable("apartments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  address: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
  area: integer().notNull(),
  price: integer().notNull()
});
