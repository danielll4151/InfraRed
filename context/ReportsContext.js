'use client'
// ─────────────────────────────────────────────────────────────
// context/ReportsContext.js
//
// 'use client' es OBLIGATORIO en App Router de Next.js porque:
//   - useState y createContext son APIs de React que solo
//     funcionan en el navegador (Client Components).
//   - Los Server Components (app/page.tsx, app/layout.tsx)
//     no pueden tener estado ni hooks.
//   - Al marcar este archivo con 'use client', Next.js lo
//     convierte en un Client Component y permite usarlo
//     como proveedor dentro del árbol de componentes.
// ─────────────────────────────────────────────────────────────

import { createContext, useContext, useState } from 'react'
import { initialReports } from '../data/store'

// ── 1. Crear el contexto ──────────────────────────────────────
// createContext(null) crea el "canal" por donde fluyen los datos.
// El null es el valor por defecto si alguien usa el contexto
// fuera del Provider (no debería pasar, pero evita crashes).
const ReportsContext = createContext(null)

// ── 2. Provider ───────────────────────────────────────────────
// ReportsProvider es el componente que envuelve la app y pone
// los datos disponibles para todos sus hijos.
// Se coloca en app/layout.tsx rodeando el {children}.
//
// IMPORTANTE para App Router: layout.tsx es un Server Component
// por defecto. Como ReportsProvider tiene 'use client', Next.js
// lo trata correctamente — el layout lo importa y lo renderiza
// como boundary cliente.
export function ReportsProvider({ children }) {

  // Estado principal: array de todos los reportes.
  // Empieza con los 4 reportes de ejemplo de data/store.js.
  const [reports, setReports] = useState(initialReports)

  // Contador para generar IDs únicos: RPT-0005, RPT-0006, etc.
  const [idCounter, setIdCounter] = useState(5)

  // ── addReport ───────────────────────────────────────────────
  // Recibe los datos del formulario y crea un reporte nuevo.
  // Genera el ID automáticamente, fija el estado en 'pendiente'
  // y crea la primera entrada del historial.
  // Devuelve el ID generado para que el formulario lo muestre
  // en el toast de confirmación.
  function addReport(data) {
    const id = `RPT-00${String(idCounter).padStart(2, '0')}`

    const newReport = {
      ...data,                                        // titulo, tipo, prioridad, direccion, barrio, etc.
      id,
      estado:  'pendiente',                           // todo reporte nuevo empieza pendiente
      fecha:   new Date().toISOString().split('T')[0],// fecha de hoy en formato YYYY-MM-DD
      historial: [
        {
          estado:     'pendiente',
          fecha:      new Date().toISOString().split('T')[0],
          comentario: 'Reporte recibido.',
        },
      ],
    }

    // Agrega el nuevo reporte al final del array.
    // Usamos función de actualización (prev =>) para evitar
    // capturas de estado obsoleto (stale closure).
    setReports(prev => [...prev, newReport])
    setIdCounter(prev => prev + 1)

    return id
  }

  // ── updateEstado ────────────────────────────────────────────
  // Cambia el estado de un reporte existente y agrega una
  // entrada al historial con la fecha y el comentario.
  // Lo usa el panel de administrador cuando gestiona reportes.
  //
  // Parámetros:
  //   reporteId   → ID del reporte a actualizar (ej: 'RPT-0001')
  //   nuevoEstado → nuevo valor de estado (ej: 'en_proceso')
  //   comentario  → texto opcional explicando el cambio
  function updateEstado(reporteId, nuevoEstado, comentario = '') {
    setReports(prev =>
      prev.map(r => {
        // Solo modificamos el reporte que coincide con el ID
        if (r.id !== reporteId) return r

        return {
          ...r,
          estado: nuevoEstado,
          historial: [
            ...r.historial,
            {
              estado:     nuevoEstado,
              fecha:      new Date().toISOString().split('T')[0],
              comentario: comentario || `Estado actualizado a ${nuevoEstado}.`,
            },
          ],
        }
      })
    )
  }

  // ── stats ───────────────────────────────────────────────────
  // Objeto calculado en cada render con los conteos por estado.
  // Se usa en la página de inicio para mostrar las 4 tarjetas
  // de estadísticas (total, pendientes, en proceso, resueltos).
  // Al ser derivado del estado, siempre está sincronizado.
  const stats = {
    total:      reports.length,
    pendiente:  reports.filter(r => r.estado === 'pendiente').length,
    en_proceso: reports.filter(r => r.estado === 'en_proceso' || r.estado === 'en_revision').length,
    resuelto:   reports.filter(r => r.estado === 'resuelto').length,
  }

  // ── Valor del contexto ──────────────────────────────────────
  // Todo lo que pongamos aquí queda disponible para cualquier
  // componente hijo que llame useReports().
  return (
    <ReportsContext.Provider value={{ reports, addReport, updateEstado, stats }}>
      {children}
    </ReportsContext.Provider>
  )
}

// ── 3. Hook personalizado ─────────────────────────────────────
// useReports() es el hook que usan los componentes para acceder
// al contexto. Es más limpio que llamar useContext(ReportsContext)
// directamente en cada componente.
//
// Uso en cualquier Client Component:
//   const { reports, addReport, updateEstado, stats } = useReports()
export function useReports() {
  return useContext(ReportsContext)
}
