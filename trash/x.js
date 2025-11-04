//setPlaces(data);
// setDbg(`PAR: ${JSON.stringify(par, undefined, 2)}, HCP: ${JSON.stringify(hcp, undefined, 2)}`);
//JSON.stringify(p, undefined, 2));



// check all required values exists
/*let missing_fields = required_values.filter(item => !(item.tagname in values)).map(item => item.caption).join(', ');
if (missing_fields.length) missing_fields = <>This field(s) required: <b>{missing_fields}</b></>
setvaluesWarn(missing_fields);*/




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
      // setHCP(data.reduce((acc, item) => { acc[item.pit_no] = item.hcp; return acc; }, {}));
      // setPAR(data.reduce((acc, item) => { acc[item.pit_no] = item.par; return acc; }, {}));


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





const init_arr = () => {
  const obj = {};
  for (let i = 1; i <= 18; i++) obj[i] = null;
  return obj;
};

// const [hcp, setHCP] = useState(init_arr);
// const [par, setPAR] = useState(init_arr);
// const [tee, setTEE] = useState('');


useEffect(() => {
  setDbg(`xvalues: ${JSON.stringify(xvalues, undefined, 2)}`);
}, [xvalues]);
useEffect(() => {
  setDbg2(`xdata: ${JSON.stringify(xdata, undefined, 2)}`);
}, [xdata]);


/*
  // Первый запрос
  const pitsResponse = await fetch(`${API_BASE_URL}pits/${placeID}`);
  const pitsData = await pitsResponse.json();
 
  // Второй запрос (зависит от первого)
  const teesResponse = await fetch(`${API_BASE_URL}tees/${teeID}?place=${placeID}`);
  const teesData = await teesResponse.json();
 
  // Третий запрос
  const weatherResponse = await fetch(`${API_BASE_URL}weather/${placeID}`);
  const weatherData = await weatherResponse.json();
 
  // Вычисления
  const result = calculateHandicap(pitsData, teesData, weatherData);
  setXData(result);
*/



//  PLACE changed
/*  useEffect(() => {
    const fetchPlace = async () => {
      // init par/hcp with null
      const hcp = null18(); const par = null18();
      if (!placeID) { setXData(prevValues => ({ ...prevValues, 'hcp': hcp, 'par': par })); return; }
 
      try {
        const response = await fetch(`${API_BASE_URL}pits/${placeID}`);
        const data = await response.json();
 
        for (const item of data) {
          hcp[item.pit_no] = item.hcp;
          par[item.pit_no] = item.par;
        }
        setXData(prevValues => ({ ...prevValues, 'hcp': hcp, 'par': par }));
      } catch (error) { setXData(prevValues => ({ ...prevValues, 'hcp': hcp, 'par': par })); }
    };
 
    const fetchTee = async () => {
      const distance = null18();
 
      if (!teeID || !placeID) { setXData(prevValues => ({ ...prevValues, 'distance': distance })); return; }
 
      try {
        const response = await fetch(`${API_BASE_URL}tee/${placeID}/${teeID}`);
 
        const data = await response.json();
 
      
 
        setXData(prevValues => ({ ...prevValues, 'distance': distance }));
      } catch (error) { setXData(prevValues => ({ ...prevValues, 'distance': distance })); }
 
    };
 
    fetchPlace();
    fetchTee();
 
  }, [placeID, teeID, genderID]);
*/


/*
    setExpandedIds(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id) // удаляем если уже есть
        : [...prev, id] // добавляем если нет
    );
*/



{/* <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game/:id" element={<UserDetail />} />
              </Routes> */}




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



import React, { useEffect, useState } from "react";
import API_BASE_URL from './consts.js';
import PlaceSelect from "./comps/PlaceSelect.js";
import NumInput from './comps/NumInput.js';
import TeeSelect from './comps/TeeSelect.js';
import ModeSelect from './comps/ModeSelect.js';
import TextInput from './comps/TextInput.js';
import GenderSelect from './comps/GenderSelect.js';



function get_svg(fill_color) {
  return (
    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="10" cy="10"
        r="9"
        fill={fill_color}
        stroke="black"
        stroke-width="1"
        shapeRendering="geometricPrecision"
      />
    </svg>);
}




        const load_data = async () => {

            const data = init_data()
            data.base = { placeID, teeID, genderID, modeID, ehcp, strokes };

            if (placeID !== null) {

                // load PAR/HCP for place
                const resp1 = await fetch(`${API_BASE_URL}pits/${placeID}`);
                const data1 = await resp1.json();
                for (const value of data1) {
                    data.hcp[value.pit_no] = value.hcp;
                    data.par[value.pit_no] = value.par;
                }

                // load distance for PLACE + TEE
                if (teeID !== null) {

                    const resp2 = await fetch(`${API_BASE_URL}tee/${placeID}/${teeID}`);
                    const data2 = await resp2.json();

                    for (const value of data2)
                        data.distance[value.pit_no] = value.distance;

                    // load cr/slope for PLACE + TEE + GENDER
                    if (genderID !== null) {
                        const resp3 = await fetch(`${API_BASE_URL}crslope/${placeID}/${teeID}/${genderID}`);
                        const data3 = await resp3.json();

                        if (data3.length > 0) {
                            data.cr = data3[0].cr;
                            data.slope = data3[0].slope;
                        }


                    }
                }


            }
            setGameData(data);
        };
        load_data();