INFRARED — Sistema de Reporte de Infraestructura Vial

Aplicación web para que ciudadanos de Bogotá reporten daños en infraestructura vial, hagan seguimiento en tiempo real al estado de cada reporte, y ubiquen el problema directamente en el mapa de la ciudad.


¿Qué es INFRARED?
INFRARED es una plataforma comunitaria que permite a cualquier ciudadano registrar problemas de infraestructura vial — huecos, fallas en alumbrado, andenes deteriorados, alcantarillas sin tapa — y consultar el estado de su reporte desde cualquier dispositivo.
El sistema incluye un mapa interactivo de Bogotá para geolocalizar reportes, un chatbot de asistencia integrado disponible en toda la aplicación, y un panel de administración donde los encargados pueden gestionar cada reporte.

Funcionalidades
Para ciudadanos

Crear reporte — formulario con tipo de daño, dirección, barrio, localidad, prioridad y descripción detallada
Geolocalización en mapa — selección de la ubicación exacta del problema directamente sobre el mapa de Bogotá con estilo oscuro personalizado
Ver reportes activos — listado completo con estado de cada caso
Seguimiento en tiempo real — cada reporte muestra su historial de cambios de estado con fecha y comentario
Chatbot de asistencia — asistente flotante disponible en toda la app que responde preguntas frecuentes sobre cómo reportar, tipos de problema, estados y tiempos de respuesta

Para administradores

Panel de gestión — vista de todos los reportes con opciones de cambio de estado
Actualización de estados — pendiente → en revisión → en proceso → resuelto / rechazado
Historial automático — cada cambio queda registrado con fecha y comentario

Estados de un reporte
EstadoDescripción🟡 PendienteReporte recibido, aún sin asignar🔵 En revisiónEn proceso de verificación🟠 En procesoCuadrilla o equipo asignado🟢 ResueltoProblema solucionado🔴 RechazadoReporte no procedente
Tipos de daño soportados

🕳️ Huecos / Baches
💡 Alumbrado público
🚧 Andenes / Aceras
🌊 Alcantarillado
🚦 Señalización vial
⚠️ Otro


Chatbot de asistencia
El chatbot es un componente flotante (💬) disponible en todas las páginas de la aplicación. Permite a los usuarios resolver dudas sin salir del flujo de trabajo.
Temas que responde:

Cómo crear un reporte paso a paso
Cómo consultar el estado de un reporte
Qué tipos de daño se pueden reportar
Tiempos estimados de atención según prioridad
Acceso y funciones del panel de administrador
Información de contacto y soporte

Características técnicas:

Indicador de "Escribiendo..." con delay simulado de 900ms para experiencia natural
Sugerencias rápidas predefinidas (¿Cómo reportar?, ¿Ver estados?, ¿Qué reportar?)
Historial de mensajes con timestamp en formato colombiano (hora:minuto)
Detección de intención por palabras clave en español
Diseño flotante no invasivo, posicionado en la esquina inferior derecha
Se abre y cierra sin perder el historial de la sesión


Mapa interactivo
El componente de mapa usa Google Maps con un tema oscuro personalizado que mantiene la coherencia visual de la aplicación.
Funcionalidades:

Centrado automáticamente en Bogotá (lat: 4.7110, lng: -74.0721)
Clic en el mapa para seleccionar la ubicación exacta de un reporte
Visualización de marcadores de reportes existentes con título y estado
Modo de solo vista (soloVista) para mostrar reportes sin permitir selección
Altura configurable por prop para adaptarse a distintos contextos de la UI
Carga asíncrona con placeholder mientras se inicializa la API
Muestra las coordenadas seleccionadas debajo del mapa en modo interactivo

Estilo del mapa:
Tema oscuro personalizado con tonos azul marino y rojo acento, consistente con la identidad visual de INFRARED.

