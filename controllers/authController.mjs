import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';
import { validateRegistration, validateLogin } from '../utils/validation.mjs';
import crypto from 'crypto'; // 添加 crypto 模块导入

/**
 * 认证控制器类
 */
export default class AuthController {
  /**
   * 用户注册方法
   * 
   * @param {Object} req HTTP请求对象，包含用户名和密码
   * @param {Object} res HTTP响应对象
   * @returns {Promise<void>} 
   */
  static async register(req, res) {
    try {
      const { username, password } = req.body;
      
      // 输入验证
      const validation = validateRegistration(username, password);
      if (!validation.isValid) {
        return res.status(400).json({ errors: validation.errors });
      }

      // 创建用户
      const userId = await User.create({ username, password });
      
      // 生成JWT
      const token = jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: '30m' }
      );

      res.json({ token });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: '用户名已存在' });
      }
      res.status(500).json({ error: '注册失败' });
    }
  }

  /**
   * 用户登录方法
   * 
   * @param {Object} req HTTP请求对象，包含用户名和密码
   * @param {Object} res HTTP响应对象
   * @returns {Promise<void>} 
   */
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      
      // 输入验证
      const validation = validateLogin(username, password);
      if (!validation.isValid) {
        return res.status(400).json({ errors: validation.errors });
      }

      // 查找用户
      const user = await User.findByUsername(username);
      if (!user) {
        return res.status(401).json({ error: '无效的凭据' });
      }

      // 验证密码
      const hashedInput = crypto.createHash('sha256')
        .update(password)
        .digest('hex');
      if (hashedInput !== user.password) {
        return res.status(401).json({ error: '无效的凭据' });
      }

      // 生成JWT
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '30m' }
      );

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: '登录失败' });
    }
  }

  /**
   * 获取用户个人资料方法
   * 
   * @param {Object} req HTTP请求对象，包含用户ID
   * @param {Object} res HTTP响应对象
   * @returns {Promise<void>} 
   */
  static async getProfile(req, res) {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ error: '用户不存在' });
      }
      res.json({ 
        id: user.id,
        username: user.username,
        createdAt: user.created_at 
      });
    } catch (error) {
      res.status(500).json({ error: '获取用户信息失败' });
    }
  }
}