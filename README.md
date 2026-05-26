# 🍃 Summer Bites — Cold Summer Recipe Blog

A production-ready, SEO-optimized recipe blog built with Next.js App Router, TypeScript, Tailwind CSS, and local MDX files.

## Tech Stack

- **Next.js** (App Router) with Server Components
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **MDX** for recipe content
- **next-mdx-remote** for rendering MDX in Server Components

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
├── page.tsx                    # Homepage
├── layout.tsx                  # Root layout with header/footer
├── globals.css                 # Global styles
├── sitemap.ts                  # Dynamic sitemap
├── robots.ts                   # Robots.txt
├── recipes/
│   ├── page.tsx                # All recipes (with search/filter)
│   └── [slug]/page.tsx         # Individual recipe page
├── categories/
│   └── [category]/page.tsx     # Category listing
├── tags/
│   └── [tag]/page.tsx          # Tag listing
└── about/page.tsx              # About page

components/
├── RecipeCard.tsx              # Recipe card component
├── RecipeSearch.tsx            # Client-side search/filter
├── RecipeMeta.tsx              # Recipe metadata display
├── JsonLd.tsx                  # JSON-LD structured data
└── MDXComponents.tsx           # Custom MDX components

content/recipes/                # MDX recipe files
lib/
├── recipes.ts                  # Recipe reading/parsing
├── types.ts                    # TypeScript types
└── constants.ts                # Site constants
```

## Adding a New Recipe

1. Create a new `.mdx` file in `content/recipes/`:

```mdx
---
title: "Your Recipe Title"
slug: "your-recipe-slug"
description: "A brief description of the recipe."
date: "2025-07-01"
prepTime: "10 min"
totalTime: "10 min"
servings: 4
category: "Salads"
tags: ["tag1", "tag2"]
image: "/images/your-recipe.svg"
imageAlt: "Description of the image"
difficulty: "Easy"
calories: 150
ingredients:
  - "Ingredient 1"
  - "Ingredient 2"
instructions:
  - "Step 1"
  - "Step 2"
---

Your recipe content here using MDX.

<Tip>A helpful tip for the reader.</Tip>

<NutritionBox calories={150} protein="5g" carbs="20g" fat="5g" fiber="3g" />

<Callout type="info">Additional information.</Callout>
```

2. Add an image to `public/images/`.
3. The recipe will automatically appear on the site.

## Frontmatter Fields

| Field        | Required | Description                          |
| ------------ | -------- | ------------------------------------ |
| title        | ✅       | Recipe title                         |
| slug         | ✅       | URL-friendly identifier              |
| description  | ✅       | Short description for SEO            |
| date         | ✅       | Publication date (YYYY-MM-DD)        |
| updatedAt    | ❌       | Last updated date                    |
| prepTime     | ✅       | Active preparation time              |
| chillTime    | ❌       | Chilling/resting time                |
| totalTime    | ✅       | Total time from start to finish      |
| servings     | ✅       | Number of servings                   |
| category     | ✅       | Recipe category                      |
| tags         | ✅       | Array of tags                        |
| image        | ✅       | Path to recipe image                 |
| imageAlt     | ✅       | Accessible alt text for image        |
| difficulty   | ✅       | Easy, Medium, or Hard                |
| calories     | ❌       | Calories per serving                 |
| ingredients  | ✅       | Array of ingredient strings          |
| instructions | ✅       | Array of instruction step strings    |

## Custom MDX Components

- `<Tip>` — Highlighted tip box
- `<Callout type="info|warning|tip">` — Callout box with icon
- `<NutritionBox>` — Nutrition information display
- `<IngredientList>` — Styled ingredient container

## SEO Features

- `generateMetadata` on all pages
- Open Graph and Twitter Card metadata
- JSON-LD Recipe schema on recipe pages
- Breadcrumb schema
- Dynamic sitemap with all recipes, categories, and tags
- robots.txt
- Canonical URLs
- Semantic HTML with proper heading hierarchy

## Build

```bash
npm run build
```

## License

MIT
