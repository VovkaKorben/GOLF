import React, { useEffect, useState } from "react";
import ResultTable from './ResultTable.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function GameItem({ game_data }) {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(true);


    const format_dt = (mysqlDate) => {
        const date = new Date(mysqlDate);
        return date.toLocaleDateString();
    }

    const edit_game = (e, id) => {
        e.stopPropagation();
        navigate(`/game/${game_data.pid}`);

    };
    const delete_game = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Really delete this game?')) {

            alert(`delete_game #${id}`)
        }

    };

    const header_click = () => {
        setExpanded(!expanded);
    };
    return <div key={game_data.pid} className='game_item'>
        <div

            className='game_item_header'

            onClick={() => header_click()}

        >
            <div className="gi_icon flex_center_center">
                <img
                    style={{ height: "60%" }}
                    src='/icons/course.svg'
                />
            </div>
            <div className="gi_place fbl">{game_data.place_name}</div>
            <div className="gi_dt ftl">{format_dt(game_data.dt)}</div>
            <div className="gi_judge fbl">{game_data.judge}</div>
            <div className="gi_comment ftl">{game_data.comment}</div>
            <div className="gi5 flex_center_center btn_icon" onClick={(e) => edit_game(e, game_data.pid)}>
                <img src='/icons/edit.svg' />
            </div>
            <div className="gi6 flex_center_center btn_icon" onClick={(e) => delete_game(e, game_data.pid)}>
                <img src='/icons/del.svg' />
            </div>
        </div>

        {expanded &&
            (<div className='gi_info flex_center_center'>
                <ResultTable key={game_data.pid} id={game_data.pid} />
            </div>
            )
        }


    </div>;
};

export default GameItem;