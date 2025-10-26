import './App.css';
import React, { useEffect, useState } from "react";
// Axios-kirjasto HTTP-pyyntöjen tekemiseen (GET/POST jne.)
// import axios from "axios";
import PlaceSelect from "./PlaceSelect.js";
import NumInput from './NumInput.js';
import ColorSelect from './ColorSelect.js';
import ModeSelect from './ModeSelect.js';
import TextInput from './TextInput.js';
import BtnSave from './BtnSave.js';

export default function App() {
  useEffect(() => {
    // fetchHealth();    fetchTopFlavors();
  }, []);



  const col_first = ['REIKÄ', 'PITUUS', 'PAR', 'LYÖNNIT', 'HCP', 'NET.']
  const col_last = [['ULOS', ''], ['SISÄÄN', 'YHT.']]

  const renderTable = (tbl_index) => {

    const rowsArray = [];

    if (!tbl_index)
      rowsArray.push(<tr className='hdr' ><td colSpan={12}>CR / SLOPE</td></tr>);

    for (let r = 0; r <= 5; r++) {
      const colsArray = [];
      for (let c = 0; c <= 11; c++) {
        let t;
        // first column messages
        if (c === 0)
          t = col_first[r]
        // trailing columns messages
        else if (c >= 10 && r === 0)
          t = col_last[tbl_index][c - 10]
        else if (r === 0)
          t = tbl_index * 9 + c
        else if (r === 3)
          t = <input type='text' className='square' />
        else t = '';
        colsArray.push(<td key={c}>{t}</td>)
      }
      rowsArray.push(<tr className={r === 0 ? 'reika' : r === 2 ? 'par' : 'other'} key={r}>{colsArray}</tr>)
    }
    return <table className='r'><tbody>{rowsArray}</tbody></table>;
  };

  const [selectedPlaceId, setSelectedPlaceId] = useState('');
  const [selectedPlaceName, setSelectedPlaceName] = useState('');

  // Функция для обработки выбора места
  const handlePlaceSelect = (placeId, placeName) => {
    setSelectedPlaceId(placeId);
    setSelectedPlaceName(placeName);
  };

  const values_changed = () => {
    // alert(value);
  };
  const color_changed = (value) => {
    // alert(value);
  };
  const place_changed = (value) => {
    // alert(value);
  };
  return (
    <>


      <div className='flex_left_center'>
        <div>
          <span className='large_text'>Exact HCP:</span>
          <NumInput
            className="margin_sides"
            style={{ width: "50px" }}
            allowFloat={true}
          />
        </div>
        <div className='large_text green_text'>Enter results and save card</div>
      </div>
      <hr />
      <div className='flex_left_center'>
        <PlaceSelect className="mr" onValueChanged={place_changed} />
        <ModeSelect
          onValueChanged={place_changed}

        />
      </div>

      <ColorSelect onValueChanged={color_changed}
        style={{ width: "150px" }}
      />
      {/* <div>tee placeholder</div> */}

      {renderTable(0)}
      {renderTable(1)}
      <div className='flex_left_center'>
        <div className='flex_col_left'>

          <TextInput
            caption="Comments"
          />
          <TextInput
            caption="judge placeholder"
          />
        </div >
        <BtnSave />
      </div >
    </>
  )

}

