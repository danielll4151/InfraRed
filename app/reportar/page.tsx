'use client'
import { useState } from 'react'
import { useReports } from '../../context/ReportsContext'
import { useRouter } from 'next/navigation'
import Mapa from '../../components/Mapa'

const TIPOS = [
  { value: 'huecos', label: '🕳️ Huecos / Baches' },
  { value: 'alumbrado', label: '💡 Alumbrado público' },
  { value: 'andenes', label: '🚧 Andenes / Aceras' },
  { value: 'alcantarillado', label: '🌊 Alcantarillado' },
  { value: 'señalizacion', label: '🚦 Señalización vial' },
  { value: 'otro', label: '⚠️ Otro' },
]

const PRIORIDADES = [
  { value: 'baja', label: '🟢 Baja' },
  { value: 'media', label: '🟡 Media' },
  { value: 'alta', label: '🔴 Alta' },
  { value: 'critica', label: '🚨 Crítica' },
]

const LOCALIDADES = [
  'Usaquén','Chapinero','Santa Fe','San Cristóbal','Usme','Tunjuelito',
  'Bosa','Kennedy','Fontibón','Engativá','Suba','Barrios Unidos',
  'Teusaquillo','Los Mártires','Antonio Nariño','Puente Aranda',
  'La Candelaria','Rafael Uribe Uribe','Ciudad Bolívar','Sumapaz',
]

