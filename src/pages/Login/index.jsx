import React, {useState} from 'react'
import Input from '../../components/shared/Input';
import '../Register/style.css';


const LoginPage = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

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
            console.log(name, username, email, password);
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

