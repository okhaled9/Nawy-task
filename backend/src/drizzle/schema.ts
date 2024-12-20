import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const apartmentsTable = pgTable("apartments", {
  id: serial().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  address: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
  area: integer().notNull(),
  price: integer().notNull(),
});

export const apartmentsRelations = relations(apartmentsTable, ({ many }) => ({
  images: many(imagesTable),
}));

export const imagesTable = pgTable("images", {
  id: serial().primaryKey(),
  path: varchar({ length: 255 }).notNull(),
  apartmentId: integer()
    .notNull()
    .references(() => apartmentsTable.id, { onDelete: "cascade" }),
});

export const imagesRelations = relations(imagesTable, ({ one }) => ({
  apartment: one(apartmentsTable, {
    fields: [imagesTable.apartmentId],
    references: [apartmentsTable.id],
  }),
}));
