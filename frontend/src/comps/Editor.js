import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../consts.js';
import { useNavigate } from 'react-router-dom';

import '../css/common.css';
import '../css/flex.css';
import '../css/vcl.css';
import '../css/editor.css';

import PlaceSelect from "./PlaceSelect.js";
import NumInput from './NumInput.js';
import TeeSelect from './TeeSelect.js';
import ModeSelect from './ModeSelect.js';
import TextInput from './TextInput.js';
import GenderSelect from './GenderSelect.js';
import Btn from './Btn.js';

import { get_sum, null18, init_data, calc1 } from '../calculation.js';

const InputTable = ({ tableIndex, game_values, changed }) => {

    // useEffect(() => {        console.log(JSON.stringify(initValue));    }, [initValue]);

    // console.log(JSON.stringify(gameData, null, 2));
    // console.log(`game_values: ${JSON.stringify(game_values, null, 2)}`);

    const result_changed = (value, index) => { if (changed) changed(value, index); };

    const col_first = ['REIKÄ', 'PITUUS', 'PAR', 'LYÖNNIT', 'HCP', 'NET.']
    const col_last = [['ULOS', ''], ['SISÄÄN', 'YHT.']]
    const rowsArray = [];

    if (tableIndex === 0)
        rowsArray.push(
            <tr className='hdr' key='-1'><td colSpan={12}>
                CR{game_values.output.cr && `: ${game_values.output.cr}`} /
                Slope{game_values.output.slope && `: ${game_values.output.slope}`} /
                Handicap{game_values.output.player_handicap && `: ${game_values.output.player_handicap}`}
            </td></tr>);

    for (let r = 0; r <= 5; r++) {
        const colsArray = [];
        for (let c = 0; c <= 11; c++) {
            let t = '';

            // first column messages
            if (c === 0)
                t = col_first[r]

            // trailing columns messages
            else if (c >= 10 && r === 0)
                t = col_last[tableIndex][c - 10]

            // pit index + values + edits
            else if (c >= 1 && c <= 9) {
                let pit_index = tableIndex * 9 + c
                // pit number
                if (r === 0)
                    t = pit_index

                // tee distance
                if (r === 1)
                    t = game_values.output.distance[pit_index]
                // PAR
                else if (r === 2)
                    t = game_values.output.par[pit_index]
                // INPUTS
                else if (r === 3)
                    t = <NumInput
                        className="square" allowFloat={false}
                        edit_index={pit_index}
                        changed_callback={result_changed}
                        initValue={game_values.input.strokes[pit_index]}
                    />

                // HCP
                else if (r === 4)
                    t = game_values.output.hcp[pit_index]
                // RESULTS
                else if (r === 5)
                    t = game_values.output.result[pit_index]

            }
            else if (c === 10) {
                const s = tableIndex * 9 + 1, e = s + 8;
                // distance sum
                if (r === 1)
                    t = get_sum(game_values.output.distance, s, e, true)
                // par sum
                else if (r === 2)
                    t = get_sum(game_values.output.par, s, e, true)
                // stroke sum
                else if (r === 3)
                    t = get_sum(game_values.input.strokes, s, e, true)
                // result sum
                else if (r === 5)
                    t = get_sum(game_values.output.result, s, e, true)
            }
            else if (tableIndex === 1 && c === 11) {
                // distance ALL sum 
                if (r === 1)
                    t = get_sum(game_values.output.distance, 1, 18, true)
                // par ALL sum
                else if (r === 2)
                    t = get_sum(game_values.output.par, 1, 18, true)
                // stroke ALL sum
                else if (r === 3)
                    t = get_sum(game_values.input.strokes, 1, 18, true)
                // result ALL sum
                else if (r === 5)
                    t = get_sum(game_values.output.result, 1, 18, true)


            }
            colsArray.push(<td key={c}>{t}</td>)
        }


        let trclass = 'other';
        if (r === 0)
            trclass = 'reika'
        else if (r === 1 && game_values.input.tee_id !== null)
            trclass = `tee${game_values.input.tee_id}`
        else if (r === 2)
            trclass = 'par'
        else if (r === 5)
            trclass = 'net'

        rowsArray.push(<tr className={trclass} key={r}>{colsArray}</tr>)
    }
    return (
        <>
            {/* <span className="small_text wr">                {JSON.stringify(gameData)}            </span>            <br /> */}
            <table key={tableIndex} className='result_input'><tbody>{rowsArray}</tbody></table>
        </>
    );
};

