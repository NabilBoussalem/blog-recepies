import Link from "next/link";
import { getAllRecipes, getAllCategories, categoryToSlug } from "@/lib/recipes";
import RecipeCard from "@/components/RecipeCard";

export default function HomePage() {
  const recipes = getAllRecipes();
  const categories = getAllCategories();
  const featured = recipes.slice(0, 3);
  const latest = recipes.slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-lime-50 to-amber-50 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Cold Summer Recipes
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Refreshing salads, chilled soups, no-bake desserts, smoothies, and
            more — perfect for beating the heat.
          </p>
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full font-medium hover:bg-emerald-700 transition-colors"
          >
            Browse All Recipes →
          </Link>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          ⭐ Featured Recipes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((recipe, i) => (
            <RecipeCard key={recipe.slug} recipe={recipe} priority={i === 0} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            🗂️ Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/categories/${categoryToSlug(cat)}`}
                className="flex items-center justify-center p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl text-emerald-800 font-medium text-sm transition-colors text-center"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Recipes */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            🕐 Latest Recipes
          </h2>
          <Link
            href="/recipes"
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* SEO Intro Text */}
      <section className="bg-emerald-50/50 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your Summer Recipe Destination
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Summer Bites is your go-to source for cold summer recipes that
            require minimal effort and maximum flavor. From crisp salads and
            creamy no-bake desserts to refreshing smoothie bowls and chilled
            soups, every recipe is designed to keep you cool when the temperature
            rises. No oven required — just fresh ingredients and a love for good
            food.
          </p>
        </div>
      </section>
    </>
  );
}
