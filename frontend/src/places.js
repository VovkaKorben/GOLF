import React, { useEffect, useState } from "react";
// import cors from "cors";
import API_BASE_URL from './consts.js';

const PlacesDropdown = () => {
    const [places, setPlaces] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch places from API
    useEffect(() => {
        const fetchPlaces = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}places`);
                if (!response.ok) {
                    throw new Error('Failed to fetch places');
                }
                const data = await response.json();
                setPlaces(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaces();
    }, []);

    const handleSelectChange = (event) => {
        setSelectedPlace(event.target.value);        
    };

    if (loading) return <div>Loading places...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="dropdown-container">
            <label htmlFor="places-dropdown">Select a place: </label>
            <select
                id="places"
                value={selectedPlace}
                onChange={handleSelectChange}
                className="vcl"
            >
                {/* <option value="">-- Select a place --</option> */}
                {places.map((place) => (
                    <option key={place.place_id} value={place.place_id}>
                        {place.name}
                    </option>
                ))}
            </select>

            
        </div>
    );
};

export default PlacesDropdown;