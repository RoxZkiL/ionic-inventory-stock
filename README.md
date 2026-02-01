📦 StockWise - Inventory Management
StockWise es una aplicación móvil moderna desarrollada con Ionic y Angular diseñada para el control eficiente de inventarios. La aplicación combina una interfaz de usuario premium tipo "Indigo Modern" con una arquitectura robusta y escalable.

🚀 Características actuales
Autenticación Segura: Sistema de login integrado con Supabase Auth.

UI/UX: Diseño minimalista con inputs personalizados mediante Shadow DOM y CSS Shadow Parts.

Arquitectura Standalone: Uso de componentes independientes para optimizar el rendimiento y facilitar el mantenimiento.

Gestión de Entornos: Configuración protegida mediante archivos de variables de entorno (environments).

Calidad de Código: Incluye unit tests para los flujos críticos de autenticación.

🛠️ Stack Tecnológico
Framework: Ionic 7/8+ con Angular Standalone.

Base de Datos & Auth: Supabase.

Estilos: SASS (SCSS) con arquitectura de componentes encapsulados.

Testing: Jasmine & Karma.

Estructura del Proyecto:

src/
├── app/
│   ├── login/          # Módulo de autenticación (Standalone)
│   ├── home/           # Gestión de productos e inventario
│   ├── services/       # Lógica de API y AuthService
│   ├── guards/         # Protección de rutas
│   └── app.routes.ts   # Definición de navegación
├── assets/             # Recursos estáticos (Logos, imágenes)
├── theme/              # Variables globales de diseño
└── global.scss         # Estilos globales y personalización de componentes Ionic

⚙️ Instalación y Configuración

🛠 Comandos de Desarrollo

Servidor de desarrollo: ionic serve

Pruebas unitarias (Modo Observador): ng test

Pruebas unitarias (Ejecución Única - CI): npx ng test --watch=false --browsers=ChromeHeadless --include="**/login.page.spec.ts"
