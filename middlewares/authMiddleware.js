import jwt from "jsonwebtoken";

export const validarToken = (req, res, next) => {
  console.log("---- DEBUG ----");
  console.log("Cabecera real:", req.headers["authorization"]);
  // Extraer la cabecera 'authorization' desde req.headers
  const authHeader = req.headers["authorization"];
  // Cláusula de guarda inicial
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ mensaje: "Acceso denegado: token no provisto" });
  }
  // Separar la palabra "Bearer" del token real
  const token = authHeader.split(" ")[1];

  try {
    // Verificar la firma y expiración del token contra JWT_SECRET
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Inyectar los datos decodificados en el objeto 'req'
    req.usuario = payload;
    next();
  } catch (error) {
    //   Si el token expiró o fue adulterado, jwt.verify lanza excepción:
    return res.status(403).json({ mensaje: "Token inválido o expirado" });
  }
};
