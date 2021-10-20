import React from 'react';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from 'apollo-link-context';

import App from './App.js';

const httpLink = createHttpLink({
	uri: 'http://localhost:5000/graphql',
});

const authLink = setContext(() => {
	const token = localStorage.getItem('jwtToken');
	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

const Provider = () => {
	return (
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	);
};

export default Provider;
