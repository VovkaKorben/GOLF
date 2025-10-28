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
  
  