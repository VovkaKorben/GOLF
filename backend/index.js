import dotenv from 'dotenv';
import mysql from 'mysql';
import express from 'express';
import cors from 'cors';
import { errorHandler, notFound } from './middleware/error.js';
// import morgan from "morgan";

dotenv.config();

const {
  API_PORT = 3500, MYSQL_PORT = 3306, MYSQL_URI, MYSQL_USR, MYSQL_PWD, DB_NAME
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
  database: DB_NAME,
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
  console.log(`⛳ Golf API started on http://localhost:${API_PORT}`);
  console.log(`💖 Health check with http://localhost:${API_PORT}/api/health`);

});






// sql wrapper
const executeQuery = (query, params = []) => {
  // const fullQuery = mysql.format(query, params);
  // console.log(`📝 SQL Query: ${fullQuery}`);


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

// http wrapper for QUERIES
const handleDatabaseRequest = async (res, query, params = []) => {
  try {
    const result = await executeQuery(query, params);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// http wrapper for COMMANDS
const handleExecRequest = async (res, query, params = []) => {
  try {
    const result = await executeQuery(query, params);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
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
    res, 'SELECT pit_no,par,hcp FROM pits WHERE place_id=?', [req.params.place_id]
  );
});


// get distances for field by place_id + tee_id
app.get('/api/tee/:place_id/:tee_id', async (req, res) => {
  await handleDatabaseRequest(
    res, 'SELECT pit_no,distance FROM tees WHERE place_id=? AND tee_id=?', [req.params.place_id, req.params.tee_id]
  );
});
// get cr/slope by place_id + tee_id + gender_id
app.get('/api/crslope/:place_id/:tee_id/:gender_id', async (req, res) => {
  await handleDatabaseRequest(
    res, 'SELECT cr,slope FROM places_info WHERE place_id=? AND tee_id=? AND gender_id=?', [req.params.place_id, req.params.tee_id, req.params.gender_id]
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


// get strokes for game_id
app.get('/api/strokes/:game_id', async (req, res) => {
  await handleDatabaseRequest(
    res, 'SELECT pit_no,stroke FROM strokes WHERE game_id = ?', [req.params.game_id]
  );
});




// PUT strokes for game_od
app.put('/api/strokes/:game_id', async (req, res) => {

  // console.log(` req.params : ${JSON.stringify(req.body)}`);
  const params = [];
  Object.keys(req.body).forEach(key => {
    if (req.body[key] !== null)
      params.push(req.params.game_id, key, req.body[key]);
  });

  let query_string =
    'INSERT INTO strokes (game_id, pit_no, stroke) VALUES ' +
    Array(params.length / 3).fill('(?,?,?)').join(',') +
    ' ON DUPLICATE KEY UPDATE stroke = VALUES(stroke)';

  await handleExecRequest(res, query_string, params);
  //console.log(` query_string : ${JSON.stringify(query_string)}`);
  res.status(200).end();
});


// create game
app.post('/api/game', async (req, res) => {
  const { place_id, mode_id, tee_id, gender_id, judge_text, comment_text, ehcp } = req.body;
  // console.log(`create game: ${JSON.stringify(req.body)}`);
  const result = await handleExecRequest(res,
    'INSERT INTO games ( place_id, mode_id, tee_id, gender_id, judge, comment, ehcp) VALUES (?,?,?,?,?,?,?)',
    [place_id, mode_id, tee_id, gender_id, judge_text, comment_text, ehcp]);
  // console.log(`create game: ${JSON.stringify(result)}`);
  res.status(200).json(result.data);
});

// update game
app.put('/api/game', async (req, res) => {
  const { game_id, place_id, mode_id, tee_id, gender_id, judge_text, comment_text, ehcp } = req.body;
  // console.log(`update game: ${JSON.stringify(req.body)}`);
  await handleExecRequest(
    res,
    'UPDATE games SET place_id = ?,mode_id=?, tee_id = ?,gender_id =?, judge = ?, comment = ?,ehcp=? WHERE game_id = ?',
    [place_id, mode_id, tee_id, gender_id, judge_text, comment_text, ehcp, game_id]
  );
  res.status(200).end();
});

// DELETE game by ID
app.delete('/api/game', async (req, res) => {
  const { game_id } = req.body;
  // console.log(`  app.delete game_id: ${JSON.stringify(game_id)}`);

  await handleExecRequest(res, 'DELETE FROM games WHERE game_id = ?', [game_id]);
  res.status(200).end();
});

// get player handicap lvl for specified PLACE + TEE + GENDER + ExactHCP
// test http://localhost:3500/api/lvl?place_id=1&gender_id=0&tee_id=0&ehcp=21.4
app.get('/api/lvl', async (req, res) => {
  try {
    const ehcp = parseFloat(req.query.ehcp);
    const place_id = parseInt(req.query.place_id, 10);
    const tee_id = parseInt(req.query.tee_id, 10);
    const gender_id = parseInt(req.query.gender_id, 10);
    await handleDatabaseRequest(res,
      'select lvl from places_lvl where place_id = ? and gender_id = ? and tee_id = ? and ?>=min_hcp and ?<=max_hcp',
      [place_id, gender_id, tee_id, ehcp, ehcp]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }


  //  await handleDatabaseRequest(    res, 'SELECT pit_no,stroke FROM strokes WHERE game_id = ?', [req.params.game_id]  );
});



app.use(notFound);
app.use(errorHandler);
