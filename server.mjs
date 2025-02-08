// 主入口文件
import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

// 创建 Express 应用实例
const app = express();
// 设置端口号，默认为 3000
const port = process.env.PORT || 3000;

// 导入 Swagger UI
import swaggerUI from 'swagger-ui-express';

// 使用 JSON 中间件解析请求体
app.use(express.json());

// 导入路由和中间件
import userRoutes from './routes/userRoutes.mjs';
import healthRoutes from './routes/health.mjs';
import { metricsMiddleware } from './utils/metrics.mjs';
import pool from './config/db.mjs';

// 定义加载 Swagger 文档的函数
import { readFile } from 'fs/promises'; // 确保导入 fs/promises

async function loadSwaggerDocument() {
  try {
    // 使用相对路径
    const data = await readFile('./swagger-output.json');
    return JSON.parse(data.toString());
  } catch (error) {
    console.error('加载 swagger-output.json 失败:', error);
    return null;
  }
}

// 定义启动服务器的函数
async function startServer() {
  // 加载 Swagger 文档
  const swaggerDocument = await loadSwaggerDocument();

  // 配置 Swagger 路由（必须放在此处！）
  if (swaggerDocument) {
    app.use(
      '/api-docs',
      swaggerUI.serve,
      swaggerUI.setup(swaggerDocument) // 注意：此处不需要 .default
    );
  }

  // 配置其他路由
  console.log('Loading user routes...'); // 增加日志记录
  app.use('/users', userRoutes);
  console.log('Loading health routes...'); // 增加日志记录
  app.use('/health', healthRoutes);
  console.log('Loading metrics middleware...'); // 增加日志记录
  app.use(metricsMiddleware);

  try {
    // 验证数据库连接
    console.log('Checking database connection...'); // 增加日志记录
    await pool.query('SELECT 1');
    console.log('Database connection successful'); // 增加日志记录
    
    // 启动服务器
    app.listen(port, '0.0.0.0', () => {
      console.log(`✅ Server is running on http://0.0.0.0:${port}`);
    });
  } catch (err) {
    console.error('❌ 数据库连接失败:', err.message); // 增加日志记录
    process.exit(1);
  }
}

// 启动服务器
startServer();