import swaggerAutogen from 'swagger-autogen';

// 定义 Swagger 文档的基本信息
const doc = {
  info: {
    title: 'VPN API',
    version: '1.0.0',
    description: 'VPN客户端服务接口文档'
  },
  // 设置 Swagger 文档的主机地址，默认为 localhost:3000
  host: process.env.SWAGGER_HOST || 'localhost:3000',
  // 根据环境变量设置协议，生产环境使用 https，否则使用 http
  schemes: [process.env.NODE_ENV === 'production' ? 'https' : 'http'],
  // 定义安全定义，使用 BearerAuth
  securityDefinitions: {
    BearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  }
};

// 指定输出的 Swagger 文档文件路径
const outputFile = '/backend/swagger-output.json'; // 修正为绝对路径
// 指定包含 API 定义的文件路径
const endpointsFiles = ['./server.mjs'];

// 生成 Swagger 文档
swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger document generated successfully.');
}).catch(err => {
  console.error('Error generating Swagger document:', err);
});
