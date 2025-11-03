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

const InputTable = ({ tableIndex, gameData }) => {









    const col_first = ['REIKÄ', 'PITUUS', 'PAR', 'LYÖNNIT', 'HCP', 'NET.']
    const col_last = [['ULOS', ''], ['SISÄÄN', 'YHT.']]

    const rowsArray = [];

    if (tableIndex === 0)
        rowsArray.push(<tr className='hdr' key='-1'><td colSpan={12}>CR / SLOPE</td></tr>);

    for (let r = 0; r <= 5; r++) {
        const colsArray = [];
        for (let c = 0; c <= 11; c++) {
            let t = 'x';

            // first column messages
            if (c === 0)
                t = col_first[r]

            // trailing columns messages
            else if (c >= 10 && r === 0)
                t = col_last[tableIndex][c - 10]

            // pit index + values + edits
            else if (c >= 1 && c <= 9) {
                let pit_index = tableIndex * 9 + c
                if (r === 0)
                    t = pit_index
            }
            colsArray.push(<td key={c}>{t}</td>)
        }


        let trclass = 'other';


        rowsArray.push(<tr className={trclass} key={r}>{colsArray}</tr>)
    }
    return (
        <>{JSON.stringify(gameData)}<br />
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

    const [CrSlope, setCrSlope] = useState(null);



    const [dbg, setDbg] = useState('');

    const place_changed = (tagname, value) => { setPlaceID(value); };
    const mode_changed = (tagname, value) => { setModeID(value); };
    const tee_changed = (tagname, value) => { setTeeID(value); };
    const gender_changed = (tagname, value) => { setGenderID(value); };
    const ehcp_changed = (tagname, value) => { setEHCP(value); };
    const comment_changed = (tagname, value) => { setComment(value); };
    const judge_changed = (tagname, value) => { setJudge(value); };

    const game_datajudge_changed = (tagname, value) => { setJudge(value); };
    const [gameData, setGameData] = useState({
        cr: null, slope: null,
        game_level: null,
        stroke: {},
        par: {},
        hcp: {},
        distance: {},
        place_id: null, mode_id: null, tee_id: null, gender_id: null, ehcp: null,

    });


    const save_clicked = () => {

        const save_game = async () => {
            const gameData = {
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
                if (gameID) {
                    // update game
                    const resp = await fetch(`${API_BASE_URL}game`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(gameData)
                    });
                    const data = await resp.json();

                } else  //  create game
                {

                    const resp = await fetch(`${API_BASE_URL}game`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(gameData)
                    });
                    const data = await resp.json();
                    gameData.game_id = data.insertId;
                }

                // save all game strokes


                // if not existing game id -> move to new address
                if (!gameID)
                    navigate(`/game/${gameData.game_id}`)

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

    // useEffect(() => { console.log(`useEffect gameID: ${gameID}`); }, [gameID]);

    // place changed, read place data from DB
    useEffect(() => {
        const place_changed = async () => {
            console.log(`placeID changed: ${placeID}`);
            const resp = await fetch(`${API_BASE_URL}pits/${placeID}`);
            const data = await resp.json();
            setDbg(JSON.stringify(data));
        };
        place_changed();
    }, [placeID]);

    // CR/Slope
    useEffect(() => {
        const calc_CrSlope = async () => {
            /*console.log(`placeID changed: ${placeID}`);
            const resp = await fetch(`${API_BASE_URL}pits/${placeID}`);
            const data = await resp.json();
            setDbg(JSON.stringify(data));
            */
            setCrSlope({ cr: 1, slope: 2 })
            console.log(`setCrSlope SET`);
        };
        console.log(`**************`);
        console.log(`placeID: ${placeID}`);
        console.log(`teeID: ${teeID}`);
        console.log(`genderID: ${genderID}`);

        if ((placeID !== null) && (teeID !== null) && (genderID !== null))
            calc_CrSlope();
        else {
            setCrSlope(null)
            console.log(`setCrSlope null`);
        }

    }, [placeID, teeID, genderID]);


    // load game params from DB
    useEffect(() => {
        const fetch_game_id = async () => {
            try {


                const resp = await fetch(`${API_BASE_URL}game/${game_id}`);
                let data = await resp.json();

                // console.log(`load game params from DB: ${JSON.stringify(data)}`);
                if (resp.status === 404) {
                    setGameNotFound(true);
                    return;
                }
                data = data[0]
                // console.log(`fetch_game_id: ${JSON.stringify(data)}`)

                setGameID(data.game_id);

                setJudge(data.judge);
                setComment(data.comment);
                setEHCP(data.ehcp);

                setPlaceID(data.place_id);
                setModeID(data.mode_id);
                setTeeID(data.tee_id);
                setGenderID(data.gender_id);


                // setEHCP(data.place_id);



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

            <div> Dbg: {dbg}<br />Game ID: {gameID}</div>
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
                />
                {/* {CrSlope && <>{CrSlope.cr} / {CrSlope.slope}</>} */}
            </div>
            <div className="t2 flex_col_center_center">
                <InputTable
                    tableIndex={1}
                    gameData={gameData}
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