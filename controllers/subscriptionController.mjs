import pool from '../config/db.mjs';
import { validateSubscriptionUrl } from '../utils/validation.mjs';

export default class SubscriptionController {
  static async getSubscriptions(req, res) {
    try {
      const [rows] = await pool.query(
        'SELECT url FROM subscriptions WHERE user_id = ?',
        [req.userId]
      );
      res.json(rows.map(r => r.url));
    } catch (error) {
      res.status(500).json({ error: '获取订阅失败' });
    }
  }

  static async addSubscription(req, res) {
    const { url } = req.body;
    
    // 验证URL格式
    const validation = validateSubscriptionUrl(url);
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.error });
    }

    try {
      await pool.query(
        'INSERT INTO subscriptions (user_id, url) VALUES (?, ?)',
        [req.userId, url]
      );
      res.sendStatus(201);
    } catch (error) {
      res.status(500).json({ error: '添加订阅失败' });
    }
  }
}