# Dota-Main 🌟

Una aplicación web interactiva para fans de **Dota 2**, desarrollada con Angular y Firebase. Esta plataforma ofrece acceso a guías de héroes, noticias de esports, actualizaciones del juego y más, todo con una experiencia visual atractiva y dinámica.

## 🚀 Características Principales

* **Guías de héroes**: Información detallada, ítems sugeridos y estrategias.

* **Actualizaciones del juego**: Noticias sobre parches y balances.

* **Sección esports**: Cobertura de torneos y equipos destacados.

* **Autenticación**: Sistema de login con Firebase Auth.

* **Diseño adaptativo**: Interfaz optimizada para móviles, tablets y escritorio.

* **Renderizado del servidor**: Angular Universal para un mejor SEO y rendimiento.

## 🛠️ Tecnologías Utilizadas

* **Angular**: Framework principal del frontend

* **Angular Universal**: Server-side rendering (SSR)

* **Firebase**: Autenticación y servicios en la nube

* **TypeScript**: Lenguaje principal

* **Express.js**: Servidor para SSR

* **RxJS**: Programación reactiva

* **Bootstrap** *(opcional)*: Para diseño responsivo si se incluye

## 📁 Estructura del Proyecto

Aquí te presento la estructura de directorios actual de tu proyecto `pagina-dota`:

```
pagina-dota/
├── src/
│   ├── app/
│   │   ├── components/             # Componentes reutilizables (ej. item-selector-modal)
│   │   │   └── item-selector-modal/
│   │   │       ├── item-selector-modal.component.html
│   │   │       ├── item-selector-modal.component.css
│   │   │       └── item-selector-modal.component.ts
│   │   ├── guards/                 # Guardias de ruta (ej. auth-guard)
│   │   │   └── auth-guard.ts
│   │   ├── models/                 # Modelos de datos (Héroes, Ítems, Guías)
│   │   │   ├── hero.model.ts
│   │   │   ├── item.model.ts
│   │   │   └── hero-guide.model.ts
│   │   ├── pages/                  # Componentes de página principales
│   │   │   ├── auth/               # Página de autenticación (login/registro)
│   │   │   │   ├── auth.html
│   │   │   │   ├── auth.css
│   │   │   │   └── auth.ts
│   │   │   ├── heroes/             # Página de héroes (lista y detalle)
│   │   │   │   ├── heroes.html
│   │   │   │   ├── heroes.css
│   │   │   │   └── heroes.ts
│   │   │   ├── home/               # Página de inicio
│   │   │   │   ├── home.html
│   │   │   │   ├── home.css
│   │   │   │   └── home.ts
│   │   │   ├── news/               # Página de noticias
│   │   │   │   ├── news.html
│   │   │   │   ├── news.css
│   │   │   │   └── news.ts
│   │   │   ├── esports/            # Página de e-sports
│   │   │   │   ├── esports.html
│   │   │   │   ├── esports.css
│   │   │   │   └── esports.ts
│   │   │   ├── patches/            # Página de parches
│   │   │   │   ├── patches.html
│   │   │   │   ├── patches.css
│   │   │   │   └── patches.ts
│   │   │   └── game-updates/       # Página de actualizaciones del juego
│   │   │       ├── game-updates.html
│   │   │       ├── game-updates.css
│   │   │       └── game-updates.ts
│   │   ├── services/               # Servicios de la aplicación
│   │   │   ├── auth.service.ts     # Servicio de autenticación
│   │   │   ├── hero.service.ts     # Servicio para obtener datos de héroes
│   │   │   ├── item.service.ts     # Servicio para obtener datos de ítems
│   │   │   └── hero-guide.service.ts # Servicio para guías de héroes
│   │   ├── shared/                 # Componentes compartidos (layout, UI)
│   │   │   ├── header/             # Encabezado de la aplicación
│   │   │   │   ├── header.html
│   │   │   │   ├── header.css
│   │   │   │   └── header.ts
│   │   │   └── footer/             # Pie de página de la aplicación
│   │   │       ├── footer.html
│   │   │       ├── footer.css
│   │   │       └── footer.ts
│   │   ├── firebase.ts             # Configuración e inicialización de Firebase
│   │   ├── app.config.ts           # Configuración principal de la aplicación (proveedores)
│   │   ├── app.routes.ts           # Definición de las rutas de la aplicación
│   │   └── app.ts                  # Componente raíz de la aplicación (AppComponent)
│   ├── assets/                     # Recursos estáticos (imágenes, iconos, etc.)
│   │   └── steam_icon.png
│   ├── environments/               # Configuraciones de entorno (ej. development, production)
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   └── styles.css                  # Estilos globales de la aplicación
├── public/                         # Archivos públicos que se sirven directamente (ej. index.html)
│   └── index.html
├── angular.json                    # Archivo de configuración principal de Angular CLI
├── package.json                    # Dependencias del proyecto y scripts
├── package-lock.json               # Bloqueo de versiones de dependencias
├── tsconfig.json                   # Configuración de TypeScript
├── tsconfig.app.json               # Configuración de TypeScript para la aplicación
└── tsconfig.spec.json              # Configuración de TypeScript para pruebas

```

