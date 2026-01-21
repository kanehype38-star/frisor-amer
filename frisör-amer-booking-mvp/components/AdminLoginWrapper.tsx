import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard'; // din redan klara dashboard

const AdminLoginWrapper: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    const password = prompt('Ange admin-lösenord:');
    if (password === 'Abdi12345') {
      setIsAuthenticated(true);
    } else {
      alert('Fel lösenord!');
    }
  };

  return isAuthenticated ? (
    <AdminDashboard />
  ) : (
    <div className="flex flex-col items-center justify-center py-40">
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-all"
      >
        Admin Login
      </button>
    </div>
  );
};

export default AdminLoginWrapper;

