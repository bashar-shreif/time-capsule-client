import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import MapCapsule from "../../components/map_page/MapCapsule";
import Pin from "../../assets/icons/svgs/Pin.svg";
import "./style.css";

const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [selectedCapsule, setSelectedCapsule] = useState(null);
    const [popupPosition, setPopupPosition] = useState({
        lng: -6.8498,
        lat: 33.9715,
    });
    const [capsules, setCapsules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    maptilersdk.config.apiKey = "NfrHuTl1YQJesNALaw2B";

    const base_url = "http://localhost:8000/api";
    const url = "/v0.1/user/map";

    const fetchCapsules = () => {
        const token = localStorage.getItem("token");

        axios
            .get("" + base_url + url + "", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                console.log("Map capsules fetched successfully:", res.data);

                const transformedCapsules = res.data.payload.map((capsule) => ({
                    id: capsule.id,
                    coordinates: [
                        parseFloat(capsule.location.longitude),
                        parseFloat(capsule.location.latitude),
                    ],
                    user: getUserName(capsule.user_id),
                    date: formatDate(capsule.created_at, capsule.revealed_at),
                    message: capsule.message,
                    profileImage: "",
                    mediaImages: capsule.media_url ? [capsule.media_url] : [],
                }));

                setCapsules(transformedCapsules);
                setLoading(false);
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    console.log("API Error:", error.response.data);
                    setError(
                        error.response.data.message ||
                            "Failed to fetch capsules"
                    );
                } else {
                    console.error("Network Error:", error);
                    setError("Network error occurred");
                }
                setLoading(false);
            });
    };

    const formatDate = (createdAt, revealedAt) => {
        const formatDateTime = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "2-digit",
            });
        };

        const createdDate = formatDateTime(createdAt);
        const revealedDate = formatDateTime(revealedAt);

        return `Created: ${createdDate} • Revealed: ${revealedDate}`;
    };

    const getUserName = (userId) => {
        return `User ${userId}`;
    };

    useEffect(() => {
        fetchCapsules();
    }, []);

    useEffect(() => {
        if (map.current || loading || capsules.length === 0) return;

        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.STREETS,
            center: [35.5018, 33.9838], // Center on Lebanon (Beirut area)
            zoom: 14,
        });

        map.current.on("load", () => {
            capsules.forEach((capsule) => {
                const capsulePin = document.createElement("div");
                capsulePin.className = "marker-wrapper";
                capsulePin.innerHTML = `<img src="${Pin}" alt="pin" class="svg-pin" />`;

                capsulePin.addEventListener("click", (e) => {
                    e.stopPropagation();

                    const point = map.current.project(capsule.coordinates);
                    setPopupPosition({ x: point.x, y: point.y });
                    setSelectedCapsule(capsule);
                });

                new maptilersdk.Marker({ element: capsulePin })
                    .setLngLat(capsule.coordinates)
                    .addTo(map.current);
            });
        });

        map.current.on("click", () => {
            setSelectedCapsule(null);
        });
    }, [capsules, loading]);

    if (loading) {
        return (
            <div className="map-wrapper">
                <div className="loading">Loading map capsules...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="map-wrapper">
                <div className="error">Error: {error}</div>
                <button onClick={fetchCapsules} className="retry-btn">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <>
            <div className="map-wrapper">
                <div ref={mapContainer} className="map-container" />

                {selectedCapsule && (
                    <div className="popup-overlay">
                        <div
                            className="popup-container"
                            style={{
                                left: popupPosition.x,
                                top: popupPosition.y,
                            }}
                        >
                            <MapCapsule
                                user={selectedCapsule.user}
                                date={selectedCapsule.date}
                                message={selectedCapsule.message}
                                profileImage={selectedCapsule.profileImage}
                                mediaImages={selectedCapsule.mediaImages}
                                onClose={() => setSelectedCapsule(null)}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Map;
