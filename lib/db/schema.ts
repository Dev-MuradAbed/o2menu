import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const restaurantRatings = pgTable("restaurant_ratings", {
  id: serial("id").primaryKey(),
  branch: text("branch").notNull(),
  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  rating: text("rating").notNull(),
  ratingValue: integer("rating_value").notNull(),
  foodQuality: integer("food_quality"),
  variety: integer("variety"),
  prices: integer("prices"),
  service: integer("service"),
  cleanliness: integer("cleanliness"),
  atmosphere: integer("atmosphere"),
  likedMost: text("liked_most"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