export default function Reportar() {
  const { addReport } = useReports()
  const router = useRouter()

  const [form, setForm] = useState({
    titulo: '', tipo: '', prioridad: '', direccion: '',
    barrio: '', localidad: '', descripcion: '', reporter: '',
    lat: '', lng: '',
  })
  const [enviado, setEnviado] = useState(false)
  const [idGenerado, setIdGenerado] = useState('')
  const [errores, setErrores] = useState<Record<string,string>>({})

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrores(prev => ({ ...prev, [e.target.name]: '' }))
  }

  function handleUbicacion(lat: number, lng: number, direccion: string) {
    setForm(prev => ({ ...prev, lat: String(lat), lng: String(lng), direccion: prev.direccion || direccion }))
  }

  function validar() {
    const campos: Record<string,string> = {}
    if (!form.titulo.trim())      campos.titulo      = 'El título es obligatorio'
    if (!form.tipo)               campos.tipo        = 'Seleccioná el tipo de problema'
    if (!form.prioridad)          campos.prioridad   = 'Seleccioná la prioridad'
    if (!form.direccion.trim())   campos.direccion   = 'La dirección es obligatoria'
    if (!form.barrio.trim())      campos.barrio      = 'El barrio es obligatorio'
    if (!form.localidad)          campos.localidad   = 'Seleccioná la localidad'
    if (!form.descripcion.trim()) campos.descripcion = 'La descripción es obligatoria'
    if (!form.reporter.trim())    campos.reporter    = 'Tu nombre es obligatorio'
    return campos
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const erroresForm = validar()
    if (Object.keys(erroresForm).length > 0) {
      setErrores(erroresForm)
      return
    }
    const id = addReport(form)
    setIdGenerado(id)
    setEnviado(true)
  }

  if (enviado) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '3rem', maxWidth: '480px', width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
          <h2 style={{ color: 'var(--accent)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Reporte enviado</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '1rem' }}>Tu reporte fue registrado exitosamente.</p>
          <div style={{ background: 'var(--surface2)', borderRadius: '8px', padding: '1rem', marginBottom: '2rem' }}>
            <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Número de radicado</span>
            <div style={{ color: 'var(--accent)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '2px' }}>{idGenerado}</div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={() => { setForm({ titulo:'',tipo:'',prioridad:'',direccion:'',barrio:'',localidad:'',descripcion:'',reporter:'',lat:'',lng:'' }); setEnviado(false) }}
              style={{ background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer' }}>
              Nuevo reporte
            </button>
            <button onClick={() => router.push('/reportes')}
              style={{ background: 'var(--accent)', border: 'none', color: '#fff', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer' }}>
              Ver reportes
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Nuevo reporte
          </span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.5rem' }}>
            Reportar un problema
          </h1>
          <p style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>
            Completá el formulario con la información del problema que encontraste.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          <Campo label="Título del reporte" error={errores.titulo}>
            <input name="titulo" value={form.titulo} onChange={handleChange}
              placeholder="Ej: Hueco grande en la calle 45"
              style={inputStyle(!!errores.titulo)} />
          </Campo>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Campo label="Tipo de problema" error={errores.tipo}>
              <select name="tipo" value={form.tipo} onChange={handleChange} style={inputStyle(!!errores.tipo)}>
                <option value="">Seleccioná...</option>
                {TIPOS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </Campo>
            <Campo label="Prioridad" error={errores.prioridad}>
              <select name="prioridad" value={form.prioridad} onChange={handleChange} style={inputStyle(!!errores.prioridad)}>
                <option value="">Seleccioná...</option>
                {PRIORIDADES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </Campo>
          </div>

          {/* Mapa */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ccc', display: 'block', marginBottom: '0.5rem' }}>
              📍 Ubicación en el mapa <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(haz clic para marcar el lugar)</span>
            </label>
            <Mapa onUbicacionSeleccionada={handleUbicacion} altura="280px" />
            {form.lat && (
              <p style={{ fontSize: '0.75rem', color: 'var(--resolved)', marginTop: '0.4rem' }}>
                ✓ Ubicación marcada en el mapa
              </p>
            )}
          </div>

          <Campo label="Dirección exacta" error={errores.direccion}>
            <input name="direccion" value={form.direccion} onChange={handleChange}
              placeholder="Ej: Cra 7 # 45-12"
              style={inputStyle(!!errores.direccion)} />
          </Campo>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Campo label="Barrio" error={errores.barrio}>
              <input name="barrio" value={form.barrio} onChange={handleChange}
                placeholder="Ej: Chapinero"
                style={inputStyle(!!errores.barrio)} />
            </Campo>
            <Campo label="Localidad" error={errores.localidad}>
              <select name="localidad" value={form.localidad} onChange={handleChange} style={inputStyle(!!errores.localidad)}>
                <option value="">Seleccioná...</option>
                {LOCALIDADES.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </Campo>
          </div>

          <Campo label="Descripción del problema" error={errores.descripcion}>
            <textarea name="descripcion" value={form.descripcion} onChange={handleChange}
              placeholder="Describí detalladamente el problema: tamaño, riesgo, cuánto tiempo lleva así, etc."
              rows={4}
              style={{ ...inputStyle(!!errores.descripcion), resize: 'vertical' }} />
          </Campo>

          <Campo label="Tu nombre" error={errores.reporter}>
            <input name="reporter" value={form.reporter} onChange={handleChange}
              placeholder="Ej: Carlos Martínez"
              style={inputStyle(!!errores.reporter)} />
          </Campo>

          <button type="submit"
            style={{ background: 'var(--accent)', color: '#fff', border: 'none', padding: '1rem', borderRadius: '10px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', marginTop: '0.5rem' }}>
            ⚡ Enviar reporte
          </button>
        </form>
      </div>
    </div>
  )
}

function Campo({ label, error, children }: { label: string, error?: string, children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ccc' }}>{label}</label>
      {children}
      {error && <span style={{ color: '#ff4444', fontSize: '0.8rem' }}>{error}</span>}
    </div>
  )
}

function inputStyle(hasError: boolean): React.CSSProperties {
  return {
    background: '#111',
    border: `1px solid ${hasError ? '#ff4444' : '#2a2a2a'}`,
    borderRadius: '8px',
    color: '#fff',
    padding: '0.7rem 1rem',
    fontSize: '0.95rem',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  }
}