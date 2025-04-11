import { create } from 'zustand';
import { graphqlClient } from '@/shared/api/graphql';
import { RepositoryModel, SearchResponse, UserRepositoriesResponse } from '@/entities/repository/model.ts';
import { GET_USER_REPOSITORIES, SEARCH_REPOSITORIES } from '@/entities/repository/api/queries.ts';

const ITEMS_PER_PAGE = 10;

type RepositoryFetchOptions = {
  query?: string | null;
};

type RepositoriesState = {
  repositories: RepositoryModel[];
  isLoading: boolean;
  error: Error | null;
  totalPages: number;
  fetchRepositories: (query?: string | null) => Promise<void>;
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

export const useRepositoriesStore = create<RepositoriesState>((set) => ({
  repositories: [],
  isLoading: false,
  error: null,
  totalPages: 1,
  fetchRepositories: async (query) => {
    try {
      set({ isLoading: true, error: null });

      const fetchOptions = { query };
      const { repositories, totalCount } = query
        ? await fetchSearchRepositories(fetchOptions)
        : await fetchUserRepositories();

      const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
      set({
        repositories,
        totalPages: totalPages > 10 ? 10 : totalPages
      });
    } catch (err) {
      set({ error: err as Error });
    } finally {
      set({ isLoading: false });
    }
  }
}));
