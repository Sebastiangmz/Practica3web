const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const PRODUCTS_FILE = path.join(__dirname, 'app', 'data', 'products.json');

// Leer productos del archivo
function readProducts() {
  try {
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al leer productos:', error);
    return [];
  }
}

// Escribir productos al archivo
function writeProducts(products) {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error al escribir productos:', error);
    return false;
  }
}

// Funciones CRUD
function getAllProducts() {
  return readProducts();
}

function getProductById(id) {
  const products = readProducts();
  return products.find(product => product.uuid === id) || null;
}

function getProductsByIds(ids) {
  const products = readProducts();
  return products.filter(product => ids.includes(product.uuid));
}

function createProduct(product) {
  const products = readProducts();
  const newProduct = {
    uuid: uuidv4(),
    ...product
  };
  products.push(newProduct);
  writeProducts(products);
  return newProduct;
}

function updateProduct(id, updates) {
  const products = readProducts();
  const index = products.findIndex(product => product.uuid === id);
  
  if (index === -1) return null;
  
  const updatedProduct = {
    ...products[index],
    ...updates,
    uuid: id // Mantener el mismo uuid
  };
  
  products[index] = updatedProduct;
  writeProducts(products);
  return updatedProduct;
}

function deleteProduct(id) {
  const products = readProducts();
  const index = products.findIndex(product => product.uuid === id);
  
  if (index === -1) return false;
  
  const removedProduct = products[index];
  products.splice(index, 1);
  writeProducts(products);
  return removedProduct;
}

function filterProducts(query) {
  const products = readProducts();
  
  if (!query) return products;
  
  return products.filter(product => {
    const searchLower = query.toLowerCase();
    return (
      product.title.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower)
    );
  });
}

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByIds,
  createProduct,
  updateProduct,
  deleteProduct,
  filterProducts
};
