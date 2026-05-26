export const SITE_NAME = "Summer Bites";
export const SITE_DESCRIPTION =
  "Discover refreshing cold summer recipes — salads, smoothies, no-bake desserts, chilled soups, and more.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://summerbites.example.com";

export const CATEGORIES = [
  "Salads",
  "Smoothies & Drinks",
  "No-Bake Desserts",
  "Chilled Soups",
  "Cold Pasta",
  "Overnight Oats",
  "Meal-Prep Bowls",
] as const;

export type Category = (typeof CATEGORIES)[number];
