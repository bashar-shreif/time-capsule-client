import React from 'react';
import AddCapsule from '../../components/profile_page/AddCapsule';
import Profile from '../../components/profile_page/Profile';
import './style.css'

const ProfilePage = () => {
    return (
        <div className="profile-page-container">
            <Profile />
            <AddCapsule />
        </div>
    );
}

export default ProfilePage;