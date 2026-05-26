import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllCategories,
  getRecipesByCategory,
  categoryToSlug,
} from "@/lib/recipes";
import RecipeCard from "@/components/RecipeCard";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return getAllCategories().map((cat) => ({
    category: categoryToSlug(cat),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const allCategories = getAllCategories();
  const match = allCategories.find((c) => categoryToSlug(c) === category);
  const name = match || category;

  return {
    title: `${name} Recipes`,
    description: `Discover delicious cold ${name.toLowerCase()} recipes perfect for summer.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const allCategories = getAllCategories();
  const match = allCategories.find((c) => categoryToSlug(c) === category);

  if (!match) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Category Not Found
        </h1>
        <p className="text-gray-500 mb-6">
          The category you are looking for does not exist.
        </p>
        <Link href="/recipes" className="text-emerald-600 hover:underline">
          ← Browse all recipes
        </Link>
      </div>
    );
  }

  const recipes = getRecipesByCategory(match);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Recipes", href: "/recipes" },
          { name: match, href: `/categories/${category}` },
        ]}
      />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <nav
          aria-label="Breadcrumb"
          className="text-sm text-gray-400 mb-6 flex items-center gap-2"
        >
          <Link href="/" className="hover:text-emerald-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/recipes" className="hover:text-emerald-600">
            Recipes
          </Link>
          <span>/</span>
          <span className="text-gray-600">{match}</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {match} Recipes
        </h1>
        <p className="text-gray-500 mb-8">
          {recipes.length} delicious {match.toLowerCase()} recipe
          {recipes.length !== 1 ? "s" : ""} for summer.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </div>
    </>
  );
}
