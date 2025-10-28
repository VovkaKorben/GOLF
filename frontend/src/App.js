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



  const init_arr = () => {
    const obj = {};
    for (let i = 1; i <= 18; i++) obj[i] = null;
    return obj;
  };


  const [values, setValues] = useState({ 'pits': [] });
  const [data, setData] = useState({});

  // const [hcp, setHCP] = useState(init_arr);
  // const [par, setPAR] = useState(init_arr);
  // const [tee, setTEE] = useState('');



  // const [valuesWarn, setvaluesWarn] = useState('');
  const [dbg, setDbg] = useState('');

  useEffect(() => {
    //console.log(hcp);    console.log(par);
    // setDbg(`PAR: ${JSON.stringify(par, undefined, 2)}, HCP: ${JSON.stringify(hcp, undefined, 2)}`);
  }, [hcp, par]);

  //  values onChange
  useEffect(() => {
    console.log('Values обновлены:', values);

    // no place selected - return
    if (!('place_id' in values))
      return;

    // get pits info for selected place
    fetch(`${API_BASE_URL}pits/${values.place_id}`)
      .then(response => response.json())
      .then(data => {
        // update HCP and PAR values
        setHCP(data.reduce((acc, item) => { acc[item.pit_no] = item.hcp; return acc; }, {}));
        setPAR(data.reduce((acc, item) => { acc[item.pit_no] = item.par; return acc; }, {}));


        fetch(`${API_BASE_URL}length/${values.place_id}/${values.tee}`)
          .then(response => response.json())
          .then(data => {
            // update HCP and PAR values




          })





      }).catch(error => { setDbg(`Error: ${error.message}`); });

  }, [values]);

  // change global values
  const values_changed = (tagname, value) => {
    setValues(prevValues => ({
      ...prevValues,
      [tagname]: value
    }));
  };


  const result_changed = (pit_index, value) => {
    setValues(prevValues => ({
      ...prevValues,
      pits: {
        ...prevValues.pits, // копируем все существующие pits
        [pit_index]: value  // изменяем только нужный элемент
      }
    }));
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
            t = par[pit_index]
          else if (r === 3)
            t =
              <NumInput
                className="square" allowFloat={false}
                changed_callback={result_changed} tagname={tbl_index * 10 + c - 1}
              />
          else if (r === 4)
            t = hcp[pit_index]
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
          changed_callback={values_changed} tagname="place_id"
        />
        <ModeSelect
          changed_callback={values_changed} tagname="mode_id"
        />
      </div>
      <div className='flex_left_center'>
        <ColorSelect
          changed_callback={values_changed} tagname="color_id"
          style={{ width: "150px" }}
        />

        <GenderSelect
          changed_callback={values_changed} tagname="gender_id"
          style={{ width: "150px" }}
        />
      </div>
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
      <pre className='dbg'> {dbg}</pre>
    </>
  )

}

