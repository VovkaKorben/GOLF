import React from "react";



const Btn = ({ onClicked, caption = "Default",icon }) => {



    const onClick = () => {
        if (onClicked)
            onClicked();

    };

    return (
        <button 
            className="flex_row_center_center"
            onClick={onClick}
            
        >
            {icon && <img className="mr_small" src={`/icons/${icon}.svg`} />}
            {/* {if (icon) <img src='/icons/course.svg' />} */}
            {caption}
        </button>

    );
};

export default Btn;