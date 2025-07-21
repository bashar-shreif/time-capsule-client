import React from 'react';
import { Edit } from 'lucide-react';

const Profile = () => {
    return (
        <div 
            className="profile-card"
            style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="profile-overlay">
                <div className="profile-bottom">
                    <div className="profile-avatar">
                        <img src="" alt="pfp" className="avatar-image" />
                    </div>
                    <div className="profile-name">Ahmad Hassan</div>
                </div>
            </div>
        </div>
    );
}

export default Profile;