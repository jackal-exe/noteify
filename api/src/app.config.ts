import path from 'path';
import yargs from 'yargs';

const ROOT_PATH = path.join(__dirname, '..');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const packageJSON = require(path.resolve(ROOT_PATH, 'package.json'));

const argv = yargs.argv as Record<string, string | void>;

export const APP = {
	PORT: 8800,
	ROOT_PATH,
	DEFAULT_CACHE_TTL: 0,
	MASTER: 'Noteify',
	NAME: 'Noteify',
	URL: 'http://127.0.0.1:8800'
};

export const PROJECT = {
	name: packageJSON.name,
	version: packageJSON.version,
	author: packageJSON.author
	// homepage: packageJSON.homepage,
	// documentation: packageJSON.documentation,
	// repository: packageJSON.repository.url
};

export const POSTGRES = {
	host: '/private/tmp',
	username: 'john',
	password: 'john',
	database: 'noteify'
};

export const REDIS = {
	namespace: argv.redis_namespace || 'noteify',
	host: argv.redis_host || 'localhost',
	port: argv.redis_port || 6379,
	username: argv.redis_username || null,
	password: argv.redis_password || null
};

export const JWT = {
	secret: process.env.JWT_SECRET
};
