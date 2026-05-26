"use client";

import { useState, useMemo } from "react";
import type { RecipeIndex } from "@/lib/types";
import RecipeCard from "./RecipeCard";

interface RecipeSearchProps {
  recipes: RecipeIndex[];
  categories: string[];
}

function parseMinutes(time: string): number {
  const lower = time.toLowerCase();
  const hourMatch = lower.match(/(\d+)\s*h/);
  const minMatch = lower.match(/(\d+)\s*min/);
  const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
  const minutes = minMatch ? parseInt(minMatch[1], 10) : 0;
  return hours * 60 + minutes;
}

export default function RecipeSearch({
  recipes,
  categories,
}: RecipeSearchProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [sort, setSort] = useState("newest");

  const filtered = useMemo(() => {
    let result = [...recipes];

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.ingredients.some((ing) => ing.toLowerCase().includes(q)) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (category) {
      result = result.filter((r) => r.category === category);
    }

    if (maxTime) {
      const max = parseInt(maxTime, 10);
      result = result.filter((r) => parseMinutes(r.prepTime) <= max);
    }

    switch (sort) {
      case "newest":
        result.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "fastest":
        result.sort(
          (a, b) => parseMinutes(a.totalTime) - parseMinutes(b.totalTime)
        );
        break;
      case "popular":
        break;
    }

    return result;
  }, [recipes, query, category, maxTime, sort]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <div>
          <label
            htmlFor="search"
            className="block text-xs font-medium text-gray-500 mb-1"
          >
            Search
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300"
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-xs font-medium text-gray-500 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 bg-white"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="maxTime"
            className="block text-xs font-medium text-gray-500 mb-1"
          >
            Prep Time
          </label>
          <select
            id="maxTime"
            value={maxTime}
            onChange={(e) => setMaxTime(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 bg-white"
          >
            <option value="">Any Time</option>
            <option value="10">Under 10 min</option>
            <option value="20">Under 20 min</option>
            <option value="30">Under 30 min</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="sort"
            className="block text-xs font-medium text-gray-500 mb-1"
          >
            Sort By
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 bg-white"
          >
            <option value="newest">Newest</option>
            <option value="fastest">Fastest</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No recipes found. Try adjusting your filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      )}

      <p className="text-sm text-gray-400 mt-6 text-center">
        {filtered.length} recipe{filtered.length !== 1 ? "s" : ""} found
      </p>
    </div>
  );
}
