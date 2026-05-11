import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'data');
const dbPath = path.join(dataDir, 'dropnetgaming.sqlite');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const sqlite = sqlite3.verbose();
const db = new sqlite.Database(dbPath);
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(error) {
      if (error) reject(error);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error, rows) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (error, row) => {
      if (error) reject(error);
      else resolve(row);
    });
  });
}

async function initDatabase() {
  await run(`CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nickname TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'EU',
    level INTEGER NOT NULL DEFAULT 1,
    elo INTEGER NOT NULL DEFAULT 0,
    winrate INTEGER NOT NULL DEFAULT 50,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);

  await run(`CREATE TABLE IF NOT EXISTS matches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    map TEXT NOT NULL,
    mode TEXT NOT NULL DEFAULT '5v5',
    score TEXT NOT NULL,
    result TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);

  await run(`CREATE TABLE IF NOT EXISTS tournaments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    prize TEXT NOT NULL DEFAULT 'XP',
    status TEXT NOT NULL DEFAULT 'open',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);

  const count = await get('SELECT COUNT(*) as count FROM players');
  if (count.count === 0) {
    await run('INSERT INTO players (nickname, country, level, elo, winrate) VALUES (?, ?, ?, ?, ?)', ['skwizzy22', 'Russia', 1, 0, 57]);
    await run('INSERT INTO players (nickname, country, level, elo, winrate) VALUES (?, ?, ?, ?, ?)', ['dropnet_admin', 'EU', 8, 1640, 61]);
    await run('INSERT INTO matches (map, mode, score, result) VALUES (?, ?, ?, ?)', ['Mirage', '5v5 Ranked', '16:12', 'Win']);
    await run('INSERT INTO matches (map, mode, score, result) VALUES (?, ?, ?, ?)', ['Dust II', 'Premium', '11:13', 'Lose']);
    await run('INSERT INTO tournaments (title, prize, status) VALUES (?, ?, ?)', ['Dropnet Open League', '75 000 XP', 'open']);
    await run('INSERT INTO tournaments (title, prize, status) VALUES (?, ?, ?)', ['School Cyber Cup', 'Medals + XP', 'open']);
  }
}

function handleError(response, error) {
  console.error(error);
  response.status(500).json({ error: 'Database error', details: error.message });
}

app.get('/api/health', (request, response) => {
  response.json({ ok: true, database: dbPath });
});

app.get('/api/overview', async (request, response) => {
  try {
    const players = await get('SELECT COUNT(*) as count FROM players');
    const matches = await get('SELECT COUNT(*) as count FROM matches');
    const tournaments = await get('SELECT COUNT(*) as count FROM tournaments');
    response.json({ players: players.count, matches: matches.count, tournaments: tournaments.count });
  } catch (error) {
    handleError(response, error);
  }
});

app.get('/api/players', async (request, response) => {
  try {
    response.json(await all('SELECT * FROM players ORDER BY id DESC'));
  } catch (error) {
    handleError(response, error);
  }
});

app.post('/api/players', async (request, response) => {
  try {
    const { nickname, country = 'EU', level = 1, elo = 0, winrate = 50 } = request.body;
    if (!nickname || nickname.trim().length < 2) return response.status(400).json({ error: 'Nickname is required' });
    const result = await run('INSERT INTO players (nickname, country, level, elo, winrate) VALUES (?, ?, ?, ?, ?)', [nickname.trim(), country, Number(level), Number(elo), Number(winrate)]);
    response.status(201).json(await get('SELECT * FROM players WHERE id = ?', [result.id]));
  } catch (error) {
    handleError(response, error);
  }
});

app.get('/api/matches', async (request, response) => {
  try {
    response.json(await all('SELECT * FROM matches ORDER BY id DESC'));
  } catch (error) {
    handleError(response, error);
  }
});

app.post('/api/matches', async (request, response) => {
  try {
    const { map, mode = '5v5', score = '13:10', result = 'Win' } = request.body;
    if (!map || map.trim().length < 2) return response.status(400).json({ error: 'Map is required' });
    const insert = await run('INSERT INTO matches (map, mode, score, result) VALUES (?, ?, ?, ?)', [map.trim(), mode, score, result]);
    response.status(201).json(await get('SELECT * FROM matches WHERE id = ?', [insert.id]));
  } catch (error) {
    handleError(response, error);
  }
});

app.get('/api/tournaments', async (request, response) => {
  try {
    response.json(await all('SELECT * FROM tournaments ORDER BY id DESC'));
  } catch (error) {
    handleError(response, error);
  }
});

app.post('/api/tournaments', async (request, response) => {
  try {
    const { title, prize = 'XP', status = 'open' } = request.body;
    if (!title || title.trim().length < 2) return response.status(400).json({ error: 'Title is required' });
    const insert = await run('INSERT INTO tournaments (title, prize, status) VALUES (?, ?, ?)', [title.trim(), prize, status]);
    response.status(201).json(await get('SELECT * FROM tournaments WHERE id = ?', [insert.id]));
  } catch (error) {
    handleError(response, error);
  }
});

app.delete('/api/:table/:id', async (request, response) => {
  try {
    const allowed = ['players', 'matches', 'tournaments'];
    const { table, id } = request.params;
    if (!allowed.includes(table)) return response.status(400).json({ error: 'Wrong table' });
    await run(`DELETE FROM ${table} WHERE id = ?`, [Number(id)]);
    response.json({ ok: true });
  } catch (error) {
    handleError(response, error);
  }
});

initDatabase().then(() => {
  app.listen(PORT, () => console.log(`Dropnetgaming API started: http://localhost:${PORT}`));
});
