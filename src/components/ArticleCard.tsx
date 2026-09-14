import { Link } from "react-router-dom";
import type { Article } from "../data/articles";
import CategoryBadge from "./CategoryBadge";

interface Props {
  article: Article;
  index?: number;
}

export default function ArticleCard({ article, index = 0 }: Props) {
  return (
    <Link
      to={`/article/${article.id}`}
      className="article-card"
      style={{
        display: "block",
        height: "100%",
        overflow: "hidden",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-sm)",
        animation: "fadeInUp .45s ease-out both",
        animationDelay: `${index * .06}s`,
      }}
    >
      <div className="card-image" style={{ aspectRatio: "16 / 9", overflow: "hidden", background: "var(--bg-elevated)" }}>
        <img src={article.image} alt={article.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ padding: "20px 22px 22px" }}>
        <CategoryBadge category={article.category} />
        <h3 style={{ fontSize: 20, lineHeight: 1.3, margin: "12px 0 10px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {article.title}
        </h3>
        <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.55, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {article.excerpt}
        </p>
        <div style={{ paddingTop: 14, borderTop: "1px solid var(--border)", fontSize: 13, color: "var(--text-muted)" }}>
          {formatDate(article.date)}
        </div>
      </div>
    </Link>
  );
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value));
}
