import React from 'react';
import Icon from '../../assets/icons/svgs/Icon.svg';

const Navigator = () => {
    return (
        <div>
            <ul>
                <li>
                    <img src={Icon} alt="capsulock" />
                    <h1>Capsulock</h1>
                </li>
                <li>
                    <button>Login</button>
                </li>
            </ul>
        </div>
    );
}

export default Navigator;