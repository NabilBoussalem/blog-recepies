import type { RecipeFrontmatter } from "@/lib/types";

interface RecipeMetaProps {
  recipe: RecipeFrontmatter;
}

export default function RecipeMeta({ recipe }: RecipeMetaProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
      <MetaItem label="Prep Time" value={recipe.prepTime} icon="⏱️" />
      {recipe.chillTime && (
        <MetaItem label="Chill Time" value={recipe.chillTime} icon="❄️" />
      )}
      <MetaItem label="Total Time" value={recipe.totalTime} icon="🕐" />
      <MetaItem
        label="Servings"
        value={`${recipe.servings} servings`}
        icon="🍽️"
      />
      <MetaItem label="Difficulty" value={recipe.difficulty} icon="📊" />
      {recipe.calories && (
        <MetaItem
          label="Calories"
          value={`${recipe.calories} kcal`}
          icon="🔥"
        />
      )}
    </div>
  );
}

function MetaItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-1">
      <span className="text-xl" role="img" aria-hidden="true">
        {icon}
      </span>
      <span className="text-xs text-gray-500 uppercase tracking-wide">
        {label}
      </span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}
