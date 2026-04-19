"use client";
import { useRef } from "react";
import { motion, useInView, type TargetAndTransition, type Transition } from "framer-motion";

const MONO = "var(--font-geist-mono)";
const SANS = "var(--font-geist-sans)";

type DataRow = { label: string; value: string; positive?: boolean };

function StepCard({
  step, tag, title, subtitle, rows,
  statusDot, statusText,
  initial, animate, transition,
}: {
  step: string;
  tag: string;
  title: string;
  subtitle: string;
  rows: DataRow[];
  statusDot: string;
  statusText: string;
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
}) {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      whileHover={{ borderColor: "rgba(255,255,255,0.18)" }}
      style={{
        flex: 1,
        background: "#0d1420",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 4,
        padding: 28,
        display: "flex",
        flexDirection: "column",
        minHeight: 300,
        transition: "border-color 0.25s",
      }}
    >
      {/* Header: step + tag */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{
          fontFamily: MONO, fontSize: 11, color: "#64748b",
          letterSpacing: "0.1em", fontVariantNumeric: "tabular-nums",
        }}>
          {step}
        </span>
        <span style={{
          fontFamily: MONO, fontSize: 10, color: "#64748b",
          letterSpacing: "0.06em",
        }}>
          {tag}
        </span>
      </div>

      {/* Title */}
      <div style={{
        marginTop: 20,
        fontFamily: SANS, fontSize: 18, fontWeight: 600,
        color: "#F5F5F5", letterSpacing: "-0.015em",
        lineHeight: 1.3,
      }}>
        {title}
      </div>

      {/* Subtitle */}
      <div style={{
        marginTop: 6,
        fontFamily: SANS, fontSize: 13, color: "#94a3b8",
        lineHeight: 1.5,
      }}>
        {subtitle}
      </div>

      {/* Divider */}
      <div style={{
        height: 1, background: "rgba(255,255,255,0.06)",
        margin: "20px 0",
      }} />

      {/* Data rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        {rows.map((r) => (
          <div key={r.label} style={{
            display: "flex", alignItems: "baseline", justifyContent: "space-between",
            fontFamily: MONO, fontSize: 11.5,
          }}>
            <span style={{ color: "#64748b", letterSpacing: "0.02em" }}>
              {r.label}
            </span>
            <span style={{
              color: r.positive ? "#99E1D9" : "#F5F5F5",
              letterSpacing: "0.02em",
              fontVariantNumeric: "tabular-nums",
            }}>
              {r.value}
            </span>
          </div>
        ))}
      </div>

      {/* Status line */}
      <div style={{
        marginTop: 20,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: "50%",
          background: statusDot, flexShrink: 0,
        }} />
        <span style={{
          fontFamily: MONO, fontSize: 11, color: "#94a3b8",
          letterSpacing: "0.02em",
        }}>
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
        width: 40, flexShrink: 0,
        position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div style={{
        width: "100%",
        borderTop: "1px dashed rgba(255,255,255,0.12)",
      }} />
      <span
        className="seq-pulse"
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: 4, height: 4,
          borderRadius: "50%",
          background: "#99E1D9",
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

  const fade: TargetAndTransition = { opacity: 0, y: 24 };
  const reveal: TargetAndTransition = inView ? { opacity: 1, y: 0 } : {};
  const tr = (d: number): Transition => ({ duration: 0.6, delay: d, ease: "easeOut" });

  return (
    <section
      ref={ref}
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
        .seq-pulse { animation: seq-flow 3s linear infinite; }
        @media (max-width: 900px) {
          .agent-seq-row { flex-direction: column !important; gap: 14px !important; }
          .agent-seq-connector { display: none !important; }
          .agent-seq-row > * { width: 100% !important; flex: none !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 2rem" }}>

        {/* Header */}
        <div style={{ marginBottom: 80 }}>
          <motion.h2
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
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            style={{
              fontSize: 17, fontWeight: 300, color: "#94a3b8",
              fontFamily: SANS, margin: 0, maxWidth: 560, lineHeight: 1.5,
            }}
          >
            Four steps. Zero emotion. Every trade ends in the arbiter&apos;s hands.
          </motion.p>
        </div>

        {/* Row */}
        <div className="agent-seq-row" style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
          <StepCard
            step="01"
            tag="MCP Protocol"
            title="Agent · Byzant linked"
            subtitle="Native MCP handshake with zero configuration and millisecond discovery."
            rows={[
              { label: "Protocol",  value: "MCP 1.2" },
              { label: "Latency",   value: "12ms", positive: true },
              { label: "Handshake", value: "Verified", positive: true },
            ]}
            statusDot="#99E1D9"
            statusText="Zero config · already speaking"
            initial={fade} animate={reveal} transition={tr(0)}
          />
          <Connector delay={0} />

          <StepCard
            step="02"
            tag="Alpha-1"
            title="NVDA · bullish"
            subtitle="Signal confirmed by sentiment and flow. Conviction score logged against the ticker."
            rows={[
              { label: "Signal",     value: "+0.82", positive: true },
              { label: "Confidence", value: "82%",   positive: true },
              { label: "Horizon",    value: "1–3 days" },
            ]}
            statusDot="#99E1D9"
            statusText="Signal confirmed"
            initial={fade} animate={reveal} transition={tr(0.15)}
          />
          <Connector delay={1} />

          <StepCard
            step="03"
            tag="Pending"
            title="50sh long · $5,920"
            subtitle="Trade brief surfaced for your review. Entry, stop, and risk are pre-modeled."
            rows={[
              { label: "Risk", value: "1.8% NAV" },
              { label: "R:R",  value: "2.6 : 1", positive: true },
              { label: "TTL",  value: "00:45" },
            ]}
            statusDot="#f0b429"
            statusText="Awaiting your approval"
            initial={fade} animate={reveal} transition={tr(0.3)}
          />
          <Connector delay={2} />

          <StepCard
            step="04"
            tag="Filled"
            title="+2.34% · filled at $118.40"
            subtitle="Order routed through your broker. Slippage, P&amp;L, and timestamps written to the log."
            rows={[
              { label: "P&L",          value: "+$138.52", positive: true },
              { label: "Slippage",     value: "$0.01" },
              { label: "Fill quality", value: "99.8%", positive: true },
            ]}
            statusDot="#99E1D9"
            statusText="Position opened"
            initial={fade} animate={reveal} transition={tr(0.45)}
          />
        </div>
      </div>
    </section>
  );
}
