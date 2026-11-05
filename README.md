# Funcode — Frontend

Interfaz de Funcode, un marketplace de servicios digitales dirigido a emprendimientos y pequeñas empresas.

El proyecto contempla páginas web, landing pages, catálogos digitales, tiendas online, sistemas de gestión e integraciones a medida.

Desarrollado como proyecto final del programa JavaScript Full Stack.

## Estado del proyecto

El frontend dispone de una arquitectura de servicios para trabajar con datos de demostración o consumir una API REST.

Actualmente se trabaja en:

- Integración y validación con el backend.
- Actualización de la identidad visual.
- Navegación y control de acceso.
- Documentación de términos y privacidad.
- Preparación del despliegue.

La existencia de servicios de conexión no implica que todos los recorridos estén verificados en producción.

Los cambios locales deben guardarse, comprobarse y sincronizarse con GitHub antes de desplegar.

## Tecnologías

- React.
- Vite.
- React Router DOM.
- Context API.
- Hooks personalizados.
- JavaScript.
- Bootstrap y CSS personalizado.
- ESLint.

Consultar `funcode/package.json` y `funcode/package-lock.json` para conocer las dependencias y versiones exactas.

## Funcionalidades

### Acceso público

- Página principal.
- Catálogo de servicios.
- Búsqueda por texto.
- Filtro por categoría.
- Paginación.
- Detalle de una publicación.
- Registro e inicio de sesión.
- Páginas de términos y condiciones y privacidad, cuando sus rutas estén incorporadas.

### Acceso autenticado

- Consulta del perfil.
- Navegación según el estado de sesión.
- Funcionalidades adicionales según los permisos implementados.

### Administración del catálogo

El objetivo comercial es que Funcode administre las publicaciones.

Los clientes no deben obtener permisos para crear, editar o eliminar servicios por el solo hecho de registrarse.

La restricción debe comprobarse también en el backend. Ocultar botones o proteger rutas de React no sustituye la autorización de la API.

## Identidad visual

El rediseño utiliza:

- Fondo azul oscuro.
- Acentos celestes y violetas.
- Botones con degradado.
- Bordes sutiles.
- Navegación adaptable.
- Animaciones decorativas moderadas.
- Estilos de foco y preferencias de movimiento reducido.

Componentes del rediseño:

- `Navbar.jsx` y `Navbar.css`.
- `Footer.jsx` y `Footer.css`.

La versión propuesta del navbar conserva el acceso al perfil, pero la integración del cierre de sesión y las opciones de administrador debe contrastarse con la implementación existente antes de publicar.

## Organización general

La aplicación React está dentro de `funcode/`.

```text
frontend_funcode/
├── README.md
├── .gitignore
├── api-contract-updates.md
└── funcode/
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    ├── public/
    └── src/
        ├── assets/
        ├── components/
        ├── context/
        ├── data/
        ├── hooks/
        ├── pages/
        ├── services/
        ├── utils/
        ├── App.jsx
        └── main.jsx
```

La ubicación de los archivos de entorno debe coincidir con la configuración de Vite del proyecto.

## Requisitos

- Git.
- Node.js compatible con la versión instalada de Vite.
- npm.
- Backend disponible para trabajar en modo API.

## Instalación

```bash
git clone [https://github.com/patriciovergara/frontend_funcode.git](https://github.com/patriciovergara/frontend_funcode.git)
cd frontend_funcode/funcode
npm ci
```

Si se modifican dependencias, actualizar también el archivo de bloqueo correspondiente.

## Configuración de entorno

Consultar:

- `.env.example`.
- `funcode/vite.config.js`.
- `funcode/src/services/apiConfig.js`.

Definir las variables en el archivo de entorno que cargue Vite.

### Modo demostración

```env
VITE_DATA_MODE=demo
```

### Modo API local

