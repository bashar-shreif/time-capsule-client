import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Capsule from '../../shared/Capsule';

const MyCapsules = () => {
    const [capsules, setCapsules] = useState({ pending: [], revealed: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const base_url = 'http://localhost:8000/api';
    const user_id = localStorage.getItem('user');
    const server_url = 'http://localhost:8000';

    useEffect(() => {
        if (!user_id) return;
        fetchMyCapsules();
    }, [user_id]);

    const fetchMyCapsules = () => {
        const token = localStorage.getItem("token");
        
        axios.get(`${base_url}/v0.1/user/user/${user_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log("My capsules fetched successfully:", res.data);
            setCapsules({
                pending: res.data.payload.pending || [],
                revealed: res.data.payload.revealed || []
            });
            setLoading(false);
        }).catch(error => {
            if (error.response && error.response.data) {
                console.log('API Error:', error.response.data);
                setError(error.response.data.message || 'Failed to fetch your capsules');
            } else {
                console.error('Network Error:', error);
                setError('Network error occurred');
            }
            setLoading(false);
        });
    };

    const formatDate = (createdAt, revealedAt) => {
        const formatDateTime = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                month: 'numeric', 
                day: 'numeric', 
                year: '2-digit' 
            });
        };

        const createdDate = formatDateTime(createdAt);
        
        if (revealedAt && revealedAt !== "1970-12-21 10:18:12") {
            const revealedDate = formatDateTime(revealedAt);
            return `Created: ${createdDate} • Revealed: ${revealedDate}`;
        } else {
            return `Created: ${createdDate} • Pending reveal`;
        }
    };

    if (loading) {
        return (
            <div className="my-capsules-container">
                <div className="loading">Loading your capsules...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-capsules-container">
                <div className="error">Error: {error}</div>
                <button onClick={fetchMyCapsules} className="retry-btn">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="my-capsules-container">
            <h2 className="my-capsules-title">My Time Capsules</h2>
            
            {/* Pending Capsules Section */}
            {capsules.pending.length > 0 && (
                <div className="capsules-section">
                    <h3 className="section-title">Pending Capsules ({capsules.pending.length})</h3>
                    <div className="capsules-list">
                        {capsules.pending.map((capsule) => (
                            <div key={capsule.id} className="pending-capsule-wrapper">
                                <Capsule
                                    user={capsule.user?.name || "You"}
                                    date={formatDate(capsule.created_at, capsule.revealed_at)}
                                    greeting="To my future self,"
                                    message={capsule.message}
                                    profileImage={capsule.user?.pfp_url ? `${server_url}${capsule.user.pfp_url}` : ""}
                                    mediaImages={capsule.media_url ? [`${server_url}${capsule.media_url}`] : []}
                                />
                                <div className="pending-overlay">
                                    <div className="pending-text">🔒 Locked until reveal</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {capsules.revealed.length > 0 && (
                <div className="capsules-section">
                    <h3 className="section-title">Revealed Capsules ({capsules.revealed.length})</h3>
                    <div className="capsules-list">
                        {capsules.revealed.map((capsule) => (
                            <Capsule
                                key={capsule.id}
                                user={capsule.user?.name || "You"}
                                date={formatDate(capsule.created_at, capsule.revealed_at)}
                                greeting="To my future self,"
                                message={capsule.message}
                                profileImage={capsule.user?.pfp_url ? `${server_url}${capsule.user.pfp_url}` : ""}
                                mediaImages={capsule.media_url ? [`${server_url}${capsule.media_url}`] : []}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* No Capsules Message */}
            {capsules.pending.length === 0 && capsules.revealed.length === 0 && (
                <div className="no-capsules">
                    <p>You haven't created any time capsules yet.</p>
                    <p>Create your first one above! 👆</p>
                </div>
            )}
        </div>
    );
};

export default MyCapsules;