"use client";
import { useState } from "react";

const SANS = "var(--font-geist-sans)";

export default function Topbar() {
  const [query, setQuery] = useState("");

  return (
    <header style={{
      height: 56,
      background: "var(--db-bg2)",
      borderBottom: "1px solid var(--db-border)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 24px", gap: 16, flexShrink: 0,
    }}>
      {/* Search */}
      <div style={{ position: "relative", flex: "0 0 280px" }}>
        <svg width={14} height={14} viewBox="0 0 14 14" fill="none" style={{
          position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
          color: "var(--db-ink-faint)", pointerEvents: "none",
        }}>
          <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M9.5 9.5l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search agents, modules, signals..."
          style={{
            width: "100%", background: "var(--db-bg3)",
            border: "1px solid var(--db-border)", borderRadius: 8,
            padding: "7px 10px 7px 30px",
            fontSize: 12, color: "var(--db-ink)", outline: "none",
            fontFamily: SANS, transition: "border-color 0.15s",
          }}
          onFocus={e => (e.currentTarget.style.borderColor = "var(--db-border-mid)")}
          onBlur={e => (e.currentTarget.style.borderColor = "var(--db-border)")}
        />
      </div>

      {/* Right controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* Bell */}
        <button style={{
          width: 34, height: 34, borderRadius: 8,
          background: "transparent", border: "1px solid var(--db-border)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", position: "relative", color: "var(--db-ink-muted)",
          transition: "background 0.15s, border-color 0.15s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--db-bg3)"; e.currentTarget.style.borderColor = "var(--db-border-mid)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "var(--db-border)"; }}
        >
          <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
            <path d="M7 1.5a4 4 0 014 4v3l1 1.5H2L3 8.5v-3a4 4 0 014-4z" stroke="currentColor" strokeWidth="1.2" />
            <path d="M5.5 11.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span style={{
            position: "absolute", top: 6, right: 6,
            width: 6, height: 6, borderRadius: "50%",
            background: "var(--db-red)", border: "1.5px solid var(--db-bg2)",
          }} />
        </button>

        {/* Clock */}
        <button style={{
          width: 34, height: 34, borderRadius: 8,
          background: "transparent", border: "1px solid var(--db-border)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "var(--db-ink-muted)",
          transition: "background 0.15s, border-color 0.15s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--db-bg3)"; e.currentTarget.style.borderColor = "var(--db-border-mid)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "var(--db-border)"; }}
        >
          <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M7 4v3.5l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Run Agent CTA */}
        <button style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "var(--db-blue)", color: "#fff",
          border: "none", borderRadius: 8,
          padding: "7px 14px", fontSize: 12, fontWeight: 600,
          cursor: "pointer", transition: "opacity 0.15s",
          fontFamily: SANS, whiteSpace: "nowrap",
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          <svg width={11} height={11} viewBox="0 0 11 11" fill="none">
            <path d="M2 1.5l7 4-7 4V1.5z" fill="currentColor" />
          </svg>
          Run Agent
        </button>
      </div>
    </header>
  );
}
