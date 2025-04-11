import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { graphqlClient } from '@/shared/api/graphql';
import { GET_USER_REPOSITORIES, SEARCH_REPOSITORIES } from '../api/queries';
import { RepositoryModel, SearchResponse, UserRepositoriesResponse } from '../model';

const ITEMS_PER_PAGE = 10;

type UseRepositoriesResult = {
  repositories: RepositoryModel[];
  isLoading: boolean;
  error: Error | null;
  currentPage: number;
  totalPages: number;
  fetchRepositories: () => Promise<void>;
  handlePageChange: (newPage: number) => void;
};

type RepositoryFetchOptions = {
  query?: string | null;
};

const fetchUserRepositories = async () => {
  const response = await graphqlClient.query<UserRepositoriesResponse>(GET_USER_REPOSITORIES);

  return {
    repositories: response.viewer.repositories.edges.map((edge) => edge.node),
    totalCount: response.viewer.repositories.totalCount ?? 1
  };
};

const fetchSearchRepositories = async (options: RepositoryFetchOptions) => {
  if (!options.query) throw new Error('Search query is required');

  const response = await graphqlClient.query<SearchResponse>(SEARCH_REPOSITORIES, {
    query: `${options.query} sort:stars-desc`
  });

  return {
    repositories: response.search.edges.map((edge) => edge.node),
    totalCount: response.search.repositoryCount ?? 1
  };
};

export const useRepositories = (isAuthenticated: boolean = false): UseRepositoriesResult => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  const page = searchParams.get('page');

  const [state, setState] = useState({
    repositories: [] as RepositoryModel[],
    isLoading: false,
    error: null as Error | null,
    totalPages: 1
  });

  const updateState = (partialState: Partial<typeof state>) => {
    setState((prev) => ({ ...prev, ...partialState }));
  };

  const fetchRepositories = useCallback(async () => {
    try {
      updateState({
        isLoading: true,
        error: null
      });

      const fetchOptions = {
        query
      };

      const { repositories, totalCount } = query
        ? await fetchSearchRepositories(fetchOptions)
        : await fetchUserRepositories();

      const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
      updateState({
        repositories,
        totalPages: totalPages > 10 ? 10 : totalPages
      });
    } catch (err) {
      updateState({
        error: err as Error
      });
    } finally {
      updateState({
        isLoading: false
      });
    }
  }, [query]);

  const handlePageChange = (newPage: number) => {
    const newParams = searchParams;
    newParams.set('page', `${newPage}`);
    setSearchParams(newParams);
  };

  useEffect(() => {
    if (isAuthenticated) fetchRepositories();
  }, [isAuthenticated, query]);

  const currentPage = +(page ?? 1);

  return {
    repositories: state.repositories.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    ),
    isLoading: state.isLoading,
    error: state.error,
    currentPage,
    totalPages: state.totalPages,
    fetchRepositories,
    handlePageChange
  };
};
