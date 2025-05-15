const fs = require('fs');
const path = require('path');

// Archivo a eliminar
const indexFile = path.join(__dirname, 'index.html');

// Verificar si el archivo existe
if (fs.existsSync(indexFile)) {
  // Eliminar el archivo
  fs.unlinkSync(indexFile);
  console.log(`Archivo ${indexFile} eliminado correctamente.`);
} else {
  console.log(`El archivo ${indexFile} no existe.`);
}

// Otros archivos a limpiar
const filesToCheck = [
  'basic_server.js',
  'check_project.js',
  'fix_paths.js',
  'simple_server.js'
];

// Eliminar otros archivos temporales
filesToCheck.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Archivo ${filePath} eliminado correctamente.`);
  }
});

console.log('Limpieza completada. Ejecuta "node server.js" para iniciar el servidor.');
