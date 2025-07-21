import React from 'react';
import { useNavigate } from 'react-router-dom';
import './/style.css';

const ErrorMessage = () => {
    const navigate = useNavigate();

    return (
        <div className="error-message-box">
            <p className="error-title">Oops! Looks like you've entered a capsule that is lost in time.</p>
            <p className="error-description">Double-check the link or travel back to the homepage to find your way.</p>
            <button className="home-button" onClick={() => navigate('/home')}>Home Page</button>
        </div>
    );
}

export default ErrorMessage;