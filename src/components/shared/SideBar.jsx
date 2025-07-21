import React from 'react';
import { House, CircleEllipsis, Map, CircleUser } from 'lucide-react';
import Icon from '../../assets/icons/svgs/Icon.svg';
const SideBar = () => {
    return (
        <div>
            <ul>
                <img src={Icon} alt="capsulock" />
                <li>
                    <House size={48} strokeWidth={3} />
                </li>
                <li>
                    <Map size={48} strokeWidth={3} />
                </li>
                <li>
                    <CircleEllipsis size={48} strokeWidth={3} />
                </li>
                <li>
                    <CircleUser size={48} strokeWidth={3} />
                </li>
            </ul>
        </div>
    );
}

export default SideBar;