import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLocation, setDestination } from '@/store/slices/locationSlice';

const MapComponent = () => {
    const currentLocation = useSelector((state) => state.locations.currentLocation);
    const destination = useSelector((state) => state.locations.destination);
    const radius = useSelector((state) => state.locations.radius);
    const dispatch = useDispatch();
    const mapRef = useRef(null);
    const [lastPosition, setLastPosition] = useState(null);
    const [updateInterval, setUpdateInterval] = useState(2000); // 2 seconds
    const stationaryThreshold = 180000; // 3 minutes in milliseconds

    useEffect(() => {
        const updateLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newPosition = [position.coords.latitude, position.coords.longitude];
                    dispatch(setCurrentLocation(newPosition));
                    console.log("Current Position of User:", "Latitude:", newPosition[0], "Longitude", newPosition[1]);

                    if (lastPosition) {
                        const [lastLat, lastLng] = lastPosition;
                        const [newLat, newLng] = newPosition;
                        const distance = getDistance(lastLat, lastLng, newLat, newLng);

                        if (distance > 10) { // Movement threshold in meters
                            setUpdateInterval(2000); // Reset to 2 seconds
                            console.log("User is moving. Interval time reset to 2 seconds.");
                        } else {
                            const timerId = setTimeout(() => {
                                if (Date.now() - lastUpdateTimestamp > stationaryThreshold) {
                                    setUpdateInterval(60000); // Increase interval to 1 minute
                                    console.log("User has been stationary. Interval time changed to 1 minute.");
                                }
                            }, stationaryThreshold);

                            return () => clearTimeout(timerId);
                        }
                    }

                    setLastPosition(newPosition);
                },
                (error) => {
                    console.error('Error getting location', error);
                }
            );
        };

        let lastUpdateTimestamp = Date.now();
        const intervalId = setInterval(() => {
            updateLocation();
            lastUpdateTimestamp = Date.now();
        }, updateInterval);

        updateLocation();

        return () => clearInterval(intervalId);
    }, [dispatch, lastPosition, updateInterval]);

    const getDistance = (lat1, lng1, lat2, lng2) => {
        const R = 6371e3; // Earth radius in meters
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lng2 - lng1) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // in meters
    };

    const MapClickHandler = () => {
        useMapEvents({
            click: (e) => {
                dispatch(setDestination([e.latlng.lat, e.latlng.lng]));
            },
        });
        return null;
    };

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <MapContainer
                center={currentLocation || [48.8566, 2.3522]} // Default to Paris if no position
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                whenCreated={(map) => {
                    mapRef.current = map;
                }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {currentLocation && <MapCenterUpdater position={currentLocation} />}
                {currentLocation && (
                    <Marker
                        position={currentLocation}
                        icon={L.icon({
                            iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                        })}
                    >
                        <Popup>Your current location</Popup>
                    </Marker>
                )}
                {destination && (
                    <>
                        <Marker
                            position={destination}
                            icon={L.icon({
                                iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                            })}
                        >
                            <Popup>Destination</Popup>
                        </Marker>
                        <Circle
                            center={destination}
                            radius={radius} // radius in meters
                            color="green"
                            fillColor="green"
                            fillOpacity={0.2}
                        />
                    </>
                )}
                <MapClickHandler />
            </MapContainer>
        </div>
    );
};

const MapCenterUpdater = ({ position }) => {
    const map = useMap();
    const [isCentered, setIsCentered] = useState(false);

    useEffect(() => {
        if (position && !isCentered) {
            map.setView(position, 13);
            setIsCentered(true);
        }
    }, [position, map, isCentered]);

    return null;
};

export default MapComponent;
