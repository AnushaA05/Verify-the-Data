import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log("🔑 Decoded user from token:", JSON.stringify(decoded, null, 2));
      setUser({ id: decoded.id, name: decoded.name });
    } catch (err) {
      console.error('Invalid token', err);
      localStorage.removeItem('token');
    }
  }
  setLoading(false);
}, []);


  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};


