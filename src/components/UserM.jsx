import axios from "axios";
import { useEffect, useState } from "react";

export default function UsersM() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "admin", 
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setUsers(res.data);
      } catch (err) {
        setError(err.message || "Failed to fetch users.");
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3001/api/auth/register",
        newUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers((prev) => [...prev, res.data]);
      setNewUser({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "admin",
      });
    } catch (err) {
      setError(err.message || "Failed to add user.");
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex p-8 space-x-8">
      {/* users */}
      <div className="w-2/3">
        <h1 className="text-2xl font-semibold mb-4">Users</h1>
        {users.length === 0 ? (
          <div>No users found.</div>
        ) : (
          <ul className="space-y-2">
            {users.map((user) => (
              <li
                key={user._id}
                className="p-4 bg-white shadow rounded-md border"
              >
                <p className="font-medium">Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* add admin */}
      <div className="w-1/3 bg-white shadow-lg p-6 rounded-md">
        <h2 className="text-xl font-semibold mb-4">Add New Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newUser.name}
              onChange={handleChange} 
              placeholder="Enter user name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={newUser.email}
              onChange={handleChange} 
              placeholder="Enter user email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone
            </label>
            <input
              type="number"
              id="phone"
              name="phone" 
              value={newUser.phone} 
              onChange={handleChange} 
              placeholder="Enter user phone"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password" 
              value={newUser.password}
              onChange={handleChange}
              placeholder="Enter user password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}
