import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import styles from "./dashboard.module.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={styles.root}
      style={{
        display: "flex",
        height: "100vh",
        background: "var(--db-bg)",
        color: "var(--db-ink)",
        overflow: "hidden",
      }}
    >
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar />
        <main style={{
          flex: 1,
          overflowY: "auto",
          padding: "28px 28px",
          scrollbarWidth: "thin",
          scrollbarColor: "var(--db-border) transparent",
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}
