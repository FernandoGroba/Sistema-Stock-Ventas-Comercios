import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../database/db.js";

// ================ REGISTER ===============
export const register = async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) {
    return res
      .status(400)
      .json({ mensaje: "Todos los campos son obligatorios" });
  }

  try {
    // Verificar existencia previa
    const usuarioExistente = db
      .prepare("SELECT * FROM usuarios WHERE email = ? ")
      .get(email);
    if (usuarioExistente) {
      return res
        .status(409)
        .json({ mensaje: "El usuario ya se encuentra registrado" });
    }

    // Proceso criptográfico (I/O no bloqueante)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    // Inserción en SQLite
    const insert = db.prepare(
      "INSERT INTO usuarios(nombre, email, password) VALUES (?, ?, ?)",
    );
    const resultado = insert.run(nombre, email, passwordHash);
    // si SQLite no pudo insertar la fila
    if (!resultado.changes) {
      return res
        .status(500)
        .json({ mensaje: "No se pudo registrar el usuario" });
    }
    // respuesta limpia de exito

    return res.status(201).json({
      mensaje: "Usuario resgistrado exitosamente",
      usuario: {
        id: resultado.lastInsertRowid,
        nombre,
        email,
        rol: "cajero",
      },
    });
  } catch (error) {
    // errores
    console.error("Error en register:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// ================ LOGIN ===============

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ mensaje: "Todos los campos son requiridos" });
  }

  try {
    const usuario = db
      .prepare("SELECT * FROM usuarios WHERE email = ? ")
      .get(email);
    if (!usuario) {
      return res.status(401).json({ Unauthorized: "Credenciales inválidas" });
    }
    const passwordCorrecto = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrecto) {
      return res.status(401).json({ mensaje: "Credenciales Inválidas" });
    }

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "2h" },
    );
    return res.status(200).json({
      mensaje: "Inicio de sesion exitoso",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error("Error en login", error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
