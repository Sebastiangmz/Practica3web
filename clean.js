const fs = require('fs');
const path = require('path');

console.log('Limpiando proyecto y restaurando a la versión original...');

// Eliminar archivos innecesarios en la carpeta public
try {
  // Verificar si existen archivos en public/html y eliminarlos
  const htmlDir = path.join(__dirname, 'public', 'html');
  if (fs.existsSync(htmlDir)) {
    const files = fs.readdirSync(htmlDir);
    files.forEach(file => {
      fs.unlinkSync(path.join(htmlDir, file));
      console.log(`Eliminado: ${path.join('public', 'html', file)}`);
    });
    
    // Eliminar el directorio html
    fs.rmdirSync(htmlDir);
    console.log(`Eliminado directorio: ${path.join('public', 'html')}`);
  }
  
  // Eliminar index.html y otros archivos en la raíz de public
  const publicDir = path.join(__dirname, 'public');
  if (fs.existsSync(publicDir)) {
    const files = fs.readdirSync(publicDir);
    files.forEach(file => {
      const filePath = path.join(publicDir, file);
      if (fs.statSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
        console.log(`Eliminado: ${path.join('public', file)}`);
      }
    });
  }
} catch (error) {
  console.error('Error al limpiar archivos:', error);
}

// Asegurarse de que el directorio app/data exista
const dataDir = path.join(__dirname, 'app', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log(`Creado directorio: ${dataDir}`);
}

// Asegurarse de que products.json exista y tenga un arreglo vacío
const productsFile = path.join(dataDir, 'products.json');
if (!fs.existsSync(productsFile)) {
  fs.writeFileSync(productsFile, '[]', 'utf8');
  console.log(`Creado archivo: ${productsFile}`);
}

console.log('\nProyecto restaurado a la versión original.');
console.log('Ejecuta "node server.js" para iniciar el servidor.');
