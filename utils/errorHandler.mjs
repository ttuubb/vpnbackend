export default function errorHandler(err, req, res, next) {
  console.error(`[${new Date().toISOString()}] ${err.stack}`);

  const response = {
    error: process.env.NODE_ENV === 'development' 
      ? err.message 
      : '服务器错误',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  res.status(err.status || 500).json(response);
}