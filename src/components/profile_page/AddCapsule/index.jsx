import React from 'react';

const AddCapsule = () => {
    return (
        <div className="add-capsule-card">
            <div className="capsule-header">
                <div className="capsule-avatar">
                    <img src="" alt="pfp" className="capsule-avatar-image" />
                </div>
                <div className="capsule-user-name">Ahmad Hassan</div>
            </div>
            
            <div className="capsule-content">
                <div className="capsule-input-section">
                    <textarea 
                        className="capsule-message-input"
                        placeholder="To my future self.."
                        rows={3}
                    />
                    
                    <div className="capsule-actions">
                        <div className="file-input-wrapper">
                            <input type="file" id="file-input" multiple accept="image/*,video/*" />
                            <label htmlFor="file-input" className="file-input-label">
                                <Paperclip />
                                Add Media
                            </label>
                        </div>
                        
                        <button className="lock-capsule-btn">
                            Lock Capsule
                        </button>
                    </div>
                </div>
                
                <div className="capsule-media-section">
                    <div className="media-card">
                        <Plus className="plus-icon" />
                    </div>
                    <div className="media-card media-card-back">
                        <Plus className="plus-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddCapsule;