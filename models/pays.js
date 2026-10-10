import dbConnection from "../db/connection.js";

export async function getPays() {
  try {
    const connection = await dbConnection();

    const [results, fields] = await connection.execute("SELECT * FROM pays");

    // console.log(results); // Array que contiene objetos done cada objeto representa una fila del resultado
    // console.log(fields); // Info de los campos de la tabla (ej: payId INT NOT NULL)

    await connection.end();

    return results;
  }
  catch {
    throw new Error("An error has ocurred while fetching data.");
  }
}

export async function getPay(payId) {
  try {
    const connection = await dbConnection();

    const [results, fields] = await connection.execute("SELECT * FROM purchases WHERE payId = ?", [payId]);

    await connection.end();

    return results;
  }
  catch (error) {
    throw new Error(error.message);
  }
}

export async function newPurchase({ purchaseName, purchaseCost, payId }) {
  let connection;
  try {
    connection = await dbConnection();

    const [result] = await connection.execute("INSERT INTO purchases (payId, purchaseName, purchaseCost) VALUES (?, ?, ?)",
      [payId, purchaseName, purchaseCost]);

    return result;
  }
  catch (error) {
    throw new Error("An error has ocurred while uploading data: ", error.message)
  }
  finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function newPay({ payName, payInitialAmount }) {
  try {
    const connection = await dbConnection();

    const [result] = await connection.execute("INSERT INTO pays (payName, initialAmount, currentAmount) VALUES (?, ?, ?);",
      [payName, payInitialAmount, payInitialAmount]);

    return result;
  }
  catch (error) {
    throw new Error("An error has ocurred while uploading data.");
  }
}
