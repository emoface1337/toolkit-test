import styles from './styles.module.scss';

import { useAuth } from '@/features/auth/hooks/useAuth.ts';
import { useGithubOAuthStore } from '@/shared/stores/githubOAuth.store.ts';

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