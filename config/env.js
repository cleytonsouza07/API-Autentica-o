import dotenv from 'dotenv';
dotenv.config();

export const env = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/node_auth_crud_jwt',
  PORT: process.env.PORT || 3000,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'dev-access-secret',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret',
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES || '15m',
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || '7d',
};
