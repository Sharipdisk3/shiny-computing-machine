export type CategoryId = "world" | "kazakhstan";

export interface Category {
  id: CategoryId;
  name: string;
  slug: string;
  description: string;
}

export const categories: Category[] = [
  { id: "world", name: "Мировые новости", slug: "world", description: "Технологические новости со всего мира" },
  { id: "kazakhstan", name: "Новости Казахстана", slug: "kazakhstan", description: "Технологии и инновации в Казахстане" },
];

export const categoryMap: Record<CategoryId, Category> = Object.fromEntries(
  categories.map((c) => [c.id, c])
) as Record<CategoryId, Category>;
