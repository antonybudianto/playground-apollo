import { gql, useQuery } from "@apollo/client";
import { useCallback, useRef } from "react";
import { Book } from "../../model/book";

const BookQuery = gql`
  query Feed($page: Int) {
    books(author: "John", page: $page) @connection(key: "books-from-feed") {
      id
      title
      author
    }
  }
`;

const Feed = () => {
  const pageRef = useRef(1);
  const { loading, data, error, fetchMore } = useQuery(BookQuery, {
    fetchPolicy: "cache-first",
    variables: {
      page: pageRef.current,
    },
  });
  const books = (!loading && !error && data.books) || [];
  console.log("feed:", books);

  const handleLoadMore = useCallback(() => {
    pageRef.current += 1;
    fetchMore({
      variables: {
        page: pageRef.current,
      },
    });
  }, []);

  return (
    <div>
      <h2>Feed</h2>
      <div>
        {books.map((b: Book, i: number) => {
          return (
            <div key={i}>
              {b.title} ({b.author})
            </div>
          );
        })}
      </div>
      <div>
        <button type="button" onClick={handleLoadMore}>
          Load more
        </button>
      </div>
      <div>
        *Notice when load more is clicked, the home data is also changed because
        they share same cache key...
      </div>
    </div>
  );
};

export default Feed;
