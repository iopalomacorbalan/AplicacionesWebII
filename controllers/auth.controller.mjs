// Controlador de autenticación.
// Maneja el login, el armado de la cookie con el token y el logout.

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { buscarPorUsuario } from "../models/usuario.model.mjs";

// GET /login -> muestra el formulario
export function mostrarLogin(req, res) {
    res.render("login", { error: null });
}

// POST /autenticar -> valida usuario y contraseña
export async function autenticar(req, res) {
    // req.body trae los datos del formulario (usuario y clave)
    const { usuario, clave } = req.body;

    if (!usuario || !clave) {
        return res.status(400).render("login", { error: "Completá usuario y contraseña" });
    }

    try {
        // Busco el usuario en la base
        const usuarioBD = await buscarPorUsuario(usuario);

        if (!usuarioBD) {
            return res.status(401).render("login", { error: "Usuario o contraseña incorrectos" });
        }

        // bcrypt compara la contraseña que escribió el usuario contra
        // la versión encriptada que está en la base. Nunca guardamos
        // contraseñas en texto plano.
        const claveValida = bcrypt.compareSync(clave, usuarioBD.clave);

        if (!claveValida) {
            return res.status(401).render("login", { error: "Usuario o contraseña incorrectos" });
        }

        // Genero un token JWT. Es una cadena firmada con el secreto
        // del .env. Adentro guardo el id y el usuario.
        const token = jwt.sign(
            { id: usuarioBD.id, usuario: usuarioBD.usuario },
            process.env.FIRMA_JWT,
            { expiresIn: "1h" }
        );

        // Mando el token al navegador como cookie.
        // - signed: la firmo con FIRMA_COOKIE para detectar si la tocaron
        // - httpOnly: el JavaScript del navegador no la puede leer (más seguro)
        // - sameSite "lax": no se manda en pedidos desde otros sitios
        // - secure en producción: solo viaja por HTTPS
        // - maxAge: dura 1 hora
        res.cookie("token", token, {
            signed: true,
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60,
        });

        res.redirect("/canciones");
    } catch (error) {
        console.error("Error al autenticar:", error);
        res.status(500).render("login", { error: "Error en el servidor" });
    }
}

// GET /cerrar-sesion -> borra la cookie y vuelve al login
export function cerrarSesion(req, res) {
    res.clearCookie("token");
    res.redirect("/login");
}
