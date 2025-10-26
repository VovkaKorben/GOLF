import './App.css';
import React, { useEffect, useState } from "react";
// Axios-kirjasto HTTP-pyyntöjen tekemiseen (GET/POST jne.)
// import axios from "axios";
import PlaceSelect from "./PlaceSelect.js";
import NumInput from './NumInput.js';
import ColorSelect from './ColorSelect.js';
import ModeSelect from './ModeSelect.js';


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


      <div className='grid-container'>
        <h1>Golf</h1>

        <div className='flex_left_center'>
          <span className='l'>Exact HCP:</span>
          <NumInput
            className="m w100"
            allowFloat={true}
          />
          <span className='l g'>Enter results and save card</span>
        </div>

        <div className='flex_left_center'>
          <PlaceSelect onValueChanged={place_changed} />
          <ModeSelect onValueChanged={place_changed} />
        </div>

        <ColorSelect onValueChanged={color_changed} />
        {/* <div>tee placeholder</div> */}

        {renderTable(0)}
        {renderTable(1)}


        <div>comment placeholder</div>
        <div>judge placeholder</div>
        <div>button save placeholder</div>
      </div >
    </>
  )

}

