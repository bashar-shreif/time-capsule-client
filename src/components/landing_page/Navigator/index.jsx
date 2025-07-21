import React from 'react';
import Icon from '../../assets/icons/svgs/Icon.svg';

const Navigator = () => {
    return (
        <div className="navigator">
            <ul className="nav-list">
                <li className="nav-icon">
                    <img src={Icon} alt="capsulock" className="website-icon" />
                    <h1 className="website-name">Capsulock</h1>
                </li>
                <li>
                    <button className="login-btn"
                    >Login</button>
                </li>
            </ul>
        </div>
    );
}

export default Navigator;