import mysql from "mysql2/promise";

export default async function dbConnection() {
  try {
    const connection = await mysql.createConnection({
      host: "host",
      user: "user",
      password: "password",
      database: "database"
    });

    return connection;
  }
  catch (error) {
    throw new Error("Error en conexion");
  }
}
