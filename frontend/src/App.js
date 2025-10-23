import './App.css';
import React, { useEffect, useState } from "react";
// Axios-kirjasto HTTP-pyyntöjen tekemiseen (GET/POST jne.)
// import axios from "axios";
import PlacesDropdown from "./places.js";


export default function App() {
  useEffect(() => {
    // fetchHealth();    fetchTopFlavors();
  }, []);



  const col_first = ['REIKÄ', 'PITUUS', 'PAR', 'LYÖNNIT', 'HCP', 'NET.']
  const col_last = [['ULOS', ''], ['SISÄÄN', 'YHT.']]

  const renderTable = (tbl_index) => {

    const rowsArray = [];

    if (!tbl_index)
      rowsArray.push(<tr><td colSpan={12}>12313</td></tr>);

    for (let r = 0; r <= 5; r++) {
      const colsArray = [];
      for (let c = 0; c <= 11; c++) {
        let t;
        if (c == 0)
          t = col_first[r]
        else if (c >= 10 && r == 0)
          t = col_last[c - 10, tbl_index]
        else  t = '';

        // const t = (c == 0) ?  : ''

        colsArray.push(<td key={c}>{t}</td>)
      }
      rowsArray.push(<tr key={r}>{colsArray}</tr>)
    }




    return <table className='r'><tbody>{rowsArray}</tbody></table>;


  };


  return (
    <>
      <h1>Golf</h1>
      <PlacesDropdown />
      <div>kierros placeholder</div>
      <div>tee placeholder</div>

      {renderTable(0)}
      {renderTable(1)}


      <div>comment placeholder</div>
      <div>judge placeholder</div>
      <div>button save placeholder</div>
    </>
  )

}

