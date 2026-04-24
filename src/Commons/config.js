/* v8 ignore file */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path:
    process.env.NODE_ENV === 'test'
      ? path.resolve(process.cwd(), '.env.test')
      : '.env',
  quiet: true,
});

const config = {
  app: {
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    port: process.env.PORT,
    debug: process.env.NODE_ENV === 'development' ? { request: ['error'] } : {},
  },
  database: {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
  },
  auth: {
    jwtStrategy: 'forumapi',
    accessTokenKey: process.env.ACCESS_TOKEN_KEY,
    refreshTokenKey: process.env.REFRESH_TOKEN_KEY,
    accessTokenAge: process.env.ACCESS_TOKEN_AGE,
  },
};

export default config;
