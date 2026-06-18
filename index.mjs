// Archivo principal del servidor.
// Acá conecto todo: variables de entorno, middlewares, routers y vistas.

// Cargo las variables del .env ANTES de todo lo demás
// (para que ya estén disponibles cuando se importan los otros archivos)
import "./iniciar.env.mjs";

import express from "express";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import { logger } from "./middleware/logger.mjs";
import authRouter from "./routes/auth.routes.mjs";
import cancionesRouter from "./routes/canciones.routes.mjs";
import procedimientosRouter from "./routes/procedimientos.routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PUERTO = process.env.PUERTO || 3000;

// Configuro EJS como motor de vistas y le digo dónde están los .ejs
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

// Middlewares globales (se ejecutan en cada pedido)
app.use(express.urlencoded({ extended: true })); // lee datos de formularios
app.use(express.json());                          // lee JSON del body
app.use(cookieParser(process.env.FIRMA_COOKIE));  // lee/firma cookies
app.use(express.static(join(__dirname, "public"))); // sirve archivos de /public
app.use(logger);                                  // registra cada pedido

// Si entran a la raíz, los mando al listado
app.get("/", (req, res) => res.redirect("/canciones"));

// Monto los routers (cada uno maneja sus rutas)
app.use("/", authRouter);
app.use("/", cancionesRouter);
app.use("/", procedimientosRouter);

app.listen(PUERTO, () => {
    console.log(`Servidor en http://localhost:${PUERTO}`);
});
