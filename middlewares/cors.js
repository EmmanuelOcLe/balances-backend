const ORIGINS = [
  "http://localhost:5173"
];

export function CORS (req, res, next) {
  const origin = req.headers.origin;

  // Solo permitir el origen seleccionado
  if (ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  }

  // Si hay preflight enviar 204
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
}