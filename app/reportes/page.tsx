'use client'
import { useState } from 'react'
import { useReports } from '../../context/ReportsContext'
import { TIPO_ICONS, ESTADO_LABELS, PRIORIDAD_LABELS } from '../../data/store'
import { useRouter } from 'next/navigation'

const ESTADO_COLORS: Record<string, string> = {
  pendiente:   '#f59e0b',
  en_revision: '#3b82f6',
  en_proceso:  '#8b5cf6',
  resuelto:    '#10b981',
  rechazado:   '#ef4444',
}

const ESTADOS = ['pendiente', 'en_revision', 'en_proceso', 'resuelto', 'rechazado']

export default function Reportes() {
  const { reports } = useReports()
  const router = useRouter()
  const [filtroEstado, setFiltroEstado] = useState('todos')
  const [busqueda, setBusqueda] = useState('')
  const [seleccionado, setSeleccionado] = useState<string | null>(null)

  const filtrados = reports.filter(r => {
    const matchEstado = filtroEstado === 'todos' || r.estado === filtroEstado
    const matchBusqueda = r.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.barrio.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.id.toLowerCase().includes(busqueda.toLowerCase())
    return matchEstado && matchBusqueda
  })

  const reporte = reports.find(r => r.id === seleccionado)

  return (
    <div style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Encabezado */}
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#ff4d00', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Reportes ciudadanos
          </span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.5rem' }}>Reportes activos</h1>
          <p style={{ color: '#888', marginTop: '0.5rem' }}>Consultá el estado de todos los reportes registrados en la plataforma.</p>
        </div>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <input value={busqueda} onChange={e => setBusqueda(e.target.value)}
            placeholder="Buscar por título, barrio o ID..."
            style={{ flex: 1, minWidth: '200px', background: '#111', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#fff', padding: '0.6rem 1rem', fontSize: '0.9rem', outline: 'none' }} />
          <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)}
            style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#fff', padding: '0.6rem 1rem', fontSize: '0.9rem', outline: 'none' }}>
            <option value="todos">Todos los estados</option>
            {ESTADOS.map(e => <option key={e} value={e}>{ESTADO_LABELS[e]}</option>)}
          </select>
          <button onClick={() => router.push('/reportar')}
            style={{ background: '#ff4d00', border: 'none', color: '#fff', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>
            ⚡ Nuevo reporte
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: seleccionado ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>

          {/* Lista */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {filtrados.length === 0 && (
              <div style={{ color: '#555', textAlign: 'center', padding: '3rem' }}>No se encontraron reportes</div>
            )}
            {filtrados.map(r => (
              <div key={r.id}
                onClick={() => setSeleccionado(seleccionado === r.id ? null : r.id)}
                style={{
                  background: seleccionado === r.id ? '#1a1a1a' : '#111',
                  border: `1px solid ${seleccionado === r.id ? '#ff4d00' : '#2a2a2a'}`,
                  borderRadius: '12px', padding: '1rem', cursor: 'pointer', transition: 'border-color 0.2s'
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.4rem' }}>{TIPO_ICONS[r.tipo] || '⚠️'}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{r.titulo}</div>
                      <div style={{ color: '#888', fontSize: '0.8rem' }}>{r.barrio} · {r.localidad} · {r.fecha}</div>
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

          {/* Detalle */}
          {reporte && (
            <div style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '1.5rem', alignSelf: 'start' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Detalle del reporte</h2>
                <button onClick={() => setSeleccionado(null)}
                  style={{ background: 'transparent', border: 'none', color: '#888', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.5rem' }}>
                {[
                  { label: 'ID', valor: reporte.id },
                  { label: 'Título', valor: reporte.titulo },
                  { label: 'Tipo', valor: `${TIPO_ICONS[reporte.tipo]} ${reporte.tipo}` },
                  { label: 'Prioridad', valor: PRIORIDAD_LABELS[reporte.prioridad] },
                  { label: 'Dirección', valor: `${reporte.direccion}, ${reporte.barrio}` },
                  { label: 'Localidad', valor: reporte.localidad },
                  { label: 'Reportado por', valor: reporte.reporter },
                  { label: 'Fecha', valor: reporte.fecha },
                ].map(f => (
                  <div key={f.label} style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
                    <span style={{ color: '#888', fontSize: '0.8rem', minWidth: '90px' }}>{f.label}</span>
                    <span style={{ color: '#ddd', fontSize: '0.9rem' }}>{f.valor}</span>
                  </div>
                ))}
                <div>
                  <span style={{ color: '#888', fontSize: '0.8rem' }}>Descripción</span>
                  <p style={{ color: '#ccc', fontSize: '0.9rem', marginTop: '0.3rem', lineHeight: 1.5 }}>{reporte.descripcion}</p>
                </div>
              </div>

              {/* Historial */}
              <div>
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
            </div>
          )}
        </div>
      </div>
    </div>
  )
}