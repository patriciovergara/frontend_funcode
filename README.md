# Funcode — Frontend

Frontend de un marketplace desarrollado como proyecto académico de JavaScript Full Stack.

La aplicación permite consultar un catálogo de publicaciones, acceder al detalle de un producto, registrar usuarios e iniciar sesión. Los usuarios autenticados pueden consultar su perfil y administrar sus propias publicaciones.

## Estado del proyecto

El frontend cuenta con un modo de demostración y una estructura de servicios preparada para integrar una API REST.

Los recorridos funcionales y las revisiones visuales descritos en este documento fueron comprobados manualmente en modo demostración. La integración con un backend real permanece pendiente de verificación.

## Tecnologías

- React.
- React Router DOM.
- Context API.
- Hooks de React y hooks personalizados.
- JavaScript.
- Vite.
- CSS.
- ESLint.

Las dependencias y sus versiones se encuentran en los archivos `package.json` y `package-lock.json` del proyecto.

## Funcionalidades

### Acceso público

- Página principal.
- Catálogo de publicaciones.
- Búsqueda por texto.
- Filtrado por categoría.
- Paginación.
- Detalle de una publicación.
- Registro de usuarios.
- Inicio de sesión.

### Acceso con sesión iniciada

- Consulta del perfil.
- Consulta de publicaciones propias.
- Creación de publicaciones.
- Edición de publicaciones propias.
- Eliminación de publicaciones propias.
- Cierre de sesión.

### Interfaz

- Navegación adaptada al estado de sesión.
- Validación de formularios.
- Mensajes informativos sobre el modo de demostración.
- Diseño adaptable a móvil, tablet y escritorio.

## Organización del repositorio

El repositorio contiene una carpeta raíz de documentación y configuración, y una carpeta `funcode/` que contiene la aplicación React.

```text
frontend_funcode/
├── .env.example
├── .gitignore
├── README.md
├── api-contract-updates.md
├── package-lock.json
├── package.json
└── funcode/
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── vite.config.js
    ├── public/
    │   ├── favicon.svg
    │   └── icons.svg
    └── src/
        ├── assets/
        ├── components/
        │   ├── Footer.jsx
        │   ├── Navbar.jsx
        │   ├── PostCard.jsx
        │   └── ProtectedRoute.jsx
        ├── context/
        │   ├── AuthContext.js
        │   ├── AuthProvider.jsx
        │   ├── PostsContext.js
        │   └── PostsProvider.jsx
        ├── data/
        │   └── mockData.js
        ├── hooks/
        │   ├── useAuth.js
        │   ├── useCatalog.js
        │   ├── useCurrentUser.js
        │   ├── useMyPosts.js
        │   ├── usePost.js
        │   └── usePosts.js
        ├── pages/
        │   ├── CreatePostPage.jsx
        │   ├── EditPostPage.jsx
        │   ├── HomePage.jsx
        │   ├── LoginPage.jsx
        │   ├── PlaceholderPage.jsx
        │   ├── PostDetailPage.jsx
        │   ├── ProductsPage.jsx
        │   ├── ProfilePage.jsx
        │   └── RegisterPage.jsx
        ├── services/
        │   ├── apiClient.js
        │   ├── apiConfig.js
        │   ├── authService.js
        │   └── postsApi.js
        ├── utils/
        │   └── formatPrice.js
        ├── App.css
        ├── App.jsx
        ├── index.css
        └── main.jsx
```

La carpeta de destino puede tener un nombre distinto si se elige otro al clonar el repositorio.

## Requisitos previos

- Git.
- Node.js y npm compatibles con las dependencias de la aplicación.

Antes de instalar, revisar las versiones declaradas en `funcode/package.json` y los requisitos de la versión de Vite utilizada.

## Instalación

Clonar el repositorio:

```bash
git clone [https://github.com/patriciovergara/frontend_funcode.git](https://github.com/patriciovergara/frontend_funcode.git)
```

Entrar en la carpeta de la aplicación React:

```bash
cd frontend_funcode/funcode
```

Instalar las dependencias:

```bash
npm install
```

## Ejecución en desarrollo

Desde la carpeta `funcode/`, ejecutar:

```bash
npm run dev
```

Abrir la dirección que indique la terminal. Se debe utilizar la URL efectiva del servidor, ya que el puerto disponible puede variar.

Los scripts disponibles se pueden consultar con:

```bash
npm run
```

## Configuración de datos

La aplicación contempla dos modos de funcionamiento:

| Modo | Propósito |
|---|---|
| `demo` | Probar la interfaz y los recorridos con datos de demostración. |
| `api` | Consumir los servicios de un backend compatible con el contrato del proyecto. |

La variable utilizada para seleccionar el modo es:

```dotenv
VITE_DATA_MODE=demo
```

Para seleccionar el modo de integración:

```dotenv
VITE_DATA_MODE=api
```

Cambiar el modo no garantiza por sí solo una conexión funcional. El backend debe estar disponible y la configuración de los servicios debe coincidir con su contrato.

