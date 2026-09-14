import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { articles } from "../data/articles";
import { categories, type CategoryId } from "../data/categories";

const WEEK_START = "2026-09-08";
const WEEK_END = "2026-09-14";

const PAGE_SIZE = 6;

type Filter = "all" | CategoryId;

export default function HomePage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => {
    const list = filter === "all" ? articles : articles.filter((article) => article.category === filter);
    return [...list].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [filter]);
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const changeFilter = (next: Filter) => { setFilter(next); setPage(1); };

  const weeklyDigest = useMemo(() => {
    const start = new Date(WEEK_START).getTime();
    const end = new Date(WEEK_END).getTime();
    return articles
      .filter((a) => { const t = new Date(a.date).getTime(); return t >= start && t <= end + 86400000; })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  return (
    <div className="page-enter">
      <section className="hero-section" style={{ padding: "72px 0 56px", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 16 }}>TECHNOLOGY / NEWS</div>
            <h1 style={{ fontSize: "clamp(40px, 6vw, 64px)", lineHeight: 1.1, letterSpacing: "-.03em", marginBottom: 20, color: "var(--text)" }}>Технологии,<br /><span style={{ color: "var(--accent)" }}>которые меняют</span> мир.</h1>
            <p style={{ maxWidth: 620, color: "var(--text-muted)", fontSize: "clamp(16px, 2vw, 19px)", lineHeight: 1.6 }}>Новости технологий, искусственного интеллекта и цифровой экономики. Казахстан и весь мир — в одном потоке.</p>
            <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
              <Link to="/category/world" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 8, background: "var(--accent)", color: "#fff", fontSize: 15, fontWeight: 600, whiteSpace: "nowrap" }}>Читать новости →</Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 0 80px" }}>
        <div className="container">
          <div className="feed-heading" style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 20, marginBottom: 28 }}>
            <div><div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 8 }}>Последние публикации</div><h2 style={{ fontSize: "clamp(26px, 4vw, 34px)" }}>Лента новостей</h2></div>
            <div style={{ color: "var(--text-muted)", fontSize: 13 }}>{filtered.length} публикаций</div>
          </div>

          <div className="filter-row" style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingBottom: 28, borderBottom: "1px solid var(--border)", marginBottom: 32 }}>
            <button onClick={() => changeFilter("all")} style={filterStyle(filter === "all")}>Все новости</button>
            {categories.map((category) => <button key={category.id} onClick={() => changeFilter(category.id)} style={filterStyle(filter === category.id)}>{category.name}</button>)}
          </div>

          {visible.length > 0 ? <div className="news-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>{visible.map((article, index) => <ArticleCard key={article.id} article={article} index={index} />)}</div> : <div style={{ padding: 80, textAlign: "center", color: "var(--text-muted)" }}>Новостей в этой рубрике пока нет.</div>}

          {pageCount > 1 && <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 40 }}>
            <button onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1} style={paginationButton(page === 1)}>←</button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => <button key={number} onClick={() => setPage(number)} style={paginationButton(page === number)}>{number}</button>)}
            <button onClick={() => setPage((value) => Math.min(pageCount, value + 1))} disabled={page === pageCount} style={paginationButton(page === pageCount)}>→</button>
          </div>}
        </div>
      </section>

      <section style={{ padding: "0 0 56px" }}>
        <div className="container">
          <div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 8 }}>8–14 сентября 2026</div>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 34px)", marginBottom: 24 }}>Дайджест недели</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden", background: "var(--bg)" }}>
            {weeklyDigest.map((article) => (
              <Link key={article.id} to={`/article/${article.id}`} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", borderBottom: "1px solid var(--border)", textDecoration: "none", color: "var(--text)", transition: "background .15s ease" }} className="digest-row">
                <img src={article.image} alt="" style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: 15, fontWeight: 600, lineHeight: 1.35, color: "var(--text)" }}>{article.title}</span>
                <span style={{ color: "var(--text-muted)", fontSize: 12, whiteSpace: "nowrap", flexShrink: 0 }}>{formatDigestDate(article.date)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 0 80px" }}><div className="container"><div className="info-band" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, padding: "32px 36px", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", background: "var(--bg-soft)" }}><div><div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 8 }}>TechStream.kz</div><h3 style={{ fontSize: 22 }}>Технологический Казахстан — здесь</h3></div><Link to="/about" style={{ padding: "12px 20px", border: "1px solid var(--accent)", borderRadius: 8, color: "var(--accent)", fontSize: 14, fontWeight: 700, whiteSpace: "nowrap" }}>О редакции →</Link></div></div></section>

      <style>{`@media(max-width:900px){.news-grid{grid-template-columns:repeat(2,1fr)!important}} @media(max-width:600px){.news-grid{grid-template-columns:1fr!important}.feed-heading{align-items:flex-start!important;flex-direction:column}.info-band{align-items:flex-start!important;flex-direction:column}.digest-row span:nth-child(2){font-size:14px!important}} .digest-row:hover{background:var(--bg-soft)!important} .digest-row:last-child{border-bottom:none!important}`}</style>
    </div>
  );
}

function filterStyle(active: boolean): React.CSSProperties { return { padding: "9px 16px", borderRadius: 8, border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`, background: active ? "var(--accent)" : "var(--bg)", color: active ? "#fff" : "var(--text-soft)", fontSize: 13, fontWeight: 600 }; }
function paginationButton(activeOrDisabled: boolean): React.CSSProperties { return { minWidth: 38, height: 38, padding: "0 10px", borderRadius: 8, border: `1px solid ${activeOrDisabled ? "var(--border)" : "var(--accent)"}`, background: activeOrDisabled ? "var(--bg)" : "var(--accent)", color: activeOrDisabled ? "var(--text-muted)" : "#fff", fontWeight: 700, opacity: activeOrDisabled ? .5 : 1 }; }
function formatDigestDate(value: string): string { return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short" }).format(new Date(value)); }
