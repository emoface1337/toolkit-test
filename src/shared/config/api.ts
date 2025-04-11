import { ENV } from './env';

export const API_CONFIG = {
  BASE_URL: 'https://api.github.com',
  CLIENT_ID: ENV.GITHUB_CLIENT_ID,
  CLIENT_SECRET: ENV.GITHUB_CLIENT_SECRET,
  REDIRECT_URI: ENV.GITHUB_REDIRECT_URI,
  SCOPE: 'repo,user',
  headers: {
    Accept: 'application/vnd.github.v3+json'
  }
} as const;
