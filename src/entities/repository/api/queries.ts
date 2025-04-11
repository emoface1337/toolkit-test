export const SEARCH_REPOSITORIES = `
  query SearchRepositories($query: String!) {
    search(query: $query, type: REPOSITORY, first: 100) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            id
            name
            url
            stargazerCount
            updatedAt
            owner {
              id
              login
              url
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_USER_REPOSITORIES = `
  query GetUserRepositories() {
    viewer {
      repositories(first: 100, orderBy: { field: UPDATED_AT, direction: DESC }) {
        totalCount
        edges {
          node {
            id
            name
            url
            stargazerCount
            updatedAt
            owner {
              id
              login
              url
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export const GET_REPOSITORY_DETAILS = `
  query GetRepositoryDetails($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      name
      description
      url
      stargazerCount
      languages (first: 100) {
        edges {
          node {
            id
            name
            color
          }
        }
      }
      owner {
        login
        avatarUrl
        url
      }
      updatedAt
    }
  }
`;
