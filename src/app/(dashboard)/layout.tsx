"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { SYSTEM_FONT, ThemeProvider, tokens, useTheme } from "@/components/dashboard/ThemeProvider";

function Shell({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const t = tokens(theme);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: t.contentBg,
        color: t.textPrimary,
        fontFamily: SYSTEM_FONT,
        overflow: "hidden",
      }}
    >
      <Sidebar />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        <Topbar />
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 32,
            background: t.contentBg,
            color: t.textPrimary,
            fontFamily: SYSTEM_FONT,
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Shell>{children}</Shell>
    </ThemeProvider>
  );
}
