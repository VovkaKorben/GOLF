import dotenv from "dotenv";
import mysql from "mysql";
import express from "express";
import { errorHandler, notFound } from "./middleware/error.js";
import morgan from "morgan";
import cors from "cors";
dotenv.config();

const { API_PORT = 3000, MYSQL_PORT = 3306, MYSQL_URI, MYSQL_USR, MYSQL_PWD } = process.env;
if (!MYSQL_URI) {
  console.error('⛔ Check MYSQL_URI in .env');
  process.exit(1);
}

const connection = mysql.createConnection({
  host: MYSQL_URI,
  user: MYSQL_USR,
  password: MYSQL_PWD,
  database: "golf"
})

function init_app() {


  app.use(express.json()); // Parse JSON bodies
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
  app.use(cors());


  app.use(notFound);
  app.use(errorHandler);

  morgan.token('post-data', (req) => {
    (req.method === 'POST' || req.method === 'PUT') ? JSON.stringify(req.body) : ''
  });
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));

  const server = app.listen(API_PORT, () => {
    console.log(`🛜  Golf API started on http://localhost:${API_PORT}`);
  });

}

// Создаем APP объект глобально
const app = express();

// Connecting to database
connection.connect(function (err) {
  if (err) {
    console.log("⛔ MySQL connection error.")
    console.log(err)
    process.exit(1);
  }
  else {
    console.log(`🛜  MySQL Database Connected`)
    init_app();

    /*connection.query(`SELECT * FROM places_info`,
      function (err, result) {
        if (err)
          console.log(`Error executing the query - ${err}`)
        else
          console.log("Result: ", result)
      })*/
  }
})



// GET-STATUS route
app.get("/api/health", async (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/places", async (req, res) => {
  connection.query(`SELECT * FROM places`,
    function (err, result) {
      if (err) {
        console.log(`Error executing the query - ${err}`)
        res.status(500).json({ error: err.message });
      } else
        res.status(200).json(result );
    })


});


// GET /api/place/:place_id


export default app;






