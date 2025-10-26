import React, { useEffect, useState } from "react";
import API_BASE_URL from './consts.js';

const PlaceSelect = ({ onValueChanged, className }) => {
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

    const onChanged = (event) => {
        const value = event.target.value;
        setSelectedPlace(value);
        if (onValueChanged) {
            onValueChanged(value);
        }
    };

    // if (loading) return <div>Loading places...</div>;
    // if (error) return <div>Error: {error}</div>;

    let content;
    if (loading) content = <option value="">Loading...</option>;
    else if (error) content = <option value="" > Failed to load places</option>;
    else content = (
        <>
            <option value="" disabled hidden>Select game place:</option>
            {places.map((place) => (
                <option key={place.place_id} value={place.place_id}>
                    {place.name}
                </option>
            ))}
        </>
    );

    return (
        <div
            className={`select-container ${className || ''}`}
        >
            <label htmlFor="places-dropdown">Select a place: </label>



            <select
                id="places"
                value={selectedPlace}
                onChange={onChanged}
                disabled={error || loading}
            >
                {content}
            </select >


        </div >
    );
};

export default PlaceSelect;