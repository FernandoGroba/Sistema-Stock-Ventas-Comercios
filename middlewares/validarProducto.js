import { check, validationResult } from "express-validator";

// La validación en Express debe ser un espejo exacto del esquema de la base de datos SQLite para evitar cualquier fricción o dato corrupto.
export const validarCodigo = () => {
  return check("codigo_barras")
    .notEmpty()
    .withMessage("El código de barras es obligatorio")
    .isString()
    .withMessage("El codigo de barras se captura como un string");
};

export const validarNombre = () => {
  return check("nombre")
    .notEmpty()
    .withMessage("El nombre del producto es obligatorio.")
    .isString()
    .withMessage("El nombre debe ser TEXT.");
};

export const validarPrecioCosto = () => {
  return check("precio_costo")
    .notEmpty()
    .withMessage("El precio de costo es obligatorio.")
    .isFloat({ min: 0 })
    .withMessage("El precio de costo debe ser un número");
};

export const validarPrecioVenta = () => {
  return check("precio_venta")
    .notEmpty()
    .withMessage("El precio de venta es obligatorio.")
    .isFloat({ min: 0 })
    .withMessage("El precio de costo debe ser un número");
};

export const validarStockActual = () => {
  return check("stock_actual")
    .notEmpty()
    .withMessage("El stock actual es obligatorio.")
    .isInt({ min: 0 })
    .withMessage("El stock  debe ser un número mayor o igual a 0.");
};

export const validarStockMinimo = () => {
  return check("stock_minimo")
    .notEmpty()
    .withMessage("El stock  debe ser un número mayor o igual a 0");
};

export const validarCategoria = () => {
  return check("categoria_id")
    .optional({ nullable: true })
    .isInt({ min: 0 })
    .withMessage("La categoría debe ser un número entero mayor o igual a 0.");
};

export const revisarError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      mensaje: "Error de validación según el esquema de la BD",
      errores: errors.array(),
    });
  }
  next();
};
