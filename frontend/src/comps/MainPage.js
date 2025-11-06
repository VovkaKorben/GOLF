import React, { useEffect, useState } from "react";
import GameItem from './GameItem.js';
import { API_BASE_URL } from '../consts.js';
import Btn from './Btn.js';
import { useNavigate } from 'react-router-dom';


import '../css/common.css';
import '../css/flex.css';
import '../css/vcl.css';
import '../css/mainpage.css';
const MainPage = ({ }) => {

    const [GameList, setGameList] = useState([]);
    // const [StartPage, setStartPage] = useState(0);

    const navigate = useNavigate();
    const add_new_game = () => {
        navigate('/game')
    }
    const onDelete = (game_id) => {

        const delete_game = async () => {
            try {

                // console.log(` delete_game: ${JSON.stringify(game_id)}`);
                setGameList(GameList => GameList.filter(item => item.game_id !== game_id));
                const resp = await fetch(`${API_BASE_URL}game`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ game_id: game_id })
                });
                const data = await resp.json();


            } catch (error) {
                console.error('Ошибка:', error);
            }
        };
        delete_game();






        // alert(`MainPage GameItem delete: ${id}`)
    }

    useEffect(() => {
        const get_games_list = async () => {
            try {

                const resp = await fetch(`${API_BASE_URL}games?start=0`);
                const data = await resp.json();
                // console.log(`get_games_list: ${JSON.stringify(data)}`);
                setGameList(data);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };
        get_games_list();

    }, []);

    return (

        // add new game button
        <div id="mainroot">

            <div className='flex_row_right_center' style={{ width: "100%" }}            >
                <Btn
                    caption='Add'
                    icon='add'
                    onClicked={add_new_game}
                />
            </div>
            {/* game list container */}
            <div id='gamelist'>
                {GameList.map((game_item) => (
                    < GameItem
                        key={game_item.game_id}
                        game_params={game_item}
                        onDelete={onDelete}
                    />
                ))}
            </div>


        </div>


    );
};

export default MainPage;