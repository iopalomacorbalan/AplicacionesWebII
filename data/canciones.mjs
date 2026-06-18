// Lee las canciones desde el archivo JSON y las expone como
// un array para que cualquier controlador las pueda importar.

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rutaJson = join(__dirname, "canciones.json");

const canciones = JSON.parse(readFileSync(rutaJson, "utf-8"));

export default canciones;
