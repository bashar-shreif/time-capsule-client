import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const user_id = localStorage.getItem('user');
  const [profile, setProfile] = useState(null);
  const [uploadingPfp, setUploadingPfp] = useState(false);
  const [uploadingBg, setUploadingBg] = useState(false);

  const base_url = 'http://127.0.0.1:8000/api';
  const server_url = 'http://127.0.0.1:8000';

  useEffect(() => {
    if (!user_id) return;
    axios.get(`${base_url}/v0.1/user/profile/get/${user_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => {
      const profileData = res.data.payload || res.data;
      setProfile(profileData);
    }).catch(err => {
      console.error('Failed to fetch profile:', err);
      setProfile({});
    });
  }, [user_id]);

  const uploadFile = (type, setUploading) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      setUploading(true);
      const reader = new FileReader();
      reader.onload = () => {
        const endpoint = type === 'pfp' 
          ? `${base_url}/v0.1/user/profile/pfp/${user_id}`
          : `${base_url}/v0.1/user/profile/pbg/${user_id}`;

        axios.post(endpoint, { base64: reader.result }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then(res => {
          const userData = res.data.payload || res.data;
          const timestamp = Date.now();
          setProfile(prev => ({
            ...prev,
            name: userData.name,
            profile: userData.pfp_url ? `${userData.pfp_url}?t=${timestamp}` : null,
            background: userData.pbg_url ? `${userData.pbg_url}?t=${timestamp}` : null
          }));
        }).catch(err => {
          console.error(`Failed to update ${type}:`, err);
        }).finally(() => {
          setUploading(false);
        });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  if (!profile) return <div className="text-white">Loading...</div>;

  return (
    <div
      className="profile-card"
      style={{ 
        backgroundImage: profile.background ? `url(${server_url}${profile.background})` : 'none',
        backgroundColor: profile.background ? 'transparent' : '#1a1a1a',
        cursor: !profile.background ? 'pointer' : 'default'
      }}
      onClick={!profile.background ? () => uploadFile('bg', setUploadingBg) : undefined}
    >
      {!profile.background && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#666',
          fontSize: '14px',
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 1
        }}>
          {uploadingBg ? 'Uploading...' : 'Click to add background'}
        </div>
      )}

      <div className="profile-overlay">
        <div className="profile-bottom">
          <div 
            className="profile-avatar"
            style={{ 
              position: 'relative',
              cursor: !profile.profile ? 'pointer' : 'default' 
            }}
            onClick={!profile.profile ? (e) => {
              e.stopPropagation();
              uploadFile('pfp', setUploadingPfp);
            } : undefined}
          >
            {profile.profile ? (
              <img src={`${server_url}${profile.profile}`} alt="pfp" className="avatar-image" />
            ) : (
              <div style={{ 
                width: 80, 
                height: 80, 
                backgroundColor: '#555', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                color: '#999',
                textAlign: 'center',
                border: '2px dashed #666'
              }}>
                {uploadingPfp ? 'Uploading...' : 'Add Photo'}
              </div>
            )}
            
            {profile.profile && (
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                  fontSize: '12px',
                  color: 'white'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  uploadFile('pfp', setUploadingPfp);
                }}
                onMouseEnter={(e) => e.target.style.opacity = 1}
                onMouseLeave={(e) => e.target.style.opacity = 0}
              >
                Change
              </div>
            )}
          </div>
          <div className="profile-name">
            {profile.name || "Anonymous"}
          </div>
        </div>
        
        {profile.background && (
          <button 
            className="edit-profile-btn" 
            onClick={(e) => {
              e.stopPropagation();
              uploadFile('bg', setUploadingBg);
            }}
            disabled={uploadingBg}
          >
            {uploadingBg ? 'Uploading...' : 'Edit Background'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;