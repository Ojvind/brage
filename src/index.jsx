import React from 'react';
import ReactDOM from 'react-dom/client';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

// import registerServiceWorker from './registerServiceWorker';
import App from './App';

import './style.scss';

const API_BASE_URL = 'http://localhost:8000/graphql';

const httpLink = new HttpLink({
  uri: API_BASE_URL,
  headers: {
    authorization: `Bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)); // eslint-disable-line no-console
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`); // eslint-disable-line no-console
  }
});

const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);

// registerServiceWorker();
