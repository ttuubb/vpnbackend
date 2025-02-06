import pool from '../config/db.mjs';
import crypto from 'crypto';

export default class User {
  static async create({ username, password }) {
    const hashedPassword = crypto.createHash('sha256')
      .update(password)
      .digest('hex');
    
    const [result] = await pool.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );
    return result.insertId;
  }

  static async findByUsername(username) {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }
}