import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache({
      addTypename: true,
      typePolicies: {
        Query: {
          fields: {
            books: {
              keyArgs: ["author"],
              merge(existing = [], incoming = []) {
                return [...existing, ...incoming];
              },
            },
          },
        },
      },
    }),
  });
  return client;
};

export default createApolloClient;
