import React from 'react';
import CapsuleIllustration from '../../assets/images/CapsuleIllustration.png';
import Ellipse from '../../assets/images/Ellipse.png';

const SideBar = () => {
    return (
        <div>
            <img src={CapsuleIllustration} alt="time_capsule" />
            <img src={Ellipse} />
            <img src={Ellipse} />
            <img src={Ellipse} />
        </div>
    );
}

export default SideBar;