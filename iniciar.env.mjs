// Carga las variables del archivo .env en process.env.
// Importo este archivo el primero de todo en index.mjs, para que
// las variables ya estén disponibles cuando se carguen los demás.

import dotenv from "dotenv";
dotenv.config();
