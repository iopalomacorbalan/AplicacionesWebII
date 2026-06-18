// Controlador de canciones.
// Acá vive la lógica: el router decide la URL, el controlador
// decide qué hacer cuando esa URL se pide.

import canciones from "../data/canciones.mjs";

// --- Funciones para la API (devuelven JSON) ---

// GET /api/canciones -> manda todas las canciones como JSON
export function listarJson(req, res) {
    res.json(canciones);
}

// GET /api/canciones/:id -> manda una canción por id
export function obtenerPorIdJson(req, res) {
    // req.params.id lee el :id de la URL (ej: /api/canciones/3 -> "3")
    const id = Number(req.params.id);
    const cancion = canciones.find(c => c.id === id);

    if (!cancion) {
        return res.status(404).json({ error: `No se encontró la canción con id ${id}` });
    }

    res.json(cancion);
}

// --- Funciones para las vistas (devuelven HTML con EJS) ---

// GET /canciones -> renderiza la lista
export function mostrarCanciones(req, res) {
    // res.render("canciones", { datos }) busca views/canciones.ejs
    // y le pasa los datos para mostrar
    res.render("canciones", { canciones, usuario: req.usuario });
}

// GET /canciones/detalle?id=3 -> renderiza una sola canción
export function mostrarCancion(req, res) {
    // req.query lee los datos después del "?" en la URL.
    // Ejemplo: /canciones/detalle?id=3 -> req.query = { id: "3" }
    const id = Number(req.query.id);
    const cancion = canciones.find(c => c.id === id);

    res.render("cancion", { cancion, id, usuario: req.usuario });
}
