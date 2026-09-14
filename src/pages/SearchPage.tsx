import { Link, useSearchParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { articles } from "../data/articles";

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = (params.get("q") || "").toLowerCase().trim();
  const results = query ? articles.filter((article) => `${article.title} ${article.excerpt} ${article.body.join(" ")}`.toLowerCase().includes(query)) : [];

  return (
    <div className="page-enter"><section style={{ padding: "64px 0 44px", borderBottom: "1px solid var(--border)" }}><div className="container"><div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 12 }}>Поиск</div><h1 style={{ fontSize: "clamp(30px,5vw,48px)", letterSpacing: "-.03em", color: "var(--text)" }}>{query ? `Результаты: «${params.get("q")}"` : "Поиск по новостям"}</h1><p style={{ color: "var(--text-muted)", marginTop: 10 }}>{query ? `Найдено: ${results.length}` : "Введите запрос в строку поиска в верхней части сайта"}</p></div></section><section style={{ padding: "44px 0 80px" }}><div className="container" style={{ maxWidth: 900 }}>{results.length > 0 ? <div className="search-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}>{results.map((article, index) => <ArticleCard key={article.id} article={article} index={index} />)}</div> : <div style={{ padding: 72, textAlign: "center", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", color: "var(--text-muted)" }}>{query ? "Ничего не найдено. Попробуйте изменить запрос." : <Link to="/" style={{ color: "var(--accent)" }}>Вернуться к последним новостям →</Link>}</div>}</div></section><style>{`@media(max-width:650px){.search-grid{grid-template-columns:1fr!important}}`}</style></div>
  );
}
