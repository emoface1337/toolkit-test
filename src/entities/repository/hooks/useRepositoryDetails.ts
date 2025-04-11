import { useEffect, useState } from 'react';
import { graphqlClient } from '@/shared/api/graphql';
import { GET_REPOSITORY_DETAILS } from '../api/queries';
import { RepositoryDetailsResponse, RepositoryModel } from '../model';
import { useParams } from 'react-router-dom';

export const useRepositoryDetails = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();

  const [repository, setRepository] = useState<RepositoryModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRepositoryDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await graphqlClient.query<RepositoryDetailsResponse>(
          GET_REPOSITORY_DETAILS,
          {
            owner,
            name: repo
          }
        );

        setRepository(response.repository);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositoryDetails();
  }, [owner, repo]);

  return {
    repository,
    loading,
    error
  };
};
