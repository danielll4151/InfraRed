INFRARED - Sistema de Reporte de Infraestructura Vial

Aplicacion web para que ciudadanos de Bogota reporten danos en infraestructura vial, hagan seguimiento en tiempo real al estado de cada reporte, y ubiquen el problema directamente en el mapa de la ciudad.

Que es INFRARED?

INFRARED es una plataforma comunitaria que permite a cualquier ciudadano registrar problemas de infraestructura vial (huecos, fallas en alumbrado, andenes deteriorados, alcantarillas sin tapa) y consultar el estado de su reporte desde cualquier dispositivo.
El sistema incluye un mapa interactivo de Bogota para geolocalizar reportes, un chatbot de asistencia integrado disponible en toda la aplicacion, y un panel de administracion donde los encargados pueden gestionar cada reporte.

Funcionalidades
Para ciudadanos

Crear reporte - formulario con tipo de dano, direccion, barrio, localidad, prioridad y descripcion detallada
Geolocalizacion en mapa - seleccion de la ubicacion exacta del problema directamente sobre el mapa de Bogota con estilo oscuro personalizado
Ver reportes activos - listado completo con estado de cada caso
Seguimiento en tiempo real - cada reporte muestra su historial de cambios de estado con fecha y comentario
Chatbot de asistencia - asistente flotante disponible en toda la app que responde preguntas frecuentes

Para administradores

Panel de gestion - vista de todos los reportes con opciones de cambio de estado
Actualizacion de estados - pendiente > en revision > en proceso > resuelto / rechazado
Historial automatico - cada cambio queda registrado con fecha y comentario

Estados de un reporte
EstadoDescripcionPendienteReporte recibido, aun sin asignarEn revisionEn proceso de verificacionEn procesoCuadrilla o equipo asignadoResueltoProblema solucionadoRechazadoReporte no procedente
Tipos de dano soportados

Huecos / Baches
Alumbrado publico
Andenes / Aceras
Alcantarillado
Senalizacion vial
Otro


Chatbot de asistencia
El chatbot es un componente flotante disponible en todas las paginas de la aplicacion. Permite a los usuarios resolver dudas sin salir del flujo de trabajo.
Temas que responde:

Como crear un reporte paso a paso
Como consultar el estado de un reporte
Que tipos de dano se pueden reportar
Tiempos estimados de atencion segun prioridad
Acceso y funciones del panel de administrador
Informacion de contacto y soporte

Caracteristicas tecnicas:

Indicador de "Escribiendo..." con delay de 900ms para experiencia natural
Sugerencias rapidas predefinidas (Como reportar?, Ver estados?, Que reportar?)
Historial de mensajes con timestamp en formato colombiano
Deteccion de intencion por palabras clave en espanol
Diseno flotante no invasivo, posicionado en la esquina inferior derecha
Se abre y cierra sin perder el historial de la sesion


Mapa interactivo
El componente de mapa usa Google Maps con un tema oscuro personalizado que mantiene la coherencia visual de la aplicacion.
Funcionalidades:

Centrado automaticamente en Bogota (lat: 4.7110, lng: -74.0721)
Clic en el mapa para seleccionar la ubicacion exacta de un reporte
Visualizacion de marcadores de reportes existentes con titulo y estado
Modo solo vista (soloVista) para mostrar reportes sin permitir seleccion
Altura configurable por prop para adaptarse a distintos contextos de la UI
Carga asincrona con placeholder mientras se inicializa la API
Muestra coordenadas seleccionadas debajo del mapa en modo interactivo

Estilo del mapa: tema oscuro personalizado con tonos azul marino y rojo acento, consistente con la identidad visual de INFRARED.

Stack tecnologico
TecnologiaVersionUsoNext.js^16.2.2Framework principal (App Router)React19.2.4Componentes y manejo de estadoTypeScript5.xTipado estaticoTailwind CSS4.xEstilos@react-google-maps/api^2.20.8Integracion con Google MapsContext API-Estado global de reportes

<img width="778" height="497" alt="image" src="https://github.com/user-attachments/assets/6035a7fd-c729-480a-b64a-aeb4f9d9e30d" />


Instalacion y ejecucion local
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

Crear el archivo .env.local en la raiz del proyecto con:
 NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_api_key_aqui

# 4. Ejecutar en modo desarrollo
npm run dev
Abrir http://localhost:3000 en el navegador.
Configuracion de Google Maps

Ir a https://console.cloud.google.com/
Crear un proyecto o seleccionar uno existente
Habilitar Maps JavaScript API y Places API
Crear una API Key en Credenciales
Agregar la key al archivo .env.local como NEXT_PUBLIC_GOOGLE_MAPS_API_KEY


Sin la API Key configurada, el mapa mostrara el placeholder "Cargando mapa..." de forma permanente. El resto de la aplicacion (reportes, admin, chatbot) funciona con normalidad.

Scripts disponibles
bashnpm run dev      # Servidor de desarrollo con hot-reload
npm run build    # Build de produccion
npm run start    # Servidor de produccion (requiere build previo)
npm run lint     # Linter ESLint

Autor

Daniel Romero

Fabian Lopez

Pablo Rodriguez

Daniel Londoño

Estudiantes de Ingenieria de Software - Universidad Manuela Beltran (Bogota, 3 semestre)

GitHub: https://github.com/danielll4151

Contexto academico

Proyecto personal desarrollado como practica de desarrollo web con tecnologias modernas (Next.js App Router, React 19, TypeScript, Google Maps API). Simula un caso de uso real orientado a la gestion ciudadana de infraestructura urbana en Bogota, con enfasis en experiencia de usuario, arquitectura modular y buenas practicas de desarrollo.