const Editor = () => {
    const { url_game_id } = useParams();

    const [game_id, setGameID] = useState(null);
    const [GameNotFound, setGameNotFound] = useState(false);

    const [place_id, setPlaceID] = useState(null);
    const [mode_id, setModeID] = useState(null);
    const [tee_id, setTeeID] = useState(null);
    const [gender_id, setGenderID] = useState(null);
    const [ehcp, setEHCP] = useState(null);
    const [judge_text, setJudge] = useState('');
    const [comment_text, setComment] = useState('');
    const [strokes, setStrokes] = useState(null18());

    const [dbg, setDbg] = useState('');

    const place_changed = (value) => { setPlaceID(value); };
    const mode_changed = (value) => { setModeID(value); };
    const tee_changed = (value) => { setTeeID(value); };
    const gender_changed = (value) => { setGenderID(value); };
    const ehcp_changed = (value) => { setEHCP(value); };
    const comment_changed = (value) => { setComment(value); };
    const judge_changed = (value) => { setJudge(value); };

    const [gameData, setGameData] = useState(init_data());


    const save_clicked = () => {

        const save_game = async () => {
            const params = {
                place_id: place_id,
                mode_id: mode_id,
                tee_id: tee_id,
                gender_id: gender_id,
                judge_text: judge_text,
                comment_text: comment_text,
                ehcp: ehcp,
                game_id: game_id
            }

            try {
                // if we have game_id ? update data : create game
                if (game_id) {   // update game
                    const resp = await fetch(`${API_BASE_URL}game`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json', },
                        body: JSON.stringify(params)
                    });
                } else { //  create game
                    const resp = await fetch(`${API_BASE_URL}game`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', },
                        body: JSON.stringify(params)
                    });
                    const data = await resp.json();
                    // update game_id to real value
                    params.game_id = data.insertId;
                }

                // save all game strokes
                const resp2 = await fetch(`${API_BASE_URL}strokes/${params.game_id}`, {

                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', },
                    body: JSON.stringify(strokes)
                });


                // if not existing game id -> move to new address
                if (!game_id)
                    navigate(`/game/${params.game_id}`)

            } catch (error) {
                console.error('Ошибка:', error);
            }

        };
        save_game();
    };

    // return to main page
    const navigate = useNavigate();
    const return_clicked = () => {
        navigate('/')
    };
    const stroke_changed = (value, index) => {
        setStrokes(prev => ({ ...prev, [index]: value }));
    };
    useEffect(() => {
        // setDbg(JSON.stringify(gameData, null, 2));
    }, [gameData]);

    // recalculate results
    useEffect(() => {
        const calculate = async () => {
            try {
                const r = await calc1({ place_id, tee_id, gender_id, mode_id, ehcp, strokes });
                // console.log('Calculation result:', r);
                setGameData(r);

            } catch (error) {
                console.error('Calculation error:', error);
            }
        };
        calculate();
    }, [place_id, tee_id, gender_id, mode_id, ehcp, strokes]);


    // load game params from DB
    useEffect(() => {
        const fetch_game_id = async () => {
            try {
                // console.log(`1 editor load : ${JSON.stringify(data)}`);

                const resp = await fetch(`${API_BASE_URL}game/${url_game_id}`);
                let data = await resp.json();

                if (resp.status === 404) {
                    setGameNotFound(true);
                    return;
                }
                data = data[0]
                // console.log(`2 editor load : ${JSON.stringify(data)}`);
                setGameID(data.game_id);

                setJudge(data.judge);
                setComment(data.comment);
                setEHCP(data.ehcp);

                setPlaceID(data.place_id);
                setModeID(data.mode_id);
                setTeeID(data.tee_id);
                setGenderID(data.gender_id);
                // setGameData(init_data());

                // fetch strokes for game
                const resp2 = await fetch(`${API_BASE_URL}strokes/${data.game_id}`);
                const data2 = await resp2.json();
                setStrokes(null18());

                // fill only existsing values
                for (const s of data2)
                    setStrokes(prev => ({
                        ...prev,
                        [s.pit_no]: s.stroke
                    }));
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };
        // console.log(`url_game_id : ${JSON.stringify(url_game_id)}`);
        if (!url_game_id || url_game_id === 'undefined' || url_game_id === 'null')
            setGameID(null);
        else
            // check game exists in db
            fetch_game_id();
    }, []);

    if (GameNotFound) return (<div>GameNotFound</div>);

    return (
        <div className="editor-cont">

            {/* <pre className="dbg wr" > Dbg: {dbg}<br />Game ID: {game_id}</pre> */}
            <div
                className="h1 flex_row_left_center"
                style={{ borderBottom: "1px solid #999", paddingBottom: "15px" }}
            >

                <span className='large_text'>Exact HCP:</span>
                <NumInput
                    style={{ width: "50px", marginLeft: "10px", marginRight: "10px", textAlign: "center" }}
                    allowFloat={true}
                    changed_callback={ehcp_changed}
                    initValue={ehcp}
                />
                <div className='large_text green_text'>Enter results and save card</div>

            </div>


            <div className="e1">
                <PlaceSelect
                    changed_callback={place_changed}
                    initValue={place_id}
                />
            </div>
            <div className="e2">
                <ModeSelect
                    changed_callback={mode_changed}
                    initValue={mode_id}
                />
            </div>
            <div className="e3">
                <TeeSelect
                    changed_callback={tee_changed}
                    initValue={tee_id}
                />
            </div>
            <div className="e4">
                <GenderSelect
                    changed_callback={gender_changed}
                    initValue={gender_id}
                />
            </div>
            <div className="t1 flex_col_center_center">
                <InputTable
                    tableIndex={0}
                    game_values={gameData}
                    changed={stroke_changed}
                />
            </div>
            <div className="t2 flex_col_center_center">
                <InputTable
                    tableIndex={1}
                    game_values={gameData}
                    changed={stroke_changed}
                />
            </div>
            <div className="tt large_text flex_row_center_center">
                {gameData.input.mode_id === 0 && (
                    <>
                        Tasoitustulos
                        {gameData.output.result_lvl && ` : ${gameData.output.result_lvl}`}
                    </>
                )}
            </div>

            <div className="ae1">
                <TextInput
                    caption="Comments"
                    changed_callback={comment_changed}
                    placeholder="Additional comments for the game"
                    initValue={comment_text}
                />

            </div>

            <div className="ae2">
                <TextInput
                    caption="Judge"
                    changed_callback={judge_changed}
                    placeholder="Place judge name here"
                    initValue={judge_text}
                />
            </div>

            <div className="b1 flex_row_center_center">
                <Btn
                    caption='Save'
                    icon="save"
                    onClicked={save_clicked}
                />
            </div>
            <div className="b2 flex_row_center_center">
                <Btn
                    caption='Return'
                    icon="return"
                    onClicked={return_clicked}
                /></div>
        </div>



    );
};

export default Editor;