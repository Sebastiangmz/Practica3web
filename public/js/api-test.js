// Archivo para probar las peticiones a la API
const BASE_URL = 'http://localhost:3000';

// Prueba para obtener todos los productos
async function testGetAllProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    const data = await response.json();
    console.log('GET /products:', data);
    return data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
  }
}

// Prueba para obtener un producto por ID
async function testGetProductById(id) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    const data = await response.json();
    console.log(`GET /products/${id}:`, data);
    return data;
  } catch (error) {
    console.error(`Error al obtener producto ${id}:`, error);
  }
}

// Prueba para obtener productos para el carrito
async function testGetCartProducts(productIds) {
  try {
    const items = productIds.map(id => ({ productUuid: id, amount: 1 }));
    const response = await fetch(`${BASE_URL}/products/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(items)
    });
    const data = await response.json();
    console.log('POST /products/cart:', data);
    return data;
  } catch (error) {
    console.error('Error al obtener productos para el carrito:', error);
  }
}

// Prueba para crear un nuevo producto
async function testCreateProduct(productData) {
  try {
    const response = await fetch(`${BASE_URL}/admin/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': 'admin'
      },
      body: JSON.stringify(productData)
    });
    const data = await response.json();
    console.log('POST /admin/products:', data);
    return data;
  } catch (error) {
    console.error('Error al crear producto:', error);
  }
}

// Prueba para actualizar un producto
async function testUpdateProduct(id, updates) {
  try {
    const response = await fetch(`${BASE_URL}/admin/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': 'admin'
      },
      body: JSON.stringify(updates)
    });
    const data = await response.json();
    console.log(`PUT /admin/products/${id}:`, data);
    return data;
  } catch (error) {
    console.error(`Error al actualizar producto ${id}:`, error);
  }
}

// Prueba para eliminar un producto
async function testDeleteProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}/admin/products/${id}`, {
      method: 'DELETE',
      headers: {
        'x-auth': 'admin'
      }
    });
    const data = await response.json();
    console.log(`DELETE /admin/products/${id}:`, data);
    return data;
  } catch (error) {
    console.error(`Error al eliminar producto ${id}:`, error);
  }
}

// Ejemplo de producto para crear
const sampleProduct = {
  title: "Miel de Agave",
  description: "Miel de agave orgánica de alta calidad",
  imageUrl: "https://images.freeimages.com/images/large-previews/4da/honey-1326850.jpg",
  unit: "pieza",
  stock: 50,
  pricePerUnit: 152.00,
  category: "Miel"
};

// Ejecutar pruebas
async function runTests() {
  console.log('Iniciando pruebas de la API...');
  
  // Crear un producto
  const newProduct = await testCreateProduct(sampleProduct);
  
  if (newProduct && newProduct.product) {
    const productId = newProduct.product.uuid;
    
    // Obtener todos los productos
    await testGetAllProducts();
    
    // Obtener el producto creado
    await testGetProductById(productId);
    
    // Obtener productos para el carrito
    await testGetCartProducts([productId]);
    
    // Actualizar el producto
    await testUpdateProduct(productId, {
      ...sampleProduct,
      pricePerUnit: 160.00,
      stock: 40
    });
    
    // Eliminar el producto
    await testDeleteProduct(productId);
  }
  
  console.log('Pruebas finalizadas');
}

// Descomentar para ejecutar pruebas automáticamente
// runTests();

// Exportar funciones para uso en la consola
window.testAPI = {
  getAll: testGetAllProducts,
  getById: testGetProductById,
  getCart: testGetCartProducts,
  create: testCreateProduct,
  update: testUpdateProduct,
  delete: testDeleteProduct,
  runAll: runTests
};

console.log('API de prueba cargada. Usa window.testAPI para probar endpoints.');
