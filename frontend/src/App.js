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
/*
Object.prototype.jp = function () {
  return JSON.stringify(this, undefined, 2);
};

Object.prototype.j = function () {
  return JSON.stringify(this);
};*/


const get_sum = (obj, from, to) => {
  let s = 0
  for (let i = from; i <= to; i++) {
    if (!(i in obj) || obj[i] === null)
      return '';
    s += obj[i]
  }
  return s
}

const null18 = () => { let r = {}; for (let i = 1; i <= 18; i++)    r[i] = null; return r; }

export default function App() {
  const [XData, setXData] = useState({
    'hcp': null18(),
    'par': null18(),
    'distance': null18()
  });
  const [PlaceID, setPlaceID] = useState(null);
  const [GenderID, setGenderID] = useState(null);
  const [TeeID, setTeeID] = useState(null);

  const [Mode, setMode] = useState(undefined);
  const [EHCP, setEHCP] = useState(undefined);


  useEffect(() => {
    const doFetch = async () => {
      try {
        console.log('PlaceID');
        const hcp = null18();
        const par = null18();

        if (PlaceID) {
          const resp = await fetch(`${API_BASE_URL}pits/${PlaceID}`);
          const data = await resp.json();
          for (const item of data) {
            hcp[item.pit_no] = item.hcp;
            par[item.pit_no] = item.par;
          }
        }

        setXData(prevValues => ({ ...prevValues, 'hcp': hcp, 'par': par }));
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };
    doFetch();
  }, [PlaceID]);

  useEffect(() => {
    const doFetch = async () => {
      try {
        console.log('PlaceID + TeeID');
        const distance = null18();

        // try fetch distances
        if (PlaceID && TeeID) {
          const resp = await fetch(`${API_BASE_URL}tee/${PlaceID}/${TeeID}`);
          const data = await resp.json();
          for (const item of data)
            distance[item.pit_no] = item.distance;
        }

        setXData(prevValues => ({ ...prevValues, 'distance': distance }));
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };

    doFetch();
  }, [PlaceID, TeeID]);

  useEffect(() => {
    const evalHCP = async () => {

    };

    evalHCP();


  }, [EHCP]);


  useEffect(() => {
    console.log(`useEffect XData ${JSON.stringify(XData)}`);
    // setDbg(`XData: ${XData.jpp()}`);
  }, [XData]);

  const place_changed = (tagname, value) => { setPlaceID(value); };
  const tee_changed = (tagname, value) => { setTeeID(value); };
  const gender_changed = (tagname, value) => { setGenderID(value); };
  const ehcp_changed = (tagname, value) => { setEHCP(value); };
  const mode_changed = (tagname, value) => { };
  const values_changed = (tagname, value) => { };
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
          if (r === 1)
            t = XData['distance'][pit_index]
          else if (r === 2 && PlaceID)
            t = XData['par'][pit_index]
          else if (r === 3)
            t =
              <NumInput
                className="square" allowFloat={false}
                // changed_callback={result_changed}
                tagname={tbl_index * 10 + c - 1}
              />
          else if (r === 4 && PlaceID)
            t = XData['hcp'][pit_index]
        }

        // par sum calculations
        else if (c === 10 && r === 2)
          t = get_sum(XData['par'], tbl_index * 9 + 1, tbl_index * 9 + 9)
        else if (tbl_index === 1 && c === 11 && r === 2)
          t = get_sum(XData['par'], 1, 18)

        // distance calculations
        else if (c === 10 && r === 1)
          t = get_sum(XData['distance'], tbl_index * 9 + 1, tbl_index * 9 + 9)
        else if (tbl_index === 1 && c === 11 && r === 1)
          t = get_sum(XData['distance'], 1, 18)

        colsArray.push(<td key={c}>{t}</td>)
      }
      let trclass = 'other';
      if (r === 0)
        trclass = 'reika'
      if (r === 1 && TeeID)
        trclass = `tee${TeeID}`
      if (r === 2)
        trclass = 'par'


      rowsArray.push(<tr className={trclass} key={r}>{colsArray}</tr>)
    }
    return <table className='r'><tbody>{rowsArray}</tbody></table>;
  };

  return (
    <>

      <div className='flex_left_center'>
        <span className='large_text'>Exact HCP:</span>
        <NumInput
          className="margin_sides" style={{ width: "50px" }} allowFloat={true}
          changed_callback={ehcp_changed} tagname="ehcp"
          recalc="1"
        />
        {EHCP}
        <div className='large_text green_text'>Enter results and save card</div>
      </div>
      <hr />

      <div className='flex_left_center'>
        <PlaceSelect
          className="mr"
          changed_callback={place_changed} tagname="place"
        />
        <ModeSelect
          changed_callback={mode_changed} tagname="mode"
        />
      </div>
      <div className='flex_left_center'>
        <ColorSelect
          changed_callback={tee_changed} tagname="tee"
          style={{ width: "150px" }}
        />

        <GenderSelect
          changed_callback={gender_changed} tagname="gender"
          style={{ width: "150px" }}
        />
      </div>
      {/* <div className='flex_left_center'>        <div className='dbg'> {dbg}</div>        <div className='dbg'> {dbg2}</div></div> */}

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

