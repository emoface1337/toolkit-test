import { useUnit } from 'effector-react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { $error, $loading, $repository, fetchRepositoryDetailsFx } from '@/shared/stores/repository.store.ts';

export const useRepositoryDetails = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const [repository, loading, error] = useUnit([$repository, $loading, $error]);

  useEffect(() => {
    if (owner && repo) {
      fetchRepositoryDetailsFx({ owner, repo });
    }
  }, [owner, repo]);

  return {
    repository,
    loading,
    error
  };
};