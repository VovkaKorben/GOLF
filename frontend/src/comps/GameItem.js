import React, { useEffect, useState } from "react";
import ResultTable from './ResultTable.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function GameItem({ game_data, onDelete }) {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);


    const format_dt = (mysqlDate) => {
        const date = new Date(mysqlDate);
        return date.toLocaleDateString();
    }

    const edit_game = (e) => {
        e.stopPropagation();
        navigate(`/game/${game_data.game_id}`);

    };
    const delete_game = (e) => {
        e.stopPropagation();
        if (onDelete)
            onDelete(game_data.game_id);

    };
    useEffect(() => {
        // console.log(`GameItem data: ${JSON.stringify(game_data)}`);

    }, [game_data]);


    const header_click = () => {
        setExpanded(!expanded);
    };
    return <div className='game_item'>
        <div className='game_item_header' onClick={() => header_click()}        >

            <div className="gi_logo flex_col_left_center">
                <img style={{ height: "60%" }} src='/icons/course.svg' />
                <div className="small_text nw">GameID: {game_data.game_id}</div>
            </div>

            <div className="gi_place flex_row_left_bottom nw">{game_data.place_name}</div>
            <div className="gi_date">{format_dt(game_data.dt)}</div>

            <div className="gi_judge flex_row_left_bottom nw">{game_data.judge}</div>
            <div className="gi_comment ">{game_data.comment}</div>

            <div className="gi_edit btn_icon flex_row_center_center" onClick={(e) => edit_game(e)}>
                <img src='/icons/edit.svg' />
            </div>
            <div className="gi_delete btn_icon flex_row_center_center" onClick={(e) => delete_game(e)}>
                <img src='/icons/del.svg' />
            </div>
        </div>

        {expanded &&
            (<div className='gi_info'>
                <ResultTable key={game_data.pid} id={game_data.pid} />
            </div>
            )
        }


    </div>;
};

export default GameItem;