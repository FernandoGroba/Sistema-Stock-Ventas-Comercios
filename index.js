import "dotenv/config";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoute from "./routes/productsRoute.js";
import authRoute from "./routes/authRoute.js";

import { inicializarBaseDeDatos } from "./database/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/v1/productos", productRoute);
app.use("/api/v1/auth", authRoute);

// Inicializar la base de datos
inicializarBaseDeDatos();

app.get("/", (req, res) => {
  res.json({ mensaje: "API del Kiosco funcionando con ESM y SQLite" });
});

app.listen(PORT, () => {
  console.log(`servidor corriendo en http://localhost:${PORT}`);
});
