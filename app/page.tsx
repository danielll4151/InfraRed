export default function Home() {
  const stats = [
    { label: "Total reportes", value: "4", color: "var(--accent)" },
    { label: "Pendientes", value: "2", color: "var(--pending)" },
    { label: "En proceso", value: "1", color: "var(--progress)" },
    { label: "Resueltos", value: "1", color: "var(--resolved)" },
  ];

  const reportes = [
    {
      id: "RPT-0001",
      titulo: "Hueco de gran tamaño en vía principal",
      barrio: "Chapinero",
      estado: "en proceso",
      tipo: "🕳️",
    },
    {
      id: "RPT-0002",
      titulo: "Lámpara de alumbrado público apagada",
      barrio: "Barrios Unidos",
      estado: "pendiente",
      tipo: "💡",
    },
    {
      id: "RPT-0003",
      titulo: "Andén deteriorado con baldosas levantadas",
      barrio: "Teusaquillo",
      estado: "resuelto",
      tipo: "🚧",
    },
  ];

  const estadoColor: Record<string, string> = {
    pendiente: "var(--pending)",
    "en proceso": "var(--progress)",
    resuelto: "var(--resolved)",
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2.5rem" }}>

      {/* Hero */}
      <div style={{ marginBottom: "4rem" }}>
        <p style={{
          fontSize: "0.75rem",
          letterSpacing: "0.2em",
          color: "var(--accent)",
          textTransform: "uppercase",
          marginBottom: "1rem",
        }}>
          Sistema Comunitario · Bogotá
        </p>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "800",
          lineHeight: "1.1",
          marginBottom: "1.5rem",
        }}>
          Reporta daños en tu{" "}
          <span style={{ color: "var(--accent)" }}>infraestructura vial</span>
        </h1>
        <p style={{
          color: "var(--muted)",
          fontSize: "1rem",
          lineHeight: "1.7",
          maxWidth: "600px",
          marginBottom: "2rem",
        }}>
          INFRARED permite a los ciudadanos registrar huecos, fallas en
          alumbrado, grietas y daños en espacios comunitarios. Cada reporte
          queda guardado y puedes ver su estado en tiempo real.
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a href="/reportar" style={{
            backgroundColor: "var(--accent)",
            color: "white",
            padding: "0.85rem 1.75rem",
            borderRadius: "8px",
            fontWeight: "700",
            fontSize: "0.9rem",
          }}>
            ⚡ Crear reporte
          </a>
          <a href="/reportes" style={{
            border: "1px solid var(--border)",
            color: "var(--text)",
            padding: "0.85rem 1.75rem",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "0.9rem",
          }}>
            Ver reportes activos
          </a>
        </div>
      </div>

      {/* Estadísticas */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1px",
        backgroundColor: "var(--border)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        overflow: "hidden",
        marginBottom: "4rem",
      }}>
        {stats.map((s) => (
          <div key={s.label} style={{
            backgroundColor: "var(--surface)",
            padding: "1.75rem",
          }}>
            <div style={{
              fontSize: "2.2rem",
              fontWeight: "700",
              color: s.color,
              marginBottom: "0.4rem",
            }}>
              {s.value}
            </div>
            <div style={{
              fontSize: "0.75rem",
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Últimos reportes */}
      <div>
        <h2 style={{
          fontSize: "1rem",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "1.5rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid var(--border)",
        }}>
          Últimos reportes
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {reportes.map((r) => (
            <div key={r.id} style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "1.25rem 1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              borderLeft: `3px solid ${estadoColor[r.estado]}`,
            }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                backgroundColor: "var(--surface2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
              }}>
                {r.tipo}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "700", marginBottom: "0.25rem" }}>
                  {r.titulo}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                  📍 {r.barrio}
                </div>
              </div>
              <div style={{
                fontSize: "0.7rem",
                fontWeight: "700",
                color: "var(--muted)",
              }}>
                {r.id}
              </div>
              <div style={{
                padding: "0.25rem 0.7rem",
                borderRadius: "20px",
                fontSize: "0.7rem",
                fontWeight: "700",
                color: estadoColor[r.estado],
                border: `1px solid ${estadoColor[r.estado]}`,
                backgroundColor: `${estadoColor[r.estado]}22`,
              }}>
                {r.estado}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}