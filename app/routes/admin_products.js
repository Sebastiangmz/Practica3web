const express = require('express');
const router = express.Router();
const dataHandler = require('../../data_handler');
const { validateAdmin } = require('../middlewares/auth');

// POST /admin/products
router.post('/', validateAdmin, (req, res) => {
  const productData = req.body;
  
  // Validar campos requeridos
  const requiredFields = ['imageUrl', 'title', 'description', 'unit', 'category', 'pricePerUnit', 'stock'];
  const missingFields = requiredFields.filter(field => !productData[field]);
  
  if (missingFields.length > 0) {
    return res.status(400).json({ 
      error: `Faltan campos requeridos: ${missingFields.join(', ')}` 
    });
  }
  
  try {
    const newProduct = dataHandler.createProduct(productData);
    res.status(201).json({ 
      message: `Producto "${newProduct.title}" creado exitosamente`, 
      product: newProduct 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /admin/products/:id
router.put('/:id', validateAdmin, (req, res) => {
  const productId = req.params.id;
  const updates = req.body;
  
  // Validar campos requeridos
  const requiredFields = ['imageUrl', 'title', 'description', 'unit', 'category', 'pricePerUnit', 'stock'];
  const missingFields = requiredFields.filter(field => !updates[field]);
  
  if (missingFields.length > 0) {
    return res.status(400).json({ 
      error: `Faltan campos requeridos: ${missingFields.join(', ')}` 
    });
  }
  
  try {
    const updatedProduct = dataHandler.updateProduct(productId, updates);
    
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.status(200).json({ 
      message: `Producto "${updatedProduct.title}" actualizado exitosamente`, 
      product: updatedProduct 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /admin/products/:id
router.delete('/:id', validateAdmin, (req, res) => {
  const productId = req.params.id;
  
  try {
    const deletedProduct = dataHandler.deleteProduct(productId);
    
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.status(200).json({ 
      message: `Producto "${deletedProduct.title}" eliminado exitosamente` 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
