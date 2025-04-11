export interface RepositoryModel {
  id: string;
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  languages: {
    edges: {
      node: {
        id: string;
        name: string;
        color: string;
      };
    }[];
  };
  owner: {
    login: string;
    avatarUrl: string;
    url: string;
  };
  updatedAt?: string;
}

export interface RepositoryEdge {
  node: RepositoryModel;
}

export interface RepositoryConnection {
  repositoryCount?: number;
  totalCount?: number;
  edges: RepositoryEdge[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
}

export interface SearchResponse {
  search: RepositoryConnection;
}

export interface UserRepositoriesResponse {
  viewer: {
    repositories: RepositoryConnection;
  };
}

export interface RepositoryDetailsResponse {
  repository: RepositoryModel;
}
