// This component renders a form for adding new users.
// It uses `useState` to manage form inputs and validation errors.
// Key functionalities:
// - Validates inputs (name, email, phone, and profile image).
// - Uses `FileReader` to convert the uploaded profile image to a base64 string.
// - Calls `onSubmit` prop with the user data when the form is submitted.
// - Resets the form after successful submission.

import { useState } from "react";

const UserForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState(null);
  const [address, setAddress] = useState(""); // Additional field
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";

    if (!phone.trim()) newErrors.phone = "Mobile number is required";
    else if (!/^\d{10}$/.test(phone))
      newErrors.phone = "Mobile number must be 10 digits";

    if (!file) newErrors.file = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const reader = new FileReader();
      reader.onload = function () {
        const userData = {
          id: Date.now(),
          name,
          email,
          phone,
          address,
          image: reader.result,
        };

        onSubmit(userData);

        // Reset form
        setName("");
        setEmail("");
        setPhone("");
        setFile(null);
        setAddress("");
        setErrors({});
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        User Information
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
            className={`mt-1 block w-full text-sm text-gray-500 p-2 border-2 rounded-md cursor-pointer ${
              errors.file ? "border-red-500" : "border-gray-300"
            } file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100`}
          />
          {errors.file && (
            <p className="mt-1 text-sm text-red-600">{errors.file}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
