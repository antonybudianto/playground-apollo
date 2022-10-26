import { ApolloClient, InMemoryCache } from "@apollo/client";
import { extractDirective } from "./util";

const createApolloClient = () => {
  const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache({
      addTypename: true,
      typePolicies: {
        Query: {
          fields: {
            books: {
              // args, context
              keyArgs(_, ctx) {
                const { directiveName } = extractDirective(ctx.field);
                switch (directiveName) {
                  case "books-from-feed": {
                    return ["@connection", ["key"]];
                  }
                  default:
                    return [];
                }
              },

              merge(existing = [], incoming = [], ctx) {
                const { directiveName } = extractDirective(ctx.field);
                switch (directiveName) {
                  case "books-from-feed": {
                    return [...existing, ...incoming];
                  }
                  default:
                    return incoming;
                }
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
