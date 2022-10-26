import "./App.css";
import { gql, useQuery } from "@apollo/client";
import Feed from "./components/Feed/Feed";
import { Book } from "./model/book";

const BookQuery = gql`
  query Home {
    books(author: "John") {
      id
      title
      author
    }
  }
`;

function App() {
  const { loading, data, error } = useQuery(BookQuery, {
    fetchPolicy: "cache-first",
  });

  const books = (!loading && !error && data.books) || [];
  console.log("home:", books);

  return (
    <div className="App">
      <h1>Apollo Demo</h1>
      <div>
        <h2>Home</h2>
        <div>
          {books.map((b: Book, i: number) => (
            <div key={i}>
              {b.title} ({b.author})
            </div>
          ))}
        </div>
      </div>
      <hr />
      <Feed />
    </div>
  );
}

export default App;