```env
VITE_DATA_MODE=api
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

La URL debe incluir el prefijo `/api/v1`.

Si no se define `VITE_DATA_MODE`, la configuración actual utiliza `demo`.

Si no se define `VITE_API_BASE_URL`, la configuración actual utiliza la API local.

Para producción, ambas variables deben configurarse explícitamente con los valores del entorno correspondiente.

Las variables `VITE_*` forman parte del código enviado al navegador: no deben contener contraseñas, secretos JWT ni credenciales de PostgreSQL.

Reiniciar Vite después de modificar los archivos de entorno.

## Desarrollo

Desde `funcode/`:

```bash
npm run dev
```

Abrir la dirección indicada por la terminal.

## Compilación

```bash
npm run build
```

La compilación debe completarse sin errores antes del despliegue.

Consultar los scripts disponibles:

```bash
npm run
```

Si está definido el script de lint:

```bash
npm run lint
```

No se debe confundir una compilación exitosa con una prueba completa de integración.

## Arquitectura

| Carpeta | Responsabilidad |
|---|---|
| `components/` | Componentes compartidos y navegación. |
| `pages/` | Vistas de la aplicación. |
| `context/` | Estado compartido y proveedores. |
| `hooks/` | Lógica reutilizable. |
| `services/` | Comunicación con la API y configuración de datos. |
| `data/` | Datos de demostración. |
| `utils/` | Funciones auxiliares. |
| `assets/` | Recursos visuales. |

### Servicios de datos

- `apiConfig.js`: modo de datos y URL base.
- `apiClient.js`: cliente HTTP.
- `authService.js`: operaciones de autenticación.
- `postsApi.js`: operaciones de publicaciones.

Consultar la implementación y `api-contract-updates.md` antes de modificar endpoints o formatos de respuesta.

## Navegación

Las rutas se definen en `src/App.jsx`.

Rutas utilizadas por los componentes recientes:

| Ruta | Propósito |
|---|---|
| `/` | Inicio. |
| `/productos` | Catálogo. |
| `/login` | Inicio de sesión. |
| `/registro` | Registro. |
| `/mi-perfil` | Perfil autenticado. |
| `/terminos` | Términos y condiciones. |
| `/privacidad` | Política de privacidad. |

Verificar que todas estén efectivamente registradas en `App.jsx`.

Los enlaces de categorías utilizan:

```text
/productos?category=1
/productos?category=2
/productos?category=3
```

Los identificadores deben coincidir con las categorías de la base de datos.

## Documentación legal

Componentes previstos:

- `LegalLayout.jsx`.
- `Terminos.jsx`.
- `Privacidad.jsx`.
- Archivo de configuración `legal.js`.

En la estructura local utilizada durante el desarrollo, `legal.js` se ubicó en:

```text
src/components/config/legal.js
```

Por tanto, desde `LegalLayout.jsx` se importa así:

```js
import { legalConfig } from "./config/legal.js";
```

Antes de usar el sitio comercialmente:

- Completar titular o razón social.
- Completar RUT y domicilio.
- Configurar un correo real.
- Contrastar la política con los tratamientos y proveedores efectivos.
- Implementar el registro de las autorizaciones que correspondan.
- Revisar los documentos ante cambios legales.

Mostrar los documentos no demuestra por sí solo cumplimiento legal ni registra consentimiento.

## Verificación antes de desplegar

- [ ] Compilación correcta.
- [ ] Revisión de lint.
- [ ] Modo API habilitado.
- [ ] URL pública del backend configurada.
- [ ] Registro e inicio de sesión verificados.
- [ ] Cierre de sesión disponible y probado.
- [ ] Perfil protegido.
- [ ] Permisos de administración comprobados.
- [ ] Catálogo, filtros y detalle conectados a datos reales.
- [ ] Flujo de cotización verificado, si está habilitado.
- [ ] Imágenes disponibles mediante URLs públicas.
- [ ] Páginas legales completas.
- [ ] Revisión en móvil y escritorio.
- [ ] Recarga de rutas internas comprobada.
- [ ] Cambios sincronizados con GitHub.

## Despliegue

Arquitectura propuesta, pendiente de configuración y validación:

- Frontend: Cloudflare Pages.
- Backend: Render.
- Base de datos: PostgreSQL remoto.

El directorio de trabajo y la salida de compilación deben configurarse según la estructura del repositorio.

Para esta aplicación Vite, comprobar la salida `funcode/dist` y cualquier personalización de `build.outDir`.

El alojamiento debe resolver correctamente las rutas de React al abrirlas directamente.

No utilizar `npm run dev` como servidor de producción.

## Seguridad

No versionar:

- `.env` con configuración privada.
- Contraseñas.
- Tokens.
- Credenciales de PostgreSQL.
- Secretos JWT.
- `node_modules/`.
- Compilaciones locales innecesarias.

Conservar ejemplos de configuración sin secretos.

## Pruebas y limitaciones

El README anterior documentaba recorridos manuales en modo demostración.

Esos resultados no acreditan el funcionamiento de la versión actual con la API ni del despliegue público.

Registrar por separado:

- Pruebas locales.
- Pruebas con backend real.
- Pruebas posteriores al despliegue.
- Incidencias y correcciones.

## Repositorio relacionado

Backend:

https://github.com/patriciovergara/backend-funcode