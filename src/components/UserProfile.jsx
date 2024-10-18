import { useState } from "react";

export default function UserProfileEdit() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    password: "********",
    phone: "+1 (555) 123-4567",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevUser) => ({ ...prevUser, image: reader.result }));
      };
      reader.onerror = (error) => console.error("Error reading file:", error);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated user:", user);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-200">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
        <p className="text-gray-500 mb-6">
          View and edit your profile information.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img
                src={user.image}
                alt={user.name}
                className="object-cover w-full h-full"
              />
            </div>
            <label className="cursor-pointer text-blue-500 hover:text-blue-600">
              <span className="text-sm flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4 4m0 0l4-4m-4 4V4"
                  />
                </svg>
                <span>Upload new image</span>
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={!isEditing}
              />
            </label>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={user.password}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825a4.992 4.992 0 01-3.75 0M4.875 12a8.978 8.978 0 011.357-4.775M19.125 12a8.978 8.978 0 00-1.357-4.775M9.88 9.88a2.5 2.5 0 013.12 0M6.6 15.4a2.5 2.5 0 003.12 0m7.48-6.4a2.5 2.5 0 00-3.12 0"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3l18 18M13.875 18.825a4.992 4.992 0 01-3.75 0M4.875 12a8.978 8.978 0 011.357-4.775m11.493 0A8.978 8.978 0 0119.125 12m0 0l1.05 1.05"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={user.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between mt-6">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
