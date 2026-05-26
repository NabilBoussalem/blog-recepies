import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAllSlugs,
  getRecipeBySlug,
  getRelatedRecipes,
  tagToSlug,
} from "@/lib/recipes";
import { SITE_URL } from "@/lib/constants";
import RecipeMeta from "@/components/RecipeMeta";
import RecipeCard from "@/components/RecipeCard";
import JsonLd, { BreadcrumbJsonLd } from "@/components/JsonLd";
import { mdxComponents } from "@/components/MDXComponents";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return { title: "Recipe Not Found" };

  return {
    title: recipe.title,
    description: recipe.description,
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      type: "article",
      publishedTime: recipe.date,
      modifiedTime: recipe.updatedAt,
      images: [{ url: `${SITE_URL}${recipe.image}`, alt: recipe.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: recipe.title,
      description: recipe.description,
      images: [`${SITE_URL}${recipe.image}`],
    },
    alternates: {
      canonical: `${SITE_URL}/recipes/${recipe.slug}`,
    },
  };
}

export default async function RecipePage({ params }: PageProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  const related = getRelatedRecipes(recipe);

  return (
    <>
      <JsonLd recipe={recipe} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Recipes", href: "/recipes" },
          { name: recipe.title, href: `/recipes/${recipe.slug}` },
        ]}
      />

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
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
          <span className="text-gray-600">{recipe.title}</span>
        </nav>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          {recipe.title}
        </h1>
        <p className="text-lg text-gray-500 mb-6">{recipe.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {recipe.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tagToSlug(tag)}`}
              className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full hover:bg-emerald-100 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>

        {/* Image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
          <Image
            src={recipe.image}
            alt={recipe.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>

        {/* Meta info */}
        <RecipeMeta recipe={recipe} />

        {/* Ingredients */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🛒 Ingredients
          </h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  ✓
                </span>
                {ing}
              </li>
            ))}
          </ul>
        </section>

        {/* Instructions */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            📝 Instructions
          </h2>
          <ol className="space-y-4">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-gray-700 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* MDX Content */}
        <section className="mt-10 recipe-content">
          <MDXRemote source={recipe.content} components={mdxComponents} />
        </section>
      </article>

      {/* Related Recipes */}
      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
