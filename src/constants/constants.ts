//#region app constants
export const JWT_ACCESS_SECRET =
  '49686f5ba8b771b304d5d903775a47e887e78e23db639bdfdc9ff6a7cd91ddbd';
export const JWT_REFRESH_SECRET =
  '2bffbe2da786478ccf2633aa7c73aa042cbc4449f186b208cb072142c60e5bbc';

export const ROUNDS_OF_HASHING = 10;

export const ACCESS_EXPIRESIN = 300; //5 minutes in seconds

export const REFRESH_EXPIRESIN = '7d';

export const IS_SKIP_AUTH_KEY = 'skip-auth';
//#endregion

//#region .env keys
export const POSTGRES_URL = 'POSTGRES_URL';

export const POSTGRES_HOST = 'POSTGRES_HOST';

export const POSTGRES_PORT = 'POSTGRES_PORT';

export const POSTGRES_USERNAME = 'POSTGRES_USERNAME';

export const POSTGRES_PASSWORD = 'POSTGRES_PASSWORD';

export const POSTGRES_DB = 'POSTGRES_DB';
//#endregion
