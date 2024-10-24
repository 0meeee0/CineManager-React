import axios from "axios";
import { useEffect, useState } from "react";

export default function MoviesM() {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);
  const [newFilm, setNewFilm] = useState({
    title: "",
    genre: "",
    poster: null,
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/film", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFilms(res.data);
      } catch (err) {
        setError(err.message || "Failed to fetch films.");
      }
    };
    fetchFilms();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "poster") {
      setNewFilm((prevFilm) => ({ ...prevFilm, poster: e.target.files[0] }));
    } else {
      setNewFilm((prevFilm) => ({ ...prevFilm, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in newFilm) {
      formData.append(key, newFilm[key]);
    }

    try {
      const res = await axios.post(
        "http://localhost:3001/api/film/add-film",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFilms([...films, res.data.newFilm]);
      setNewFilm({ title: "", genre: "", poster: null });
    } catch (err) {
      setError(err.message || "Failed to add film.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post(`http://localhost:3001/api/film/delete-film/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFilms(films.filter((film) => film._id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete film.");
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Movies Management</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Add New Film Section */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Add New Film</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={newFilm.title}
                onChange={handleChange}
                placeholder="Enter film title"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="genre" className="block text-sm font-medium mb-1">
                Genre
              </label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={newFilm.genre}
                onChange={handleChange}
                placeholder="Enter film genre"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

          

            <div className="mb-4">
              <label
                htmlFor="poster"
                className="block text-sm font-medium mb-1"
              >
                Poster
              </label>
              <input
                type="file"
                id="poster"
                name="poster"
                accept="image/*"
                onChange={handleChange}
                className="w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-200"
            >
              Add Film
            </button>
          </form>
        </div>

        {/* Film List Section */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-2/3">
          <h2 className="text-2xl font-semibold mb-4">Film List</h2>
          {films.length === 0 ? (
            <div>No films found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {films.map((film) => (
                <div
                  key={film._id}
                  className="p-4 bg-gray-50 shadow-sm rounded-md border"
                >
                  <h3 className="font-medium text-lg">{film.title}</h3>
                  <p className="text-sm">Genre: {film.genre}</p>
                  {film.poster && (
                    <img
                      src={film.poster}
                      alt={film.title}
                      className="mt-2 w-full h-32 object-cover rounded-md border"
                    />
                  )}
                  <button
                    onClick={() => handleDelete(film._id)}
                    className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
