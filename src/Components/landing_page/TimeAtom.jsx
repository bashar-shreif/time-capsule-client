import React from 'react';
import CapsuleIllustration from '../../assets/images/CapsuleIllustration.png';

const TimeAtom = () => {
    return (
        <div className="time-atom">
            <div className="ring-1">
                <div className="dot dot-1"></div>
            </div>
            <div className="ring-2">
                <div className="dot dot-2"></div>
            </div>

            <img className='capsule' src={CapsuleIllustration} alt="time_capsule" />
        </div>
    );
}

export default TimeAtom;