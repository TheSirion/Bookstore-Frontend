import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("")
  const [publishYear, setPublishYear] = useState("")
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear
    }

    setLoading(true);

    axios
      .post("http://localhost:5555/books", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Success logging new book!", { variant: "success" })
        navigate("/");
      })
      .catch(error => {
        setLoading(false);
        enqueueSnackbar("Something went wrong!", { variant: "error" })
        console.error(error);
      })
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {
        loading ? <Spinner /> : ""
      }
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label htmlFor="title" className="text-xl mr-4 text-gray-500">Title</label>
          <input
            name="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
          <label htmlFor="author" className="text-xl mr-4 text-gray-500">Author</label>
          <input
            name="author"
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
          <label htmlFor="publishYear" className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            name="publishYear"
            type="number"
            value={publishYear}
            onChange={e => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
          <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default CreateBook