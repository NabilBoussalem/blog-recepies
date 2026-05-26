import Image from "next/image";
import Link from "next/link";
import type { RecipeFrontmatter } from "@/lib/types";

interface RecipeCardProps {
  recipe: Pick<
    RecipeFrontmatter,
    | "title"
    | "slug"
    | "description"
    | "image"
    | "imageAlt"
    | "prepTime"
    | "totalTime"
    | "category"
    | "tags"
    | "difficulty"
  >;
  priority?: boolean;
}

export default function RecipeCard({
  recipe,
  priority = false,
}: RecipeCardProps) {
  return (
    <article className="group rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden transition-shadow hover:shadow-md">
      <Link href={`/recipes/${recipe.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={recipe.image}
            alt={recipe.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
          />
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full text-emerald-700">
            {recipe.category}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-1 group-hover:text-emerald-700 transition-colors">
            {recipe.title}
          </h3>
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
            {recipe.description}
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <ClockIcon />
              {recipe.totalTime}
            </span>
            <span className="flex items-center gap-1">
              <DifficultyIcon />
              {recipe.difficulty}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {recipe.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}

function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-3.5 h-3.5"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function DifficultyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-3.5 h-3.5"
      aria-hidden="true"
    >
      <path d="M10.362 1.093a.75.75 0 00-.724 0L2.523 5.018 10 9.143l7.477-4.125-7.115-3.925zM18 6.443l-7.25 4v8.25l6.862-3.786A.75.75 0 0018 14.25V6.443zm-8.75 12.25v-8.25l-7.25-4v7.807a.75.75 0 00.388.657l6.862 3.786z" />
    </svg>
  );
}
