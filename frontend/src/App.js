import './App.css';
import React, { useEffect, useState } from "react";
import API_BASE_URL from './consts.js';
import PlaceSelect from "./comps/PlaceSelect.js";
import NumInput from './comps/NumInput.js';
import ColorSelect from './comps/TeeSelect.js';
import ModeSelect from './comps/ModeSelect.js';
import TextInput from './comps/TextInput.js';
import GenderSelect from './comps/GenderSelect.js';
import BtnSave from './comps/BtnSave.js';

export default function App() {




  const [xvalues, setXValues] = useState({});
  const [xdata, setXData] = useState({});

  useEffect(() => {
    setDbg(`xvalues: ${JSON.stringify(xvalues, undefined, 2)}`);
  }, [xvalues]);
  useEffect(() => {
    setDbg2(`xdata: ${JSON.stringify(xdata, undefined, 2)}`);
  }, [xdata]);

  // const [valuesWarn, setvaluesWarn] = useState('');
  const [dbg, setDbg] = useState('');
  const [dbg2, setDbg2] = useState('');
  const values_changed = (tagname, value) => {
    // dummy
  };

  const input_changed = (tagname, value) => {
    // console.log(`place_id: ${place_id}`);
    setXValues(prevValues => ({
      ...prevValues,
      [tagname]: value
    }));

if tagname
    // get pits info for selected place

    /*    fetch(`${API_BASE_URL}pits/${place_id}`)
          .then(response => response.json())
          .then(data => {
            setXData(data);
          }).catch(error => { setDbg(`Error: ${error.message}`); });
    */
  };


  const renderTable = (tbl_index) => {
    const col_first = ['REIKÄ', 'PITUUS', 'PAR', 'LYÖNNIT', 'HCP', 'NET.']
    const col_last = [['ULOS', ''], ['SISÄÄN', 'YHT.']]

    const rowsArray = [];

    if (!tbl_index)
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
          t = col_last[tbl_index][c - 10]
        // pit index + values + edits
        else if (c >= 1 && c <= 9) {
          let pit_index = tbl_index * 9 + c
          if (r === 0)
            t = pit_index
          else if (r === 2)
            t = 'par' //par[pit_index]
          else if (r === 3)
            t =
              <NumInput
                className="square" allowFloat={false}
                // changed_callback={result_changed}
                tagname={tbl_index * 10 + c - 1}
              />
          else if (r === 4)
            t = 'hcp'//hcp[pit_index]
        }

        colsArray.push(<td key={c}>{t}</td>)
      }
      rowsArray.push(<tr className={r === 0 ? 'reika' : r === 2 ? 'par' : 'other'} key={r}>{colsArray}</tr>)
    }
    return <table className='r'><tbody>{rowsArray}</tbody></table>;
  };

  return (
    <>

      <div className='flex_left_center'>
        <span className='large_text'>Exact HCP:</span>
        <NumInput
          className="margin_sides" style={{ width: "50px" }} allowFloat={true}
          changed_callback={values_changed} tagname="ehcp"
          recalc="1"
        />

        <div className='large_text green_text'>Enter results and save card</div>
      </div>
      <hr />

      <div className='flex_left_center'>
        <PlaceSelect
          className="mr"
          changed_callback={input_changed} tagname="place"
        />
        <ModeSelect
          changed_callback={input_changed} tagname="mode"
        />
      </div>
      <div className='flex_left_center'>
        <ColorSelect
          changed_callback={input_changed} tagname="tee"
          style={{ width: "150px" }}
        />

        <GenderSelect
          changed_callback={input_changed} tagname="gender"
          style={{ width: "150px" }}
        />
      </div>   <div className='flex_left_center'>
        <div className='dbg'> {dbg}</div>
        <div className='dbg'> {dbg2}</div></div>
      {renderTable(0)}
      {renderTable(1)}
      <div className='flex_left_center'>
        <div className='flex_col_left'>

          <TextInput
            caption="Comments"
            changed_callback={values_changed} tagname="comment"
          />
          <TextInput
            caption="judge placeholder"
            changed_callback={values_changed} tagname="judge"
          />
        </div >
        <BtnSave />
      </div >

    </>
  )

}

