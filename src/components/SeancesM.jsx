import axios from "axios";
import { useEffect, useState } from "react";

export default function SeanceM() {
  const [seances, setSeances] = useState([]);
  const [films, setFilms] = useState([]); // State for films
  const [salles, setSalles] = useState([]); // State for salles
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newSeance, setNewSeance] = useState({
    horaire: "",
    film: "",
    salle: "",
    tarifs: "",
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSeances = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3001/api/seance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSeances(res.data);
      } catch (err) {
        setError(err.message || "Failed to fetch seances.");
      } finally {
        setLoading(false);
      }
    };

    const fetchFilms = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/film", {
          // Adjust endpoint accordingly
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFilms(res.data);
      } catch (err) {
        setError(err.message || "Failed to fetch films.");
      }
    };

    const fetchSalles = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/salle", {
          // Adjust endpoint accordingly
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSalles(res.data);
      } catch (err) {
        setError(err.message || "Failed to fetch salles.");
      }
    };

    fetchSeances();
    fetchFilms();
    fetchSalles();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSeance((prevSeance) => ({ ...prevSeance, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3001/api/seance/add-seance",
        newSeance,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSeances((prevSeances) => [...prevSeances, res.data]);
      setNewSeance({ horaire: "", film: "", salle: "", tarifs: "" });
    } catch (err) {
      setError(err.message || "Failed to add seance.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/seance/delete-seance/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSeances((prevSeances) =>
        prevSeances.filter((seance) => seance._id !== id)
      );
    } catch (err) {
      setError(err.message || "Failed to delete seance.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Seance Management</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Add New Seance Section */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Add New Seance</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="horaire"
                className="block text-sm font-medium mb-1"
              >
                Horaire
              </label>
              <input
                type="datetime-local"
                id="horaire"
                name="horaire"
                value={newSeance.horaire}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="film" className="block text-sm font-medium mb-1">
                Film
              </label>
              <select
                id="film"
                name="film"
                value={newSeance.film}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select a film</option>
                {films.map((film) => (
                  <option key={film._id} value={film._id}>
                    {film.title}{" "}
                    {/* Assuming the film object has a title property */}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="salle" className="block text-sm font-medium mb-1">
                Salle
              </label>
              <select
                id="salle"
                name="salle"
                value={newSeance.salle}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select a salle</option>
                {salles.map((salle) => (
                  <option key={salle._id} value={salle._id}>
                    {salle.name}{" "}
                    {/* Assuming the salle object has a name property */}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="tarifs"
                className="block text-sm font-medium mb-1"
              >
                Tarifs
              </label>
              <input
                type="number"
                id="tarifs"
                name="tarifs"
                value={newSeance.tarifs}
                onChange={handleChange}
                placeholder="Enter tarif amount"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-200"
            >
              Add Seance
            </button>
          </form>
        </div>

        {/* Seance List Section */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-2/3">
          <h2 className="text-2xl font-semibold mb-4">Seance List</h2>
          {seances.length === 0 ? (
            <div>No seances found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {seances.map((seance) => (
                <div
                  key={seance._id}
                  className="p-4 bg-gray-50 shadow-sm rounded-md border"
                >
                  <h3 className="font-medium text-lg">
                    Horaire: {new Date(seance.horaire).toLocaleString()}
                  </h3>
                  <p className="text-sm">
                    Film:{" "}
                    {typeof seance.film === "object"
                      ? seance.film.title
                      : seance.film}
                  </p>
                  <p className="text-sm">
                    Salle:{" "}
                    {typeof seance.salle === "object"
                      ? seance.salle.name
                      : seance.salle}
                  </p>
                  <p className="text-sm">Tarifs: {seance.tarifs} DH</p>
                  <button
                    onClick={() => handleDelete(seance._id)}
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
