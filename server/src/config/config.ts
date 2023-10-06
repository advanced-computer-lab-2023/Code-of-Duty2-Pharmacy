import dotenv from 'dotenv';

dotenv.config();

const config = {
  MONGO_URI: process.env.MONGO_URI || '',
  SERVER_PORT: process.env.SERVER_PORT || '3000',
};

export default config;