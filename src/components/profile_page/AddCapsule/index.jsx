import React, { useState } from 'react';
import axios from 'axios';
import { Plus, Paperclip, Calendar, X, Lock, Globe, Smile, Frown, Heart, Angry, Meh } from 'lucide-react';

const AddCapsule = ({ onCapsuleAdded }) => {
    const [isFileReady, setIsFileReady] = useState(true);
    const base_url = 'http://127.0.0.1:8000/api/v0.1';
    const id = localStorage.getItem('user');
    const url = '/user/add_update';
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    const [base64File, setBase64File] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [ipAddress, setIpAddress] = useState('');
    const [privacySettings, setPrivacySettings] = useState('private'); // 'private' or 'public'
    const [selectedMood, setSelectedMood] = useState(1); // Default to first mood

    // Mood options with icons and IDs
    const moods = [
        { id: 1, name: 'Happy', icon: Smile },
        { id: 2, name: 'Sad', icon: Frown },
        { id: 3, name: 'Love', icon: Heart },
        { id: 4, name: 'Angry', icon: Angry },
        { id: 5, name: 'Neutral', icon: Meh }
    ];

    const fileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            convertToBase64(selectedFile);
        }
    };

    const convertToBase64 = (file) => {
        setIsFileReady(false); // start conversion, disable submit
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setBase64File(reader.result);
            setIsFileReady(true); // conversion done, enable submit
        };
        reader.onerror = (error) => {
            console.error('Error converting file to base64', error);
            setIsFileReady(true); // still enable submit to let user retry or continue
        };
    };


    const removeFile = () => {
        setFile(null);
        setBase64File('');
        const fileInput = document.getElementById('fileInput');
        if (fileInput) fileInput.value = '';
    };

    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = () => {
        const payload = {
            message,
            base64: base64File,
            revealed_at: selectedDate,
            ip_address: ipAddress,
            user_id: id,
            privacy_settings_id: privacySettings === 'private' ? 1 : 2,
            mood_id: selectedMood,
        };
        console.log('Payload to send:', payload);

        const privacy_settings_id = privacySettings === 'private' ? 1 : 2;
        axios.post("" + base_url + url + "", {
            base64: base64File,
            message: message,
            revealed_at: selectedDate,
            ip_address: ipAddress,
            user_id: id,
            privacy_settings_id: privacy_settings_id,
            mood_id: selectedMood,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            console.log("Addition success:", res.data.payload);
            navigate("/profile");
        }).catch((err) => {
            console.log(err.response?.data);
        });
    };

    return (
        <div className="add-capsule-card">
            <div className="capsule-content">
                {/* Left Section */}
                <div className="capsule-input-section">
                    <textarea
                        className="capsule-message-input"
                        placeholder="To my future self.."
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <input
                        type="text"
                        className="capsule-ip-input"
                        placeholder="Enter IP address"
                        value={ipAddress}
                        onChange={(e) => setIpAddress(e.target.value)}
                    />

                    {/* Privacy Settings */}
                    <div className="privacy-section">
                        <label className="privacy-label">
                            Privacy Settings
                        </label>
                        <div className="privacy-options">
                            <button
                                type="button"
                                onClick={() => setPrivacySettings('private')}
                                className={`privacy-btn ${privacySettings === 'private' ? 'active' : ''}`}
                            >
                                <Lock size={16} />
                                Private
                            </button>
                            <button
                                type="button"
                                onClick={() => setPrivacySettings('public')}
                                className={`privacy-btn public ${privacySettings === 'public' ? 'active' : ''}`}
                            >
                                <Globe size={16} />
                                Public
                            </button>
                        </div>
                    </div>

                    {/* Mood Selector */}
                    <div className="mood-section">
                        <label className="mood-label">
                            How are you feeling?
                        </label>
                        <div className="mood-options">
                            {moods.map((mood) => {
                                const IconComponent = mood.icon;
                                return (
                                    <button
                                        key={mood.id}
                                        type="button"
                                        onClick={() => setSelectedMood(mood.id)}
                                        className={`mood-btn ${selectedMood === mood.id ? 'active' : ''}`}
                                    >
                                        <IconComponent
                                            size={20}
                                            className={`mood-icon ${mood.name.toLowerCase()} ${selectedMood === mood.id ? 'active' : ''}`}
                                        />
                                        <span className="mood-text">
                                            {mood.name}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="capsule-actions">
                        <div className="flex items-center gap-2">
                            <Calendar className="plus-icon" />
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                min={today}
                                className="bg-transparent border-0 text-gray-600 focus:outline-none cursor-pointer"
                            />
                        </div>
                        <button
                            type="button"
                            disabled={loading || !isFileReady}
                            className="lock-capsule-btn"
                            onClick={handleSubmit}
                        >
                            {loading ? 'Creating...' : 'Lock Capsule'}
                        </button>

                    </div>
                </div>

                {/* Right media section */}
                <div className="capsule-media-section">
                    <div className="media-card">
                        <label
                            className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200"
                            htmlFor="fileInput"
                        >
                            <Plus className="w-6 h-6 text-gray-400" />
                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*,video/*"
                            onChange={fileChange}
                            className="hidden"
                        />

                        {file && (
                            <div className="media-card">
                                <Paperclip className="w-4 h-4 mx-auto text-green-600" />
                                <p className="text-xs text-green-600 mt-1 truncate">{file.name}</p>
                                <button
                                    type="button"
                                    onClick={removeFile}
                                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCapsule;