CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    clave VARCHAR(255) NOT NULL
);

INSERT INTO usuarios (usuario, clave)
VALUES ('admin', '$2b$10$EafD38PpMwUYBEctoFw5..IfG3wYyoVKSm.7DgyBL4k7Jx0m.smqi')
ON CONFLICT (usuario) DO NOTHING;
