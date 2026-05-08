'use client'
import { useState } from 'react'
import { useReports } from '../../context/ReportsContext'
import { TIPO_ICONS, ESTADO_LABELS, PRIORIDAD_LABELS } from '../../data/store'

const ESTADOS = ['pendiente', 'en_revision', 'en_proceso', 'resuelto', 'rechazado']

const ESTADO_COLORS: Record<string, string> = {
  pendiente:   '#f59e0b',
  en_revision: '#3b82f6',
  en_proceso:  '#8b5cf6',
  resuelto:    '#10b981',
  rechazado:   '#ef4444',
}

export default function Admin() {
  const { reports, updateEstado, stats } = useReports()
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('todos')
  const [reporteSeleccionado, setReporteSeleccionado] = useState<string | null>(null)
  const [nuevoEstado, setNuevoEstado] = useState('')
  const [comentario, setComentario] = useState('')
  const [confirmado, setConfirmado] = useState(false)

  const reporteFiltrado = reports.filter(r => {
    const matchBusqueda = r.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.barrio.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.id.toLowerCase().includes(busqueda.toLowerCase())
    const matchEstado = filtroEstado === 'todos' || r.estado === filtroEstado
    return matchBusqueda && matchEstado
  })

  const reporte = reports.find(r => r.id === reporteSeleccionado)

  function handleActualizar() {
    if (!reporteSeleccionado || !nuevoEstado) return
    updateEstado(reporteSeleccionado, nuevoEstado, comentario)
    setConfirmado(true)
    setTimeout(() => {
      setConfirmado(false)
      setNuevoEstado('')
      setComentario('')
      setReporteSeleccionado(null)
    }, 2000)
  }

  return (
    <div style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Encabezado */}
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#ff4d00', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Panel de administrador
          </span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.5rem' }}>Gestión de reportes</h1>
        </div>

        {/* Estadísticas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total', valor: stats.total, color: '#fff' },
            { label: 'Pendientes', valor: stats.pendiente, color: '#f59e0b' },
            { label: 'En proceso', valor: stats.en_proceso, color: '#8b5cf6' },
            { label: 'Resueltos', valor: stats.resuelto, color: '#10b981' },
          ].map(s => (
            <div key={s.label} style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '1.2rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color }}>{s.valor}</div>
              <div style={{ color: '#888', fontSize: '0.85rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: reporteSeleccionado ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>

          {/* Lista de reportes */}
          <div>
            {/* Filtros */}
            <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <input
                value={busqueda} onChange={e => setBusqueda(e.target.value)}
                placeholder="Buscar por título, barrio o ID..."
                style={{ flex: 1, minWidth: '200px', background: '#111', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#fff', padding: '0.6rem 1rem', fontSize: '0.9rem', outline: 'none' }}
              />
              <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)}
                style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#fff', padding: '0.6rem 1rem', fontSize: '0.9rem', outline: 'none' }}>
                <option value="todos">Todos los estados</option>
                {ESTADOS.map(e => <option key={e} value={e}>{ESTADO_LABELS[e]}</option>)}
              </select>
            </div>

            {/* Tarjetas de reportes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {reporteFiltrado.length === 0 && (
                <div style={{ color: '#555', textAlign: 'center', padding: '2rem' }}>No se encontraron reportes</div>
              )}
              {reporteFiltrado.map(r => (
                <div key={r.id}
                  onClick={() => { setReporteSeleccionado(r.id); setNuevoEstado(''); setComentario(''); setConfirmado(false) }}
                  style={{
                    background: reporteSeleccionado === r.id ? '#1a1a1a' : '#111',
                    border: `1px solid ${reporteSeleccionado === r.id ? '#ff4d00' : '#2a2a2a'}`,
                    borderRadius: '12px', padding: '1rem', cursor: 'pointer',
                    transition: 'border-color 0.2s'
                  }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.4rem' }}>{TIPO_ICONS[r.tipo] || '⚠️'}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{r.titulo}</div>
                        <div style={{ color: '#888', fontSize: '0.8rem' }}>{r.barrio} · {r.fecha}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#888' }}>{r.id}</span>
                      <span style={{ background: ESTADO_COLORS[r.estado] + '22', color: ESTADO_COLORS[r.estado], border: `1px solid ${ESTADO_COLORS[r.estado]}44`, borderRadius: '20px', padding: '0.2rem 0.7rem', fontSize: '0.75rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {ESTADO_LABELS[r.estado]}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel de detalle */}
          {reporte && (
            <div style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '1.5rem', alignSelf: 'start' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Detalle del reporte</h2>
                <button onClick={() => setReporteSeleccionado(null)}
                  style={{ background: 'transparent', border: 'none', color: '#888', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.5rem' }}>
                <Fila label="ID" valor={reporte.id} />
                <Fila label="Título" valor={reporte.titulo} />
                <Fila label="Tipo" valor={`${TIPO_ICONS[reporte.tipo]} ${reporte.tipo}`} />
                <Fila label="Prioridad" valor={PRIORIDAD_LABELS[reporte.prioridad]} />
                <Fila label="Dirección" valor={`${reporte.direccion}, ${reporte.barrio}`} />
                <Fila label="Localidad" valor={reporte.localidad} />
                <Fila label="Reportado por" valor={reporte.reporter} />
                <Fila label="Fecha" valor={reporte.fecha} />
                <div>
                  <span style={{ color: '#888', fontSize: '0.8rem' }}>Descripción</span>
                  <p style={{ color: '#ccc', fontSize: '0.9rem', marginTop: '0.3rem', lineHeight: 1.5 }}>{reporte.descripcion}</p>
                </div>
              </div>

              {/* Historial */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '0.6rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Historial</div>
                {reporte.historial.map((h, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: ESTADO_COLORS[h.estado] || '#888', marginTop: '4px', flexShrink: 0 }} />
                    <div>
                      <span style={{ color: ESTADO_COLORS[h.estado] || '#888', fontSize: '0.8rem', fontWeight: 600 }}>{ESTADO_LABELS[h.estado]}</span>
                      <span style={{ color: '#555', fontSize: '0.8rem' }}> · {h.fecha}</span>
                      <div style={{ color: '#aaa', fontSize: '0.82rem' }}>{h.comentario}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cambiar estado */}
              <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: '1.2rem' }}>
                <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Cambiar estado</div>
                <select value={nuevoEstado} onChange={e => setNuevoEstado(e.target.value)}
                  style={{ width: '100%', background: '#0a0a0a', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#fff', padding: '0.6rem 1rem', fontSize: '0.9rem', outline: 'none', marginBottom: '0.8rem' }}>
                  <option value="">Seleccioná nuevo estado...</option>
                  {ESTADOS.filter(e => e !== reporte.estado).map(e => (
                    <option key={e} value={e}>{ESTADO_LABELS[e]}</option>
                  ))}
                </select>
                <textarea value={comentario} onChange={e => setComentario(e.target.value)}
                  placeholder="Comentario (opcional)..."
                  rows={2}
                  style={{ width: '100%', background: '#0a0a0a', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#fff', padding: '0.6rem 1rem', fontSize: '0.9rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box', marginBottom: '0.8rem' }} />
                {confirmado ? (
                  <div style={{ background: '#10b98122', border: '1px solid #10b98144', borderRadius: '8px', padding: '0.7rem', color: '#10b981', textAlign: 'center', fontWeight: 600 }}>
                    ✅ Estado actualizado exitosamente
                  </div>
                ) : (
                  <button onClick={handleActualizar} disabled={!nuevoEstado}
                    style={{ width: '100%', background: nuevoEstado ? '#ff4d00' : '#1a1a1a', color: nuevoEstado ? '#fff' : '#555', border: 'none', padding: '0.8rem', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 700, cursor: nuevoEstado ? 'pointer' : 'not-allowed', transition: 'background 0.2s' }}>
                    Actualizar estado
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Fila({ label, valor }: { label: string, valor: string }) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
      <span style={{ color: '#888', fontSize: '0.8rem', minWidth: '90px' }}>{label}</span>
      <span style={{ color: '#ddd', fontSize: '0.9rem' }}>{valor}</span>
    </div>
  )
}