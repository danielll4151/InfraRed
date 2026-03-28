import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "INFRARED — Sistema de Reporte de Infraestructura",
  description: "Reporta problemas de infraestructura vial en Bogotá",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <nav style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 2.5rem",
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--surface)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}>
          <Link href="/" style={{
            fontSize: "1.2rem",
            fontWeight: "700",
            letterSpacing: "0.1em",
            color: "var(--text)",
          }}>
            INFRA<span style={{ color: "var(--accent)" }}>RED</span>
          </Link>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Link href="/" style={{
              padding: "0.45rem 0.9rem",
              borderRadius: "6px",
              color: "var(--muted)",
              fontWeight: "600",
              fontSize: "0.85rem",
            }}>
              Inicio
            </Link>
            <Link href="/reportar" style={{
              padding: "0.45rem 0.9rem",
              borderRadius: "6px",
              color: "var(--muted)",
              fontWeight: "600",
              fontSize: "0.85rem",
            }}>
              Reportar
            </Link>
            <Link href="/reportes" style={{
              padding: "0.45rem 0.9rem",
              borderRadius: "6px",
              color: "var(--muted)",
              fontWeight: "600",
              fontSize: "0.85rem",
            }}>
              Reportes
            </Link>
            <Link href="/admin" style={{
              padding: "0.45rem 0.9rem",
              borderRadius: "6px",
              backgroundColor: "var(--accent)",
              color: "white",
              fontWeight: "600",
              fontSize: "0.85rem",
            }}>
              Admin
            </Link>
          </div>
        </nav>

        <main>{children}</main>

        <footer style={{
          borderTop: "1px solid var(--border)",
          padding: "1.5rem 2.5rem",
          textAlign: "center",
          fontSize: "0.75rem",
          color: "var(--muted)",
        }}>
          INFRARED · Sistema de Reporte de Infraestructura Vial ·{" "}
          <span style={{ color: "var(--accent)" }}>Universidad Manuela Beltrán</span>
        </footer>
      </body>
    </html>
  );
}