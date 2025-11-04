import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import API_BASE_URL from '../consts.js';
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

const InputTable = ({ tableIndex, gameData, changed, initValue }) => {

    // useEffect(() => {        console.log(JSON.stringify(initValue));    }, [initValue]);

    const result_changed = (value, index) => { if (changed) changed(value, index); };

    const col_first = ['REIKÄ', 'PITUUS', 'PAR', 'LYÖNNIT', 'HCP', 'NET.']
    const col_last = [['ULOS', ''], ['SISÄÄN', 'YHT.']]
    const rowsArray = [];

    if (tableIndex === 0)
        rowsArray.push(<tr className='hdr' key='-1'><td colSpan={12}>CR / SLOPE</td></tr>);

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
                    t = gameData.distance[pit_index]
                // PAR
                else if (r === 2)
                    t = gameData.par[pit_index]
                // INPUTS
                else if (r === 3)
                    t = <NumInput
                        className="square" allowFloat={false}
                        edit_index={pit_index}
                        changed_callback={result_changed}
                        initValue={initValue[pit_index]}
                    />

                // HCP
                else if (r === 4)
                    t = gameData.hcp[pit_index]

            }
            else if (c === 10) {
                const s = tableIndex * 9 + 1, e = s + 8;
                // distance sum
                if (r === 1)
                    t = get_sum(gameData.distance, s, e, true)
                // par sum
                else if (r === 2)
                    t = get_sum(gameData.par, s, e, true)
            }
            else if (tableIndex === 1 && c === 11) {
                // distance ALL sum 
                if (r === 1)
                    t = get_sum(gameData.distance, 1, 18, true)
                // par ALL sum
                else if (r === 2)
                    t = get_sum(gameData.par, 1, 18, true)


            }
            colsArray.push(<td key={c}>{t}</td>)
        }


        let trclass = 'other';
        if (r === 0)
            trclass = 'reika'
        if (r === 1 && gameData.base.teeID !== null)
            trclass = `tee${gameData.base.teeID}`
        if (r === 2)
            trclass = 'par'

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
    const { game_id } = useParams();

    const [gameID, setGameID] = useState(null);
    const [GameNotFound, setGameNotFound] = useState(false);

    const [placeID, setPlaceID] = useState(null);
    const [modeID, setModeID] = useState(null);
    const [teeID, setTeeID] = useState(null);
    const [genderID, setGenderID] = useState(null);
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

    // const game_datajudge_changed = ( value) => { setJudge(value); };
    const [gameData, setGameData] = useState(init_data());


    const save_clicked = () => {

        const save_game = async () => {
            const params = {
                place_id: placeID,
                mode_id: modeID,
                tee_id: teeID,
                gender_id: genderID,
                judge_text: judge_text,
                comment_text: comment_text,
                ehcp: ehcp,
                game_id: gameID
            }

            try {
                // if we have game_id ? update data : create game
                if (gameID) {   // update game
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
                if (!gameID)
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
        setDbg(JSON.stringify(gameData, null, 2));
    }, [gameData]);

    // recalculate results
    useEffect(() => {
        // const r = await calc1({ placeID, teeID, genderID, modeID, ehcp, strokes });        console.log(JSON.stringify(r));
        const calculate = async () => {
            try {
                const r = await calc1({ placeID, teeID, genderID, modeID, ehcp, strokes });
                console.log('Calculation result:', r);
            } catch (error) {
                console.error('Calculation error:', error);
            }
        };
        calculate();
    }, [placeID, teeID, genderID, modeID, ehcp, strokes]);


    // load game params from DB
    useEffect(() => {
        const fetch_game_id = async () => {
            try {


                const resp = await fetch(`${API_BASE_URL}game/${game_id}`);
                let data = await resp.json();

                if (resp.status === 404) {
                    setGameNotFound(true);
                    return;
                }
                data = data[0]

                setGameID(data.game_id);

                setJudge(data.judge);
                setComment(data.comment);
                setEHCP(data.ehcp);

                setPlaceID(data.place_id);
                setModeID(data.mode_id);
                setTeeID(data.tee_id);
                setGenderID(data.gender_id);
                setGameData(init_data());

                // fetch strokes for game
                const resp2 = await fetch(`${API_BASE_URL}strokes/${game_id}`);
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

        if (!game_id || game_id === 'undefined' || game_id === 'null')
            setGameID(null);
        else
            // check game exists in db
            fetch_game_id();
    }, []);
    if (GameNotFound) return (<div>GameNotFound</div>);

    return (
        <div className="editor-cont">

            <pre className="dbg wr" > Dbg: {dbg}<br />Game ID: {gameID}</pre>
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
                    initValue={placeID}
                />
            </div>
            <div className="e2">
                <ModeSelect
                    changed_callback={mode_changed}
                    initValue={modeID}
                />
            </div>
            <div className="e3">
                <TeeSelect
                    changed_callback={tee_changed}
                    initValue={teeID}
                />
            </div>
            <div className="e4">
                <GenderSelect
                    changed_callback={gender_changed}
                    initValue={genderID}
                />
            </div>
            <div className="t1 flex_col_center_center">
                <InputTable
                    tableIndex={0}
                    gameData={gameData}
                    changed={stroke_changed}
                    initValue={strokes}
                />
            </div>
            <div className="t2 flex_col_center_center">
                <InputTable
                    tableIndex={1}
                    gameData={gameData}
                    changed={stroke_changed}
                    initValue={strokes}
                />
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