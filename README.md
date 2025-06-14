# Estacionamiento

## Backend

Sistema para gestión de bases de datos de estacionamiento.

## Enlace del backend para consumir desde el frontend

**URL del backend:**  
```
https://estacionamiento-backend.onrender.com
```
> Cambia esta URL si Render te da una diferente al desplegar tu servicio.

## Creación del proyecto desde cero
```
md estacionamiento-backend
cd estacionamiento-backend
md src
cd src
md controllers, middlewares, helpers, services, utilities, common
```

## Archivos basicos
- Copiar archivo package.json a la raíz de estacionamiento-backend
- Copiar archivo README.md a la raíz de estacionamiento-backend
- Copiar archivo .gitignore a la raíz de estacionamiento-backend

## Git
En caso de uso de git, las instrucciones iniciales serian:

### Configuraciones básicas (En caso de que no se haya configurado antes)
```
git config --global user.name "Tu Nombre"
git config --global user.email "tu_correo@dominio.com"
```

### Configuraciones básicas dentro del proyecto raíz (estacionamiento-backend)
```
git init
git status
git add .
git commit -m "Primer commit"
git remote add origin https://github.com/Omar23344/estacionamiento-backend.git
git branch -M main
git push -u origin main
```

---

## Desplegar en Render

1. Ingresa a [https://render.com](https://render.com) y crea una cuenta o inicia sesión.
2. Haz clic en "New +" y selecciona "Web Service".
3. Conecta tu cuenta de GitHub y selecciona el repositorio `estacionamiento-backend`.
4. Configura:
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variables:** Agrega las mismas variables que tienes en tu archivo `.env` (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, PORT).
5. Haz clic en "Create Web Service".
6. Render instalará dependencias y levantará tu backend automáticamente.

---

## Project setup (Instalación de dependencias)
```
npm install
```

### Compiles and hot-reloads for development (Ejecutar el proyecto en modo desarrollo)
```
npm run dev
```

### Production (Ejecutar el proyecto en modo producción)
```
npm run start
```

# Mensaje para Copilot/backend developer

## Resumen de lo realizado

1. **Estructura del Backend:**  
   - Se creó un backend RESTful en Node.js (Express) con rutas para usuarios, espacios, vehículos, pagos, reservaciones, reportes y configuración.
   - El backend está preparado para producción y desarrollo, con manejo de errores, middlewares y modularización.

2. **Conexión a Base de Datos:**  
   - El backend se conecta a una base de datos PostgreSQL usando las variables de entorno definidas en el archivo `.env`.
   - El archivo `.env` **no** se sube a git ni a Docker gracias a `.gitignore` y `.dockerignore`.

3. **Docker y Docker Compose:**  
   - Se agregó un `Dockerfile` para construir la imagen del backend y un `.dockerignore` para evitar copiar archivos innecesarios.
   - Se proporcionó un ejemplo de `docker-compose.yml` para levantar backend y base de datos juntos en local.

4. **Despliegue en Render:**  
   - El backend se subió a GitHub y se desplegó en Render como Web Service.
   - En Render se configuraron las variables de entorno igual que en `.env`.

5. **Consumo desde el Frontend:**  
   - El backend expone una URL pública (por ejemplo: `https://estacionamiento-backend.onrender.com`).
   - El frontend debe consumir el backend usando esta URL, configurándola en su archivo `.env` (por ejemplo, `VITE_API_URL`)

6. **Pruebas y Seguridad:**  
   - Se probaron los endpoints con Postman.
   - Se aseguraron las rutas y archivos sensibles con `.gitignore` y `.dockerignore`.

---

## ¿Cómo conectar el frontend con el backend?

- Usa la URL pública del backend (Render) en el frontend.
- Ejemplo para un frontend Vite/React:
  ```
  VITE_API_URL=https://estacionamiento-backend.onrender.com
  ```
- Todas las peticiones del frontend deben apuntar a esa URL.
- Si cambias la URL del backend en Render, actualiza la variable en el frontend y vuelve a desplegar.

---

**Con esto, cualquier desarrollador o Copilot puede continuar el desarrollo, integración o pruebas del sistema, asegurando que el frontend y backend estén correctamente conectados y configurados.**

El problema mencionado corresponde al backend.  
Si tienes archivos de rutas de cliente innecesarios o vacíos en el backend (por ejemplo, archivos duplicados o sin contenido en `src/routes/cliente.routes.mjs`), simplemente elimínalos o déjalos vacíos si no se usan.

Esto ayuda a mantener la estructura del backend limpia y sin archivos redundantes.

### ¿Por qué sigue el error 404 en `/login`?

El error 404 en el frontend indica que la ruta `/login` **no existe** en el backend en la URL pública.  
En tu backend, el endpoint de login está definido como `POST /usuarios/login`, no como `POST /login`.

#### ¿Cómo solucionarlo?

1. **Asegúrate de que el frontend apunte a `/usuarios/login`**  
   - Cambia la URL de login en el frontend de `/login` a `/usuarios/login`.

2. **Verifica que el backend esté desplegado y actualizado en Render**  
   - El backend debe tener la ruta `/usuarios/login` disponible y funcionando.

3. **Prueba el endpoint directamente**  
   - Usa Postman o tu navegador para hacer un `POST` a `https://estacionamiento-backend.onrender.com/usuarios/login` con el body adecuado.

#### Resumen

- El backend **no tiene** un endpoint `/login` directo.
- El endpoint correcto es `/usuarios/login`.
- Ajusta la URL en el frontend para que apunte a `/usuarios/login`.

Con esto, el error 404 desaparecerá y el login funcionará correctamente.

### 📝 Mensaje para GitHub Copilot / documentar cambios

Se actualizó el sistema de registro de vehículos para que al momento de registrar un auto:
- El vehículo ocupe un lugar específico del estacionamiento (`espacio_id`).
- El estado del espacio cambie a `'Ocupado'` al registrar el vehículo.
- El espacio **no se libera automáticamente**, sino **hasta que se registre un pago** con la misma matrícula (placa).

#### Cambios requeridos en la base de datos (`estacionamiento_duqj`):

**Tabla: `espacios`**
- Debe tener la columna:
  - `estado` (`VARCHAR`) → para marcar `'Disponible'` o `'Ocupado'`.

**Tabla: `vehiculos`**
- Debe tener las columnas:
  - `placa` (`VARCHAR`)
  - `entrada` (`TIMESTAMP`)
  - `salida` (`TIMESTAMP`, permite `NULL`)
  - `espacio_id` (`INT`) → clave foránea a `espacios(id)`

#### Reglas del sistema:
- Un espacio sólo puede estar **Disponible** si no hay un vehículo sin salida asociado a él.
- El pago registrado por un vehículo con `placa` X debe actualizar:
  - `vehiculos.salida = NOW()` (registro de salida)
  - `espacios.estado = 'Disponible'` para el espacio ocupado por ese vehículo

---

La salida indica que tu base de datos ya tiene las columnas necesarias en la tabla `pagos` (`placa`, `monto`, `fecha`, `metodo`).  
El mensaje `"already exists, skipping"` significa que no es necesario volver a agregarlas.

**Resumen:**  
- Tu base de datos está lista para registrar correctamente los pagos con placa, monto y método.
- No necesitas hacer más cambios en la estructura de la tabla `pagos` para este flujo.

# Endpoints (API Pins) para el Frontend

## Usuarios (Administradores y Empleados)
- **Obtener todos:**  
  `GET /usuarios`
- **Crear:**  
  `POST /usuarios`  
  Body: `{ "usuario": "nuevo", "contrasenia": "1234", "rol": "empleado" }`
- **Editar:**  
  `PUT /usuarios/:id`  
  Body: `{ "usuario": "nuevo", "contrasenia": "1234", "rol": "empleado" }`
- **Eliminar:**  
  `DELETE /usuarios/:id`
- **Login:**  
  `POST /usuarios/login`  
  Body: `{ "usuario": "admin", "contrasenia": "1234" }`  
  Respuesta: `{ "usuario": "admin", "rol": "admin" }`

---

## Espacios
- **Obtener todos:**  
  `GET /espacios`
- **Crear:**  
  `POST /espacios`  
  Body: `{ "numero": "A1", "estado": "Disponible" }`
- **Editar:**  
  `PUT /espacios/:id`  
  Body: `{ "numero": "A1", "estado": "Ocupado" }`
- **Cambiar estado:**  
  `PATCH /espacios/:id`  
  Body: `{ "estado": "Disponible" }`
- **Eliminar:**  
  `DELETE /espacios/:id`

---

## Vehículos
- **Registrar entrada:**  
  `POST /vehiculos`  
  Body: `{ "placa": "ABC123", "marca": "Toyota", "modelo": "Corolla", "color": "Rojo", "espacioId": 1 }`
- **Historial:**  
  `GET /vehiculos/historial`
- **Registrar salida:**  
  `PATCH /vehiculos/salida/:id`

---

## Pagos
- **Registrar pago:**  
  `POST /pagos`  
  Body: `{ "placa": "ABC123", "metodo": "efectivo" }`  
  (El backend calcula el monto automáticamente)
- **Historial de pagos (todos):**  
  `GET /pagos`
- **Historial de pagos por día:**  
  `GET /reportes/pagos?fecha=YYYY-MM-DD`

---

## Reservaciones
- **Obtener todas:**  
  `GET /reservaciones`
- **Crear:**  
  `POST /reservaciones`  
  Body: `{ "placa": "ABC123", "fecha": "2024-06-01", "hora": "10:00", "espacioId": 1 }`
- **Eliminar:**  
  `DELETE /reservaciones/:id`

---

## Configuración
- **Obtener tarifa:**  
  `GET /configuracion/tarifas`
- **Actualizar tarifa:**  
  `PUT /configuracion/tarifas`  
  Body: `{ "tarifa": 50 }`

---

## Reportes
- **Entradas/salidas por semana:**  
  `GET /reportes/semana?fecha=YYYY-MM-DD`  
  (fecha = lunes de la semana)
- **Historial de pagos por día:**  
  `GET /reportes/pagos?fecha=YYYY-MM-DD`
- **Exportar:**  
  `GET /reportes/export?fecha=YYYY-MM-DD&formato=pdf|excel`

---

## Clientes (si aplica)
- **Obtener todos:**  
  `GET /cliente`
- **Crear:**  
  `POST /cliente`  
  Body: `{ "placa": "...", "dueno": "...", "lugar": "..." }`
- **Editar:**  
  `PUT /cliente`  
  Body: `{ "id": 1, "placa": "...", "dueno": "...", "lugar": "..." }`
- **Eliminar:**  
  `DELETE /cliente/:id`

---

**Notas:**
- Todos los endpoints responden en JSON.
- Los endpoints de eliminación usan el método `DELETE` y requieren el `id` en la URL.
- El backend calcula el monto del pago automáticamente según la tarifa y el tiempo transcurrido.
- Para reportes semanales y pagos diarios, usa los endpoints con parámetros de fecha.
