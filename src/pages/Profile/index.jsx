import React from 'react';
import AddCapsule from '../../components/profile_page/AddCapsule';
import Profile from '../../components/profile_page/Profile';
import './style.css'
import MyCapsules from '../../components/profile_page/MyCapsules';

const ProfilePage = () => {
    return (
        <div className="profile-page-container">
            <Profile />
            <AddCapsule />
            <MyCapsules />
        </div>
    );
}

export default ProfilePage;