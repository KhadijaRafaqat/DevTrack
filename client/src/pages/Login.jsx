import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await loginUser(formData);
      if (data.token) {
        login(data);
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto' }} className="dashboard-card">
      <h2 className="card-title">Login to DevTrack</h2>
      {error && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="email"
          placeholder="Email Address"
          className="custom-input"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="custom-input"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit" className="custom-btn">Login</button>
      </form>
      <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
        Don't have an account? <Link to="/register" style={{ color: 'var(--primary)' }}>Register</Link>
      </p>
    </div>
  );
};

export default Login;