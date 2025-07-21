import React from 'react';

const Capsule = ({ 
  user = "John Doe", 
  date = "Created: 6/14/25 • Revealed: 7/10/25", 
  message = "To my future self, I hope by the time you're reading this, you've found peace with the things you couldn't control and pride in the things..", 
  greeting = "To my future self,",
  profileImage = "",
  mediaImages = []
}) => {
  return (
    <div className="capsule-card">
      <div className="capsule-content">
        <div className="text-content">
          <div className="capsule-header">
            <div className="profile-section">
              <div className="profile-pic">
                {profileImage ? (
                  <img src={profileImage} alt={user} />
                ) : (
                  <div className="profile-placeholder">👤</div>
                )}
              </div>
              <div className="user-info">
                <h3 className="user-name">{user}</h3>
                <p className="capsule-date">{date}</p>
              </div>
            </div>
          </div>
          
          <div className="capsule-body">
            <p className="message-greeting">{greeting}</p>
            <p className="message-text">{message}</p>
          </div>
        </div>
        
        <div className="media-stack">
          {mediaImages.length > 0 ? (
            mediaImages.slice(0, 2).map((image, index) => (
              <div key={index} className={`media-photo photo-${index + 1}`}>
                <img src={image} alt={`Memory ${index + 1}`} />
              </div>
            ))
          ) : (
            <>
              <div className="media-photo photo-1">
                <div className="photo-placeholder"></div>
              </div>
              <div className="media-photo photo-2">
                <div className="photo-placeholder"></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Capsule;