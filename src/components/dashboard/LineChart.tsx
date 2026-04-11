export default function LineChart({
  points,
  forecast,
  todayIdx,
  color = "var(--db-blue)",
  height = 160,
}: {
  points: number[];
  forecast?: number[];
  todayIdx?: number;
  color?: string;
  height?: number;
}) {
  const W = 400;
  const H = height;
  const pad = { t: 12, r: 12, b: 28, l: 36 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;

  const all = forecast ? [...points, ...forecast] : points;
  const min = Math.min(...all);
  const max = Math.max(...all);
  const range = max - min || 1;

  const toX = (i: number, len: number) => pad.l + (i / (len - 1)) * innerW;
  const toY = (v: number) => pad.t + innerH - ((v - min) / range) * innerH;

  const mainPts = points.map((v, i) => `${toX(i, points.length)},${toY(v)}`).join(" ");

  let forecastPts = "";
  if (forecast && forecast.length > 0) {
    const start = points.length - 1;
    const total = points.length + forecast.length - 1;
    const fAll = [points[points.length - 1], ...forecast];
    forecastPts = fAll.map((v, i) => `${toX(start + i, total + 1)},${toY(v)}`).join(" ");
  }

  const todayX = todayIdx !== undefined ? toX(todayIdx, points.length) : undefined;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ overflow: "visible" }}>
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = pad.t + innerH * (1 - t);
        const v = (min + range * t).toFixed(0);
        return (
          <g key={t}>
            <line x1={pad.l} y1={y} x2={W - pad.r} y2={y} stroke="var(--db-border)" strokeWidth={0.5} />
            <text x={pad.l - 6} y={y + 4} textAnchor="end" fontSize={9} fill="var(--db-ink-faint)"
              fontFamily="var(--font-geist-mono)">{v}</text>
          </g>
        );
      })}

      {/* Area fill */}
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.18} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polygon
        points={`${pad.l},${pad.t + innerH} ${mainPts} ${toX(points.length - 1, points.length)},${pad.t + innerH}`}
        fill="url(#lineGrad)"
      />

      {/* Main line */}
      <polyline points={mainPts} fill="none" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />

      {/* Forecast dashed */}
      {forecastPts && (
        <polyline
          points={forecastPts}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          strokeDasharray="4 3"
          strokeLinejoin="round"
          opacity={0.55}
        />
      )}

      {/* TODAY marker */}
      {todayX !== undefined && (
        <>
          <line x1={todayX} y1={pad.t} x2={todayX} y2={pad.t + innerH} stroke="var(--db-amber)" strokeWidth={1} strokeDasharray="3 2" />
          <text x={todayX + 4} y={pad.t + 8} fontSize={9} fill="var(--db-amber)"
            fontFamily="var(--font-geist-mono)" fontWeight={600}>TODAY</text>
        </>
      )}

      {/* End dot */}
      <circle cx={toX(points.length - 1, points.length)} cy={toY(points[points.length - 1])}
        r={3} fill={color} />
    </svg>
  );
}
