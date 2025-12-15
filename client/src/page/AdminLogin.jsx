import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService, setAuthToken } from '../utils/apiConnector';

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'admin') {
      setAuthToken(token);
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage('');
      const res = await apiService.login({ email, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('userEmail', user.email);
      setAuthToken(token);
      navigate('/admin');
    } catch (err) {
      console.error('Login failed:', err);
      setMessage(err?.response?.data || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow">
        <h1 className="text-xl font-semibold mb-4 text-center">Admin Login</h1>
        {message && (
          <div className="mb-3 rounded bg-red-50 px-3 py-2 text-sm text-red-700">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-[#5e0404] px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;


