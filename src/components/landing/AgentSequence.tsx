"use client";
import { useRef } from "react";
import { motion, useInView, type TargetAndTransition, type Transition } from "framer-motion";

const MONO = "var(--font-geist-mono)";
const SANS = "var(--font-geist-sans)";
const TEAL = "#99E1D9";

/* ── Illustration tiles ───────────────────────────────────────────── */

function IllConnect() {
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left node stack */}
      <g stroke={TEAL} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
        <path d="M58 70 L58 130 L80 142 L80 82 Z" />
        <path d="M58 70 L80 58 L102 70 L80 82 Z" />
        <path d="M102 70 L102 130 L80 142 L80 82 Z" fill="rgba(153,225,217,0.10)" />
      </g>
      {/* Right node stack */}
      <g stroke={TEAL} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
        <path d="M120 70 L120 130 L142 142 L142 82 Z" />
        <path d="M120 70 L142 58 L164 70 L142 82 Z" fill="rgba(153,225,217,0.10)" />
        <path d="M164 70 L164 130 L142 142 L142 82 Z" />
      </g>
      {/* Connection ripples */}
      <g stroke={TEAL} strokeLinecap="round" fill="none">
        <path d="M104 100 C 110 90 112 90 118 100" strokeWidth="1.2" opacity="0.85" />
        <path d="M104 110 C 110 100 112 100 118 110" strokeWidth="1.2" opacity="0.55" />
        <path d="M104 120 C 110 110 112 110 118 120" strokeWidth="1.2" opacity="0.3" />
      </g>
      {/* Dots */}
      <circle cx="80" cy="70" r="2.4" fill={TEAL} />
      <circle cx="142" cy="70" r="2.4" fill={TEAL} />
    </svg>
  );
}

function IllSignal() {
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Grid baseline */}
      <g stroke="rgba(153,225,217,0.18)" strokeWidth="1">
        <line x1="30" y1="150" x2="170" y2="150" />
        <line x1="30" y1="120" x2="170" y2="120" strokeDasharray="2 4" />
        <line x1="30" y1="90" x2="170" y2="90"  strokeDasharray="2 4" />
      </g>
      {/* Bars */}
      <g fill={TEAL}>
        <rect x="42"  y="124" width="6" height="26" opacity="0.55" />
        <rect x="54"  y="118" width="6" height="32" opacity="0.65" />
        <rect x="66"  y="128" width="6" height="22" opacity="0.5" />
        <rect x="78"  y="114" width="6" height="36" opacity="0.7" />
        <rect x="90"  y="104" width="6" height="46" opacity="0.8" />
        <rect x="102" y="92"  width="6" height="58" opacity="0.9" />
        <rect x="114" y="84"  width="6" height="66" />
        <rect x="126" y="78"  width="6" height="72" />
        <rect x="138" y="70"  width="6" height="80" />
        <rect x="150" y="66"  width="6" height="84" />
      </g>
      {/* Signal line */}
      <path
        d="M45 132 L57 122 L69 130 L81 118 L93 108 L105 96 L117 88 L129 80 L141 72 L153 68"
        stroke={TEAL} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
      {/* End marker */}
      <circle cx="153" cy="68" r="4" fill={TEAL} />
      <circle cx="153" cy="68" r="8" stroke={TEAL} strokeWidth="1" opacity="0.5" fill="none" />
    </svg>
  );
}

function IllApprove() {
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shield */}
      <path
        d="M100 40 L150 56 L150 104 C150 128 130 150 100 162 C70 150 50 128 50 104 L50 56 Z"
        stroke={TEAL} strokeWidth="1.8" strokeLinejoin="round" fill="rgba(153,225,217,0.06)"
      />
      {/* Inner shield */}
      <path
        d="M100 54 L138 66 L138 102 C138 122 122 138 100 148 C78 138 62 122 62 102 L62 66 Z"
        stroke={TEAL} strokeWidth="1" strokeLinejoin="round" opacity="0.35" fill="none"
      />
      {/* Checkmark */}
      <path
        d="M78 100 L94 116 L126 82"
        stroke={TEAL} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function IllExecute() {
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Rings */}
      <circle cx="100" cy="100" r="58" stroke={TEAL} strokeWidth="1" opacity="0.18" fill="none" />
      <circle cx="100" cy="100" r="42" stroke={TEAL} strokeWidth="1" opacity="0.3"  fill="none" />
      {/* Lightning bolt */}
      <path
        d="M112 52 L76 108 L98 108 L88 148 L128 88 L104 88 Z"
        stroke={TEAL} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"
        fill="rgba(153,225,217,0.12)"
      />
      {/* Spark dots */}
      <circle cx="56"  cy="70"  r="1.6" fill={TEAL} opacity="0.7" />
      <circle cx="146" cy="142" r="1.6" fill={TEAL} opacity="0.7" />
      <circle cx="56"  cy="142" r="1.6" fill={TEAL} opacity="0.4" />
      <circle cx="146" cy="70"  r="1.6" fill={TEAL} opacity="0.4" />
    </svg>
  );
}

