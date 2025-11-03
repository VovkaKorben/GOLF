

import React, { useEffect, useState } from "react";
import GameItem from './GameItem.js';
import API_BASE_URL from '../consts.js';
import Btn from './Btn.js';
import { useNavigate } from 'react-router-dom';


import '../css/common.css';
import '../css/flex.css';
import '../css/vcl.css';
import '../css/mainpage.css';
const MainPage = ({ }) => {

    const [GameList, setGameList] = useState([]);
    const [StartPage, setStartPage] = useState(0);

    const navigate = useNavigate();
    const add_new_game = () => {
        navigate('/game')
    }

    useEffect(() => {
        console.log(JSON.stringify(GameList));
    }, [GameList]);

    useEffect(() => {

        const get_games_list = async () => {
            try {

                const resp = await fetch(`${API_BASE_URL}games?start=${StartPage}`);
                const data = await resp.json();
                setGameList(data);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };
        get_games_list();



    }, [StartPage]);
    return (


        <div id="mainroot">

            <div className='flex_row_right_center'
                style={{ width: "100%" }}
            >
                <Btn
                    caption='Add'
                    icon='add'
                    onClicked={add_new_game}
                />
            </div>
            <div id='gamelist'>
                {GameList.map((game) => (
                    <GameItem game_data={game} />
                ))}
            </div>


        </div>


    );
};

export default MainPage;