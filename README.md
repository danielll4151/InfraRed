 INFRARED — Sistema de Reporte de Infraestructura Vial

> Aplicación web para que ciudadanos de Bogotá reporten daños en infraestructura vial y hagan seguimiento en tiempo real al estado de cada reporte.


 ¿Qué es INFRARED?

INFRARED es una plataforma comunitaria que permite a cualquier ciudadano registrar problemas de infraestructura vial — huecos, fallas en alumbrado, andenes deteriorados, alcantarillas sin tapa — y consultar el estado de su reporte desde cualquier dispositivo.

El sistema incluye un panel de administración donde los encargados pueden gestionar cada reporte, actualizar su estado y dejar comentarios de seguimiento.


 Funcionalidades

 Para ciudadanos
- **Crear reporte** — formulario con tipo de daño, dirección, barrio, localidad, prioridad y descripción detallada
- **Ver reportes activos** — listado completo con filtros por estado y tipo
- **Seguimiento en tiempo real** — cada reporte muestra su historial de cambios de estado con fecha y comentario

 Para administradores
- **Panel de gestión** — vista de todos los reportes con opciones de cambio de estado
- **Actualización de estados** — pendiente → en revisión → en proceso → resuelto / rechazado
- **Historial automático** — cada cambio queda registrado con fecha y comentario

Estados de un reporte
|    Estado      | Descripción |
|----------------|-------------|
| 🟡 Pendiente  | Reporte recibido, aún sin asignar |
| 🔵 En revisión| En proceso de verificación |
| 🟠 En proceso | Cuadrilla o equipo asignado |
| 🟢 Resuelto   | Problema solucionado |
| 🔴 Rechazado  | Reporte no procedente |

### Tipos de daño soportados
- 🕳️ Huecos / Baches
- 💡 Alumbrado público
- 🚧 Andenes / Aceras
- 🌊 Alcantarillado
- 🚦 Señalización vial
- ⚠️ Otro

---

 Stack tecnológico

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| Next.js | 16.2.1 | Framework principal (App Router) |
| React | 19.2.4 | Componentes y manejo de estado |
| TypeScript | 5.x | Tipado estático |
| Tailwind CSS | 4.x | Estilos |
| Context API | — | Estado global de reportes |

---

 Arquitectura del proyecto

```
infrared/
├── app/
│   ├── layout.tsx          # Layout global con navbar, footer y Provider
│   ├── page.tsx            # Página de inicio con estadísticas y últimos reportes
│   ├── reportar/
│   │   └── page.tsx        # Formulario para crear nuevo reporte
│   ├── reportes/
│   │   └── page.tsx        # Listado de todos los reportes activos
│   └── admin/
│       └── page.tsx        # Panel de administración
├── context/
│   └── ReportsContext.js   # Estado global: lista de reportes, addReport, updateEstado
├── data/
│   └── store.js            # Datos iniciales y mapas de etiquetas/colores
└── public/                 # Recursos estáticos
```

 Decisiones de diseño

- Context API sobre Redux: el alcance del estado es suficientemente simple para Context. Evita dependencias innecesarias.
- Client Components marcados explícitamente: cada componente con hooks lleva `'use client'` para cumplir correctamente con el App Router de Next.js 15.
- Estado derivado en tiempo real: las estadísticas del dashboard se calculan en cada render a partir del array de reportes, garantizando consistencia sin sincronización manual.
- IDs autogenerados: el contador de IDs (`RPT-00XX`) vive en el contexto y se incrementa con cada nuevo reporte.

---

 Instalación y ejecución local

### Requisitos previos
- Node.js 18 o superior
- npm, yarn, pnpm o bun

Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/danielll4151/InfraRed.git
cd InfraRed

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

 Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo con hot-reload
npm run build    # Build de producción
npm run start    # Servidor de producción (requiere build previo)
npm run lint     # Linter ESLint
```

---

 Capturas de pantalla

> _Próximamente — ejecuta el proyecto localmente para ver la interfaz en acción._

---

 Autor

**Daniel Romero**
Estudiante de Ingeniería de Software — Universidad Manuela Beltrán (Bogotá, 3° semestre)

GitHub: [@danielll4151](https://github.com/danielll4151)

---

## Contexto académico

Proyecto personal desarrollado como práctica de desarrollo web con tecnologías modernas (Next.js App Router, React 19, TypeScript). Simula un caso de uso real orientado a la gestión ciudadana de infraestructura urbana en Bogotá.
