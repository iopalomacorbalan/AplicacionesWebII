// Middleware: registra cada pedido al servidor.
// Mide cuánto tarda la respuesta y guarda todo en un archivo.

import { appendFileSync, mkdirSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const carpetaLogs = join(__dirname, "..", "logs");
const archivoLog = join(carpetaLogs, "acceso.log");

// Crea la carpeta logs si no existe
if (!existsSync(carpetaLogs)) {
    mkdirSync(carpetaLogs, { recursive: true });
}

export const logger = (req, res, next) => {
    const inicio = Date.now();

    // Cuando termina la respuesta, calculo cuánto tardó
    res.on("finish", () => {
        const duracion = Date.now() - inicio;
        const fecha = new Date().toLocaleString("es-AR");
        const linea = `[${fecha}] ${req.method} ${req.url} -> ${res.statusCode} (${duracion}ms)\n`;

        // Muestro en consola y guardo en el archivo
        process.stdout.write(linea);
        appendFileSync(archivoLog, linea, "utf-8");
    });

    // next() sigue con la próxima función. Si no lo llamo, el pedido se cuelga.
    next();
};