## 🔐 Autenticación y Seguridad

* Autenticación mediante **Firebase Auth**

* Rutas protegidas con **AuthGuard**

* Sanitización de datos del usuario

* Verificación de sesiones activas

## 🌐 Rutas Principales

```
- /auth           - Login y registro
- /heroes         - Guías de héroes (y detalle de héroe)
- /news           - Noticias y guías de héroes
- /esports        - Sección de esports
- /patches        - Noticias de parches
- /game-updates   - Actualizaciones del juego

```

## 🔧 Configuración del Proyecto

### Requisitos Previos

```
# Versiones 
Angular CLI: 20.0.4
Node: 22.15.1 
Package Manager: npm 10.9.2
OS: win32 x64
```

### Instalación

```
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]
cd dota-main

# Instalar dependencias
npm install

```

### Configurar Firebase

La configuración de Firebase se realiza en el archivo `src/app/firebase.ts`. **No necesitas modificar `src/environments/environment.ts` para Firebase.**

Abre el archivo `src/app/firebase.ts` y reemplaza los valores de `firebaseConfig` con tus propias credenciales de Firebase:

```
// src/app/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO.firebaseapp.com",
  projectId: "TU_ID",
  storageBucket: "TU_BUCKET",
  messagingSenderId: "TU_MESSAGING",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

```

## 🚀 Desarrollo

```
# Servidor de desarrollo
ng serve

# SSR - Angular Universal (si está habilitado en angular.json)
npm run dev:ssr

# Build de producción
ng build

# Prerender (si está configurado en angular.json)
ng run pagina-dota:prerender

```

## 🧪 Testing

```
# Pruebas unitarias
ng test

# Pruebas end-to-end
ng e2e

```

## 🎨 UI/UX

* Interfaz oscura con estilo moderno

* Animaciones suaves y navegación fluida

* Modal dinámico para selección de ítems

* Diseño adaptado a dispositivos móviles

## 🔮 En Desarrollo

* \[ \] Sistema de comentarios y votaciones en guías

* \[ \] Panel de administración

* \[ \] Notificaciones de eventos en vivo

* \[ \] Estadísticas personalizadas por usuario

## 📄 Licencia

Este proyecto está licenciado bajo la MIT License. Consulta el archivo `LICENSE`.

## 📬 Contacto

* **Nombre**: ROYER FREDERICK RODAS ALHUAY
* **Email**: 1004820231@unajma.edu.pe
* **Ubicación**: Andahuaylas, Perú

---

## 🎥 Video Demostrativo

Puedes ver una demostración completa de la aplicación en funcionamiento aquí:

📹 [https://www.youtube.com/watch?v=GSzViTc-e60](https://www.youtube.com/watch?v=GSzViTc-e60)

---

**Desarrollado con pasión por Dota y tecnología ❤️**
