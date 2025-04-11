import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_CONFIG } from '@/shared/config/api';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('github_token');
    if (storedToken) {
      setToken(storedToken);
    }
    setIsLoading(false);
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
    setToken(null);
  };

  const handleCallback = async (code: string) => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      const response = await axios.post('http://localhost:3001/github/access_token', {
        code
      });

      if (response.data.access_token) {
        localStorage.setItem('github_token', response.data.access_token);
        setToken(response.data.access_token);
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    token,
    isLoading,
    login,
    logout,
    handleCallback,
    isAuthenticated: !!token
  };
};
