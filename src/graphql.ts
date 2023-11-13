import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // 서버 주소에 맞게 변경
  cache: new InMemoryCache(),
});