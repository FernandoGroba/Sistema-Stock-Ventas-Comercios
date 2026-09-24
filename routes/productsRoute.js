import { Router } from "express";
import { validarToken } from "../middlewares/authMiddleware.js";
import {
  crearProducto,
  obtenerProductos,
  actualizrProducto,
  eliminarProducto,
} from "../controllers/productosControllers.js";
import {
  validarCodigo,
  validarNombre,
  validarPrecioCosto,
  validarPrecioVenta,
  validarStockActual,
  validarStockMinimo,
  validarCategoria,
  revisarError,
} from "../middlewares/validarProducto.js";
const router = Router();
router.use(validarToken);

router.get("/", obtenerProductos);
router.post(
  "/",

  validarCodigo(),
  validarNombre(),
  validarPrecioCosto(),
  validarPrecioVenta(),
  validarStockActual(),
  validarStockMinimo(),
  validarCategoria(),
  revisarError,
  crearProducto,
);
router.put("/:id", actualizrProducto);
router.delete("/:id", eliminarProducto);

export default router;
