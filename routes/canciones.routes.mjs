// Rutas de canciones (vistas HTML + API JSON).
// El Router de Express me deja agrupar varias rutas en un archivo
// aparte para no tenerlas todas en index.mjs.

import { Router } from "express";
import {
    listarJson,
    obtenerPorIdJson,
    mostrarCanciones,
    mostrarCancion,
} from "../controllers/canciones.controller.mjs";
import { comprobarToken, comprobarTokenApi } from "../middleware/comprobarToken.mjs";

const router = Router();

// --- Vistas (HTML) ---
// comprobarToken bloquea el acceso si no estás logueado y te manda al /login

// Listado de canciones
router.get("/canciones", comprobarToken, mostrarCanciones);

// Detalle de una canción. El id viene en la URL como query string
// (?id=3). Express lo lee con req.query.id.
router.get("/canciones/detalle", comprobarToken, mostrarCancion);

// --- API (JSON) ---
// comprobarTokenApi hace lo mismo pero responde 401 en vez de redirigir

// Devuelve todas las canciones
router.get("/api/canciones", comprobarTokenApi, listarJson);

// Devuelve una canción por id. Acá el id va en la ruta (:id)
// porque es REST estricto.
router.get("/api/canciones/:id", comprobarTokenApi, obtenerPorIdJson);

export default router;
