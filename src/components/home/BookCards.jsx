import BookCard from "./BookCard";

const BooksCards = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {
        books.map(item => (
          <BookCard book={item} key={item._id} />
        ))
      }
    </div>
  )
}

export default BooksCards