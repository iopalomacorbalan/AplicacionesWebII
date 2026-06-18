// Rutas de login y logout.
// No tienen comprobarToken porque son las que dan/sacan la sesión.

import { Router } from "express";
import { mostrarLogin, autenticar, cerrarSesion } from "../controllers/auth.controller.mjs";

const router = Router();

// Muestra el formulario de login
router.get("/login", mostrarLogin);

// Recibe usuario y contraseña, los valida y crea la cookie
router.post("/autenticar", autenticar);

// Borra la cookie y vuelve al login
router.get("/cerrar-sesion", cerrarSesion);

export default router;
