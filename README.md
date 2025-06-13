# Estacionamiento

## Backend

Sistema para gestión de bases de datos de estacionamiento.

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
```

### Production (Ejecutar el proyecto en modo producción)
```
npm run start
```
