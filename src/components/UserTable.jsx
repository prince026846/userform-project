import React from 'react';

// This component displays a table of all users.
// It accepts `users`, `onView`, and `onDelete` as props.
// Key functionalities:
// - Renders a table with user details (profile image, name, email, phone).
// - Provides "View" and "Delete" buttons for each user.
// - Calls `onView` when the "View" button is clicked to display user details.
// - Calls `onDelete` when the "Delete" button is clicked to remove a user.

const UserTable = ({ users, onView, onDelete }) => {
  if (!users || users.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p className="text-center text-gray-500">No users found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Profile
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex-shrink-0 h-10 w-10">
                  <img 
                    className="h-10 w-10 rounded-full object-cover" 
                    src={user.image} 
                    alt={`${user.name}'s profile`} 
                  />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.phone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onView(user)}
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  View
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;