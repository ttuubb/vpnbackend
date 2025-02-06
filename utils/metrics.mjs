import promBundle from 'express-prom-bundle';

export const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  metricsPath: '/metrics',
  promClient: {
    collectDefaultMetrics: {
      timeout: 1000
    }
  }
});