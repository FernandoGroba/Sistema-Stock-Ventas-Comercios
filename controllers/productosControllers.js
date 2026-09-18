import db from "../database/db.js";

// List productos

export const obtenerProductos = (req, res) => {
  try {
    const productos = db.prepare("SELECT * FROM productos").all();
    res.json(productos);
  } catch (err) {
    res.status(5000).josn({ error: "Error al obtener los productos" });
  }
};
// Create productos
export const crearProducto = (req, res) => {
  const {
    codigo_barras,
    nombre,
    precio_costo,
    precio_venta,
    stock_actual,
    stock_minimo,
    categoria_id,
  } = req.body;

  try {
    const query = `INSERT INTO productos ( codigo_barras,nombre, precio_costo, precio_venta, stock_actual, stock_minimo, categoria_id ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const stmt = db.prepare(query);
    const resultado = stmt.run(
      codigo_barras,
      nombre,
      precio_costo,
      precio_venta,
      stock_actual,
      stock_minimo,
      categoria_id,
    );

    res.status(201).json({
      mensaje: "Producto creado exitosamente",
      id: resultado.lastInsertRowid,
    });
  } catch (error) {
    console.error("ERROR REAL DE SQLITE:", error);
    res.status(500).json({
      error: "Error interno al crear el producto, mira la consola de VS Code",
    });
  }
};
// Update productos
export const actualizrProducto = (req, res) => {
  const { id } = req.params; //obtiene el id desde la url
  const { precio_costo, precio_venta, stock_actual } = req.body;

  try {
    const query = `
      UPDATE productos SET precio_costo = ?, precio_venta = ?, stock_actual = ? WHERE id = ?
    `;
    const resultado = db
      .prepare(query)
      .run(precio_costo, precio_venta, stock_actual, id);

    if (resultado.change === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({ mensaje: "Producto actualizado con éxito" });
  } catch (error) {
    console.error("ERROR REAL DE SQLITE:", error);
    res.status(500).json({ error: "Error interno al actualizar el producto" });
  }
};

// Delete productos
export const eliminarProducto = (req, res) => {
  const { id } = req.params;
  const idNumerico = Number(id);

  try {
    const query = `DELETE FROM productos WHERE id = ?`;
    const resultado = db.prepare(query).run(idNumerico);

    // Si changes es 0, no borró nada porque el ID no existe
    if (resultado.changes === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ mensaje: "Producto eliminado con éxito" });
  } catch (error) {
    console.error("ERROR REAL DE SQLITE:", error);
    res.status(500).json({ error: "Error interno al eliminar el producto" });
  }
};
