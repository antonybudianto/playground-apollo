import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: String
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books(author: String, page: Int): [Book]
  }
`;

const rand = (max: number) => Math.floor(Math.random() * (max + 1));
const colors = ["White", "Red", "Blue", "Green", "Black", "Pink"];
const things = ["Plate", "Board", "Plan", "Glass", "Phone", "Cycle"];
const authors = ["John", "Doe"];

const generateData = (n: number) => {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push({
      id: `${Date.now()}-${rand(5000)}`,
      title: `${colors[rand(5)]} ${things[rand(5)]}`,
      author: authors[rand(1)],
    });
  }
  return arr;
};

const BOOKS = generateData(50);

const resolveBooks = (arg) => {
  const page = arg.page || 1;
  const pageIndex = (page - 1) * 5;
  return BOOKS.filter((b) => {
    if (!arg.author) return true;
    return arg.author.toLowerCase().indexOf(b.author.toLowerCase()) !== -1;
  }).slice(pageIndex, pageIndex + 5);
};

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: (_, args) => resolveBooks(args),
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server listening at: ${url}`);
