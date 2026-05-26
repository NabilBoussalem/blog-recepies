import type { Metadata } from "next";
import { getRecipeIndex, getAllCategories } from "@/lib/recipes";
import RecipeSearch from "@/components/RecipeSearch";

export const metadata: Metadata = {
  title: "All Recipes",
  description:
    "Browse all cold summer recipes — salads, smoothies, no-bake desserts, chilled soups, cold pasta, and more.",
  openGraph: {
    title: "All Recipes | Summer Bites",
    description:
      "Browse all cold summer recipes — salads, smoothies, no-bake desserts, chilled soups, cold pasta, and more.",
  },
};

export default function RecipesPage() {
  const recipes = getRecipeIndex();
  const categories = getAllCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">All Recipes</h1>
      <p className="text-gray-500 mb-8">
        Find the perfect cold recipe for any summer occasion.
      </p>
      <RecipeSearch recipes={recipes} categories={categories} />
    </div>
  );
}
