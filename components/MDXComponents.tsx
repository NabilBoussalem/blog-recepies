import React from "react";

interface CalloutProps {
  type?: "info" | "warning" | "tip";
  children: React.ReactNode;
}

function Callout({ type = "info", children }: CalloutProps) {
  const styles = {
    info: "bg-sky-50 border-sky-200 text-sky-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    tip: "bg-emerald-50 border-emerald-200 text-emerald-800",
  };

  const icons = {
    info: "ℹ️",
    warning: "⚠️",
    tip: "💡",
  };

  return (
    <div
      className={`my-4 p-4 rounded-xl border ${styles[type]} flex items-start gap-3`}
    >
      <span className="text-lg flex-shrink-0" role="img" aria-hidden="true">
        {icons[type]}
      </span>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return <Callout type="tip">{children}</Callout>;
}

function NutritionBox({
  calories,
  protein,
  carbs,
  fat,
  fiber,
}: {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
}) {
  return (
    <div className="my-6 p-4 bg-amber-50/50 border border-amber-100 rounded-xl">
      <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
        Nutrition per Serving
      </h4>
      <div className="grid grid-cols-5 gap-2 text-center">
        {[
          { label: "Calories", value: `${calories}` },
          { label: "Protein", value: protein },
          { label: "Carbs", value: carbs },
          { label: "Fat", value: fat },
          { label: "Fiber", value: fiber },
        ].map((item) => (
          <div key={item.label}>
            <div className="text-base font-bold text-gray-900">
              {item.value}
            </div>
            <div className="text-xs text-gray-500">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IngredientList({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 p-4 bg-lime-50/50 border border-lime-100 rounded-xl">
      <h4 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide">
        🛒 Ingredients
      </h4>
      {children}
    </div>
  );
}

export const mdxComponents = {
  Callout,
  Tip,
  NutritionBox,
  IngredientList,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-2xl font-bold text-gray-900 mt-8 mb-4"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-xl font-semibold text-gray-900 mt-6 mb-3"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-gray-700 leading-relaxed mb-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside space-y-1 mb-4 text-gray-700" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside space-y-1 mb-4 text-gray-700" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-gray-700" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-gray-900" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700"
      {...props}
    />
  ),
};
