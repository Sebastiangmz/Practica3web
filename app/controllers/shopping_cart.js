const dataHandler = require('../../data_handler');

// Controlador para carrito de compras
class ShoppingCartController {
  // Obtener productos para el carrito
  getCartProducts(req, res) {
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
}

module.exports = new ShoppingCartController();
