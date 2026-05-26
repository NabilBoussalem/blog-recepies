import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags, getRecipesByTag, tagToSlug } from "@/lib/recipes";
import RecipeCard from "@/components/RecipeCard";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({
    tag: tagToSlug(tag),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const allTags = getAllTags();
  const match = allTags.find((t) => tagToSlug(t) === tag);
  const name = match || tag;

  return {
    title: `${name} Recipes`,
    description: `Summer recipes tagged with "${name}" — refreshing and easy to make.`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const allTags = getAllTags();
  const match = allTags.find((t) => tagToSlug(t) === tag);

  if (!match) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Tag Not Found
        </h1>
        <p className="text-gray-500 mb-6">
          The tag you are looking for does not exist.
        </p>
        <Link href="/recipes" className="text-emerald-600 hover:underline">
          ← Browse all recipes
        </Link>
      </div>
    );
  }

  const recipes = getRecipesByTag(match);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Recipes", href: "/recipes" },
          { name: `#${match}`, href: `/tags/${tag}` },
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
          <span className="text-gray-600">#{match}</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Recipes tagged &ldquo;{match}&rdquo;
        </h1>
        <p className="text-gray-500 mb-8">
          {recipes.length} recipe{recipes.length !== 1 ? "s" : ""} found.
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
