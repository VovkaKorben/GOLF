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


const app = express();
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
// show list of all places
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
// get place info by ID
app.get("/api/place/:place_id", async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log('⛔ Database connection error:', err.message);
      return res.status(500).json({ error: 'Database connection failed' });
    }

    connection.query('SELECT * FROM places WHERE place_id=?', [req.params.place_id],
      (err, result) => {
        connection.release();

        if (err) {
          console.log(`Error executing the query - ${err}`);
          return res.status(500).json({ error: err.message });
        }

        res.status(200).json(result);
      });
  });
});

// get HCP/PAR values from place by place_id
app.get("/api/pits/:place_id", async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log('⛔ Database connection error:', err.message);
      return res.status(500).json({ error: 'Database connection failed' });
    }
    connection.query('SELECT pit_no,par,hcp FROM pits WHERE place_id=?', [req.params.place_id],
      (err, result) => {
        connection.release();

        if (err) {
          console.log(`Error executing the query - ${err}`);
          return res.status(500).json({ error: err.message });
        }

        res.status(200).json(result);
      });
  });
});
// get distances for field by place_id + tee_id
app.get("/api/tee/:place_id/:tee_id", async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log('⛔ Database connection error:', err.message);
      return res.status(500).json({ error: 'Database connection failed' });
    }
    connection.query('SELECT pit_no,distance FROM tees WHERE place_id=? AND tee_id=?', [req.params.place_id, req.params.tee_id],
      (err, result) => {
        connection.release();

        if (err) {
          console.log(`Error executing the query - ${err}`);
          return res.status(500).json({ error: err.message });
        }

        res.status(200).json(result);
      });
  });
});

// get games list, pagination allowed (start / count)
app.get("/api/games", async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log('⛔ Database connection error:', err.message);
      return res.status(500).json({ error: 'Database connection failed' });
    }
    const start = parseInt(req.query.start) || 0; // число
    const count = parseInt(req.query.count) || 10; // число



    connection.query('SELECT g.*,p.name as place_name FROM games as g left join places as p on g.place_id = p.place_id order by dt desc LIMIT ? OFFSET ?', [count, start],
      (err, result) => {
        connection.release();

        if (err) {
          console.log(`Error executing the query - ${err}`);
          return res.status(500).json({ error: err.message });
        }

        res.status(200).json(result);
      });
  });
});

// get games list, pagination allowed (start / count)
app.get("/api/game/:game_id", async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log('⛔ Database connection error:', err.message);
      return res.status(500).json({ error: 'Database connection failed' });
    }
    const start = parseInt(req.query.start) || 0; // число
    const count = parseInt(req.query.count) || 10; // число



    connection.query('SELECT g.*,p.name as place_name FROM games as g left join places as p on g.place_id = p.place_id order by dt desc LIMIT ? OFFSET ?', [count, start],
      (err, result) => {
        connection.release();

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






