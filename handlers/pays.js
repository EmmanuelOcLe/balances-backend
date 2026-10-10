import { responseSchema } from "../responseSchema.js";
import { getPay, getPays, newPurchase, newPay } from "../models/pays.js";
import { isValidNumber } from "../utils/number.util.js";
import { purchase, pay } from "../schemas/purchases.js";

export async function getPaysHandler (req, res) {
  try {
    const paysRes = await getPays();

    res.status(200).json(responseSchema({
      message: "Everything ok",
      data: paysRes
    }));
  }
  catch (error) {
    res.status(500).json(responseSchema(
      {
        success: false,
        message: error.message,
        error: true
      }));
  }
}

export async function getPayHandler (req, res) {
  const { id } = req.params;

  if (!isValidNumber(id)) {
    return res.send(400).json(responseSchema({
      message: "The id argument must be an integer number.",
      error: true
    }));
  }

  try {
    const result = await getPay(id);
    res.status(200).json(responseSchema({
      message: "Everything OK",
      data: result
    }));
  }
  catch (error) {
    res.status(500).send(responseSchema({
      message: error.message,
      error: true,
      success: false
    }));
  }
}

export async function newPurchaseHandler (req, res) {
  const { purchaseName, purchaseCost, payId } = req.body;

  try {
    const validData = purchase.parse({ purchaseName, payId, purchaseCost });

    await newPurchase(validData);

    res.send(responseSchema({
      message: "Compra registrada exitosamente",
      data: validData
    }));
  }
  catch (error) {
    let errors = []
    error.issues.forEach(err => {
      errors.push(err);
    });
    res.status(400).json(responseSchema({
      success: false,
      message: errors,
      error: true
    }))
  }

}

export async function newPayHandler (req, res) {
  const input = req.body;

  try {
    const validData = pay.parse(input);

    await newPay(validData);

    res.status(201).json(responseSchema({
      message: "Pay created successfully.",
      data: validData
    }));
  }
  catch (error) {
    // Si el error es de zod (es decir, tiene la propiedad issues)
    if (error.issues) {
      let errors = []

      error.issues.forEach(item => {
        errors.push(item);
      });

      res.status(400).json(responseSchema({
        success: false,
        message: errors,
        error: true,
      }));
    }

    res.status(500).json(responseSchema({
      success: false,
      message: "Internal server error. Please try again later.",
      error: true
    }));
  }

}