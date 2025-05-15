const dataHandler = require('../../data_handler');

// Controlador para productos
class ProductController {
  // Obtener todos los productos (con posible filtro)
  getAllProducts(req, res) {
    const query = req.query.query;
    const products = dataHandler.filterProducts(query);
    res.status(200).json(products);
  }

  // Obtener un producto por ID
  getProductById(req, res) {
    const product = dataHandler.getProductById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.status(200).json(product);
  }

  // Obtener productos para el carrito
  getProductsForCart(req, res) {
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
  }

  // Crear un nuevo producto
  createProduct(req, res) {
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
  }

  // Actualizar un producto existente
  updateProduct(req, res) {
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
  }

  // Eliminar un producto
  deleteProduct(req, res) {
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
  }
}

module.exports = new ProductController();