Stack tecnológico
TecnologíaVersiónUsoNext.js^16.2.2Framework principal (App Router)React19.2.4Componentes y manejo de estadoTypeScript5.xTipado estáticoTailwind CSS4.xEstilos@react-google-maps/api^2.20.8Integración con Google MapsContext API—Estado global de reportes

Arquitectura del proyecto
infrared/
├── app/
│   ├── layout.tsx          # Layout global con navbar, footer, Provider y ChatBot
│   ├── page.tsx            # Página de inicio con estadísticas y últimos reportes
│   ├── reportar/
│   │   └── page.tsx        # Formulario para crear nuevo reporte con mapa
│   ├── reportes/
│   │   └── page.tsx        # Listado de todos los reportes activos
│   └── admin/
│       └── page.tsx        # Panel de administración
├── components/
│   ├── ChatBot.tsx         # Chatbot flotante con respuestas predefinidas
│   └── Mapa.tsx            # Componente Google Maps con tema oscuro y marcadores
├── context/
│   └── ReportsContext.js   # Estado global: lista de reportes, addReport, updateEstado
├── data/
│   └── store.js            # Datos iniciales y mapas de etiquetas/colores
└── public/                 # Recursos estáticos
Decisiones de diseño

Context API sobre Redux — el alcance del estado es suficientemente simple para Context. Evita dependencias innecesarias.
Client Components marcados explícitamente — cada componente con hooks o interactividad lleva 'use client' para cumplir correctamente con el App Router de Next.js.
ChatBot en el layout global — el chatbot se monta una sola vez en el layout raíz y persiste en todas las páginas sin reinicios ni pérdida de historial.
Mapa reutilizable con props — el componente Mapa acepta props para modo interactivo o solo vista, altura configurable y lista de marcadores externos, permitiendo usarlo tanto en el formulario de reporte como en la vista de reportes.
Estado derivado en tiempo real — las estadísticas del dashboard se calculan en cada render a partir del array de reportes, garantizando consistencia sin sincronización manual.


Instalación y ejecución local
Requisitos previos

Node.js 18 o superior
npm, yarn, pnpm o bun
API Key de Google Maps con Maps JavaScript API y Places API habilitadas

Pasos
bash# 1. Clonar el repositorio
git clone https://github.com/danielll4151/InfraRed.git
cd InfraRed

# 2. Instalar dependencias
npm install

# 3. Crear archivo de variables de entorno
# Crear un archivo .env.local en la raíz del proyecto con:
# NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_api_key_aqui

# 4. Ejecutar en modo desarrollo
npm run dev
Abrir http://localhost:3000 en el navegador.
Configuración de Google Maps

Ir a Google Cloud Console
Crear un proyecto o seleccionar uno existente
Habilitar Maps JavaScript API y Places API
Crear una API Key en Credenciales
Agregar la key al archivo .env.local como NEXT_PUBLIC_GOOGLE_MAPS_API_KEY


Nota: Sin la API Key configurada, el mapa mostrará el placeholder "Cargando mapa..." de forma permanente. El resto de la aplicación (reportes, admin, chatbot) funciona con normalidad.

Scripts disponibles
bashnpm run dev      # Servidor de desarrollo con hot-reload
npm run build    # Build de producción
npm run start    # Servidor de producción (requiere build previo)
npm run lint     # Linter ESLint

Autor
Daniel Romero
Fabian Lopez
Pablo Rodriguez
Daniel Londoño
Estudiante de Ingeniería de Software — Universidad Manuela Beltrán (Bogotá, 3° semestre)
GitHub: @danielll4151

Contexto académico
Proyecto personal desarrollado como práctica de desarrollo web con tecnologías modernas (Next.js App Router, React 19, TypeScript, Google Maps API). Simula un caso de uso real orientado a la gestión ciudadana de infraestructura urbana en Bogotá, con énfasis en experiencia de usuario, arquitectura modular y buenas prácticas de desarrollo.
