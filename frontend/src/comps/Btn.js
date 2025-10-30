import React from "react";



const Btn = ({ onClicked, caption = "Default",icon }) => {



    const onClick = () => {
        if (onClicked)
            onClicked();

    };

    return (
        <button value="Save"
            onClick={onClick}
            className="flex_center_center"
        >
            {icon && <img className="mr_small" src={icon} />}
            {/* {if (icon) <img src='/icons/course.svg' />} */}
            {caption}
        </button>

    );
};

export default Btn;