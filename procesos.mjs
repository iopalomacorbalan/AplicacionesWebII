import { Router } from "express";
import { readFileSync } from "fs";

const router = Router();
const canciones = JSON.parse(readFileSync("./canciones.json", "utf-8"));

router.get("/armar-misa", (req, res) => {
    const duracion = Number(req.query.duracion);

    if (!duracion || duracion <= 0) {
        return res.status(400).json({ error: "Debe enviar el parámetro duracion (en minutos)" });
    }

    const tipos = ["entrada", "ofertorio", "comunion", "salida"];
    const misa = [];
    let total = 0;

    for (const tipo of tipos) {
        const opciones = canciones.filter(c => c.tipo === tipo);
        if (opciones.length > 0) {
            const elegida = opciones[Math.floor(Math.random() * opciones.length)];
            misa.push(elegida);
            total += elegida.duracion;
        }
    }

    const restantes = canciones.filter(c => !misa.includes(c));
    for (const cancion of restantes) {
        if (total + cancion.duracion <= duracion) {
            misa.push(cancion);
            total += cancion.duracion;
        }
    }

    res.json({
        duracionObjetivo: duracion,
        duracionTotal: total,
        cantidad: misa.length,
        canciones: misa
    });
});

export default router;
