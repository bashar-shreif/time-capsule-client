import React from 'react';
import Illustration from '../../assets/images/CapsuleIllustration.png';
import '../../pages/NotFound/style.css';

const Error = () => {
    return (
        <div className="error-number">
            <p className="four">4</p>
            <img src={Illustration} alt="Time Capsule" className="capsule-illustration" />
            <p className="four">4</p>
        </div>
    );
}

export default Error;