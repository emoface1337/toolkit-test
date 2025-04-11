import axios from 'axios';

class GraphQLClient {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://api.github.com/graphql',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });

    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('github_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async query<T>(query: string, variables?: Record<string, any>): Promise<T> {
    const response = await this.client.post('', {
      query,
      variables
    });
    return response.data.data;
  }
}

export const graphqlClient = new GraphQLClient();
