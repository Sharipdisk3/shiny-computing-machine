import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { categories } from "../data/categories";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
    setSearchOpen(false);
  };

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)" }}>
      <div className="container" style={{ height: "var(--header-h)", display: "flex", alignItems: "center", gap: 28 }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--accent)", display: "grid", placeItems: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h10M4 17h16" /><circle cx="18" cy="12" r="2" fill="#fff" /></svg>
          </div>
          <span style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 20, letterSpacing: "-.04em", color: "var(--text)" }}>Tech<span style={{ color: "var(--accent)" }}>Stream</span><small style={{ color: "var(--text-muted)", fontSize: 11 }}>.kz</small></span>
        </Link>

        <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }}>
          <NavLink to="/" end style={navStyle}>Главная</NavLink>
          {categories.map((category) => <NavLink key={category.id} to={`/category/${category.slug}`} style={navStyle}>{category.name}</NavLink>)}
          <NavLink to="/about" style={navStyle}>О редакции</NavLink>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: "auto" }}>
          <button onClick={() => setSearchOpen((open) => !open)} aria-label="Поиск" style={iconButtonStyle}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
          </button>
          <button className="mobile-menu-button" onClick={() => setMobileOpen((open) => !open)} aria-label="Меню" style={{ ...iconButtonStyle, display: "none" }}>
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">{mobileOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}</svg>
          </button>
        </div>
      </div>

      {searchOpen && <div style={{ borderTop: "1px solid var(--border)", padding: "14px 0", animation: "slideDown .2s ease-out", background: "var(--bg)" }}><div className="container"><form onSubmit={submitSearch} style={{ maxWidth: 680, margin: "0 auto", position: "relative" }}><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск по новостям..." style={{ width: "100%", padding: "12px 18px", borderRadius: 8, border: "1px solid var(--border-strong)", background: "var(--bg-soft)", color: "var(--text)", outline: "none" }} /></form></div></div>}

      {mobileOpen && <div className="mobile-nav" style={{ display: "none", padding: "12px 16px 24px", borderTop: "1px solid var(--border)", animation: "slideDown .2s ease-out", background: "var(--bg)" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <NavLink to="/" end style={mobileNavStyle}>Главная</NavLink>
          {categories.map((category) => <NavLink key={category.id} to={`/category/${category.slug}`} style={mobileNavStyle}>{category.name}</NavLink>)}
          <NavLink to="/about" style={mobileNavStyle}>О редакции</NavLink>
        </div>
      </div>}

      <style>{`@media (max-width: 900px) { .desktop-nav { display:none !important; } .mobile-menu-button { display:grid !important; place-items:center; } .mobile-nav { display:block !important; } }`}</style>
    </header>
  );
}

const iconButtonStyle: React.CSSProperties = { width: 38, height: 38, borderRadius: 8, display: "grid", placeItems: "center", color: "var(--text-soft)", transition: "background .2s, color .2s" };
const navStyle = ({ isActive }: { isActive: boolean }): React.CSSProperties => ({ padding: "8px 12px", borderRadius: 8, fontSize: 14, fontWeight: 600, color: isActive ? "var(--accent)" : "var(--text-soft)", background: isActive ? "var(--accent-soft)" : "transparent", whiteSpace: "nowrap" });
const mobileNavStyle: React.CSSProperties = { padding: "13px 14px", borderRadius: 8, fontSize: 15, fontWeight: 600, color: "var(--text-soft)" };
