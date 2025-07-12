import React from 'react';

const Register = () => {
    return (
        <div>
            <h1>Sign Up</h1>
            <form action="">
                <label htmlFor="">Name</label>
                <input type="name" name="" id="" placeholder="John Doe"/>
                <label htmlFor="">Username</label>
                <input type="text" placeholder="john_doe"/>
                <label htmlFor="">Email</label>
                <input type="email" placeholder="e.g. john_doe@gmail.com" />
                <label htmlFor="">Password</label>
                <input type="password" placeholder="*********" />
                <button>Login</button>
            </form>
            <p>Don't have an account? <span>Sign Up</span></p>
        </div>
    );
}

export default Register;