const express = require('express');
const router = express.Router();
const dataHandler = require('../../data_handler');

// GET /products
router.get('/', (req, res) => {
  const query = req.query.query;
  const products = dataHandler.filterProducts(query);
  res.status(200).json(products);
});

// GET /products/:id
router.get('/:id', (req, res) => {
  const product = dataHandler.getProductById(req.params.id);
  
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  
  res.status(200).json(product);
});

// POST /products/cart
router.post('/cart', (req, res) => {
  const items = req.body;
  
  // Validar que el body sea un arreglo
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'Se esperaba un arreglo de productos' });
  }
  
  const productIds = items.map(item => item.productUuid);
  const products = dataHandler.getProductsByIds(productIds);
  
  // Verificar que todos los productos existan
  if (products.length !== productIds.length) {
    const foundIds = products.map(p => p.uuid);
    const missingIds = productIds.filter(id => !foundIds.includes(id));
    
    return res.status(404).json({ 
      error: `Productos no encontrados: ${missingIds.join(', ')}` 
    });
  }
  
  // Agregar cantidades a los productos
  const result = products.map(product => {
    const item = items.find(i => i.productUuid === product.uuid);
    return {
      ...product,
      amount: item ? item.amount : 0
    };
  });
  
  res.status(200).json(result);
});

module.exports = router;
