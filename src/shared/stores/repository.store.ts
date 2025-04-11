import { createEffect, createStore } from 'effector';
import { graphqlClient } from '@/shared/api/graphql';
import { GET_REPOSITORY_DETAILS } from '@/entities/repository/api/queries.ts';
import { RepositoryDetailsResponse, RepositoryModel } from '@/entities/repository/model.ts';

export const fetchRepositoryDetailsFx = createEffect<
  { owner: string; repo: string },
  RepositoryModel,
  Error
>(async ({ owner, repo }) => {
  const response = await graphqlClient.query<RepositoryDetailsResponse>(
    GET_REPOSITORY_DETAILS,
    { owner, name: repo }
  );
  return response.repository;
});

export const $repository = createStore<RepositoryModel | null>(null)
.on(fetchRepositoryDetailsFx.doneData, (_, repository) => repository)
.reset(fetchRepositoryDetailsFx.fail);

export const $loading = createStore(false)
.on(fetchRepositoryDetailsFx, () => true)
.on([fetchRepositoryDetailsFx.done, fetchRepositoryDetailsFx.fail], () => false);

export const $error = createStore<Error | null>(null)
.on(fetchRepositoryDetailsFx.fail, (_, { error }) => error)
.reset(fetchRepositoryDetailsFx);