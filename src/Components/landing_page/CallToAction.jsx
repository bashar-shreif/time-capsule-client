import React from 'react';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
    const navigate = useNavigate();

    return (
        <div className='call-to-action'>
            <p className='cta-header'>Send a message to the future.</p>
            <p className='cta-message'>Save a moment, reveal it when the time is right!</p>
            <button className='register-btn' onClick={() => navigate('/register')}
            >Register</button>
        </div>
    );
}

export default CallToAction;