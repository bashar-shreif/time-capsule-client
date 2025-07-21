import React, {useState} from 'react'
import Input from '../../components/shared/Input';
import './style.css';


const RegisterPage = () => {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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
          <Input 
            name="email" 
            hint="e.g. johndoe@gmail.com" 
            onChangeListener={(e) => {
              setEmail(e.target.value);
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
          Register
        </button>
        
        <p className="auth-signin-link">
          Already have an account? <a href="/login" className="auth-signin-link-text">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

