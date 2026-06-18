// Middleware que protege las rutas.
// Si el usuario no tiene una cookie con un token válido, no lo deja pasar.

import jwt from "jsonwebtoken";

// Versión para las VISTAS: si no hay sesión, redirige al /login
export function comprobarToken(req, res, next) {
    // req.signedCookies trae las cookies firmadas (las creó cookie-parser).
    // Si la cookie fue modificada, no aparece acá.
    const token = req.signedCookies["token"];

    if (!token) {
        return res.redirect("/login");
    }

    // Verifico que el token sea válido (firmado con nuestro secreto y no vencido)
    jwt.verify(token, process.env.FIRMA_JWT, (error, datosUtiles) => {
        if (error) {
            return res.redirect("/login");
        }
        // Guardo los datos del usuario en req para que los controladores los usen
        req.usuario = datosUtiles;
        next();
    });
}

// Versión para la API: si no hay sesión, responde 401 con JSON
// (no redirige porque quien consume la API no es un navegador)
export function comprobarTokenApi(req, res, next) {
    const token = req.signedCookies["token"];

    if (!token) {
        return res.status(401).json({ error: "No autorizado" });
    }

    jwt.verify(token, process.env.FIRMA_JWT, (error, datosUtiles) => {
        if (error) {
            return res.status(401).json({ error: "Token inválido" });
        }
        req.usuario = datosUtiles;
        next();
    });
}
