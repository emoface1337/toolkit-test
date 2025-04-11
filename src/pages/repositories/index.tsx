import { RepositoryCard } from '@/widgets/repository-card';
import { SearchForm } from '@/features/repositories/search-form';
import styles from './styles.module.scss';
import Container from '@/shared/ui/Container/Container.tsx';
import { useRepositories } from '@/entities/repository/hooks/useRepositories';
import { Pagination } from '@/shared/ui/Pagination/Pagination';
import { useMemo } from 'react';
import LoginForm from '@/features/auth/login-form';
import { useGithubOAuthStore } from '@/shared/stores/githubOAuth.store.ts';

export const RepositoriesPage = () => {
  const { isAuthenticated } = useGithubOAuthStore();
  const { repositories, isLoading, error, currentPage, totalPages, handlePageChange } =
    useRepositories();

  const renderContent = useMemo(() => {
    if (isLoading) {
      return <div className={styles.loading}>Загрузка...</div>;
    }

    if (error) {
      return <div className={styles.error}>{error.message}</div>;
    }

    if (repositories.length === 0) {
      return (
        <div className={styles.emptyState}>
          <h2>Ничего не найдено :(</h2>
          <p>Попробуйте сбросить поиск</p>
        </div>
      );
    }

    return (
      <>
        <div className={styles.list}>
          {repositories.map((repo) => (
            <RepositoryCard key={repo.id} repository={repo} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </>
    );
  }, [currentPage, error, handlePageChange, isLoading, repositories, totalPages]);

  return (
    <Container className={styles.page}>
      <div className={styles.header}>
        <h1>ГитХаб поиск репо</h1>
        <LoginForm />
      </div>

      {!isAuthenticated ? (<div>Войдите чтобы начать поиск</div>) : (
        <>
          <SearchForm />
          {renderContent}
        </>
      )}
    </Container>
  );
};
