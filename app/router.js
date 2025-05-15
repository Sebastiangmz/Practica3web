const express = require('express');
const router = express.Router();
const path = require('path');
const productsRouter = require('./routes/products');
const adminProductsRouter = require('./routes/admin_products');

// Configurar rutas de productos
router.use('/products', productsRouter);
router.use('/admin/products', adminProductsRouter);

// Servir archivos HTML
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

router.get('/shopping_cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'shopping_cart.html'));
});

module.exports = router;
