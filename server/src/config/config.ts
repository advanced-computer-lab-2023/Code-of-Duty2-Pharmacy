import dotenv from 'dotenv';
dotenv.config();

const config = {
  MONGO_URI: process.env.MONGO_URI || '',
  SERVER_PORT: process.env.SERVER_PORT || '3000',
  FRONT_END_URL: process.env.FRONT_END_URL || 'http://localhost:5137',
  corsOptions: { origin: process.env.FRONT_END_URL }
};

export default config;