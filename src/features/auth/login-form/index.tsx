import styles from './styles.module.scss';
import { useGithubOAuthStore } from '@/shared/stores';
import { useAuth } from '@/features/auth/hooks/useAuth.ts';

const LoginForm = () => {
  const { login, logout } = useAuth();
  const { isAuthenticated } = useGithubOAuthStore();
  return (
    <div>
      {isAuthenticated ? (
        <button onClick={logout} className={styles.authButton}>
          Выйти
        </button>
      ) : (
        <button onClick={login} className={styles.authButton}>
          Логин через гитхаб
        </button>
      )}
    </div>
  );
};

export default LoginForm;