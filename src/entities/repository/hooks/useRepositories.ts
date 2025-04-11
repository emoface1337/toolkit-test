// useRepositories.ts
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RepositoryModel } from '@/entities/repository/model.ts';
import { ITEMS_PER_PAGE } from '@/shared/constants/repositories.ts';
import { useGithubOAuthStore, useRepositoriesStore } from '@/shared/stores';

type UseRepositoriesResult = {
  repositories: RepositoryModel[];
  isLoading: boolean;
  error: Error | null;
  currentPage: number;
  totalPages: number;
  fetchRepositories: () => Promise<void>;
  handlePageChange: (newPage: number) => void;
};

export const useRepositories = (): UseRepositoriesResult => {

  const { isAuthenticated, isProcessing: isAuthProcessing, isLoading: isAuthLoading } = useGithubOAuthStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  const page = searchParams.get('page');

  const {
    repositories,
    isLoading,
    error,
    totalPages,
    fetchRepositories: fetchReposFromStore
  } = useRepositoriesStore();

  const currentPage = +(page ?? 1);

  const fetchRepositories = useCallback(async () => {
    await fetchReposFromStore(query);
  }, [query]);

  const handlePageChange = (newPage: number) => {
    const newParams = searchParams;
    newParams.set('page', `${newPage}`);
    setSearchParams(newParams);
  };

  const handleResetSearchParams =  useCallback(() => {
    setSearchParams({});
  }, []);

  useEffect(() => {
    if (!isAuthProcessing && !isAuthLoading && isAuthenticated) fetchRepositories();
  }, [isAuthLoading, isAuthProcessing, isAuthenticated, query]);

  useEffect(() => {
    if (!isAuthProcessing && !isAuthLoading && !isAuthenticated) handleResetSearchParams();
  }, [handleResetSearchParams, isAuthLoading, isAuthProcessing, isAuthenticated]);

  return {
    repositories: repositories.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    ),
    isLoading,
    error,
    currentPage,
    totalPages,
    fetchRepositories,
    handlePageChange
  };
};