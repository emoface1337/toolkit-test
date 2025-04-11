import { combine, createEffect, createStore } from 'effector';
import { graphqlClient } from '@/shared/api/graphql';
import { RepositoryModel, SearchResponse, UserRepositoriesResponse } from '@/entities/repository/model';
import { GET_USER_REPOSITORIES, SEARCH_REPOSITORIES } from '@/entities/repository/api/queries';
import { useUnit } from 'effector-react';
import { ITEMS_PER_PAGE } from '@/shared/constants/repositories.ts';

const fetchUserRepositoriesFx = createEffect(async () => {
  const response = await graphqlClient.query<UserRepositoriesResponse>(GET_USER_REPOSITORIES);
  return {
    repositories: response.viewer.repositories.edges.map((edge) => edge.node),
    totalCount: response.viewer.repositories.totalCount ?? 1
  };
});

const fetchSearchRepositoriesFx = createEffect(async (query: string) => {
  if (!query) throw new Error('Search query is required');
  const response = await graphqlClient.query<SearchResponse>(SEARCH_REPOSITORIES, {
    query: `${query} sort:stars-desc`
  });
  return {
    repositories: response.search.edges.map((edge) => edge.node),
    totalCount: response.search.repositoryCount ?? 1
  };
});

export const fetchRepositoriesFx = createEffect(async (query?: string | null) => {
  if (query) {
    return await fetchSearchRepositoriesFx(query);
  } else {
    return await fetchUserRepositoriesFx();
  }
});


export const $repositories = createStore<RepositoryModel[]>([])
.on(fetchRepositoriesFx.doneData, (_, { repositories }) => repositories);

export const $isLoading = createStore(false)
.on(fetchRepositoriesFx, () => true)
.on([fetchRepositoriesFx.done, fetchRepositoriesFx.fail], () => false);

export const $error = createStore<Error | null>(null)
.on(fetchRepositoriesFx.fail, (_, { error }) => error)
.on(fetchRepositoriesFx, () => null);

export const $totalPages = createStore(1)
.on(fetchRepositoriesFx.doneData, (_, { totalCount }) => {
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  return totalPages > 10 ? 10 : totalPages;
});

export const $repositoriesState = combine({
  repositories: $repositories,
  isLoading: $isLoading,
  error: $error,
  totalPages: $totalPages
});

export const useRepositoriesStore = () => {
  return {
    ...useUnit($repositoriesState),
    fetchRepositories: fetchRepositoriesFx
  };
};