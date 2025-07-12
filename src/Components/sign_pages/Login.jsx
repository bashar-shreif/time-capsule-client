import React from 'react';

const Login = () => {
    return (
        <div>
            <h1>Sign In</h1>
            <form action="">
                <label htmlFor="">Email</label>
                <input type="email" placeholder="e.g. john_doe@example.com" />
                <label htmlFor="">Password</label>
                <input type="password" placeholder="*********"/>
                <button>Login</button>
            </form>
            <p>Don't have an account? <span>Sign Up</span></p>
        </div>
    );
}

export default Login;