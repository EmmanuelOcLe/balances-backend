import express from "express";
import { CORS } from "./middlewares/cors.js";
import { responseSchema } from "./responseSchema.js";
import { getPayHandler, getPaysHandler, newPayHandler, newPurchaseHandler } from "./handlers/pays.js";
import postMiddleware from "./middlewares/postMiddleware.js";

const PORT = 3000;

const app = express();
app.disable("x-powered-by");

// CORS middleware
app.use(CORS);
app.use(postMiddleware);

app.get("/", (req, res) => {
  res.json(responseSchema({ message: `Hola, ${req.headers.origin}` }));
});

app.get("/getPays", getPaysHandler);

app.get("/getPay/:id", getPayHandler);

app.post("/newPurchase", newPurchaseHandler);

app.post("/newPay", newPayHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});