// Conexión a PostgreSQL.
// Uso un Pool: maneja varias conexiones a la vez y las reutiliza,
// más eficiente que abrir y cerrar una conexión por cada query.

import pkg from "pg";
const { Pool } = pkg;

// Si en el .env hay BD_URL la uso (sirve para bases en la nube tipo Neon).
// Si no, uso los datos sueltos (host, user, pass, etc).
const pool = process.env.BD_URL
    ? new Pool({
        connectionString: process.env.BD_URL,
        ssl: { rejectUnauthorized: false },
    })
    : new Pool({
        host: process.env.BD_HOST,
        user: process.env.BD_USER,
        password: process.env.BD_PASS,
        database: process.env.BD_BD,
        port: process.env.BD_PORT,
    });

export default pool;
