import { Router } from "express";
import {
  crearProducto,
  obtenerProductos,
  actualizrProducto,
  eliminarProducto,
} from "../controllers/productosControllers.js";
const router = Router();

router.get("/", obtenerProductos);
router.post("/", crearProducto);
router.put("/:id", actualizrProducto);
router.delete("/:id", eliminarProducto);

export default router;
