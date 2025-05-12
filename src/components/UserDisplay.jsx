// This component displays the details of a selected user.
// It allows editing the user's details.
// Key functionalities:
// - Toggles between view and edit modes using `isEditing` state.
// - Validates inputs during editing.
// - Uses `FileReader` to update the profile image if a new one is uploaded.
// - Calls `onEdit` prop with the updated user data when editing is saved.

import { useState } from "react";

const UserDisplay = ({ user, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address || "",
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!editData.name.trim()) newErrors.name = "Name is required";

    if (!editData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(editData.email))
      newErrors.email = "Email is invalid";

    if (!editData.phone.trim()) newErrors.phone = "Mobile number is required";
    else if (!/^\d{10}$/.test(editData.phone))
      newErrors.phone = "Mobile number must be 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (file) {
        const reader = new FileReader();
        reader.onload = function () {
          const updatedUser = {
            ...user,
            ...editData,
            image: reader.result,
          };
          onEdit(updatedUser);
          setIsEditing(false);
        };
        reader.readAsDataURL(file);
      } else {
        const updatedUser = {
          ...user,
          ...editData,
        };
        onEdit(updatedUser);
        setIsEditing(false);
      }
    }
  };

  if (isEditing) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Edit User
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={editData.name}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md shadow-sm p-2 border-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out cursor-text ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={editData.email}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md shadow-sm p-2 border-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out cursor-text ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={editData.phone}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md shadow-sm p-2 border-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out cursor-text ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter 10-digit mobile number"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={editData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md p-2 border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out cursor-text resize-none min-h-[100px]"
              placeholder="Enter your address"
            />
          </div>

          <div>
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-500 p-2 border-2 rounded-md cursor-pointer border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            <p className="mt-1 text-xs text-gray-500">
              Leave empty to keep current image
            </p>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="py-2 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <img
          src={user.image}
          alt={`${user.name}'s profile`}
          className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-indigo-500"
        />
        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex items-center">
          <span className="font-medium text-gray-700 w-24">Email:</span>
          <span className="text-gray-600">{user.email}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-700 w-24">Phone:</span>
          <span className="text-gray-600">{user.phone}</span>
        </div>
        {user.address && (
          <div className="flex items-start">
            <span className="font-medium text-gray-700 w-24">Address:</span>
            <span className="text-gray-600">{user.address}</span>
          </div>
        )}
      </div>

      <div className="mt-8">
        <button
          onClick={() => setIsEditing(true)}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserDisplay;
