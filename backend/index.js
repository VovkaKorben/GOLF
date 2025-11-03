import dotenv from 'dotenv';
import mysql from 'mysql';
import express from 'express';
import cors from 'cors';
import { errorHandler, notFound } from './middleware/error.js';
// import morgan from "morgan";

dotenv.config();

const {
  API_PORT = 3500, MYSQL_PORT = 3306, MYSQL_URI, MYSQL_USR, MYSQL_PWD,
} = process.env;
if (!MYSQL_URI) {
  console.error('⛔ Check MYSQL_URI in .env');
  process.exit(1);
}

const pool = mysql.createPool({
  host: MYSQL_URI,
  user: MYSQL_USR,
  password: MYSQL_PWD,
  port: MYSQL_PORT,
  database: 'golf',
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
});

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

const server = app.listen(API_PORT, () => {
  console.log(`💖 Golf API started on http://localhost:${API_PORT}`);
});






// sql wrapper
const executeQuery = (query, params = []) => {
  // console.log(`executeQuery: ${query}, ${params}`);

  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log('⛔ Database connection error:', err.message);
        return reject(new Error('Database connection failed'));
      }

      connection.query(query, params, (err, result) => {
        connection.release();

        if (err) {
          console.log(`Error executing the query - ${err}`);
          return reject(err);
        }

        resolve(result);
        // console.log(`executeQuery result: ${JSON.stringify(result)}`);
      });
    });
  });
};

// http wrapper
const handleDatabaseRequest = async (res, query, params = []) => {

  let debugQuery = query;
  // console.log('📝 1 SQL Query:', debugQuery);
  params.forEach((param, index) => {
    debugQuery = debugQuery.replace('?', typeof param === 'string' ? `'${param}'` : param);
  });
  // console.log('📝 2 SQL Query:', debugQuery);


  try {
    const result = await executeQuery(query, params);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};










// GET-STATUS route
app.get('/api/health', async (req, res) => {
  res.status(200).json({ status: 'ok' });
});


// show list of all places
app.get('/api/places', async (req, res) => {
  await handleDatabaseRequest(
    res, 'SELECT * FROM places', []
  );
});


// get place info by ID
app.get('/api/place/:place_id', async (req, res) => {
  await handleDatabaseRequest(
    res, 'SELECT * FROM places WHERE place_id=?', [req.params.place_id]
  );
});


// get HCP/PAR values from place by place_id
app.get('/api/pits/:place_id', async (req, res) => {
  await handleDatabaseRequest(
    res, 'SELECT * FROM places WHERE place_id=?', [req.params.place_id]
  );
});


// get distances for field by place_id + tee_id
app.get('/api/tee/:place_id/:tee_id', async (req, res) => {
  await handleDatabaseRequest(
    res, 'SELECT pit_no,distance FROM tees WHERE place_id=? AND tee_id=?', [req.params.place_id, req.params.tee_id]
  );
});

// get games list, pagination allowed (start / count)
app.get('/api/games', async (req, res) => {
  const start = parseInt(req.query.start, 10) || 0;
  const count = parseInt(req.query.count, 10) || 10;
  await handleDatabaseRequest(
    res, 'SELECT g.*,p.name as place_name FROM games as g left join places as p on g.place_id = p.place_id order by dt desc LIMIT ? OFFSET ?', [count, start]
  );
});

// get game by ID
app.get('/api/game/:game_id', async (req, res) => {
  await handleDatabaseRequest(
    res, 'SELECT * FROM games WHERE game_id = ?', [req.params.game_id]
  );
});


// create game
app.post('/api/game', async (req, res) => {
  const { place_id, mode_id, tee_id, gender_id, judge_text, comment_text, ehcp } = req.body;
  console.log(`create game: ${JSON.stringify(req.body)}`);
  await handleDatabaseRequest(res,
    'INSERT INTO games ( place_id, mode_id, tee_id, gender_id, judge, comment, ehcp) VALUES (?,?,?,?,?,?,?)',
    [place_id, mode_id, tee_id, gender_id, judge_text, comment_text, ehcp]);
  res.status(200).json({ game_id: result.insertId });

});
// update game
app.put('/api/game', async (req, res) => {
  const { game_id, place_id, mode_id, tee_id, gender_id, judge_text, comment_text, ehcp } = req.body;
  console.log(`update game: ${JSON.stringify(req.body)}`);
  await handleDatabaseRequest(
    res,
    'UPDATE games SET place_id = ?,mode_id=?, tee_id = ?,gender_id =?, judge = ?, comment = ?,ehcp=? WHERE game_id = ?',
    [place_id, mode_id, tee_id, gender_id, judge_text, comment_text, ehcp, game_id]
  );
});

// UPSERT game
/*
app.post('/api/game', async (req, res) => {

  try {

    const { game_id, place_id, tee_id, judge, comment } = req.body;

    const result = await executeQuery(
      `INSERT INTO games (game_id, place_id, tee_id, judge, comment) 
     VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE 
     place_id = VALUES(place_id), 
     tee_id = VALUES(tee_id), 
     judge = VALUES(judge), 
     comment = VALUES(comment)`,
      [game_id, place_id, tee_id, judge, comment]);

    // console.log(`res: ${JSON.stringify(xxx)}`);
    // Возвращаем результат с признаком операции
    res.status(200).json({
      success: true,
      insertId: result.insertId || null
    });

    // res.status(200).json(result);
  } catch (error) {
    // res.status(500).json({ error: error.message });
    console.error(' --- Error in UPSERT game:', error);
    res.status(500).json({
      success: false,
      error: error
    });
  }


  const { game_id, place_id, tee_id, judge, comment } = req.body;

  await handleDatabaseRequest(
    res,

  );
});
*/


app.use(notFound);
app.use(errorHandler);
// export default app;
