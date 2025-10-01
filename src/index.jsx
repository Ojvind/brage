import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import App from './App';
import ThemeProvider from './Shared/ThemeProvider';

import './style.scss';

const API_BASE_URL = 'http://localhost:8000/graphql';

const httpLink = new HttpLink({
  uri: API_BASE_URL,
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </ApolloProvider>,
);

// registerServiceWorker();
