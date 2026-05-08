'use client'
import { useState, useRef, useEffect } from 'react'

const RESPUESTAS: Record<string, string> = {
  saludo: '¡Hola! Soy el asistente de INFRARED. Puedo ayudarte con información sobre cómo reportar problemas de infraestructura en Bogotá. ¿En qué te puedo ayudar?',
  reporte: 'Para crear un reporte ve al menú y haz clic en "Reportar". Llena el formulario con el tipo de problema, dirección, barrio y descripción. Al enviarlo recibirás un número de radicado.',
  estado: 'Puedes ver el estado de todos los reportes en la sección "Reportes" del menú. Cada reporte muestra su estado actual: Pendiente, En revisión, En proceso, Resuelto o Rechazado.',
  tipos: 'Puedes reportar: 🕳️ Huecos y baches, 💡 Alumbrado público, 🚧 Andenes y aceras, 🌊 Alcantarillado, 🚦 Señalización vial, y otros problemas de infraestructura.',
  tiempo: 'El tiempo de resolución depende de la prioridad y tipo del problema. Los reportes de prioridad crítica se atienden primero. Puedes hacer seguimiento en la sección Reportes.',
  admin: 'El panel de administrador permite gestionar todos los reportes, cambiar su estado y agregar comentarios. Solo los administradores tienen acceso a esta sección.',
  contacto: 'INFRARED es un proyecto de la Universidad Manuela Beltrán. Para soporte adicional puedes escribirnos a través del formulario de contacto.',
  default: 'No entendí bien tu pregunta. Puedes preguntarme sobre: cómo crear un reporte, ver estados, tipos de problemas, tiempos de respuesta o el panel de administrador.',
}

function obtenerRespuesta(mensaje: string): string {
  const msg = mensaje.toLowerCase()
  if (msg.includes('hola') || msg.includes('buenas') || msg.includes('hey')) return RESPUESTAS.saludo
  if (msg.includes('crear') || msg.includes('reportar') || msg.includes('nuevo reporte') || msg.includes('cómo report')) return RESPUESTAS.reporte
  if (msg.includes('estado') || msg.includes('seguimiento') || msg.includes('ver reporte') || msg.includes('consultar')) return RESPUESTAS.estado
  if (msg.includes('tipo') || msg.includes('qué puedo') || msg.includes('que puedo') || msg.includes('problema')) return RESPUESTAS.tipos
  if (msg.includes('tiempo') || msg.includes('cuánto') || msg.includes('demora') || msg.includes('tarda')) return RESPUESTAS.tiempo
  if (msg.includes('admin') || msg.includes('administrador') || msg.includes('gestionar')) return RESPUESTAS.admin
  if (msg.includes('contacto') || msg.includes('soporte') || msg.includes('ayuda')) return RESPUESTAS.contacto
  return RESPUESTAS.default
}

interface Mensaje {
  texto: string
  tipo: 'usuario' | 'bot'
  hora: string
}

export default function ChatBot() {
  const [abierto, setAbierto] = useState(false)
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      texto: '¡Hola! Soy el asistente de INFRARED. ¿En qué te puedo ayudar?',
      tipo: 'bot',
      hora: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState('')
  const [escribiendo, setEscribiendo] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes, escribiendo])

  function enviar() {
    const texto = input.trim()
    if (!texto) return

    const hora = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })

    setMensajes(prev => [...prev, { texto, tipo: 'usuario', hora }])
    setInput('')
    setEscribiendo(true)

    setTimeout(() => {
      const respuesta = obtenerRespuesta(texto)
      setEscribiendo(false)
      setMensajes(prev => [...prev, {
        texto: respuesta,
        tipo: 'bot',
        hora: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
      }])
    }, 900)
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      enviar()
    }
  }

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setAbierto(!abierto)}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.4rem',
          zIndex: 999,
          boxShadow: '0 4px 20px rgba(255,74,28,0.4)',
          transition: 'transform 0.2s',
        }}
        title="Asistente INFRARED"
      >
        {abierto ? '✕' : '💬'}
      </button>

      {/* Ventana del chat */}
      {abierto && (
        <div style={{
          position: 'fixed',
          bottom: '5rem',
          right: '1.5rem',
          width: '340px',
          height: '460px',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 998,
          boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
          overflow: 'hidden',
        }}>

          {/* Header */}
          <div style={{
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--border)',
            backgroundColor: 'var(--surface2)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              flexShrink: 0,
            }}>
              🤖
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Asistente INFRARED</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--resolved)' }}>● En línea</div>
            </div>
          </div>

          {/* Mensajes */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}>
            {mensajes.map((m, i) => (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: m.tipo === 'usuario' ? 'flex-end' : 'flex-start',
              }}>
                <div style={{
                  maxWidth: '80%',
                  padding: '0.6rem 0.9rem',
                  borderRadius: m.tipo === 'usuario' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  backgroundColor: m.tipo === 'usuario' ? 'var(--accent)' : 'var(--surface2)',
                  color: 'var(--text)',
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  border: m.tipo === 'bot' ? '1px solid var(--border)' : 'none',
                }}>
                  {m.texto}
                </div>
                <span style={{ fontSize: '0.65rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                  {m.hora}
                </span>
              </div>
            ))}

            {/* Indicador escribiendo */}
            {escribiendo && (
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{
                  padding: '0.6rem 0.9rem',
                  borderRadius: '12px 12px 12px 2px',
                  backgroundColor: 'var(--surface2)',
                  border: '1px solid var(--border)',
                  fontSize: '0.85rem',
                  color: 'var(--muted)',
                }}>
                  Escribiendo...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Sugerencias rápidas */}
          <div style={{
            padding: '0.5rem 1rem',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            gap: '0.4rem',
            flexWrap: 'wrap',
          }}>
            {['¿Cómo reportar?', '¿Ver estados?', '¿Qué reportar?'].map(s => (
              <button key={s} onClick={() => { setInput(s); }}
                style={{
                  padding: '0.25rem 0.6rem',
                  borderRadius: '20px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'transparent',
                  color: 'var(--muted)',
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                }}>
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{
            padding: '0.75rem 1rem',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            gap: '0.5rem',
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Escribe tu pregunta..."
              style={{
                flex: 1,
                backgroundColor: 'var(--surface2)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--text)',
                padding: '0.5rem 0.75rem',
                fontSize: '0.85rem',
                outline: 'none',
              }}
            />
            <button onClick={enviar} style={{
              backgroundColor: 'var(--accent)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              padding: '0.5rem 0.75rem',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  )
}