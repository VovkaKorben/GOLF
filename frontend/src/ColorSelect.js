import React, { useEffect, useState } from "react";



const ColorSelect = ({ onValueChanged, style }) => {
    const [color, setColor] = useState(0);

    const selector_data = [
        {
            'id': 0,
            'caption': 'White',
            'color': 'white'
        }, {
            'id': 1,
            'caption': 'Yellow',
            'color': 'yellow'
        }, {
            'id': 2,
            'caption': 'Red',
            'color': 'red'
        }
    ];

    // const svg_template = '<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9" fill="{fill_color}" stroke="black" stroke-width="1"/></svg>';
    function get_svg(fill_color) {
        return (
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <circle
                    cx="10" cy="10"
                    r="9"
                    fill={fill_color}
                    stroke="black"
                    stroke-width="1"
                    shapeRendering="geometricPrecision"
                />
            </svg>);
    }

    useEffect(() => {


        // fetchPlaces();
    }, []);

    const onChanged = (event) => {
        const value = event.target.value;
        setColor(value);
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
            <label htmlFor="color-dropdown">Select a color: </label>
            <select
                class="custom-select"
                onChange={onChanged}
                style={style}
            >
                {selector_data.map((data) => (
                    <option key={data.id} value={data.id}>
                        {get_svg(data.color)}
                        {/* <img src="usa.jpg" alt="111" /> */}
                        <span> {data.caption}</span>
                    </option>
                ))}


            </select>

        </div>


    );
};

export default ColorSelect;