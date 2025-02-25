import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

// Dentro de handleSubmit:
setLoading(true);
try {
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/auth/register', {
        email,
        password
      });
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Error en registro');
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
      <button type="submit">Register</button>
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
  {loading ? 'Cargando...' : 'Register'}
</button>

export default Register;