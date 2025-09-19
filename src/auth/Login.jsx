import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    login(formData.email, formData.password, formData.role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-2 sm:py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-xl shadow-lg p-4 sm:p-8 space-y-6">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100">
            <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          <h2 className="mt-4 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Choose your role to access the dashboard
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full px-4 py-3 border border-gray-300 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base bg-gray-50"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full px-4 py-3 border border-gray-300 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base bg-gray-50"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="role" className="sr-only">Role</label>
              <select
                id="role"
                name="role"
                required
                className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base bg-gray-50"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="student">Student</option>
                <option value="school">School</option>
                <option value="admin">Admin</option>
                <option value="hospital">Hospital</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-base font-semibold transition"
          >
            Sign in
          </button>

          <div className="text-center">
            <Link to="/register" className="text-sm text-indigo-600 hover:text-indigo-500">
              Want to register a new account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
