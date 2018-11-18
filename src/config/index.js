import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const pathEnv = path.join(__dirname, '..', '..', '.env');
if (fs.existsSync(pathEnv)) {
  console.info('Using .env file to supply config environment variables');
  dotenv.config({
    path: pathEnv,
  });
}
const environment = process.env.NODE_ENV || 'production';
export default {
  env: environment,
  debug: process.env.DEBUG || false,
  isProduction: environment === 'production',
  app: {
    port: process.env.APP_PORT || 3000,
  },
  log: {
    basePath: path.join(__dirname, '..', '..', 'storage', 'logs'),
    fileExceptions: process.env.LOG_FILE_EXCEPTIONS || 'exceptions.log',
    fileDebug: process.env.LOG_FILE_DEBUG || 'debug.log',
    fileErrors: process.env.LOG_FILE_ERRORS || 'errors.log',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 0,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 0,
    region: process.env.AWS_REGION || 'us-east-1',
  },
  db: process.env.DB_URL || 'mongodb://localhost:27017/cygnus-api',
  secret: process.env.APP_SECRET || 'U4D3LGOXI542QPDPPRCM6XYZQSEW5YP7',
};