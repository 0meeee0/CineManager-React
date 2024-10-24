import { Link, Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-center text-xl font-bold border-b border-gray-700">
          Admin Dashboard
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <Link
                to="/admin/users"
                className="block py-2.5 px-4 hover:bg-gray-700"
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/admin/movies"
                className="block py-2.5 px-4 hover:bg-gray-700"
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                to="/admin/seances"
                className="block py-2.5 px-4 hover:bg-gray-700"
              >
                Seances
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        <header className="bg-white shadow p-4">
          <h1 className="text-2xl font-semibold">Welcome, Admin!</h1>
        </header>

        <main className="p-8">
          <Outlet /> {/* This renders the selected component dynamically */}
        </main>
      </div>
    </div>
  );
}
