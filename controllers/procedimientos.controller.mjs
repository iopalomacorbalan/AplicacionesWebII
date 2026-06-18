// Controlador del procedimiento "armar misa".
// Toma una duración objetivo (en minutos) y arma una lista de
// canciones que se acerque a esa duración.

import canciones from "../data/canciones.mjs";

// Función interna que arma la misa.
// 1) Elige una canción al azar de cada momento (entrada, ofertorio,
//    comunión, salida).
// 2) Después agrega las canciones que sobren mientras no se pase
//    de la duración objetivo.
function armarMisa(duracion) {
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

    // Sumo otras canciones mientras no me pase del tiempo
    const restantes = canciones.filter(c => !misa.includes(c));
    for (const cancion of restantes) {
        if (total + cancion.duracion <= duracion) {
            misa.push(cancion);
            total += cancion.duracion;
        }
    }

    // Junto todos los instrumentos de las canciones elegidas en una sola
    // lista, sin repetir (Set elimina duplicados).
    const instrumentosNecesarios = [...new Set(misa.flatMap(c => c.instrumentos))];

    // Agrupo las canciones por momento de la misa para mostrarlas
    // organizadas en la vista.
    const cancionesPorMomento = {
        entrada: misa.filter(c => c.tipo === "entrada"),
        ofertorio: misa.filter(c => c.tipo === "ofertorio"),
        comunion: misa.filter(c => c.tipo === "comunion"),
        salida: misa.filter(c => c.tipo === "salida"),
    };

    return {
        duracionObjetivo: duracion,
        duracionTotal: total,
        cantidad: misa.length,
        canciones: misa,
        cancionesPorMomento,
        instrumentosNecesarios,
    };
}

// --- Para la API (JSON) ---

// GET /api/armar-misa?duracion=20
export function armarMisaJson(req, res) {
    // req.query lee los datos del "?" de la URL
    const duracion = Number(req.query.duracion);

    if (!duracion || duracion <= 0) {
        return res.status(400).json({ error: "Debe enviar el parámetro duracion (en minutos)" });
    }

    res.json(armarMisa(duracion));
}

// --- Para las vistas ---

// GET /procedimiento -> muestra la página vacía (sin resultado)
export function mostrarProcedimiento(req, res) {
    res.render("procedimiento", { resultado: null, error: null, usuario: req.usuario });
}

// POST /procedimiento -> ejecuta y vuelve a mostrar la página con el resultado
export function ejecutarProcedimiento(req, res) {
    // req.body trae los datos del formulario (los manda el navegador
    // cuando hacés submit)
    const duracion = Number(req.body.duracion);

    if (!duracion || duracion <= 0) {
        return res.render("procedimiento", {
            resultado: null,
            error: "Ingresá una duración válida en minutos",
            usuario: req.usuario,
        });
    }

    const resultado = armarMisa(duracion);
    res.render("procedimiento", { resultado, error: null, usuario: req.usuario });
}
