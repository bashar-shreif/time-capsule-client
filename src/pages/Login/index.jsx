import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/shared/Input';
import axios from "axios";
import './style.css';


const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const base_url = 'http://127.0.0.1:8000/api';
  const url = '/v0.1/guest/login';

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h1 className="auth-title">SIGN IN</h1>



        <div className="auth-form-group">
          <label className="auth-form-label">Username</label>
          <Input
            name="username"
            hint="e.g. john_doe"
            onChangeListener={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>



        <div className="auth-form-group">
          <label className="auth-form-label">Password</label>
          <Input
            name="password"
            hint="••••••••••••"
            onChangeListener={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button
          className="auth-register-btn"
          onClick={() => {
            const res = axios.post("" + base_url + url + "", {
              username: username,
              password: password,
            }).then((res) => {
              const user = res.data.payload;
              console.log(user);
              localStorage.setItem('user', user.id);
              localStorage.setItem('token', user.token);

              console.log("Login success:", user.data);
              navigate("/home");
            }).catch((err) => {
              alert("Login failed. Please check your credentials.");
              console.error("Login error:", err);
            });
          }}
        >
          Login
        </button>

        <p className="auth-signin-link">
          Don't have an account? <a href="/register" className="auth-signin-link-text">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

