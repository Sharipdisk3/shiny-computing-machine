import { Navigate, useParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { getArticlesByCategory } from "../data/articles";
import { categories } from "../data/categories";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((item) => item.slug === slug);
  if (!category) return <Navigate to="/" replace />;
  const categoryArticles = getArticlesByCategory(category.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="page-enter">
      <section style={{ padding: "64px 0 48px", borderBottom: "1px solid var(--border)" }}>
        <div className="container"><div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 12 }}>Рубрика</div><h1 style={{ fontSize: "clamp(32px,5vw,52px)", letterSpacing: "-.03em", marginBottom: 12, color: "var(--text)" }}>{category.name}</h1><p style={{ color: "var(--text-muted)", fontSize: 17 }}>{category.description}</p></div>
      </section>
      <section style={{ padding: "48px 0 80px" }}><div className="container"><div className="category-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>{categoryArticles.map((article, index) => <ArticleCard key={article.id} article={article} index={index} />)}</div></div></section>
      <style>{`@media(max-width:900px){.category-grid{grid-template-columns:repeat(2,1fr)!important}} @media(max-width:600px){.category-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
