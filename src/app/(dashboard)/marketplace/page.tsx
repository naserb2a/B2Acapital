"use client";
import { useState } from "react";

const MONO = "var(--font-geist-mono)";
const SANS = "var(--font-geist-sans)";

/* ─── Module data ───────────────────────────────────────────────── */
type ModuleCategory = "Data Feeds" | "Analytics" | "Risk" | "Execution" | "Memory";

interface Module {
  id: string;
  name: string;
  category: ModuleCategory;
  desc: string;
  price: string;
  installed: boolean;
  usage?: number; // 0-100 for installed modules
  iconPath: string;
  iconColor: string;
}

const MODULES: Module[] = [
  {
    id: "rtmd", name: "Real-Time Market Data", category: "Data Feeds",
    desc: "Sub-millisecond quotes, level 2 order book, and options flow direct to your agent.",
    price: "$9/mo", installed: true, usage: 72,
    iconPath: "M2 12l4-4 3 3 5-6 4 4", iconColor: "#4d9fff",
  },
  {
    id: "tae", name: "Technical Analysis Engine", category: "Analytics",
    desc: "200+ indicators, pattern recognition, and signal generation built for agent consumption.",
    price: "$29/mo", installed: true, usage: 58,
    iconPath: "M3 16l4-5 4 3 4-6 4 3", iconColor: "#6eb8ff",
  },
  {
    id: "rms", name: "Risk Management Suite", category: "Risk",
    desc: "Dynamic position sizing, drawdown controls, and real-time portfolio risk scoring.",
    price: "$29/mo", installed: true, usage: 45,
    iconPath: "M12 3l9 7-9 7-9-7 9-7zM3 17l9 4 9-4", iconColor: "#f0b429",
  },
  {
    id: "ael", name: "Alpaca Execution Layer", category: "Execution",
    desc: "TWAP, VWAP, and iceberg order strategies with slippage optimization and fill reporting.",
    price: "$9/mo", installed: true, usage: 31,
    iconPath: "M13 2L3 14h9l-1 8 10-12h-9l1-8z", iconColor: "#3dd68c",
  },
  {
    id: "dpm", name: "Dark Pool Monitor", category: "Analytics",
    desc: "Institutional block trades, dark pool prints, and unusual activity alerts.",
    price: "$29/mo", installed: false,
    iconPath: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6", iconColor: "#6eb8ff",
  },
  {
    id: "nsf", name: "News & Sentiment Feed", category: "Data Feeds",
    desc: "Real-time news parsing, sentiment scoring, and earnings signal detection.",
    price: "$9/mo", installed: false,
    iconPath: "M4 6h16M4 10h16M4 14h10", iconColor: "#4d9fff",
  },
  {
    id: "be", name: "Backtesting Engine", category: "Analytics",
    desc: "Historical strategy validation with walk-forward testing and Monte Carlo simulation.",
    price: "$99/mo", installed: false,
    iconPath: "M3 3h18v18H3zM9 3v18M3 9h6M3 15h6", iconColor: "#6eb8ff",
  },
  {
    id: "ofs", name: "Options Flow Scanner", category: "Analytics",
    desc: "Unusual options activity, sweep detection, and institutional positioning signals.",
    price: "$29/mo", installed: false,
    iconPath: "M22 12h-4l-3 9L9 3l-3 9H2", iconColor: "#6eb8ff",
  },
  {
    id: "amc", name: "Agent Memory & Context", category: "Memory",
    desc: "Persistent memory layer for your agents — learn from past trades, adapt over time.",
    price: "$29/mo", installed: false,
    iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z", iconColor: "#7a8aab",
  },
];

const TABS: Array<{ label: string; filter: ModuleCategory | null }> = [
  { label: "All", filter: null },
  { label: "Data Feeds", filter: "Data Feeds" },
  { label: "Analytics", filter: "Analytics" },
  { label: "Risk", filter: "Risk" },
  { label: "Execution", filter: "Execution" },
  { label: "Memory", filter: "Memory" },
];

const CATEGORY_COLOR: Record<ModuleCategory, string> = {
  "Data Feeds": "#4d9fff",
  "Analytics": "#6eb8ff",
  "Risk": "#f0b429",
  "Execution": "#3dd68c",
  "Memory": "#7a8aab",
};

