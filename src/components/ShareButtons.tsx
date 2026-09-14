import { useState } from "react";

interface Props {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shares = [
    { name: "Telegram", color: "#229ED9", href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}` },
    { name: "WhatsApp", color: "#25D366", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
    { name: "VK", color: "#0077FF", href: `https://vk.com/share.php?url=${encodedUrl}&title=${encodedTitle}` },
    { name: "Twitter/X", color: "#1DA1F2", href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` },
    { name: "Facebook", color: "#1877F2", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { name: "LinkedIn", color: "#0A66C2", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { name: "Reddit", color: "#FF4500", href: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}` },
  ];

  const handleCopy = () => {
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ marginTop: 32, paddingTop: 28, borderTop: "1px solid var(--border)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "10px 18px", borderRadius: 8,
            background: open ? "var(--accent)" : "var(--bg-soft)",
            border: "1px solid var(--border)",
            color: open ? "#fff" : "var(--text)",
            fontSize: 14, fontWeight: 600, cursor: "pointer",
            transition: "all .2s ease",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          Поделиться
        </button>
        {open && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", animation: "fadeIn .2s ease" }}>
            {shares.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "8px 14px", borderRadius: 8,
                  background: "var(--bg-soft)", border: "1px solid var(--border)",
                  color: s.color, fontSize: 13, fontWeight: 600,
                  transition: "all .2s ease", textDecoration: "none",
                }}
              >
                {s.name}
              </a>
            ))}
            <button
              onClick={handleCopy}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "8px 14px", borderRadius: 8,
                background: "var(--bg-soft)", border: "1px solid var(--border)",
                color: copied ? "var(--accent)" : "var(--text-muted)", fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}
            >
              {copied ? "Скопировано!" : "Копировать ссылку"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
