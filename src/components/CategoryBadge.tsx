import { Link } from "react-router-dom";
import type { CategoryId } from "../data/categories";
import { categoryMap } from "../data/categories";

interface Props {
  category: CategoryId;
  size?: "sm" | "md";
}

export default function CategoryBadge({ category, size = "sm" }: Props) {
  const cat = categoryMap[category];
  const isKazakhstan = category === "kazakhstan";
  const color = isKazakhstan ? "var(--cat-kazakhstan)" : "var(--cat-world)";
  return (
    <Link
      to={`/category/${cat.slug}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: size === "md" ? "7px 14px" : "4px 10px",
        borderRadius: 999,
        background: "var(--bg-elevated)",
        color: "var(--text)",
        fontFamily: "var(--font-head)",
        fontSize: size === "md" ? 13 : 11,
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
      {cat.name}
    </Link>
  );
}
