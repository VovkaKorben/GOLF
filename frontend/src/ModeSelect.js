import React, { useEffect, useState } from "react";



const ModeSelect = ({ onValueChanged }) => {
    const [mode, setMode] = useState(0);




    const selector_data = [
        {
            'id': '0',
            'caption': 'Lyöntipeli (Stroke play)'
        },
        {
            'id': '1',
            'caption': 'Reikäpeli (Match play)'
        },
        {
            'id': '2',
            'caption': 'Pistebogey (Bogey play)'
        },
        {
            'id': '3',
            'caption': 'Scratch (Stroke play)'
        }
    ];


    useEffect(() => {


        // fetchPlaces();
    }, []);

    const onChanged = (event) => {
        const value = event.target.value;
        setMode(value);
        if (onValueChanged)
            onValueChanged(value);
        /* const selectedId = event.target.value;
         const selectedPlaceObj = places.find(place => place.place_id === selectedId);

        setSelectedPlace(selectedId);

        
        if (onValueChanged && selectedPlaceObj) {
            onValueChanged(selectedId);
        }*/
    };


    return (
        <div className="select-container">
            <label htmlFor="color-dropdown">Select calculation mode: </label>
            <select
                class="custom-select"
                onChange={onChanged}
            >
                {selector_data.map((data) => (
                    <option key={data.id} value={data.id}>
                        {data.caption}
                    </option>
                ))}


            </select>

        </div>


    );
};

export default ModeSelect;