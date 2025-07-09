// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const AuthContext = createContext({
  user: null,
  loading: true,
  error: null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (err) {
      setError(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Mock user for development - remove in production
  useEffect(() => {
    if (!user && !loading) {
      setUser({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        isSubscribed: true,
        subscriptionPlan: 'agency' // Change to 'pro', 'growth', or 'agency' for testing
      });
    }
  }, [user, loading]);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};