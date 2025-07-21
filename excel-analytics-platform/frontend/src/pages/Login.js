import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { UserContext } from '../context/UserContext';
import { jwtDecode } from 'jwt-decode';
import '../styles/Form.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });

      const token = response.data.token; // ✅ extract correctly
      const decoded = jwtDecode(token);  // ✅ decode safely

      console.log("🎫 Token:", token);
      console.log("🔑 Decoded user:", decoded);

      // ✅ Save token and user role
      localStorage.setItem('token', token);
      localStorage.setItem('role', response.data.user?.role || 'user');

      // ✅ Set context
      setUser({ id: decoded.id, name: decoded.name });

      navigate(response.data.user?.role === 'admin' ? '/admin' : '/dashboard');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert(error.response?.data?.msg || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="page-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;




















