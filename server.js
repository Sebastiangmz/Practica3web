const express = require('express');
const path = require('path');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configuración de las rutas
const router = require('./app/router');

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Usar el router para todas las rutas
app.use('/', router);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
