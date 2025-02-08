import express from 'express';
import AuthController from '../controllers/authController.mjs'; // 添加 authController 导入
import jwt from 'jsonwebtoken'; // 添加 jwt 模块导入

// 创建一个路由器对象
const router = express.Router();

/**
 * 处理用户注册请求
 * 此路由用于用户注册，它期望在请求体中接收到用户名和密码
 * 当注册成功时，返回状态码201和成功消息
 * 如果在注册过程中遇到错误，返回状态码500和错误消息
 * 
 * @param {Object} req - 请求对象，应包含用户名和密码
 * @param {Object} res - 响应对象，用于发送响应
 */
router.post('/register', async (req, res) => {
  try {
    // 调用 authController 的 register 方法处理注册逻辑
    await AuthController.register(req, res);
  } catch (error) {
    // 日志记录：注册用户时发生错误
    console.error('Error registering user:', error);
    // 注册失败，返回HTTP状态码500和错误消息
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 添加登录路由
router.post('/login', async (req, res) => {
  try {
    // 调用 authController 的 login 方法处理登录逻辑
    await AuthController.login(req, res);
  } catch (error) {
    // 日志记录：登录用户时发生错误
    console.error('Error logging in user:', error);
    // 登录失败，返回HTTP状态码500和错误消息
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 添加获取用户个人资料的路由
// 添加获取用户个人资料的路由
router.get('/me', async (req, res) => {
  try {
    // 从请求头中提取 JWT 令牌
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: '未提供令牌' });
    }

    let token;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else {
      token = authHeader; // 如果没有前缀，直接使用整个头部值作为令牌
    }

    if (!token) {
      return res.status(401).json({ error: '未提供令牌' });
    }

    // 验证 JWT 令牌
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
    } catch (verifyError) {
      return res.status(401).json({ error: '无效的令牌' });
    }

    // 调用 authController 的 getProfile 方法处理获取个人资料逻辑
    await AuthController.getProfile(req, res);
  } catch (error) {
    // 日志记录：获取用户个人资料时发生错误
    console.error('Error getting user profile:', error);
    // 获取个人资料失败，返回HTTP状态码500和错误消息
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 导出路由器对象
export default router;