Antes de crear o modificar archivos de entorno, revisar:

- `.env.example`, en la raíz del repositorio.
- `funcode/vite.config.js`.
- `funcode/src/services/apiConfig.js`.

Estos archivos deben utilizarse como referencia para determinar los valores y la ubicación de la configuración. No se presupone en este documento un nombre de variable para la URL base del backend.

## Arquitectura del frontend

La aplicación organiza el código por responsabilidades.

| Carpeta | Responsabilidad |
|---|---|
| `components/` | Elementos de interfaz compartidos entre distintas vistas. |
| `pages/` | Pantallas de la aplicación. |
| `context/` | Contextos y proveedores de estado compartido. |
| `hooks/` | Lógica reutilizable y acceso a los datos utilizados por las vistas. |
| `services/` | Configuración y comunicación con los servicios de datos. |
| `data/` | Datos de demostración. |
| `utils/` | Funciones auxiliares. |
| `assets/` | Recursos visuales utilizados por la aplicación. |

### Componentes

- `Navbar.jsx`: navegación principal.
- `Footer.jsx`: pie de página.
- `PostCard.jsx`: presentación de una publicación en el catálogo.
- `ProtectedRoute.jsx`: control de acceso a vistas que requieren sesión.

### Estado compartido

La estructura separa los contextos de sus proveedores:

- `AuthContext.js` y `AuthProvider.jsx`: estado relacionado con la autenticación.
- `PostsContext.js` y `PostsProvider.jsx`: estado relacionado con las publicaciones.

Los hooks personalizados permiten reutilizar lógica sin repetirla en cada pantalla.

### Servicios

La comunicación de datos se organiza en archivos separados:

- `apiConfig.js`.
- `apiClient.js`.
- `authService.js`.
- `postsApi.js`.

Los endpoints, métodos HTTP y formatos de datos deben mantenerse alineados con la implementación de estos servicios y con el contrato del backend.

## Navegación y acceso

La navegación utiliza React Router. La definición de las rutas se encuentra en el código de la aplicación, principalmente en `funcode/src/App.jsx`.

| Vista | Acceso |
|---|---|
| Inicio | Público |
| Catálogo de publicaciones | Público |
| Detalle de publicación | Público |
| Registro | Público |
| Inicio de sesión | Público |
| Perfil | Requiere sesión |
| Crear publicación | Requiere sesión |
| Editar publicación propia | Requiere sesión |

Los nombres de las vistas no deben confundirse con los endpoints de la API.

## Validaciones y mensajes

Se revisaron los formularios de registro, inicio de sesión, creación y edición de publicaciones.

La interfaz contempla mensajes para orientar al usuario ante datos incompletos o inválidos y avisos que identifican el funcionamiento en modo demostración.

## Pruebas manuales

### Recorrido funcional

Se comprobó el siguiente recorrido en modo demostración:

1. Acceder sin sesión al inicio, al catálogo y al detalle.
2. Registrar una cuenta de prueba.
3. Cerrar sesión.
4. Iniciar sesión con la cuenta creada.
5. Crear una publicación con imagen y categoría.
6. Verificar su aparición en las publicaciones del usuario.
7. Editar la publicación y comprobar los cambios.
8. Eliminar la publicación y comprobar que deja de aparecer.
9. Cerrar sesión y comprobar la actualización de las opciones de navegación.

Resultado reportado: recorrido completo correcto.

### Revisión adaptable

| Vista de prueba | Dimensiones | Resultado reportado |
|---|---|---|
| Móvil | 375 × 812 px | Sin problemas visuales |
| Tablet | 768 × 1024 px | Sin problemas visuales |
| Escritorio | 1280 × 800 px | Sin problemas visuales |

Se revisaron las pantallas de inicio, catálogo, detalle, registro, inicio de sesión, perfil, creación y edición.

Estas comprobaciones son manuales y no equivalen a una suite de pruebas automatizadas ni a una validación con un backend real.

## Documentación del contrato

El repositorio incluye el archivo:

```text
api-contract-updates.md
```

Este archivo debe consultarse junto con los servicios del frontend para revisar los ajustes documentados del contrato de datos.

## Archivos excluidos del repositorio

Los archivos `.gitignore` excluyen las dependencias instaladas, las compilaciones y los archivos locales de entorno.

No se deben publicar:

- `node_modules/`.
- `dist/`.
- Archivos `.env` con configuración local.
- Contraseñas, tokens o credenciales.

El archivo `.env.example` se conserva como referencia de configuración y no debe contener secretos.

## Alcance y limitaciones

- Las pruebas funcionales reportadas corresponden al modo demostración.
- La estructura para integrar la API está preparada, pero la conexión con un backend real requiere verificación.
- Este documento no afirma que existan pruebas automatizadas o un despliegue público.
- La documentación debe actualizarse cuando cambien las rutas, los servicios o la configuración del proyecto.

## Contexto académico

Proyecto desarrollado para el Hito 2: Desarrollo Frontend del programa JavaScript Full Stack.