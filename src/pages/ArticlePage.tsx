import { Link, Navigate, useParams } from "react-router-dom";
import CategoryBadge from "../components/CategoryBadge";
import ArticleCard from "../components/ArticleCard";
import ShareButtons from "../components/ShareButtons";
import { getArticle, articles } from "../data/articles";

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const article = id ? getArticle(id) : undefined;
  if (!article) return <Navigate to="/" replace />;
  const related = articles.filter((item) => item.category === article.category && item.id !== article.id).slice(0, 3);

  return (
    <div className="page-enter">
      <article style={{ padding: "40px 0 80px" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-muted)", fontSize: 14, marginBottom: 36 }}>← Назад к новостям</Link>
          <CategoryBadge category={article.category} size="md" />
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.15, letterSpacing: "-.03em", margin: "18px 0 16px", maxWidth: 880, color: "var(--text)" }}>{article.title}</h1>
          <p style={{ color: "var(--text-muted)", fontSize: 19, lineHeight: 1.55, maxWidth: 760, marginBottom: 24 }}>{article.excerpt}</p>
          <div style={{ color: "var(--text-muted)", fontSize: 13, paddingBottom: 28, borderBottom: "1px solid var(--border)" }}>{formatDate(article.date)} · TechStream.kz</div>
        </div>

        <div className="container" style={{ marginTop: 32 }}><div style={{ maxWidth: 1060, margin: "0 auto", aspectRatio: "16 / 7", overflow: "hidden", borderRadius: "var(--radius-xl)", background: "var(--bg-elevated)", border: "1px solid var(--border)" }}><img src={article.image} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div></div>

        <div className="container" style={{ maxWidth: 760, marginTop: 44 }}>
          <div className="article-body">{article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <ShareButtons title={article.title} url={`https://techstream.kz/article/${article.id}`} />
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 36, padding: "12px 20px", borderRadius: 8, background: "var(--accent)", color: "#fff", fontSize: 14, fontWeight: 600 }}>← Назад к новостям</Link>
        </div>
      </article>

      {related.length > 0 && <section style={{ borderTop: "1px solid var(--border)", padding: "48px 0 80px" }}><div className="container"><div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 8 }}>Продолжить чтение</div><h2 style={{ fontSize: 27, marginBottom: 24 }}>Похожие новости</h2><div className="related-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>{related.map((item, index) => <ArticleCard key={item.id} article={item} index={index} />)}</div></div></section>}

      <style>{`.article-body p{font-size:18px;line-height:1.75;color:var(--text);margin:0 0 24px}.article-body p:first-child:first-letter{font-size:3.2em;font-family:var(--font-head);font-weight:700;color:var(--accent);float:left;line-height:.85;padding:7px 10px 0 0}@media(max-width:700px){.related-grid{grid-template-columns:1fr!important}.article-body p{font-size:16px}}`}</style>
    </div>
  );
}

function formatDate(value: string): string { return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value)); }
