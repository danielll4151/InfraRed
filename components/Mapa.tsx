'use client'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { useState } from 'react'

const BOGOTA_CENTER = { lat: 4.7110, lng: -74.0721 }

const MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#1a2333' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8a9bb0' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0a0e14' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2a3f5f' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#0a0e14' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0a0e14' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#111720' }] },
]

interface Props {
  onUbicacionSeleccionada?: (lat: number, lng: number, direccion: string) => void
  marcadores?: { lat: number, lng: number, titulo: string, estado?: string }[]
  soloVista?: boolean
  altura?: string
}

export default function Mapa({ onUbicacionSeleccionada, marcadores = [], soloVista = false, altura = '400px' }: Props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
  })

  const [marcadorSeleccionado, setMarcadorSeleccionado] = useState<{ lat: number, lng: number } | null>(null)

  function handleClick(e: google.maps.MapMouseEvent) {
    if (soloVista || !e.latLng) return
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()
    setMarcadorSeleccionado({ lat, lng })
    if (onUbicacionSeleccionada) {
      onUbicacionSeleccionada(lat, lng, `${lat.toFixed(5)}, ${lng.toFixed(5)}`)
    }
  }

  if (!isLoaded) {
    return (
      <div style={{
        height: altura,
        backgroundColor: 'var(--surface2)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--muted)',
        fontSize: '0.9rem',
      }}>
        Cargando mapa...
      </div>
    )
  }

  return (
    <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: altura }}
        center={BOGOTA_CENTER}
        zoom={12}
        options={{
          styles: MAP_STYLE,
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
        }}
        onClick={handleClick}
      >
        {/* Marcadores de reportes existentes */}
        {marcadores.map((m, i) => (
          <Marker
            key={i}
            position={{ lat: m.lat, lng: m.lng }}
            title={m.titulo}
          />
        ))}

        {/* Marcador de ubicación seleccionada */}
        {marcadorSeleccionado && (
          <Marker
            position={marcadorSeleccionado}
            title="Ubicación seleccionada"
          />
        )}
      </GoogleMap>

      {!soloVista && marcadorSeleccionado && (
        <div style={{
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--surface2)',
          borderTop: '1px solid var(--border)',
          fontSize: '0.8rem',
          color: 'var(--muted)',
        }}>
          📍 Ubicación seleccionada: {marcadorSeleccionado.lat.toFixed(5)}, {marcadorSeleccionado.lng.toFixed(5)}
        </div>
      )}
    </div>
  )
}