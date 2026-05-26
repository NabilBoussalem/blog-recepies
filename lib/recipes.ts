import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Recipe, RecipeFrontmatter, RecipeIndex } from "./types";

const recipesDirectory = path.join(process.cwd(), "content", "recipes");

function validateFrontmatter(data: Record<string, unknown>): RecipeFrontmatter {
  const required: (keyof RecipeFrontmatter)[] = [
    "title",
    "slug",
    "description",
    "date",
    "prepTime",
    "totalTime",
    "servings",
    "category",
    "tags",
    "image",
    "imageAlt",
    "difficulty",
    "ingredients",
    "instructions",
  ];

  for (const key of required) {
    if (data[key] === undefined || data[key] === null) {
      throw new Error(`Missing required frontmatter field: ${key}`);
    }
  }

  return {
    title: String(data.title),
    slug: String(data.slug),
    description: String(data.description),
    date: String(data.date),
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    prepTime: String(data.prepTime),
    chillTime: data.chillTime ? String(data.chillTime) : undefined,
    totalTime: String(data.totalTime),
    servings: Number(data.servings),
    category: String(data.category),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    image: String(data.image),
    imageAlt: String(data.imageAlt),
    difficulty: data.difficulty as RecipeFrontmatter["difficulty"],
    calories: data.calories ? Number(data.calories) : undefined,
    ingredients: Array.isArray(data.ingredients)
      ? data.ingredients.map(String)
      : [],
    instructions: Array.isArray(data.instructions)
      ? data.instructions.map(String)
      : [],
  };
}

export function getAllRecipes(): Recipe[] {
  if (!fs.existsSync(recipesDirectory)) {
    return [];
  }

  const fileNames = fs
    .readdirSync(recipesDirectory)
    .filter((f) => f.endsWith(".mdx"));

  const recipes = fileNames
    .map((fileName) => {
      const fullPath = path.join(recipesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      try {
        const frontmatter = validateFrontmatter(data);
        return { ...frontmatter, content };
      } catch {
        console.warn(`Skipping ${fileName}: invalid frontmatter`);
        return null;
      }
    })
    .filter((r): r is Recipe => r !== null);

  return recipes.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getRecipeBySlug(slug: string): Recipe | null {
  const recipes = getAllRecipes();
  return recipes.find((r) => r.slug === slug) ?? null;
}

export function getAllSlugs(): string[] {
  return getAllRecipes().map((r) => r.slug);
}

export function getAllCategories(): string[] {
  const recipes = getAllRecipes();
  const categories = new Set(recipes.map((r) => r.category));
  return Array.from(categories).sort();
}

export function getAllTags(): string[] {
  const recipes = getAllRecipes();
  const tags = new Set(recipes.flatMap((r) => r.tags));
  return Array.from(tags).sort();
}

export function getRecipesByCategory(category: string): Recipe[] {
  return getAllRecipes().filter(
    (r) => r.category.toLowerCase() === category.toLowerCase()
  );
}

export function getRecipesByTag(tag: string): Recipe[] {
  return getAllRecipes().filter((r) =>
    r.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getRelatedRecipes(recipe: Recipe, limit = 3): Recipe[] {
  const all = getAllRecipes().filter((r) => r.slug !== recipe.slug);

  const scored = all.map((r) => {
    let score = 0;
    if (r.category === recipe.category) score += 3;
    const sharedTags = r.tags.filter((t) => recipe.tags.includes(t));
    score += sharedTags.length;
    return { recipe: r, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.recipe);
}

export function getRecipeIndex(): RecipeIndex[] {
  return getAllRecipes().map((r) => ({
    title: r.title,
    slug: r.slug,
    description: r.description,
    date: r.date,
    prepTime: r.prepTime,
    totalTime: r.totalTime,
    servings: r.servings,
    category: r.category,
    tags: r.tags,
    image: r.image,
    imageAlt: r.imageAlt,
    difficulty: r.difficulty,
    calories: r.calories,
    ingredients: r.ingredients,
  }));
}

export function categoryToSlug(category: string): string {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
}

export function tagToSlug(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
}
