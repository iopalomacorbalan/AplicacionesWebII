// Modelo de usuarios.
// Acá viven las consultas a la base. El controlador llama a estas
// funciones y no necesita saber SQL.

import pool from "../conexion.bd.mjs";

// Busca un usuario por nombre. Devuelve el registro o null si no existe.
export async function buscarPorUsuario(usuario) {
    // Uso $1 (parámetro) en vez de pegar el valor en el string.
    // Así evito SQL injection: si alguien pone algo raro en el input,
    // pg lo trata como dato, no como código.
    const consulta = "SELECT id, usuario, clave FROM usuarios WHERE usuario = $1";
    const resultado = await pool.query(consulta, [usuario]);
    return resultado.rows[0] || null;
}
