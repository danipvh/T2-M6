# 🚗 API Conductores y Automóviles

Proyecto desarrollado con Node.js, Express y PostgreSQL como parte de práctica del Bootcam Desarrollo de Aplicaciones Fullstack Javascript Trainee.

La aplicación permite consultar información de conductores y automóviles mediante una API REST y visualizar los resultados en un frontend simple con HTML, CSS y JavaScript.

---

## 📌 Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- pg (node-postgres)
- dotenv
- CORS
- HTML5
- CSS3
- JavaScript (Fetch API)

---

## 🗄 Base de Datos

Base de datos PostgreSQL con dos tablas:

### Tabla: conductores
- nombre
- edad

### Tabla: automoviles
- marca
- patente
- nombre_conductor
Relación entre tablas: automoviles.nombre_conductor = conductores.nombre

---

## 🚀 Instalación y ejecución

### 1️⃣ Clonar el repositorio
git clone <https://github.com/danipvh/T2-M6.git>

### 2️⃣ Instalar dependencias
npm install

### 3️⃣ Configurar variables de entorno
Crear archivo `.env`:
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=tu_password
DB_DATABASE=nombre_base_datos
DB_PORT=5432

### 4️⃣ Ejecutar el servidor
node server.js
Servidor disponible en: http://localhost:3000


### 5️⃣ Ejecutar frontend
Abrir el archivo: frontend/index.html o utilizar Live Server


---

## 🖥 Funcionalidades del Frontend

- Consumo de API mediante Fetch
- Visualización de resultados en tablas dinámicas
- Manejo de parámetros (query params)
- Manejo de casos sin resultados

---

## 🎯 Objetivos del proyecto

- Comprender la arquitectura cliente-servidor
- Implementar una API REST básica
- Conectar Node.js con PostgreSQL
- Realizar consultas SQL con JOIN
- Consumir endpoints desde frontend
- Manipular el DOM con JavaScript

---

## 👩‍💻 Autor

Proyecto desarrollado por Daniela Villarroel