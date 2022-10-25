import { gql, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { Book } from "../../model/book";

const BookQuery = gql`
  query Home {
    books {
      title
      author
    }
  }
`;

const Feed = () => {
  const { loading, data, error, fetchMore } = useQuery(BookQuery, {
    fetchPolicy: "cache-first",
  });
  const books = (!loading && !error && data.books) || [];
  console.log("feed:", books);

  const handleLoadMore = useCallback(() => {
    fetchMore({});
  }, []);

  return (
    <div>
      <h2>Feed</h2>
      <div>
        {books.map((b: Book, i: number) => {
          return <div key={i}>{b.title}</div>;
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
