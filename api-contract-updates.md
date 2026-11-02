# Funcode — Ajustes al contrato de la API

## Consulta de publicaciones propias

Durante el desarrollo del Hito 2 identifiqué que necesito consultar las
publicaciones del usuario autenticado sin depender de las páginas del
catálogo público.

Por este motivo, agrego la siguiente ruta al contrato de trabajo.
Esta ampliación complementa el documento entregado en el Hito 1.

### Endpoint

GET /api/v1/users/me/posts?page=1

### Acceso

Privado. Requiere el encabezado:

```http
Authorization: Bearer <token>
```

El backend obtiene la identidad del usuario desde el token.
El cliente no envía un user_id para seleccionar al propietario.

### Parámetros de consulta

| Parámetro | Tipo | Valor inicial | Descripción |
|---|---|---|---|
| page | Entero positivo | 1 | Página solicitada |

El tamaño de página será de 12 publicaciones.
El orden será por fecha de creación descendente y, en caso de empate,
por identificador descendente.

### Respuesta exitosa

Estado: 200 OK.

```json
{
  "posts": [
    {
      "id": 10,
      "title": "Catálogo digital para emprendimiento",
      "description": "Diseño de catálogo digital con imágenes y contacto.",
      "price": 35000,
      "image_url": "[https://ejemplo.com/catalogo.jpg](https://ejemplo.com/catalogo.jpg)",
      "category": {
        "id": 2,
        "name": "Catálogos digitales"
      },
      "user": {
        "id": 1,
        "name": "Ana Rojas"
      },
      "created_at": "2026-11-01T03:00:00.000Z",
      "updated_at": "2026-11-01T03:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 1
  }
}
```

Todas las publicaciones devueltas pertenecen al usuario autenticado.

El campo pagination.total representa la cantidad total de publicaciones
de ese usuario, no la cantidad del catálogo completo.

Si el usuario no tiene publicaciones, devuelvo 200 OK con posts vacío
y total igual a 0.

Si la página solicitada supera las disponibles, devuelvo 200 OK con
posts vacío, conservando el total real y la página solicitada.

### Errores

| Estado | Situación |
|---|---|
| 400 Bad Request | El parámetro page no es un entero positivo. |
| 401 Unauthorized | Falta el token, es inválido o ha expirado. |
| 500 Internal Server Error | Se produce un error inesperado del servidor. |

Formato propuesto para los errores:

```json
{
  "message": "Descripción del error"
}
```

### Estado de implementación

En el Hito 2 preparo el frontend para consumir esta ruta.
Su implementación y la comprobación de permisos en el backend quedan
pendientes.

En modo demo, las publicaciones propias se obtienen desde el contexto
local. No se realiza una petición a este endpoint.