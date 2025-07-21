import React, { useState } from "react";
import "./style.css";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        {isLogin ? (
          <Login toggle={switchForm} />
        ) : (
          <Register toggle={switchForm} />
        )}
      </div>
    </div>
  );
};

export default Auth;
