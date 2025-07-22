import React from 'react';
import { Plus, Paperclip } from 'lucide-react';

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
                        <button className="lock-capsule-btn">
                            Lock Capsule
                        </button>
                    </div>
                </div>
                <div className="capsule-media-section">
                    <label className="media-card" htmlFor="fileInput">
                        <Plus className="plus-icon" />
                    </label>
                    <input className="" id="fileInput" type="file" accept="image/*,video/*" />
                </div>
            </div>
        </div>
    );
}

export default AddCapsule;