import { Router } from "express";
import { readFileSync } from "fs";

const router = Router();
const canciones = JSON.parse(readFileSync("./canciones.json", "utf-8"));

router.get("/", (req, res) => {
    res.json(canciones);
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const cancion = canciones.find(c => c.id === id);

    if (!cancion) {
        return res.status(404).json({ error: `No se encontró la canción con id ${id}` });
    }

    res.json(cancion);
});

export default router;
