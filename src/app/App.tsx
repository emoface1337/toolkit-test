import { Routes, Route } from 'react-router-dom';
import { RepositoriesPage } from '@/pages/repositories';
import { RepositoryDetailsPage } from '@/pages/repository';
import { AuthCallbackPage } from '@/pages/auth/callback';
import './styles.module.scss';

export const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<RepositoriesPage />} />
        <Route path="/:owner/:repo" element={<RepositoryDetailsPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
      </Routes>
    </main>
  );
};
