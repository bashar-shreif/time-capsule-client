import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../../components/shared/Input';


const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const base_url = 'http://127.0.0.1:8000/api';
  const url = '/v0.1/guest/register';

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h1 className="auth-title">SIGN UP</h1>

        <div className="auth-form-group">
          <label className="auth-form-label">Name</label>
          <Input
            name="name"
            hint="e.g. John Doe"
            onChangeListener={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

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
          <label className="auth-form-label">Email</label>
          <Input type="email"
            name="email"
            hint="e.g. johndoe@gmail.com"
            onChangeListener={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="auth-form-group">
          <label className="auth-form-label">Password</label>
          <Input type="password"
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
              name: name,
              username: username,
              email: email,
              password: password,
            }).then((res) => {
              const user = res.data.payload.id;
              const token = res.data.payload.token;
              localStorage.setItem("token", token);
              localStorage.setItem("user", user);

              // Navigate or update UI
              console.log("Login success:", res.data);
              navigate("/home");
            }).catch(
              error => {
                if (error.response && error.response.data) {
                  console.log('Validation errors:', error.response.data.errors);
                  alert(JSON.stringify(error.response.data.errors)); // Just to notify you
                } else {
                  console.error(error);
                }
              }
            );
          }}
        >
        Register
      </button>

      <p className="auth-signin-link">
        Already have an account? <a href="/login" className="auth-signin-link-text">Sign in</a>
      </p>
    </div>
    </div >
  );
};

export default RegisterPage;

