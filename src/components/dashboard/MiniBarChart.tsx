export default function MiniBarChart({
  bars,
  activeColor = "var(--db-blue)",
  inactiveColor = "var(--db-bg4)",
  height = 36,
}: {
  bars: number[];
  activeColor?: string;
  inactiveColor?: string;
  height?: number;
}) {
  const max = Math.max(...bars, 1);
  const w = 100 / bars.length;

  return (
    <svg viewBox={`0 0 100 ${height}`} width="100%" height={height} preserveAspectRatio="none">
      {bars.map((v, i) => {
        const bh = (v / max) * height * 0.9;
        return (
          <rect
            key={i}
            x={i * w + 1}
            y={height - bh}
            width={w - 2}
            height={bh}
            rx={2}
            fill={i >= bars.length - 3 ? activeColor : inactiveColor}
          />
        );
      })}
    </svg>
  );
}
