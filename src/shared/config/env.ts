export const ENV = {
  GITHUB_CLIENT_ID: import.meta.env.VITE_GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: import.meta.env.VITE_GITHUB_CLIENT_SECRET,
  GITHUB_REDIRECT_URI:
    import.meta.env.VITE_GITHUB_REDIRECT_URI || 'http://localhost:3000/auth/callback'
} as const;
