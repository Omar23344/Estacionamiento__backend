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
