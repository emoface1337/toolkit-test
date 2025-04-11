import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';

export const AuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleCallback } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const code = searchParams.get('code');
    if (code && !isProcessing) {
      setIsProcessing(true);
      handleCallback(code).finally(() => {
        navigate('/');
      });
    }
  }, [searchParams, handleCallback, navigate, isProcessing]);

  return <div>Authenticating...</div>;
};
