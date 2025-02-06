import express from 'express';
import pool from '../config/db.mjs';

const router = express.Router();

router.get('/health', async (req, res) => {
  const health = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    database: 'OK'
  };

  try {
    await pool.query('SELECT 1');
  } catch (err) {
    health.status = 'ERROR';
    health.database = 'ERROR';
  }

  res.json(health);
});

export default router;