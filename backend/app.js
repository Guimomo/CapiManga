import express from "express";
// import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import authRoutes from "./src/routes/authRoutes.js";
import administradorRoutes from "./src/routes/administradorRoutes.js";

import notificacionRoutes from "./src/routes/notificacionRoutes.js";
import capituloRoutes from "./src/routes/capituloRoutes.js";
import historiaRoutes from "./src/routes/historiaRoutes.js";
import generosRoutes from "./src/routes/generosRoutes.js";
import tipoEstadoRoutes from "./src/routes/tipoEstadoRoutes.js";
import edadRecomendadaRoutes from "./src/routes/edadRecomendadaRoutes.js";
import tipoHistoriaRoutes from "./src/routes/tipoHistoriaRoutes.js";
import estadoSerieRoutes from "./src/routes/estadoSerieRoutes.js";
import paginasCapituloRoutes from "./src/routes/paginasCapituloRoutes.js";
import guardarHistoriaRoutes from "./src/routes/guardarHistoriaRoutes.js";
import calificacionHistoriaRoutes from "./src/routes/calificacionHistoriaRoutes.js";
import seguirUsuarioRoutes from "./src/routes/seguirUsuarioRoutes.js";
import publicacionRoutes from "./src/routes/publicacionRoutes.js";
import reaccionRoutes from "./src/routes/reaccionRoutes.js";
import meGustaCapituloRoutes from "./src/routes/meGustaCapituloRoutes.js";
import comentarioRoutes from "./src/routes/comentarioRoutes.js";
import usuarioRoutes from "./src/routes/usuarioRoutes.js";
import codigoTelefonicoRoutes from "./src/routes/codigoTelefonicoRoutes.js";

dotenv.config();

// Crear la instancia de Express
const app = express();
// Middleware

// Habilita CORS
app.use(cors()); 

// Permite que la app acepte datos JSON
app.use(bodyParser.json());

// Servir la carpeta uploads como pública
app.use('/uploads', express.static('uploads'));

// Permite el envio de datos de tipo utlencode
app.use(express.urlencoded({ extended: true }));

// Permite manejar cookies en las respuestas.
app.use(cookieParser());

// Rutas ordenadas alfabéticamente y por jerarquía lógica
app.use("/api/admin", administradorRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/calificaciones", calificacionHistoriaRoutes);
app.use("/api/capitulos", capituloRoutes);
app.use("/api/comentarios", comentarioRoutes);
app.use("/api/edad-recomendada", edadRecomendadaRoutes);
app.use("/api/estados-serie", estadoSerieRoutes);
app.use("/api/generos", generosRoutes);
app.use("/api/guardar-historia", guardarHistoriaRoutes);
app.use("/api/historias", historiaRoutes);
app.use("/api/me-gusta-capitulo", meGustaCapituloRoutes);
app.use("/api/notificaciones", notificacionRoutes);
app.use("/api/paginas-capitulo", paginasCapituloRoutes);
app.use("/api/publicaciones", publicacionRoutes);
app.use("/api/reacciones", reaccionRoutes);
app.use("/api/seguir-usuario", seguirUsuarioRoutes);
app.use("/api/tipo-estado", tipoEstadoRoutes);
app.use("/api/tipo-historia", tipoHistoriaRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/codigos-telefonicos", codigoTelefonicoRoutes);

// Puerto para ejecutar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});