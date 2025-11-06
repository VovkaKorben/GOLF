import React, { useEffect, useState } from "react";
import { API_BASE_URL, mode_selector_data } from '../consts.js';
import { get_sum, null18, init_data, calc1 } from '../calculation.js';

function ResultTable({ game_params }) {
    const [game_data, setGameData] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    useEffect(() => {
        // console.log(`ResultTable gamedata: ${JSON.stringify(game_data)}`);
    }, [game_data]);
    useEffect(() => {

        const fetch_game_info = async () => {
            try {

                // fetch strokes for game
                const resp = await fetch(`${API_BASE_URL}strokes/${game_params.game_id}`);
                const data = await resp.json();
                game_params.strokes = null18();

                // fill only existsing values
                for (const s of data)
                    game_params.strokes[s.pit_no] = s.stroke;
                const r = await calc1(game_params);
                setGameData(r);

            } catch (error) {
                console.error('Ошибка:', error);
            }
        };



        fetch_game_info();


    }, [game_params]);

    // if (loading) return (<img style={{ width: "80px" }} src='/icons/loading.svg' />);
    // if (error) return <>Ошибка: {error}</>;
    // if (!data) return <>No data</>;
    const renderTable = () => {
        const rowsArray = [];
        const cols = ['Reikä', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Ulos', '10', '11', '12', '13', '14', '15', '16', '17', '18', 'Sis.', 'Yht.'];
        const rows = ['Reikä', 'Par', 'K1', 'Netto'];
        const virtual_index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 19, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21];


        rowsArray.push(<tr className="gi_row0" key={0}><td colSpan={22}>
            {game_params.mode_id!==null && mode_selector_data[game_params.mode_id].caption}
            {/* {`game_params: ${JSON.stringify(game_params)}`} */}
        </td></tr>)

        for (let r = 0; r <= 3; r++) {
            const colsArray = [];
            for (let c = 0; c <= 21; c++) {
                let t = ''// virtual_index[c];

                // start row text  
                if (c === 0)
                    t = rows[r];

                // column headers
                else if (r === 0)
                    t = cols[c];

                // numbers (NOT sum)
                else if (virtual_index[c] <= 18) {
                    // PAR
                    if (r === 1)
                        t = game_data.output.par[virtual_index[c]]

                    // stroke
                    else if (r === 2)
                        t = game_data.input.strokes[virtual_index[c]]

                    // netto
                    else if (r === 3)
                        t = game_data.output.result[virtual_index[c]]
                } else if (virtual_index[c] === 19)
                // sums for 1..9
                {
                    //par / stroke / netto 
                    if (r === 1)
                        t = get_sum(game_data.output.par, 1, 9, true);
                    else if (r === 2)
                        t = get_sum(game_data.input.strokes, 1, 9, true);
                    else if (r === 3)
                        t = get_sum(game_data.output.result, 1, 9, true);
                }
                else if (virtual_index[c] === 20)
                // sums for 10..18
                {
                    //par / stroke / netto 
                    if (r === 1)
                        t = get_sum(game_data.output.par, 10, 18, true);
                    else if (r === 2)
                        t = get_sum(game_data.input.strokes, 10, 18, true);
                    else if (r === 3)
                        t = get_sum(game_data.output.result, 10, 18, true);
                }
                if (virtual_index[c] === 21)
                // sums for ALL
                {
                    //par / stroke / netto 
                    if (r === 1)
                        t = get_sum(game_data.output.par, 1, 18, true);
                    else if (r === 2)
                        t = get_sum(game_data.input.strokes, 1, 18, true);
                    else if (r === 3)
                        t = get_sum(game_data.output.result, 1, 18, true);
                }

                colsArray.push(<td key={c}>{t}</td>)
            }

            rowsArray.push(<tr className={`gi_row${r + 1}`} key={r + 1}>{colsArray}</tr>)
        }
        return <table className='game_result'><tbody>{rowsArray}</tbody></table>;
    }

    return (

        <>
            {game_data && renderTable()}
        </>

    );
};

export default ResultTable;