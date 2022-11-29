import { onError } from '@apollo/client/link/error';
import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    HttpLink
} from '@apollo/client';

const httpLink = new HttpLink({
    uri: `https://nasa.panim.one/graphql`
});

export const createApolloClient = (logout: Function) => {
    const errorLink = onError(({ graphQLErrors, networkError }) => {
        // Send Error stats back to server
        if (graphQLErrors) {
            console.log('graphQLErrors', graphQLErrors);
            if (graphQLErrors.some((err: any) => err.message === '401')) {
                logout();
            }
        }
        if (networkError) {
            console.log(`[Network error]: ${networkError}`);
        }
        // @ts-ignore
        if (networkError && networkError.statusCode === 401) {
            logout();
        }
    });

    return new ApolloClient({
        link: ApolloLink.from([errorLink, httpLink]),
        cache: new InMemoryCache(),
    });
};
