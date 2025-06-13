# Usa una imagen oficial de Node.js con soporte para ES Modules
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias primero para aprovechar el cache de Docker
COPY package*.json ./

# Instala solo las dependencias de producción
RUN npm install --production

# Copia el resto del código fuente
COPY . .

# Expone el puerto (usa el mismo que en .env, por defecto 3000)
EXPOSE 3000

# Usa variables de entorno del sistema o archivo .env (Render y Docker Compose pueden inyectarlas)
# Comando para iniciar la app en modo producción
CMD ["node", "src/index.mjs"]
