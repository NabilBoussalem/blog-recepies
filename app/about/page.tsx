import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Summer Bites — your go-to source for refreshing cold summer recipes.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        About Summer Bites
      </h1>

      <div className="prose prose-gray max-w-none space-y-4 text-gray-700 leading-relaxed">
        <p>
          Welcome to <strong>Summer Bites</strong> — a recipe blog dedicated to
          cold, refreshing dishes that make hot summer days delicious.
        </p>

        <p>
          From crisp salads and chilled soups to no-bake desserts and tropical
          smoothie bowls, every recipe here is designed to keep your kitchen cool
          and your taste buds happy. No ovens, no stress — just fresh
          ingredients and simple techniques.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          What You&apos;ll Find Here
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Salads</strong> — Bright, crunchy, and full of flavor
          </li>
          <li>
            <strong>Chilled Soups</strong> — Classic gazpacho and beyond
          </li>
          <li>
            <strong>No-Bake Desserts</strong> — Sweet treats without the oven
          </li>
          <li>
            <strong>Smoothies &amp; Drinks</strong> — Tropical bowls and iced
            refreshments
          </li>
          <li>
            <strong>Cold Pasta</strong> — Perfect for picnics and potlucks
          </li>
          <li>
            <strong>Meal-Prep Bowls</strong> — Healthy make-ahead meals
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Our Philosophy
        </h2>
        <p>
          We believe summer cooking should be effortless. That means recipes with
          short prep times, minimal ingredients, and big bold flavors. Every
          recipe is tested, tasted, and designed to be approachable for cooks of
          all levels.
        </p>
      </div>
    </div>
  );
}
