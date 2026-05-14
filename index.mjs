import express from "express";
import { logger } from "./middleware.mjs";
import cancionesRouter from "./canciones.mjs";
import procesosRouter from "./procesos.mjs";

const app = express();
const PUERTO = 3000;

app.use(logger);

app.use("/api/canciones", cancionesRouter);
app.use("/api", procesosRouter);

app.listen(PUERTO, () => {
    console.log(`Servidor en http://localhost:${PUERTO}`);
});