/* ── Card ─────────────────────────────────────────────────────────── */

function StepCard({
  illustration, title, desc, initial, animate, transition,
}: {
  illustration: React.ReactNode;
  title: string;
  desc: string;
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
}) {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      className="seq-card"
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
    >
      <div style={{
        aspectRatio: "1 / 1",
        width: "100%",
        background: "#0A0A0A",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 14,
        padding: 28,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {illustration}
      </div>
      <div>
        <div style={{
          fontSize: 18, fontWeight: 600, color: "#F5F5F5",
          fontFamily: SANS, letterSpacing: "-0.015em",
          lineHeight: 1.25, marginBottom: 8,
        }}>
          {title}
        </div>
        <div style={{
          fontSize: 14, color: "#8a8a8a",
          fontFamily: SANS, fontWeight: 400,
          lineHeight: 1.6,
        }}>
          {desc}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Group container ──────────────────────────────────────────────── */

function Group({
  label, children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{
      background: "#111111",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 18,
      overflow: "hidden",
    }}>
      {/* Header strip */}
      <div style={{
        background: "#181818",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "14px 28px",
      }}>
        <span style={{
          fontSize: 12, color: "#9a9a9a",
          fontFamily: MONO, letterSpacing: "0.04em",
        }}>
          {label}
        </span>
      </div>
      {/* Body */}
      <div className="seq-group-body" style={{
        padding: "36px 28px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 28,
      }}>
        {children}
      </div>
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────────────── */

export default function AgentSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const showIf = (d: number): Transition => ({ duration: 0.6, delay: d, ease: "easeOut" });
  const fade: TargetAndTransition = { opacity: 0, y: 20 };
  const reveal: TargetAndTransition = inView ? { opacity: 1, y: 0 } : {};

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
        @media (max-width: 800px) {
          .seq-group-body { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 2rem" }}>

        {/* Header */}
        <div style={{ textAlign: "left", marginBottom: 72 }}>
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
              fontSize: 17, fontWeight: 300, color: "#888888",
              fontFamily: SANS, margin: 0, maxWidth: 560, lineHeight: 1.5,
            }}
          >
            Four steps. Zero emotion. Every trade ends in the arbiter&apos;s hands.
          </motion.p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <Group label="Signal detection">
            <StepCard
              illustration={<IllConnect />}
              title="Agent connects"
              desc="Your agent speaks Byzant natively via MCP. Zero configuration, zero wrapper layers, millisecond handshake."
              initial={fade}
              animate={reveal}
              transition={showIf(0)}
            />
            <StepCard
              illustration={<IllSignal />}
              title="Signal forms"
              desc="Sentiment, flow, and pattern inputs aggregate into a single conviction score. Your agent decides what is worth your attention."
              initial={fade}
              animate={reveal}
              transition={showIf(0.15)}
            />
          </Group>

          <Group label="Execution layer">
            <StepCard
              illustration={<IllApprove />}
              title="You approve"
              desc="Every trade surfaces a concise brief: size, risk, horizon, rationale. You hold the final click, always."
              initial={fade}
              animate={reveal}
              transition={showIf(0.3)}
            />
            <StepCard
              illustration={<IllExecute />}
              title="Trade fills"
              desc="Execution routes through your broker with sub-second fills and a full audit trail. Outcome, slippage, and P&amp;L logged automatically."
              initial={fade}
              animate={reveal}
              transition={showIf(0.45)}
            />
          </Group>
        </div>
      </div>
    </section>
  );
}
