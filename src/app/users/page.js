'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import EditUserModal from '@/components/EditUserModal';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const router = useRouter();

  // Fetch users function using useCallback
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${currentPage}`);
      const data = await response.json();
      setUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Failed to fetch users', error);
      showNotification('Failed to fetch users', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.replace('/login');
      return;
    }
    fetchUsers();
  }, [fetchUsers, router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${userId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setUsers(users.filter(user => user.id !== userId));
        showNotification('User deleted successfully', 'success');
      } else {
        showNotification('Failed to delete user', 'error');
      }
    } catch (error) {
      console.error('Delete user error:', error);
      showNotification('Failed to delete user', 'error');
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      });

      if (response.ok) {
        setUsers(users.map(user =>
          user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        ));
        setIsEditModalOpen(false);
        showNotification('User updated successfully', 'success');
      } else {
        showNotification('Failed to update user', 'error');
      }
    } catch (error) {
      console.error('Update user error:', error);
      showNotification('Failed to update user', 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded shadow-lg ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users List</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* User Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => (
          <div 
            key={user.id} 
            className="bg-white shadow-lg rounded-xl overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Image 
                  src={user.avatar} 
                  alt={`${user.first_name} ${user.last_name}`} 
                  width={80} 
                  height={80} 
                  className="rounded-full object-cover shadow-md"
                />
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold">
                    {`${user.first_name} ${user.last_name}`}
                  </h2>
                  <p className="text-gray-600 mt-1">{user.email}</p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-between mt-4">
                <button 
                  onClick={() => handleEditUser(user)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 space-x-4">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={`page-${index + 1}`} // Use a unique key
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded transition ${
              currentPage === index + 1 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <EditUserModal 
          user={selectedUser}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdateUser}
        />
      )}
    </div>
  );
}
