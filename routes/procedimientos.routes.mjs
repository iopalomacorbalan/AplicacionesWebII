// Rutas del procedimiento "armar misa".
// Es un procedimiento porque NO es un sustantivo (es un verbo),
// por eso vive en una URL aparte y no respeta REST estricto.

import { Router } from "express";
import {
    armarMisaJson,
    mostrarProcedimiento,
    ejecutarProcedimiento,
} from "../controllers/procedimientos.controller.mjs";
import { comprobarToken, comprobarTokenApi } from "../middleware/comprobarToken.mjs";

const router = Router();

// --- Vistas (HTML) ---

// Muestra la página con el formulario (sin resultado todavía)
router.get("/procedimiento", comprobarToken, mostrarProcedimiento);

// Recibe los datos del formulario y muestra el resultado.
// Es POST porque la duración viene en el cuerpo (req.body).
router.post("/procedimiento", comprobarToken, ejecutarProcedimiento);

// --- API (JSON) ---

// Devuelve la misa armada. La duración va como query string
// (?duracion=20) y se lee con req.query.duracion.
router.get("/api/armar-misa", comprobarTokenApi, armarMisaJson);

export default router;
