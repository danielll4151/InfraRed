// data/store.js
// ─────────────────────────────────────────────────────────────
// Este archivo NO tiene 'use client' porque es solo datos puros:
// objetos y constantes que no usan ninguna API del navegador ni
// de React. Puede importarse tanto desde Server Components como
// desde Client Components sin ningún problema.
// ─────────────────────────────────────────────────────────────

// ── Mapas de iconos, etiquetas y colores ─────────────────────
// Se usan en ReportCard, ReportModal y el formulario para
// mostrar el texto/emoji correcto según el valor guardado.

export const TIPO_ICONS = {
  huecos:         '🕳️',
  alumbrado:      '💡',
  andenes:        '🚧',
  alcantarillado: '🌊',
  señalizacion:   '🚦',
  otro:           '⚠️',
}

export const TIPO_LABELS = {
  huecos:         'Huecos / Baches',
  alumbrado:      'Alumbrado público',
  andenes:        'Andenes / Aceras',
  alcantarillado: 'Alcantarillado',
  señalizacion:   'Señalización vial',
  otro:           'Otro',
}

export const ESTADO_LABELS = {
  pendiente:   'Pendiente',
  en_revision: 'En revisión',
  en_proceso:  'En proceso',
  resuelto:    'Resuelto',
  rechazado:   'Rechazado',
}

export const PRIORIDAD_LABELS = {
  baja:    '🟢 Baja',
  media:   '🟡 Media',
  alta:    '🔴 Alta',
  critica: '🚨 Crítica',
}

// ── Datos iniciales ───────────────────────────────────────────
// Son los 4 reportes de ejemplo que aparecen al cargar la app
// por primera vez. ReportsContext los carga en su useState().
//
// Cada reporte tiene:
//   id          → código único (RPT-00XX)
//   titulo      → descripción corta del problema
//   tipo        → clave del mapa TIPO_LABELS arriba
//   estado      → clave del mapa ESTADO_LABELS arriba
//   prioridad   → clave del mapa PRIORIDAD_LABELS arriba
//   direccion   → calle/carrera exacta
//   barrio      → barrio del problema
//   localidad   → localidad de Bogotá
//   fecha       → fecha de creación (YYYY-MM-DD)
//   descripcion → texto largo con detalles
//   reporter    → nombre del ciudadano que reportó
//   historial   → array de cambios de estado con fecha y comentario

export const initialReports = [
  {
    id:          'RPT-0001',
    titulo:      'Hueco de gran tamaño en vía principal',
    tipo:        'huecos',
    estado:      'en_proceso',
    prioridad:   'alta',
    direccion:   'Cra 7 # 45-12',
    barrio:      'Chapinero',
    localidad:   'Chapinero',
    fecha:       '2026-03-18',
    descripcion: 'Hueco de aproximadamente 40 cm de diámetro y 20 cm de profundidad. Representa alto riesgo para motociclistas y ciclistas en hora pico.',
    reporter:    'Carlos Martínez',
    historial: [
      { estado: 'pendiente',  fecha: '2026-03-18', comentario: 'Reporte recibido.' },
      { estado: 'en_proceso', fecha: '2026-03-20', comentario: 'Cuadrilla asignada al sector.' },
    ],
  },
  {
    id:          'RPT-0002',
    titulo:      'Lámpara de alumbrado público apagada',
    tipo:        'alumbrado',
    estado:      'pendiente',
    prioridad:   'media',
    direccion:   'Cll 80 # 25-40',
    barrio:      'Barrios Unidos',
    localidad:   'Barrios Unidos',
    fecha:       '2026-03-20',
    descripcion: 'Dos lámparas consecutivas sin funcionar. El sector queda completamente oscuro de noche, generando inseguridad para peatones.',
    reporter:    'María González',
    historial: [
      { estado: 'pendiente', fecha: '2026-03-20', comentario: 'Reporte recibido.' },
    ],
  },
  {
    id:          'RPT-0003',
    titulo:      'Andén deteriorado con baldosas levantadas',
    tipo:        'andenes',
    estado:      'resuelto',
    prioridad:   'baja',
    direccion:   'Tv 40 # 18-55',
    barrio:      'Teusaquillo',
    localidad:   'Teusaquillo',
    fecha:       '2026-03-15',
    descripcion: 'Varias baldosas levantadas que dificultan el paso y representan peligro de caída, especialmente para adultos mayores.',
    reporter:    'Pedro Ramírez',
    historial: [
      { estado: 'pendiente',  fecha: '2026-03-15', comentario: 'Reporte recibido.' },
      { estado: 'en_proceso', fecha: '2026-03-17', comentario: 'Reparación programada para esta semana.' },
      { estado: 'resuelto',   fecha: '2026-03-22', comentario: 'Baldosas reemplazadas. Trabajo completado.' },
    ],
  },
  {
    id:          'RPT-0004',
    titulo:      'Alcantarilla sin tapa en zona escolar',
    tipo:        'alcantarillado',
    estado:      'pendiente',
    prioridad:   'critica',
    direccion:   'Cll 53 # 12-80',
    barrio:      'La Candelaria',
    localidad:   'La Candelaria',
    fecha:       '2026-03-22',
    descripcion: 'Alcantarilla sin tapa ubicada frente a una escuela primaria. Riesgo grave para los menores que transitan el sector a diario.',
    reporter:    'Ana Soler',
    historial: [
      { estado: 'pendiente', fecha: '2026-03-22', comentario: 'Reporte recibido. Marcado como crítico por la ubicación.' },
    ],
  },
]
