import "./iniciar.env.mjs";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import pool from "./conexion.bd.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sql = readFileSync(join(__dirname, "sql", "esquema.sql"), "utf-8");

try {
    console.log("Conectando a la base...");
    await pool.query(sql);
    console.log("✓ Tabla 'usuarios' creada e INSERT ejecutado correctamente");

    const resultado = await pool.query("SELECT id, usuario FROM usuarios");
    console.log("Usuarios en la base:", resultado.rows);
} catch (error) {
    console.error("✗ Error:", error.message);
    process.exit(1);
} finally {
    await pool.end();
}
