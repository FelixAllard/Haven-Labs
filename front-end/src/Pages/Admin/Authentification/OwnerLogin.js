import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../../AXIOS/AuthentificationContext';
const environment = process.env.REACT_APP_API_GATEWAY_HOST;

const OwnerLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from useAuth hook

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${environment}/gateway/api/ProxyAuth/login`,
        {
          username,
          password,
        },
      );

      if (response.status === 200) {
        const { token } = response.data;
        login(token);
        navigate('/');
      } else if (response.status === 503) {
        setError('service unavailable. Please try again later.');
      } else {
        setError(
          'Invalid credentials or service unavailable. Please try again.',
        );
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setError('Invalid credentials! Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg" style={{ width: '400px' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Owner Login</h2>
          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OwnerLogin;
