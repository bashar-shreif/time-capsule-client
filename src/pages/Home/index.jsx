import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./style.css";
import Capsule from "../../components/shared/Capsule";

const Home = () => {
    const [capsules, setCapsules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Filter states
    const [filterOptions, setFilterOptions] = useState({
        moods: [],
        locations: { countries: [], cities: {} }
    });
    const [selectedMood, setSelectedMood] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    
    const base_url = 'http://localhost:8000/api';
    const filterUrl = '/v0.1/user/filter_options';

    useEffect(() => {
        fetchFilterOptions();
        fetchCapsules();
    }, []);

    // Fetch capsules when filters change
    useEffect(() => {
        fetchCapsules();
    }, [selectedMood, selectedCountry]);

    const fetchFilterOptions = () => {
        const token = localStorage.getItem("token");
        
        axios.get(base_url + filterUrl, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log("Filter options fetched:", res.data.payload);
            
            // Add some common moods since your backend supports them but filter_options might be empty
            const moods = res.data.payload.moods.length > 0 ? res.data.payload.moods : [
                { id: 1, mood: 'happy' },
                { id: 2, mood: 'sad' },
                { id: 3, mood: 'excited' },
                { id: 4, mood: 'nostalgic' },
                { id: 5, mood: 'hopeful' }
            ];
            
            setFilterOptions({
                ...res.data.payload,
                moods: moods
            });
        }).catch(error => {
            console.error('Failed to fetch filter options:', error);
        });
    };

    const fetchCapsules = () => {
        const token = localStorage.getItem("token");
        setLoading(true);

        // Determine which endpoint to use based on selected filters
        let endpoint;
        
        if (selectedMood && selectedCountry) {
            // Both filters selected - use mood endpoint and filter by country on frontend
            endpoint = `/v0.1/user/mood/${selectedMood}`;
        } else if (selectedMood) {
            // Only mood filter
            endpoint = `/v0.1/user/mood/${selectedMood}`;
        } else if (selectedCountry) {
            // Only country filter
            endpoint = `/v0.1/user/country/${selectedCountry}`;
        } else {
            // No filters - get all public capsules
            endpoint = '/v0.1/user/public_wall';
        }
        
        axios.get(base_url + endpoint, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log("Capsules fetched successfully:", res.data);
            let fetchedCapsules = res.data.payload;
            
            // If both mood and country are selected, we got mood-filtered results,
            // now filter by country on frontend
            if (selectedMood && selectedCountry) {
                fetchedCapsules = fetchedCapsules.filter(capsule => {
                    // Filter by location relationship or location_id
                    return capsule.location && capsule.location.country_name === selectedCountry;
                });
            }
            
            setCapsules(fetchedCapsules);
            setLoading(false);
        }).catch(error => {
            handleFetchError(error);
        });
    };

    const handleFetchError = (error) => {
        if (error.response && error.response.data) {
            console.log('API Error:', error.response.data);
            setError(error.response.data.message || 'Failed to fetch capsules');
        } else {
            console.error('Network Error:', error);
            setError('Network error occurred');
        }
        setLoading(false);
    };

    const clearFilters = () => {
        setSelectedMood('');
        setSelectedCountry('');
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
        const revealedDate = formatDateTime(revealedAt);
        
        return `Created: ${createdDate} • Revealed: ${revealedDate}`;
    };

    const getUserName = (userId) => {
        return `User ${userId}`;
    };

    const getResultsText = () => {
        let text = `Showing ${capsules.length} capsules`;
        
        if (selectedCountry && selectedMood) {
            text += ` from ${selectedCountry} with "${selectedMood}" mood`;
        } else if (selectedCountry) {
            text += ` from ${selectedCountry}`;
        } else if (selectedMood) {
            text += ` with "${selectedMood}" mood`;
        } else {
            text += ` from all countries`;
        }
        
        return text;
    };

    return (
        <div className="home-page">
            {/* Filters Section */}
            <div className="filters-container">
                <div className="filters-header">
                    <h3>Filter Capsules</h3>
                    <button 
                        onClick={clearFilters} 
                        className="clear-filters-btn"
                        disabled={!selectedMood && !selectedCountry}
                    >
                        Clear Filters
                    </button>
                </div>
                
                <div className="filters-row">
                    {/* Mood Filter */}
                    <div className="filter-group">
                        <label htmlFor="mood-filter">Mood</label>
                        <select 
                            id="mood-filter"
                            value={selectedMood} 
                            onChange={(e) => setSelectedMood(e.target.value)}
                            className="filter-select"
                            disabled={loading}
                        >
                            <option value="">All Moods</option>
                            {filterOptions.moods.map((mood) => (
                                <option key={mood.id} value={mood.mood}>
                                    {mood.mood.charAt(0).toUpperCase() + mood.mood.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Country Filter */}
                    <div className="filter-group">
                        <label htmlFor="country-filter">Country</label>
                        <select 
                            id="country-filter"
                            value={selectedCountry} 
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            className="filter-select"
                            disabled={loading}
                        >
                            <option value="">All Countries</option>
                            {filterOptions.locations.countries.map((country, index) => (
                                <option key={index} value={country.country_name}>
                                    {country.country_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Results Count */}
                {!loading && (
                    <div className="results-count">
                        {getResultsText()}
                    </div>
                )}
            </div>

            {/* Capsules Wall */}
            <div className="capsules-wall">
                {loading ? (
                    <div className="loading">Loading capsules...</div>
                ) : error ? (
                    <div className="error-container">
                        <div className="error">Error: {error}</div>
                        <button onClick={fetchCapsules} className="retry-btn">
                            Retry
                        </button>
                    </div>
                ) : capsules.length > 0 ? (
                    capsules.map((capsule) => (
                        <Capsule
                            key={capsule.id}
                            user={getUserName(capsule.user_id)}
                            date={formatDate(capsule.created_at, capsule.revealed_at)}
                            greeting="To my future self,"
                            message={capsule.message}
                            profileImage=""
                            mediaImages={capsule.media_url ? [capsule.media_url] : []}
                        />
                    ))
                ) : (
                    <div className="no-capsules">
                        {selectedCountry || selectedMood ? (
                            <p>No capsules match your current filters.</p>
                        ) : (
                            <p>No revealed capsules found.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;