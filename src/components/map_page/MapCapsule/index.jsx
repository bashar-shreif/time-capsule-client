const MiniCapsule = ({ user, date, message, profileImage, mediaImages, onClose }) => {
  return (
    <div className="mini-capsule">
      <button className="close-btn" onClick={onClose}>×</button>
      <div className="mini-capsule-header">
        <div className="mini-profile-pic">
          {profileImage ? (
            <img src={profileImage} alt={user} />
          ) : (
            <div className="mini-profile-placeholder">👤</div>
          )}
        </div>
        <div className="mini-user-info">
          <h4 className="mini-user-name">{user}</h4>
          <p className="mini-capsule-date">{date}</p>
        </div>
      </div>
      
      <p className="mini-message">{message}</p>
      
      {mediaImages && mediaImages.length > 0 && (
        <div className="mini-media-stack">
          {mediaImages.slice(0, 2).map((image, index) => (
            <div key={index} className={`mini-media-photo photo-${index + 1}`}>
              <img src={image} alt={`Memory ${index + 1}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MiniCapsule