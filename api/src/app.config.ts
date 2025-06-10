import path from 'path'
import { isProdEnv } from './app.environment'

const ROOT_PATH = path.join(__dirname, '..')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const packageJSON = require(path.resolve(ROOT_PATH, 'package.json'))

export const APP = {
  PORT: 8800,
  ROOT_PATH,
  DEFAULT_CACHE_TTL: 0,
  MASTER: 'Noteify',
  NAME: 'Noteify',
  URL: 'http://127.0.0.1:8800'
}

export const PROJECT = {
  name: packageJSON.name,
  version: packageJSON.version,
  author: packageJSON.author
}

export const POSTGRES = {
  host: isProdEnv ? process.env.POSTGRES_HOST : '/private/tmp',
  port: isProdEnv ? process.env.POSTGRES_PORT : 5432,
  username: isProdEnv ? process.env.POSTGRES_USER : 'john',
  password: isProdEnv ? process.env.POSTGRES_PASSWORD : 'john',
  database: isProdEnv ? process.env.POSTGRES_DATABASE : 'noteify'
}

export const REDIS = {
  namespace: 'noteify',
  host: isProdEnv ? process.env.REDIS_HOST : '127.0.0.1',
  port: isProdEnv ? process.env.REDIS_PORT : 6379,
  username: isProdEnv ? process.env.REDIS_USER : null,
  password: isProdEnv ? process.env.REDIS_PASSWORD : null
}

export const JWT = {
  secret: process.env.JWT_SECRET
}
