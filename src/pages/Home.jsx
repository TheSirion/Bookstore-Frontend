import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import BookCards from "../components/home/BookCards";
import BooksTable from "../components/home/BooksTable";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [showType, setShowType] = useState('table');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios.get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      })
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          onClick={() => setShowType("table")}
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg">
          Table
        </button>
        <button
          onClick={() => setShowType("card")}
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg">
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {
        loading ?
          <Spinner /> :
          showType === "table" ?
            <BooksTable books={books} /> :
            <BookCards books={books} />
      }
    </div>
  )
}

export default Home