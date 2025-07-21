import React, { useEffect, useRef, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import MapCapsule from '../../components/map_page/MapCapsule';
import Pin from '../../assets/icons/svgs/Pin.svg';
import './style.css'


const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [selectedCapsule, setSelectedCapsule] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ lng: 0, lat: 0 });
    maptilersdk.config.apiKey = 'NfrHuTl1YQJesNALaw2B';

    const capsules = [
        {
            id: 1,
            coordinates: [-6.8498, 33.9715],
            user: "Sara Hassan",
            date: "Created: 7/1/25 • Revealed: 8/1/25",
            message: "To the women I'm becoming, I hope you're smiling and free. Remember the nights we spent dreaming...",
            profileImage: "",
            mediaImages: [
                "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=200&fit=crop"
            ]
        },
        {
            id: 2,
            coordinates: [-6.8420, 33.9685],
            user: "Ahmed El Amrani",
            date: "Created: 6/28/25 • Revealed: 12/28/25",
            message: "Remember the dreams we had in this place. The coffee shop where everything started...",
            profileImage: "",
            mediaImages: []
        },
        {
            id: 3,
            coordinates: [-6.8350, 33.9650],
            user: "Laila Bennis",
            date: "Created: 6/25/25 • Revealed: 6/25/26",
            message: "This city taught me patience and persistence. Every street holds a memory...",
            profileImage: "",
            mediaImages: [
                "https://images.unsplash.com/photo-1569163139394-de4798e6c3ea?w=300&h=200&fit=crop"
            ]
        },
        {
            id: 4,
            coordinates: [-6.8480, 33.9620],
            user: "Youssef Talbi",
            date: "Created: 6/20/25 • Revealed: 6/20/30",
            message: "May you find peace in the chaos of life. This spot was where I found myself...",
            profileImage: "",
            mediaImages: []
        }
    ];

    useEffect(() => {
        if (map.current) return;
        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.STREETS,
            center: [33.9838, 35.5018],
            zoom: 14
        });


        map.current.on('load', () => {
            capsules.forEach((capsule) => {
                const capsulePin = document.createElement('div');
                capsulePin.className = 'marker-wrapper';
                capsulePin.innerHTML = `<img src="${Pin}" alt="pin" class="svg-pin" />`;

                capsulePin.addEventListener('click', (e) => {
                    e.stopPropagation();

                    // Get screen coordinates
                    const point = map.current.project(capsule.coordinates);
                    setPopupPosition({ x: point.x, y: point.y });
                    setSelectedCapsule(capsule);
                });

                // Create the marker
                new maptilersdk.Marker({ element: capsulePin })
                    .setLngLat(capsule.coordinates)
                    .addTo(map.current);
            });
        });

        map.current.on('click', () => {
            setSelectedCapsule(null);
        });

    }, []);

    return (
        <>
            <div className="map-wrapper">
                <div ref={mapContainer} className="map-container" />

                {selectedCapsule && (
                    <div className="popup-overlay">
                        <div
                            className="popup-container"
                            style={{ left: popupPosition.x, top: popupPosition.y }}
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