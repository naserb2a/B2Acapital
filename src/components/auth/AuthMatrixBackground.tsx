"use client";
import { useEffect, useRef } from "react";

const SINGLE_POOL = (
  "01234567890123456789" +
  "$%><{}[].,+-=*/|" +
  "0123456789" +
  ".,><[]"
).split("");

const WORD_POOL = ["BUY", "SELL", "LONG", "MCP", "API", "RISK"];
const WORD_PROB = 0.028;

const FONT_SIZE = 11;
const COL_SPACING = 13;
const ROW_SPACING = 14;

const BASE_OPACITY_MIN = 0.012;
const BASE_OPACITY_MAX = 0.045;

const BASE_R = 77;
const BASE_G = 159;
const BASE_B = 255;

interface Particle {
  baseX: number;
  y: number;
  char: string;
  drift: number;
  baseOp: number;
  phase: number;
  phaseSpd: number;
}

export default function AuthMatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let particles: Particle[] = [];
    let animId = 0;

    function build(w: number, h: number): Particle[] {
      const cols = Math.floor(w / COL_SPACING) + 2;
      const rows = Math.floor(h / ROW_SPACING) + 3;
      const out: Particle[] = [];
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const isWord = Math.random() < WORD_PROB;
          const char = isWord
            ? WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)]
            : SINGLE_POOL[Math.floor(Math.random() * SINGLE_POOL.length)];
          out.push({
            baseX: c * COL_SPACING + (Math.random() - 0.5) * 5,
            y: r * ROW_SPACING + Math.random() * ROW_SPACING,
            char,
            drift: 0.04 + Math.random() * 0.12,
            baseOp: BASE_OPACITY_MIN + Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN),
            phase: Math.random() * Math.PI * 2,
            phaseSpd: 0.002 + Math.random() * 0.006,
          });
        }
      }
      return out;
    }

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      W = w;
      H = h;
      canvas!.width = w;
      canvas!.height = h;
      particles = build(w, h);
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      ctx!.font = `${FONT_SIZE}px 'Geist Mono', monospace`;
      ctx!.textBaseline = "top";

      for (const p of particles) {
        p.y += p.drift;
        if (p.y > H + 20) {
          p.y = -ROW_SPACING + Math.random() * 8;
          if (Math.random() < 0.4) {
            const isWord = Math.random() < WORD_PROB;
            p.char = isWord
              ? WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)]
              : SINGLE_POOL[Math.floor(Math.random() * SINGLE_POOL.length)];
          }
        }

        p.phase += p.phaseSpd;
        const op = p.baseOp * (0.55 + 0.45 * Math.sin(p.phase));
        if (op < 0.003) continue;

        ctx!.fillStyle = `rgba(${BASE_R},${BASE_G},${BASE_B},${op})`;
        ctx!.fillText(p.char, p.baseX, p.y);
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
