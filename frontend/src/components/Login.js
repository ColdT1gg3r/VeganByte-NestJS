import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

// Dentro de handleSubmit:
setLoading(true);
try {
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { 
        email, 
        password 
      });
      localStorage.setItem('token', response.data.access_token);
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Error en login');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};} catch (error) {
  setError(error.response?.data?.message || 'Error');
} finally {
  setLoading(false);
}

// En el JSX, agrega:
{error && <div className="error-message">{error}</div>}
<button type="submit" disabled={loading}>
  {loading ? 'Cargando...' : 'Login'}
</button>

export default Login;