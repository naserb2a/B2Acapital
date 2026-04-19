"use client";
import { useRef } from "react";
import { motion, useInView, type Transition, type TargetAndTransition } from "framer-motion";

const MONO = "var(--font-geist-mono)";
const SANS = "var(--font-geist-sans)";

type DataRow = { label: string; value: string; accent?: string };

function StepCard({
  icon, badge, badgeColor, badgeBg, badgeBreathe, value, valueSub,
  statusColor, statusText, statusPulse, rows,
  initial, animate, transition,
}: {
  icon: React.ReactNode;
  badge: string; badgeColor: string; badgeBg: string; badgeBreathe?: boolean;
  value: string; valueSub?: string;
  statusColor: string; statusText: string; statusPulse?: boolean;
  rows: DataRow[];
  initial: TargetAndTransition; animate: TargetAndTransition; transition: Transition;
}) {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      whileHover={{
        borderColor: "rgba(153,225,217,0.45)",
        boxShadow: "0 0 32px rgba(153,225,217,0.18)",
      }}
      className="seq-card"
      style={{
        flex: 1,
        background: "#0F0F0F",
        border: "0.5px solid rgba(255,255,255,0.12)",
        borderRadius: 16,
        padding: 28,
        cursor: "default",
        transition: "border-color 0.25s, box-shadow 0.25s",
        minHeight: 280,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top row: icon + badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 9,
          background: "rgba(153,225,217,0.1)",
          border: "0.5px solid rgba(255,255,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          {icon}
        </div>
        <span
          className={badgeBreathe ? "seq-badge-breathe" : undefined}
          style={{
            fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            color: badgeColor, background: badgeBg,
            border: `0.5px solid ${badgeColor}33`,
            padding: "3px 9px", borderRadius: 999,
            fontFamily: MONO,
          }}
        >
          {badge}
        </span>
      </div>

      {/* Main value */}
      <div style={{ fontSize: 17, fontWeight: 500, color: "#F5F5F5", fontFamily: SANS, marginBottom: 4, letterSpacing: "-0.01em" }}>
        {value}
      </div>
      {valueSub && (
        <div style={{ fontSize: 12, color: "#888888", fontFamily: MONO, letterSpacing: "0.04em", marginBottom: 18 }}>
          {valueSub}
        </div>
      )}
      {!valueSub && <div style={{ marginBottom: 18 }} />}

      {/* Data rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20, flex: 1 }}>
        {rows.map((r) => (
          <div key={r.label} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            fontFamily: MONO, fontSize: 10.5,
          }}>
            <span style={{ color: "#555555", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {r.label}
            </span>
            <span style={{ color: r.accent ?? "#CCCCCC", letterSpacing: "0.02em", fontVariantNumeric: "tabular-nums" }}>
              {r.value}
            </span>
          </div>
        ))}
      </div>

      {/* Status footer */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        paddingTop: 14,
        borderTop: "0.5px solid rgba(255,255,255,0.08)",
      }}>
        <span style={{
          width: 7, height: 7, borderRadius: "50%",
          background: statusColor, display: "inline-block",
          flexShrink: 0,
          boxShadow: statusPulse ? `0 0 8px ${statusColor}` : "none",
          animation: statusPulse ? "db-pulse 2s infinite" : "none",
        }} />
        <span style={{ fontSize: 10.5, color: "#888888", fontFamily: MONO, letterSpacing: "0.06em" }}>
          {statusText}
        </span>
      </div>
    </motion.div>
  );
}

function Connector({ delay }: { delay: number }) {
  return (
    <div
      className="agent-seq-connector"
      style={{
        width: 48, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
      }}
    >
      <div style={{
        width: "100%", height: 1,
        background: "linear-gradient(to right, rgba(255,255,255,0.08), rgba(153,225,217,0.3), rgba(255,255,255,0.08))",
      }} />
      {/* Traveling glow pulse */}
      <span
        className="seq-pulse"
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: 10, height: 10,
          borderRadius: "50%",
          background: "#99E1D9",
          boxShadow: "0 0 14px 2px rgba(153,225,217,0.7), 0 0 28px 4px rgba(153,225,217,0.35)",
          transform: "translate(-50%, -50%)",
          animationDelay: `${delay}s`,
        }}
      />
    </div>
  );
}

