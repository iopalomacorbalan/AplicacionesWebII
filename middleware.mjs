export const logger = (req, res, next) => {
    const fecha = new Date().toLocaleString();
    console.log(`[${fecha}] ${req.method} ${req.url}`);
    next();
};
