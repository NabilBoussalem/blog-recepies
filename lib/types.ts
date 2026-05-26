export interface RecipeFrontmatter {
  title: string;
  slug: string;
  description: string;
  date: string;
  updatedAt?: string;
  prepTime: string;
  chillTime?: string;
  totalTime: string;
  servings: number;
  category: string;
  tags: string[];
  image: string;
  imageAlt: string;
  difficulty: "Easy" | "Medium" | "Hard";
  calories?: number;
  ingredients: string[];
  instructions: string[];
}

export interface Recipe extends RecipeFrontmatter {
  content: string;
}

export interface RecipeIndex {
  title: string;
  slug: string;
  description: string;
  date: string;
  prepTime: string;
  totalTime: string;
  servings: number;
  category: string;
  tags: string[];
  image: string;
  imageAlt: string;
  difficulty: "Easy" | "Medium" | "Hard";
  calories?: number;
  ingredients: string[];
}
