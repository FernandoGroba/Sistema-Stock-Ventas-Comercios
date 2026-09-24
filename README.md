# Sistema de Gestión de Stock - API REST

API RESTful construida con Node.js y Express para la administración eficiente de inventario y control de stock. Incluye un sistema de autenticación seguro basado en JSON Web Tokens (JWT) y persistencia de datos en SQLite.

## 🚀 Características Principales

- **CRUD de Productos:** Creación, lectura, actualización y eliminación de artículos del inventario.
- **Autenticación de Usuarios:** Sistema de registro e inicio de sesión.
- **Seguridad (JWT):** Protección de rutas sensibles mediante middlewares de verificación de tokens.
- **Validación de Datos:** Control estricto de campos (códigos, nombres, precios, stock actual y mínimo, categorías) en las peticiones entrantes.
- **Base de Datos Ligera:** Motor SQLite integrado, ideal para portabilidad y despliegues rápidos.

## 🛠️ Tecnologías Utilizadas

- **Entorno:** Node.js (ES Modules)
- **Framework:** Express.js
- **Base de Datos:** SQLite3
- **Seguridad:** JSON Web Token (JWT), Bcrypt (hasheo de contraseñas)
- **Variables de Entorno:** Dotenv

## 📂 Estructura del Proyecto

```text
Sistema_stock/
├── controllers/          # Lógica de negocio (authControllers, productosControllers)
├── database/             # Configuración y conexión a la base de datos SQLite
├── middlewares/          # Validaciones de rutas y autenticación (authMiddleware, validarProducto)
├── routes/               # Definición de endpoints (authRoute, productsRoute)
├── .env                  # Variables de entorno (ignorado en repositorios)
├── index.js              # Punto de entrada de la aplicación
└── package.json          # Dependencias y scripts

```

## 🔒 Autenticación y Seguridad

El sistema protege los endpoints de inventario requiriendo un token JWT válido.

- Las rutas de `/auth` son públicas.
- Las rutas de `/productos` requieren que el cliente envíe el encabezado HTTP:
  `Authorization: Bearer <token_jwt>`
- **Códigos de respuesta de seguridad:**
  - `401 Unauthorized`: Token no provisto o con formato incorrecto.
  - `403 Forbidden`: Token inválido, expirado o adulterado.

## 📡 Endpoints de la API

### Autenticación (Públicas)

| Método | Endpoint                | Descripción                                   |
| :----- | :---------------------- | :-------------------------------------------- |
| `POST` | `/api/v1/auth/register` | Registra un nuevo usuario en el sistema.      |
| `POST` | `/api/v1/auth/login`    | Autentica al usuario y devuelve el token JWT. |

### Productos (Protegidas)

| Método   | Endpoint                | Descripción                                            |
| :------- | :---------------------- | :----------------------------------------------------- |
| `GET`    | `/api/v1/productos`     | Obtiene el listado completo de productos.              |
| `POST`   | `/api/v1/productos`     | Crea un nuevo producto (incluye validación de campos). |
| `PUT`    | `/api/v1/productos/:id` | Actualiza los datos de un producto existente.          |
| `DELETE` | `/api/v1/productos/:id` | Elimina un producto del inventario.                    |

---

**Desarrollado por:** Fernando Groba
