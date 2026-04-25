"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

const SCRIPT_SRC =
  "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";

export default function TradingViewWidget({
  symbol,
  height = 360,
  style = "3",
}: {
  symbol: string;
  height?: number;
  style?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const widgetHost = document.createElement("div");
    widgetHost.className = "tradingview-widget-container__widget";
    widgetHost.style.height = "100%";
    widgetHost.style.width = "100%";
    container.appendChild(widgetHost);

    const config = {
      autosize: true,
      symbol,
      interval: "D",
      timezone: "Etc/UTC",
      theme,
      style,
      locale: "en",
      hide_top_toolbar: true,
      hide_legend: false,
      hide_side_toolbar: true,
      allow_symbol_change: false,
      save_image: false,
      calendar: false,
      withdateranges: false,
      backgroundColor: theme === "dark" ? "#0d1117" : "#ffffff",
      gridColor: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
      support_host: "https://www.tradingview.com",
    };

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify(config);
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [symbol, theme, style]);

  return (
    <div
      ref={containerRef}
      className="tradingview-widget-container"
      style={{
        width: "100%",
        height,
        borderRadius: 6,
        overflow: "hidden",
      }}
    />
  );
}
