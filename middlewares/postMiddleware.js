export default function postMiddleWare(req, res, next) {
  if (req.method !== "POST") return next();
  if (req.headers["content-type"] !== "application/json" &&
    req.headers["content-type"] !== "application/json; charset=utf-8") return next();

  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    // Si el body es vacío enviar un status(400)
    if (body.trim() === ""){
      return res.status(400).json({
        success: false,
        message: "Invalid body sent.",
        error: true,
        data: null
      });
    }

    let data;
    try {
      data = JSON.parse(body);
    }
    catch {
      return res.status(400).json({
        success: false,
        message: "Invalid body sent.",
        error: true,
        data: null
      });
    }

    // Mutar la request y meter la info en el req.body
    req.body = data;
    next();
  });
}