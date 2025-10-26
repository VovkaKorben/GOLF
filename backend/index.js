import dotenv from "dotenv";
import mysql from "mysql";
import express from "express";
import { errorHandler, notFound } from "./middleware/error.js";
// import morgan from "morgan";
import cors from "cors";
dotenv.config();

const { API_PORT = 3500, MYSQL_PORT = 3306, MYSQL_URI, MYSQL_USR, MYSQL_PWD } = process.env;
if (!MYSQL_URI) {
  console.error('⛔ Check MYSQL_URI in .env');
  process.exit(1);
}
/*
const connection = mysql.createConnection({
  host: MYSQL_URI,
  user: MYSQL_USR,
  password: MYSQL_PWD,
  database: "golf"
})*/
const pool = mysql.createPool({
  host: MYSQL_URI,
  user: MYSQL_USR,
  password: MYSQL_PWD,
  database: "golf",
  connectionLimit: 10, // Максимальное количество соединений
  acquireTimeout: 60000, // Таймаут получения соединения
  timeout: 60000, // Таймаут запроса
  reconnect: true
});

// Создаем APP объект глобально
const app = express();
//function init_app() {

app.use(cors());

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies




const server = app.listen(API_PORT, () => {
  console.log(`💖 Golf API started on http://localhost:${API_PORT}`);
});



// GET-STATUS route
app.get("/api/health", async (req, res) => {
  res.status(200).json({ status: "ok" });
});
/*
app.get("/api/places", async (req, res) => {
  connection.query(`SELECT * FROM places`,
    function (err, result) {
      if (err) {
        console.log(`Error executing the query - ${err}`)
        res.status(500).json({ error: err.message });
      } else
        res.status(200).json(result);
    })
});
*/

// GET /api/place/:place_id


//}
// Connecting to database
/*connection.connect(function (err) {
  if (err) {
    console.log("⛔ MySQL connection error.")
    console.log(err.message)
    process.exit(1);
  }
  else {
    console.log(`💖 MySQL Database Connected`)
    init_app();

  }
})
*/
app.get("/api/places", async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log('⛔ Database connection error:', err.message);
      return res.status(500).json({ error: 'Database connection failed' });
    }

    connection.query(`SELECT * FROM places`, (err, result) => {
      connection.release(); // Важно: всегда возвращаем соединение в пул

      if (err) {
        console.log(`Error executing the query - ${err}`);
        return res.status(500).json({ error: err.message });
      }

      res.status(200).json(result);
    });
  });
});
app.use(notFound);
app.use(errorHandler);
// export default app;






