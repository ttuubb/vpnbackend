
### 技术矩阵
| 组件                | 技术选型                          |
|---------------------|----------------------------------|
| 运行时              | Node.js 18 LTS                  |
| Web框架             | Express 4.x                     |
| 数据库              | MySQL 8 + SQLite 3              |
| 认证体系            | JWT (RS256 签名)                |
| 安全防护            | Helmet + CORS + Rate Limiter    |
| 文档化              | Swagger/OpenAPI 3.0             |
| 监控体系            | Prometheus + Grafana 集成       |

## 核心功能矩阵

### 身份认证服务
- 基于 PBKDF2 的多轮哈希加密存储
- JWT 双令牌机制（Access/Refresh Token）
- OAuth 2.0 准备态接口
- 会话设备指纹识别

### 订阅管理引擎
- 多协议支持 (VMess/Shadowsocks/Trojan)
- 订阅链接时效性控制
- 节点健康检查系统
- 流量配额管理接口

### 节点服务
- 智能线路优选算法
- 实时延迟检测
- 地理负载均衡
- 节点伪装技术 (WebSocket over TLS)

## 快速部署指南

### 环境要求
- Node.js ≥18.17.0
- MySQL ≥8.0.29
- Redis ≥6.2 (集群支持)

### 初始化步骤
```bash
# 克隆代码库
git clone https://github.com/ttuubb/vpnbackend.git
cd vpn-backend

# 安装依赖
npm install --production

# 数据库初始化
mysql -u root -p < migrations/init.sql

# 配置环境变量
cp .env.example .env

# 数据库配置
DB_HOST=cluster01.rds.amazonaws.com
DB_PORT=3306
DB_USER=vpn_svc
DB_PASSWORD=KeYt0p$ecret!
DB_NAME=vpn_production

# 安全配置
JWT_SECRET=7x!A%D*G-KaPdSgVkYp3s6v9y$B&E(H+
TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES=7d

# 服务监听
SERVER_HOST=0.0.0.0
SERVER_PORT=443

# 开发模式
npm run dev

# 生产模式
npm run build && npm start

# PM2 集群模式
pm2 start ecosystem.config.js -i max

安全合规措施
数据保护
AES-256-GCM 全数据加密

PCI DSS 合规的密钥管理

字段级加密 (FLE) 实现

网络安全
全站强制 HTTPS (HSTS)

CSP 3.0 策略实施

定期安全扫描 (OWASP ZAP)

审计追踪
SQLite 审计日志

请求签名验证

不可变日志存储

监控告警体系
监控指标
QPS/TPS 实时统计

99th 响应延迟

数据库连接池状态

JVM (Node.js) 内存指标

Grafana 看板
