import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await registerUser(formData);
      if (data.token) {
        login(data);
        navigate('/');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto' }} className="dashboard-card">
      <h2 className="card-title">Create DevTrack Account</h2>
      {error && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Full Name"
          className="custom-input"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
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
        <button type="submit" className="custom-btn">Register</button>
      </form>
      <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--primary)' }}>Login</Link>
      </p>
    </div>
  );
};

export default Register;