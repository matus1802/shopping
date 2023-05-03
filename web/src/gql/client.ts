import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { StrictTypedTypePolicies } from './types';

import { httpToken } from './vars/index';

const typePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      httpToken: () => httpToken(),
      items: {
        keyArgs: false,
        merge: (existing, incoming, { args }) => {
          const offset = args?.offset ?? 0;
          if (offset === 0) {
            return incoming;
          }
          const merged = existing ? existing.slice(0) : [];

          for (let i = 0; i < incoming.length; ++i) {
            merged[offset + i] = incoming[i];
          }

          return merged;
        },
      },
    },
  },
  User: {
    fields: {
      itemsInCart: {
        merge: (_, incoming) => incoming,
      },
    },
  },
};

const cache: InMemoryCache = new InMemoryCache({
  typePolicies,
});

const httpLink = new HttpLink({ uri: 'http://localhost:8080/graphql' });

const authLink = new ApolloLink((operation, forward) => {
  const token = httpToken();
  if (operation.operationName === 'signup' || operation.operationName === 'login') {
    client.clearStore();
  } else {
    operation.setContext({
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
  }
  return forward(operation);
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors?.length) {
    graphQLErrors.forEach(({ message }) => {
      if (message?.includes('Unauthorized')) {
        httpToken(null);
        console.log('401');
        client.clearStore();
        window.location.href = '/login';
      }
    });
  }
});

const client = new ApolloClient({
  cache,
  link: errorLink.concat(authLink.concat(httpLink)),
});

export default client;
