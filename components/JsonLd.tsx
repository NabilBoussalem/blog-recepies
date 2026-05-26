import type { RecipeFrontmatter } from "@/lib/types";
import { SITE_URL } from "@/lib/constants";

interface JsonLdProps {
  recipe: RecipeFrontmatter;
}

export default function JsonLd({ recipe }: JsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    image: `${SITE_URL}${recipe.image}`,
    datePublished: recipe.date,
    ...(recipe.updatedAt && { dateModified: recipe.updatedAt }),
    prepTime: toISO8601Duration(recipe.prepTime),
    ...(recipe.chillTime && {
      cookTime: toISO8601Duration(recipe.chillTime),
    }),
    totalTime: toISO8601Duration(recipe.totalTime),
    recipeYield: `${recipe.servings} servings`,
    recipeCategory: recipe.category,
    keywords: recipe.tags.join(", "),
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: step,
    })),
    ...(recipe.calories && {
      nutrition: {
        "@type": "NutritionInformation",
        calories: `${recipe.calories} calories`,
      },
    }),
    author: {
      "@type": "Organization",
      name: "Summer Bites",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function toISO8601Duration(time: string): string {
  const lower = time.toLowerCase().trim();
  const hourMatch = lower.match(/(\d+)\s*h/);
  const minMatch = lower.match(/(\d+)\s*min/);

  const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
  const minutes = minMatch ? parseInt(minMatch[1], 10) : 0;

  if (hours > 0 && minutes > 0) return `PT${hours}H${minutes}M`;
  if (hours > 0) return `PT${hours}H`;
  return `PT${minutes}M`;
}