export default function AgentSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      className="seq-section"
      style={{
        background: "transparent",
        padding: "180px 0",
        width: "100%",
        position: "relative",
        zIndex: 1,
      }}
    >
      <style>{`
        @keyframes seq-flow {
          0%   { left: 0%;   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        .seq-pulse {
          animation: seq-flow 3s linear infinite;
        }
        @keyframes seq-breathe {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.65; transform: scale(0.98); }
        }
        .seq-badge-breathe {
          animation: seq-breathe 2.2s ease-in-out infinite;
          display: inline-block;
        }
        @media (max-width: 900px) {
          .agent-seq-row { flex-direction: column !important; gap: 14px !important; }
          .agent-seq-connector { display: none !important; }
          .agent-seq-row > * { width: 100% !important; flex: none !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 2rem" }}>

        {/* Header */}
        <div className="seq-header" style={{ textAlign: "left", marginBottom: 80 }}>
          <motion.h2
            className="section-h2"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              fontSize: 52, fontWeight: 600, letterSpacing: "-0.03em",
              color: "#F5F5F5", fontFamily: SANS, margin: "0 0 14px",
              lineHeight: 1.05,
            }}
          >
            From signal to execution.
          </motion.h2>

          <motion.p
            className="seq-subtext"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            style={{
              fontSize: 17, fontWeight: 300, color: "#888888",
              fontFamily: SANS, margin: 0, maxWidth: 560, lineHeight: 1.5,
            }}
          >
            Four steps. Zero emotion. Every trade ends in the arbiter&apos;s hands.
          </motion.p>
        </div>

        {/* Step cards */}
        <div className="agent-seq-row" style={{ display: "flex", alignItems: "stretch", gap: 0 }}>

          {/* Step 0 — MCP Connected */}
          <StepCard
            icon={
              <svg width={18} height={18} viewBox="0 0 16 16" fill="none">
                <path d="M6 4H3a1 1 0 00-1 1v6a1 1 0 001 1h3" stroke="#99E1D9" strokeWidth={1.4} strokeLinecap="round" />
                <path d="M10 4h3a1 1 0 011 1v6a1 1 0 01-1 1h-3" stroke="#99E1D9" strokeWidth={1.4} strokeLinecap="round" />
                <path d="M6 8h4" stroke="#99E1D9" strokeWidth={1.4} strokeLinecap="round" />
                <circle cx={5} cy={8} r={1.5} fill="#99E1D9" />
                <circle cx={11} cy={8} r={1.5} fill="#99E1D9" />
              </svg>
            }
            badge="MCP PROTOCOL"
            badgeColor="#99E1D9"
            badgeBg="rgba(153,225,217,0.1)"
            value="Agent · Byzant linked"
            valueSub="mcp://byzant.ai/v1"
            rows={[
              { label: "Protocol",  value: "MCP 1.2",     accent: "#CCCCCC" },
              { label: "Latency",   value: "12ms",        accent: "#99E1D9" },
              { label: "Handshake", value: "Verified",    accent: "#99E1D9" },
            ]}
            statusColor="#99E1D9"
            statusText="Zero config · Already speaking"
            statusPulse
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
          />

          <Connector delay={0} />

          {/* Step 1 — Signal Detected */}
          <StepCard
            icon={
              <svg width={18} height={18} viewBox="0 0 16 16" fill="none">
                <path d="M2 11l3-4 3 3 3-5 3 3" stroke="#99E1D9" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            badge="ALPHA-1"
            badgeColor="#99E1D9"
            badgeBg="rgba(153,225,217,0.1)"
            value="NVDA · Bullish"
            valueSub="Signal +0.82 · 14:32:07 UTC"
            rows={[
              { label: "Source",      value: "Sentiment + Flow", accent: "#CCCCCC" },
              { label: "Confidence",  value: "82%",              accent: "#99E1D9" },
              { label: "Horizon",     value: "1–3 days",         accent: "#CCCCCC" },
            ]}
            statusColor="#99E1D9"
            statusText="Signal confirmed"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          />

          <Connector delay={1} />

          {/* Step 2 — Approval Requested */}
          <StepCard
            icon={
              <svg width={18} height={18} viewBox="0 0 16 16" fill="none">
                <circle cx={8} cy={8} r={6.5} stroke="#f0b429" strokeWidth={1.4} />
                <path d="M5.5 8l2 2 3-3.5" stroke="#f0b429" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            badge="PENDING"
            badgeColor="#f0b429"
            badgeBg="rgba(240,180,41,0.1)"
            badgeBreathe
            value="50sh Long · $5,920"
            valueSub="Entry $118.40 · Stop $114.90"
            rows={[
              { label: "Risk",   value: "1.8% NAV", accent: "#CCCCCC" },
              { label: "R:R",    value: "2.6 : 1",  accent: "#99E1D9" },
              { label: "TTL",    value: "00:45",    accent: "#f0b429" },
            ]}
            statusColor="#f0b429"
            statusText="Awaiting your approval"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          />

          <Connector delay={2} />

          {/* Step 3 — Trade Executed */}
          <StepCard
            icon={
              <svg width={18} height={18} viewBox="0 0 16 16" fill="none">
                <path d="M9 2L5 9h4l-2 5 6-7H9l2-5z" stroke="#99E1D9" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            badge="FILLED"
            badgeColor="#99E1D9"
            badgeBg="rgba(153,225,217,0.1)"
            value="+2.34% · Filled at $118.40"
            valueSub="50sh · 14:32:11 UTC"
            rows={[
              { label: "P&L",          value: "+$138.52", accent: "#99E1D9" },
              { label: "Slippage",     value: "$0.01",    accent: "#CCCCCC" },
              { label: "Fill quality", value: "99.8%",    accent: "#99E1D9" },
            ]}
            statusColor="#99E1D9"
            statusText="Position opened"
            statusPulse
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
          />
        </div>
      </div>
    </section>
  );
}
