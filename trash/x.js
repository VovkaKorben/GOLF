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
          const pitsResponse = await fetch(`${API_BASE_URL}pits/${PlaceID}`);
          const pitsData = await pitsResponse.json();
  
          // Второй запрос (зависит от первого)
          const teesResponse = await fetch(`${API_BASE_URL}tees/${TeeID}?place=${PlaceID}`);
          const teesData = await teesResponse.json();
  
          // Третий запрос
          const weatherResponse = await fetch(`${API_BASE_URL}weather/${PlaceID}`);
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
        if (!PlaceID) { setXData(prevValues => ({ ...prevValues, 'hcp': hcp, 'par': par })); return; }
  
        try {
          const response = await fetch(`${API_BASE_URL}pits/${PlaceID}`);
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
  
        if (!TeeID || !PlaceID) { setXData(prevValues => ({ ...prevValues, 'distance': distance })); return; }
  
        try {
          const response = await fetch(`${API_BASE_URL}tee/${PlaceID}/${TeeID}`);
  
          const data = await response.json();
  
        
  
          setXData(prevValues => ({ ...prevValues, 'distance': distance }));
        } catch (error) { setXData(prevValues => ({ ...prevValues, 'distance': distance })); }
  
      };
  
      fetchPlace();
      fetchTee();
  
    }, [PlaceID, TeeID, GenderID]);
  */