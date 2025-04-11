import { create } from 'zustand';

interface GitHubOAuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  isProcessing: boolean;
  setProcessing: (isProcessing: boolean) => void,
  setLoading: (isLoading: boolean) => void
}

export const useGithubOAuthStore = create<GitHubOAuthState>((set) => ({
  accessToken: null,
  setAccessToken: (accessToken) => set({
    accessToken,
    isAuthenticated: !!accessToken
  }),
  isAuthenticated: false,
  isLoading: true,
  isProcessing: false,
  setProcessing: (isProcessing) => set({ isProcessing }),
  setLoading: (isLoading) => set({ isLoading })
}));