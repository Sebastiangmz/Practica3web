// Funciones de utilidad

/**
 * Valida los campos requeridos en un objeto
 * @param {Object} obj - Objeto a validar
 * @param {Array<string>} requiredFields - Lista de campos requeridos
 * @returns {Array<string>} Lista de campos faltantes
 */
function validateRequiredFields(obj, requiredFields) {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Se esperaba un objeto para validar');
  }
  
  return requiredFields.filter(field => {
    const value = obj[field];
    
    // Consideramos un campo como faltante si:
    // - Es undefined
    // - Es null
    // - Es una cadena vacía (después de quitar espacios)
    // - Es NaN
    
    if (value === undefined || value === null) {
      return true;
    }
    
    if (typeof value === 'string' && value.trim() === '') {
      return true;
    }
    
    if (typeof value === 'number' && isNaN(value)) {
      return true;
    }
    
    return false;
  });
}

/**
 * Filtra un objeto para quedarse solo con las propiedades especificadas
 * @param {Object} obj - Objeto a filtrar
 * @param {Array<string>} allowedProps - Propiedades permitidas
 * @returns {Object} Objeto filtrado
 */
function filterObject(obj, allowedProps) {
  if (!obj || typeof obj !== 'object') {
    return {};
  }
  
  return allowedProps.reduce((filtered, prop) => {
    if (obj[prop] !== undefined) {
      filtered[prop] = obj[prop];
    }
    return filtered;
  }, {});
}

/**
 * Compara dos objetos para ver si tienen las mismas propiedades
 * @param {Object} obj1 - Primer objeto
 * @param {Object} obj2 - Segundo objeto
 * @returns {boolean} true si tienen las mismas propiedades, false en caso contrario
 */
function haveSameProps(obj1, obj2) {
  const props1 = Object.keys(obj1).sort();
  const props2 = Object.keys(obj2).sort();
  
  if (props1.length !== props2.length) {
    return false;
  }
  
  return props1.every((prop, i) => prop === props2[i]);
}

module.exports = {
  validateRequiredFields,
  filterObject,
  haveSameProps
};
