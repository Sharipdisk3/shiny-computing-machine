import { Link } from "react-router-dom";
import { categories } from "../data/categories";

export default function Footer() {
  return (
    <footer style={{ marginTop: 80, padding: "54px 0 28px", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
      <div className="container">
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 48, paddingBottom: 42 }}>
          <div>
            <Link to="/" style={{ fontFamily: "var(--font-head)", fontSize: 20, fontWeight: 800, color: "var(--text)" }}>Tech<span style={{ color: "var(--accent)" }}>Stream</span><small style={{ color: "var(--text-muted)", fontSize: 11 }}>.kz</small></Link>
            <p style={{ maxWidth: 330, marginTop: 16, color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6 }}>Технологические новости Казахстана и мира. Коротко о главном, подробно о важном.</p>
          </div>
          <div><h4 style={footerHeading}>Разделы</h4><div style={footerLinks}>{categories.map((category) => <Link key={category.id} to={`/category/${category.slug}`} style={footerLink}>{category.name}</Link>)}</div></div>
          <div><h4 style={footerHeading}>Контакты</h4><div style={footerLinks}><Link to="/about" style={footerLink}>О редакции</Link><a href="mailto:techstreamkz@gmail.com" style={footerLink}>techstreamkz@gmail.com</a><a href="tel:+77476983191" style={footerLink}>+7 747 698 3191</a></div></div>
        </div>
        <div className="footer-social" style={{ display: "flex", gap: 12, alignItems: "center", paddingBottom: 22 }}>
          <span style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--text-muted)", marginRight: 8 }}>Мы в соцсетях</span>
          <a href="https://www.instagram.com/techstream.kz/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={socialIconStyle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
          </a>
          <a href="https://t.me/techstreamkz" target="_blank" rel="noopener noreferrer" aria-label="Telegram" style={socialIconStyle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 4.3L2.8 11.6c-.9.4-.9 1.6 0 1.9l4.7 1.5 1.8 5.7c.3.8 1.3 1 1.9.4l2.7-2.6 4.8 3.5c.7.5 1.7.1 1.9-.7l3.2-15.2c.2-1-.8-1.8-1.7-1.4zM9.5 16.3l-.4 3.9-1.4-4.4 9.2-6.6-7.4 7.1z" /></svg>
          </a>
          <a href="https://www.facebook.com/profile.php?id=61565242329566" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={socialIconStyle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
          </a>
        </div>
        <div className="footer-bottom" style={{ borderTop: "1px solid var(--border)", paddingTop: 22, display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: 12 }}><span>© 2026 TechStream.kz</span><span>Новости технологий без лишнего шума</span></div>
      </div>
      <style>{`@media (max-width: 700px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; } .footer-grid > :first-child { grid-column: 1 / -1; } .footer-bottom { flex-direction:column; gap:8px; } }`}</style>
    </footer>
  );
}

const footerHeading: React.CSSProperties = { fontSize: 12, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--text)", marginBottom: 14 };
const footerLink: React.CSSProperties = { display: "block", color: "var(--text-muted)", fontSize: 14, marginBottom: 10 };
const footerLinks: React.CSSProperties = { display: "flex", flexDirection: "column" };
const socialIconStyle: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg-soft)", color: "var(--text-muted)", transition: "all .2s ease" };
