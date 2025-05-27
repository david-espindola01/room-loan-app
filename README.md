# Manual de Usuario – Despliegue Local de la Aplicación Classroom

Este manual proporciona instrucciones paso a paso para ejecutar localmente una aplicación distribuida compuesta por tres servicios: una base de datos PostgreSQL, un servidor en Node.js y una interfaz web en React. Todas las imágenes Docker están disponibles públicamente y listas para usar.

---

## ✅ Requisitos Previos

Antes de comenzar, asegúrese de tener instalado:

- **Docker Desktop**: Descargue e instale desde https://docs.docker.com/get-docker/
- **Terminal o línea de comandos** (cmd, PowerShell, Terminal, etc.)

### Verificar instalación de Docker
```bash
docker --version
```

---

## 📦 Componentes del Sistema

| Componente              | Imagen Docker                           | Puerto Local |
|-------------------------|------------------------------------------|--------------|
| Base de datos PostgreSQL | `davidespindola01/classroom-db`         | 5432         |
| Servidor en Node.js      | `davidespindola01/classroom-server`     | 3000         |
| Interfaz Web en React    | `davidespindola01/classroom-ui`         | 3001         |

---

## 🚀 Instrucciones de Despliegue

### Paso 1: Crear red Docker
Primero, cree una red personalizada para que los contenedores puedan comunicarse:

```bash
docker network create classroom-net
```

---

### Paso 2: Descargar las imágenes Docker
Ejecute los siguientes comandos para descargar las tres imágenes:

```bash
docker pull davidespindola01/classroom-db
docker pull davidespindola01/classroom-server
docker pull davidespindola01/classroom-ui
```

**Nota**: Este proceso puede tomar varios minutos dependiendo de su conexión a internet.

---

### Paso 3: Ejecutar la base de datos PostgreSQL
Lance el contenedor de la base de datos:

```bash
docker run -d \
  --name classroom-db \
  --network classroom-net \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=admin \
  -e POSTGRES_DB=classroomdb \
  -p 5432:5432 \
  davidespindola01/classroom-db
```

**Para Windows (cmd/PowerShell):**
```cmd
docker run -d --name classroom-db --network classroom-net -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=classroomdb -p 5432:5432 davidespindola01/classroom-db
```

🔹 **Importante**: Espere unos 10-15 segundos para que la base de datos se inicialice completamente.

---

### Paso 4: Ejecutar el servidor Node.js
Lance el contenedor del servidor backend:

```bash
docker run -d \
  --name classroom-server \
  --network classroom-net \
  -e DB_HOST=classroom-db \
  -e DB_USER=admin \
  -e DB_PASSWORD=admin \
  -e DB_NAME=classroomdb \
  -p 3001:3001 \
  davidespindola01/classroom-server
```

**Para Windows (cmd/PowerShell):**
```cmd
docker run -d --name classroom-server --network classroom-net -e DB_HOST=classroom-db -e DB_USER=admin -e DB_PASSWORD=admin -e DB_NAME=classroomdb -p 3001:3001 davidespindola01/classroom-server
```

---

### Paso 5: Ejecutar la interfaz web React
Lance el contenedor de la interfaz de usuario:

```bash
docker run -d \
  --name classroom-ui \
  --network classroom-net \
  -p 3001:80 \
  davidespindola01/classroom-ui
```

**Para Windows (cmd/PowerShell):**
```cmd
docker run -d --name classroom-ui --network classroom-net -p 3001:80 davidespindola01/classroom-ui
```

---

## ✅ Verificación del Despliegue

### 1. Verificar contenedores activos
```bash
docker ps
```

Debería ver los tres contenedores ejecutándose:
- `classroom-db`
- `classroom-server`
- `classroom-ui`

### 2. Verificar logs (si hay problemas)
```bash
# Ver logs de la base de datos
docker logs classroom-db

# Ver logs del servidor
docker logs classroom-server

# Ver logs de la interfaz
docker logs classroom-ui
```

### 3. Acceder a la aplicación
Abra su navegador web y vaya a:

**🌐 http://localhost:3000**

---

## 🔧 Solución de Problemas Comunes

### Problema: Puerto ya en uso
Si recibe un error de puerto ocupado:

```bash
# Ver qué proceso usa el puerto
docker ps -a

# Detener contenedores existentes
docker stop classroom-ui classroom-server classroom-db
docker rm classroom-ui classroom-server classroom-db
```

### Problema: Contenedor se detiene inmediatamente
```bash
# Ver logs para identificar el error
docker logs [nombre-contenedor]

# Reiniciar en orden: db → server → ui
docker restart classroom-db
sleep 10
docker restart classroom-server
sleep 5
docker restart classroom-ui
```

### Problema: No se puede conectar a la aplicación
1. Verifique que los tres contenedores estén ejecutándose: `docker ps`
2. Espere 30-60 segundos después de iniciar todos los contenedores
3. Intente acceder nuevamente a http://localhost:3000

---

## 🛑 Detener la Aplicación

Para detener todos los servicios:

```bash
docker stop classroom-ui classroom-server classroom-db
```

Para eliminar completamente los contenedores:

```bash
docker stop classroom-ui classroom-server classroom-db
docker rm classroom-ui classroom-server classroom-db
docker network rm classroom-net
```

---

## 🔄 Reiniciar la Aplicación

Si necesita reiniciar la aplicación después de haberla detenido:

```bash
# Crear red (si fue eliminada)
docker network create classroom-net

# Iniciar contenedores en orden
docker start classroom-db
sleep 10
docker start classroom-server
sleep 5
docker start classroom-ui
```

---

## 📋 Comandos de Referencia Rápida

### Comando completo de despliegue (copy/paste)
```bash
# Crear red
docker network create classroom-net

# Descargar imágenes
docker pull davidespindola01/classroom-db
docker pull davidespindola01/classroom-server
docker pull davidespindola01/classroom-ui

# Ejecutar base de datos
docker run -d --name classroom-db --network classroom-net -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=classroomdb -p 5432:5432 davidespindola01/classroom-db

# Esperar 15 segundos
sleep 15

# Ejecutar servidor
docker run -d --name classroom-server --network classroom-net -e DB_HOST=classroom-db -e DB_USER=admin -e DB_PASSWORD=admin -e DB_NAME=classroomdb -p 3000:3000 davidespindola01/classroom-server

# Esperar 5 segundos
sleep 5

# Ejecutar interfaz
docker run -d --name classroom-ui --network classroom-net -p 3001:80 davidespindola01/classroom-ui
```

### Limpieza completa
```bash
docker stop classroom-ui classroom-server classroom-db
docker rm classroom-ui classroom-server classroom-db
docker network rm classroom-net
docker rmi davidespindola01/classroom-ui davidespindola01/classroom-server davidespindola01/classroom-db
```

---

## ✨ Resultado Esperado

Al completar exitosamente estos pasos:

1. ✅ Los tres contenedores estarán ejecutándose
2. ✅ La aplicación estará disponible en http://localhost:3000
3. ✅ Podrá interactuar completamente con la aplicación Classroom
4. ✅ Los datos se persistirán mientras los contenedores estén activos

---

## 📞 Soporte

Si experimenta problemas no cubiertos en este manual:

1. Verifique los logs de cada contenedor con `docker logs [nombre-contenedor]`
2. Asegúrese de que Docker Desktop esté ejecutándose
3. Confirme que no hay otros servicios usando los puertos 3000, 3001 o 5432
4. Intente el proceso de limpieza completa y vuelva a desplegar

**¡La aplicación Classroom está lista para usar!** 🎓
