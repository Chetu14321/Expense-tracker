import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppProvider';

const URL = "https://expense-tracker-api-gi5q.onrender.com";

function Login() {
  const { setIsLogin, setToken } = useContext(AppContext);
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const readInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/api/auth/login`, user);
      const { loginToken, msg } = response.data;

      toast.success(msg);
      setToken(loginToken);
      setIsLogin(true);
      sessionStorage.setItem("token", loginToken);

      navigate('/');
    } catch (err) {
      const errorMsg =
        err.response?.data?.msg || "Login failed. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="col-md-6 col-lg-5 shadow-lg p-4 rounded bg-white">
        <h3 className="text-center mb-4">Login to Your Account</h3>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={user.email}
              onChange={readInput}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={user.password}
              onChange={readInput}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
        <p className="text-center mt-3">
          Don’t have an account? <span className="text-primary" style={{ cursor: 'pointer' }}>Register here</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
