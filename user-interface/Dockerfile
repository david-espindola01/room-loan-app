# user-interface/Dockerfile
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el código fuente
COPY . .

# Establecer la variable de entorno para el puerto
ENV PORT=3001

# Exponer el puerto
EXPOSE 3001

# Comando para iniciar la aplicación en modo desarrollo
CMD ["npm", "start"]