/* ─── Icon box ──────────────────────────────────────────────────── */
function IconBox({ path, color, size = 40 }: { path: string; color: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 10, flexShrink: 0,
      background: `${color}14`,
      border: `0.5px solid ${color}33`,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <svg width={size * 0.45} height={size * 0.45} viewBox="0 0 24 24" fill="none">
        <path d={path} stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ─── Installed Card ────────────────────────────────────────────── */
function InstalledCard({ module: m }: { module: Module }) {
  const catColor = CATEGORY_COLOR[m.category];
  return (
    <div style={{
      background: "#0d1420",
      border: "0.5px solid rgba(99,157,255,0.18)",
      borderRadius: 14, padding: "20px 24px",
      display: "flex", flexDirection: "column", gap: 14,
    }}>
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <IconBox path={m.iconPath} color={m.iconColor} size={40} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#eef2ff", fontFamily: SANS, marginBottom: 4 }}>
              {m.name}
            </div>
            <span style={{
              fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
              color: catColor, background: `${catColor}14`, border: `0.5px solid ${catColor}33`,
              padding: "2px 8px", borderRadius: 999, fontFamily: MONO,
            }}>
              {m.category}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
          <span style={{ fontSize: 12, color: "#4d9fff", fontFamily: MONO }}>{m.price}</span>
          <div style={{
            display: "flex", alignItems: "center", gap: 5,
            padding: "3px 10px", borderRadius: 999,
            background: "rgba(61,214,140,0.08)", border: "0.5px solid rgba(61,214,140,0.2)",
          }}>
            <span style={{ color: "#3dd68c", fontSize: 10 }}>✓</span>
            <span style={{ fontSize: 9, color: "#3dd68c", fontFamily: MONO, letterSpacing: "0.08em", fontWeight: 600 }}>INSTALLED</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: 12, color: "#7a8aab", fontFamily: SANS, lineHeight: 1.6, margin: 0 }}>
        {m.desc}
      </p>

      {/* Usage bar */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 9, color: "#2e3d5a", fontFamily: MONO, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Usage this month
          </span>
          <span style={{ fontSize: 9, color: "#4d9fff", fontFamily: MONO }}>{m.usage}%</span>
        </div>
        <div style={{ height: 3, background: "rgba(99,157,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${m.usage}%`, background: "#4d9fff", borderRadius: 2, transition: "width 0.6s ease" }} />
        </div>
      </div>

      {/* Configure link */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button style={{
          background: "none", border: "none", color: "#4d9fff", cursor: "pointer",
          fontSize: 12, fontFamily: SANS, padding: 0,
          transition: "color 0.15s",
        }}
          onMouseEnter={e => (e.currentTarget.style.color = "#6eb8ff")}
          onMouseLeave={e => (e.currentTarget.style.color = "#4d9fff")}>
          Configure →
        </button>
      </div>
    </div>
  );
}

/* ─── Available Card ────────────────────────────────────────────── */
function AvailableCard({ module: m }: { module: Module }) {
  const catColor = CATEGORY_COLOR[m.category];
  return (
    <div
      style={{
        background: "#080c12",
        border: "0.5px solid rgba(99,157,255,0.08)",
        borderRadius: 14, padding: 20,
        display: "flex", flexDirection: "column", gap: 0,
        cursor: "default", transition: "border-color 0.2s, transform 0.2s",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,157,255,0.28)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(99,157,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
        <IconBox path={m.iconPath} color={m.iconColor} size={38} />
        <span style={{ fontSize: 13, color: "#eef2ff", fontFamily: MONO, fontWeight: 500 }}>{m.price}</span>
      </div>

      {/* Badge */}
      <span style={{
        fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
        color: catColor, background: `${catColor}14`, border: `0.5px solid ${catColor}33`,
        padding: "2px 8px", borderRadius: 999, fontFamily: MONO,
        display: "inline-block", marginBottom: 10,
      }}>
        {m.category}
      </span>

      {/* Name */}
      <div style={{ fontSize: 15, fontWeight: 500, color: "#eef2ff", fontFamily: SANS, marginBottom: 8, lineHeight: 1.3 }}>
        {m.name}
      </div>

      {/* Desc */}
      <p style={{ fontSize: 12, color: "#7a8aab", fontFamily: SANS, lineHeight: 1.55, margin: "0 0 20px", flex: 1 }}>
        {m.desc}
      </p>

      {/* CTA */}
      <button
        style={{
          width: "100%", background: "#4d9fff", color: "#fff",
          border: "none", borderRadius: 8, padding: "10px 0",
          fontSize: 13, fontWeight: 500, cursor: "pointer",
          fontFamily: SANS, transition: "background 0.15s",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "#6eb8ff")}
        onMouseLeave={e => (e.currentTarget.style.background = "#4d9fff")}
      >
        Get Module
      </button>
    </div>
  );
}

/* ─── Empty state ───────────────────────────────────────────────── */
function EmptyState() {
  return (
    <div style={{ textAlign: "center", padding: "48px 0", gridColumn: "1 / -1" }}>
      <div style={{
        width: 56, height: 56, borderRadius: 14, margin: "0 auto 16px",
        background: "rgba(99,157,255,0.06)", border: "0.5px solid rgba(99,157,255,0.12)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
          <rect x={3} y={3} width={18} height={18} rx={3} stroke="rgba(99,157,255,0.3)" strokeWidth={1.5} />
          <path d="M9 12h6M12 9v6" stroke="rgba(99,157,255,0.3)" strokeWidth={1.5} strokeLinecap="round" />
        </svg>
      </div>
      <div style={{ fontSize: 14, color: "#7a8aab", fontFamily: SANS }}>
        No modules in this category yet.
      </div>
    </div>
  );
}

/* ─── Section label ─────────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 10, color: "#7a8aab", fontFamily: MONO, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
      {children}
    </div>
  );
}

/* ─── Main page ─────────────────────────────────────────────────── */
export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState(0);
  const filter = TABS[activeTab].filter;

  const installed = MODULES.filter(m => m.installed && (filter === null || m.category === filter));
  const available = MODULES.filter(m => !m.installed && (filter === null || m.category === filter));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Page header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 500, color: "var(--db-ink)", letterSpacing: "-0.02em", margin: "0 0 4px", fontFamily: SANS }}>
            Module Marketplace
          </h1>
          <p style={{ fontSize: 13, color: "var(--db-ink-muted)", margin: 0, fontFamily: SANS }}>
            <span style={{ fontFamily: MONO }}>{MODULES.filter(m => m.installed).length}</span> installed ·{" "}
            <span style={{ fontFamily: MONO }}>{MODULES.filter(m => !m.installed).length}</span> available · Agent-ready
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{
            background: "transparent", color: "var(--db-ink-muted)",
            border: "0.5px solid var(--db-border)", borderRadius: 8,
            padding: "7px 14px", fontSize: 12, fontFamily: SANS, cursor: "pointer",
            transition: "border-color 0.15s, color 0.15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--db-border-mid)"; e.currentTarget.style.color = "var(--db-ink)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--db-border)"; e.currentTarget.style.color = "var(--db-ink-muted)"; }}>
            Submit Module
          </button>
          <button style={{
            background: "transparent", color: "var(--db-ink-muted)",
            border: "0.5px solid var(--db-border)", borderRadius: 8,
            padding: "7px 14px", fontSize: 12, fontFamily: SANS, cursor: "pointer",
            transition: "border-color 0.15s, color 0.15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--db-border-mid)"; e.currentTarget.style.color = "var(--db-ink)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--db-border)"; e.currentTarget.style.color = "var(--db-ink-muted)"; }}>
            Filter
          </button>
        </div>
      </div>

      {/* Category tab bar */}
      <div style={{
        display: "flex", gap: 6, alignItems: "center",
        marginBottom: 32, flexWrap: "wrap",
        borderBottom: "0.5px solid var(--db-border)",
        paddingBottom: 16,
      }}>
        {TABS.map((tab, i) => {
          const active = activeTab === i;
          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              style={{
                padding: "5px 14px", borderRadius: 20, border: "none", cursor: "pointer",
                fontSize: 12, fontFamily: SANS, fontWeight: active ? 500 : 400,
                background: active ? "#4d9fff" : "transparent",
                color: active ? "#fff" : "var(--db-ink-muted)",
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = "var(--db-ink)"; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = "var(--db-ink-muted)"; }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Installed section */}
      {installed.length > 0 && (
        <div style={{ marginBottom: 36 }}>
          <SectionLabel>Installed</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {installed.map(m => <InstalledCard key={m.id} module={m} />)}
          </div>
        </div>
      )}

      {/* Available section */}
      <div>
        <SectionLabel>Available</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {available.length > 0
            ? available.map(m => <AvailableCard key={m.id} module={m} />)
            : installed.length === 0 && <EmptyState />}
        </div>
        {available.length === 0 && installed.length > 0 && (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div style={{ fontSize: 13, color: "#7a8aab", fontFamily: SANS }}>
              All modules in this category are installed.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
