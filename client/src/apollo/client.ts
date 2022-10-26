import { ApolloClient, InMemoryCache } from "@apollo/client";
import initBookFieldPolicy from "./field-policies/book";

const createApolloClient = () => {
  const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache({
      addTypename: true,
      typePolicies: {
        Query: {
          fields: {
            books: initBookFieldPolicy(),
          },
        },
      },
    }),
  });
  return client;
};

export default createApolloClient;
