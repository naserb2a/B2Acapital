"use client";
interface ModuleCardProps {
  name: string;
  badge: string;
  desc: string;
  price: string;
  installed: boolean;
}

export default function ModuleCard({ name, badge, desc, price, installed }: ModuleCardProps) {
  return (
    <div style={{
      background: installed ? "var(--db-bg3)" : "var(--db-bg2)",
      border: `0.5px solid ${installed ? "var(--db-border-mid)" : "var(--db-border)"}`,
      borderRadius: 14,
      padding: "18px 18px 16px",
      display: "flex", flexDirection: "column", gap: 12,
      transition: "border-color 0.2s",
      cursor: "default",
    }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--db-border-hi)")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = installed ? "var(--db-border-mid)" : "var(--db-border)")}
    >
      {/* Badge + price */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{
          fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
          color: "var(--db-blue)", background: "var(--db-blue-dim)",
          border: "1px solid var(--db-border-mid)",
          padding: "2px 8px", borderRadius: 999,
          fontFamily: "var(--font-geist-mono)",
        }}>{badge}</span>
        <span style={{
          fontSize: 11, color: "var(--db-ink-muted)",
          fontFamily: "var(--font-geist-mono)",
        }}>{price}</span>
      </div>

      {/* Name + desc */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--db-ink)", marginBottom: 6, letterSpacing: "-0.01em", fontFamily: "var(--font-geist-sans)" }}>{name}</div>
        <p style={{ fontSize: 14, color: "var(--db-ink-muted)", lineHeight: 1.6, margin: 0, fontFamily: "var(--font-geist-sans)" }}>{desc}</p>
      </div>

      {/* Button */}
      {installed ? (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          padding: "8px 0", borderRadius: 10,
          background: "var(--db-green-dim)", border: "1px solid rgba(61,214,140,0.2)",
          fontSize: 12, fontWeight: 600, color: "var(--db-green)",
          fontFamily: "var(--font-geist-sans)",
        }}>
          ✓ Installed
        </div>
      ) : (
        <button style={{
          width: "100%", background: "var(--db-blue)", color: "#fff",
          border: "none", borderRadius: 10, padding: "8px 0",
          fontSize: 12, fontWeight: 600, cursor: "pointer",
          transition: "opacity 0.15s",
          fontFamily: "var(--font-geist-sans)",
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          Get Module
        </button>
      )}
    </div>
  );
}
