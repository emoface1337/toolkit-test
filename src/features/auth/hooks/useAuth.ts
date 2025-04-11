import { useEffect } from 'react';
import axios from 'axios';
import { API_CONFIG } from '@/shared/config/api';
import { useGithubOAuthStore } from '@/shared/stores/githubOAuth.store.ts';

export const useAuth = () => {
  const { isLoading, isProcessing, setProcessing, setLoading, setAccessToken } = useGithubOAuthStore();

  useEffect(() => {
    const storedToken = localStorage.getItem('github_token');
    if (storedToken) {
      setAccessToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = () => {
    const params = new URLSearchParams({
      client_id: API_CONFIG.CLIENT_ID,
      redirect_uri: API_CONFIG.REDIRECT_URI,
      scope: API_CONFIG.SCOPE
    });

    window.location.href = `https://github.com/login/oauth/authorize?${params.toString()}`;
  };

  const logout = () => {
    localStorage.removeItem('github_token');
    setAccessToken(null);
  };

  const handleCallback = async (code: string) => {
    if (isProcessing) return;

    try {
      setProcessing(true);
      const response = await axios.post('http://localhost:3001/github/access_token', {
        code
      });

      if (response.data.access_token) {
        localStorage.setItem('github_token', response.data.access_token);
        setAccessToken(response.data.access_token);
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    } finally {
      setProcessing(false);
    }
  };

  return {
    isLoading,
    login,
    logout,
    handleCallback
  };
};
