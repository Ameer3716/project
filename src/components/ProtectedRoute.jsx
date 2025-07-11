import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0C0A1D] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user || !user.isSubscribed) {
    return (
      <div className="min-h-screen bg-[#0C0A1D] flex items-center justify-center">
        <div className="text-white text-xl">Access Denied</div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;