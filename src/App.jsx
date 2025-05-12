// This is the main component of the application.
// It manages the state for users, the currently selected user, and whether the form or user display is shown.
// Key functionalities:
// - `useEffect` to load and save user data to localStorage.
// - `handleUserSubmit`: Adds a new user to the list.
// - `handleUserEdit`: Updates an existing user's details.
// - `handleUserDelete`: Deletes a user from the list.
// - `handleViewUser`: Displays a user's details.
// - `handleBackToForm`: Switches back to the form view.
// The component renders a form or user display on the left and a user table on the right.

import { useState, useEffect } from "react";
import UserForm from "./components/UserForm";
import UserDisplay from "./components/UserDisplay";
import UserTable from "./components/UserTable";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Load user data from localStorage on initial render
  useEffect(() => {
    const storedUsers = localStorage.getItem("usersData");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  // Save users to localStorage whenever the users array changes
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("usersData", JSON.stringify(users));
    }
  }, [users]);

  const handleUserSubmit = (userData) => {
    const updatedUsers = [...users, userData];
    setUsers(updatedUsers);
    setCurrentUser(userData);
    setShowForm(false);
    setFormSubmitted(true);
  };

  const handleUserEdit = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    setCurrentUser(updatedUser);
  };

  const handleUserDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);

    // If we're viewing the user that was deleted, go back to the form
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(null);
      setShowForm(true);
    }

    // Update localStorage
    if (updatedUsers.length === 0) {
      localStorage.removeItem("usersData");
    } else {
      localStorage.setItem("usersData", JSON.stringify(updatedUsers));
    }
  };

  const handleViewUser = (user) => {
    setCurrentUser(user);
    setShowForm(false);
  };

  const handleBackToForm = () => {
    setShowForm(true);
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            User Management System
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your users with this simple application
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left side - Form or User Display */}
          <div className="lg:col-span-5">
            {showForm ? (
              <UserForm onSubmit={handleUserSubmit} />
            ) : (
              <div>
                {currentUser ? (
                  <UserDisplay user={currentUser} onEdit={handleUserEdit} />
                ) : (
                  <p className="text-center text-gray-500">No user selected.</p>
                )}
                <div className="mt-4 text-center">
                  <button
                    onClick={handleBackToForm}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add New User
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right side - Users Table */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Users List
              </h2>
              {formSubmitted && users.length > 0 ? (
                <UserTable
                  users={users}
                  onView={handleViewUser}
                  onDelete={handleUserDelete}
                />
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No users have been added yet. Fill out the form to add a user.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
