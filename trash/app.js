
function App2() {
  const [XData, setXData] = useState({
    'hcp': null18(),
    'par': null18(),
    'distance': null18()
  });

  const [gameID, setGameID] = useState(null);
  const [placeID, setPlaceID] = useState(null);
  const [genderID, setGenderID] = useState(null);
  const [teeID, setTeeID] = useState(null);

  const [Mode, setMode] = useState(undefined);
  const [EHCP, setEHCP] = useState(undefined);


  useEffect(() => {
    const doFetch = async () => {
      try {
        console.log('placeID');
        const hcp = null18();
        const par = null18();

        if (placeID) {
          const resp = await fetch(`${API_BASE_URL}pits/${placeID}`);
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
  }, [placeID]);

  useEffect(() => {
    const doFetch = async () => {
      try {
        console.log('placeID + teeID');
        const distance = null18();

        // try fetch distances
        if (placeID && teeID) {
          const resp = await fetch(`${API_BASE_URL}tee/${placeID}/${teeID}`);
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
  }, [placeID, teeID]);

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

  const save_clicked = () => { alert('save_clicked') };
  const return_clicked = () => { alert('return_clicked') };

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
          else if (r === 2 && placeID)
            t = XData['par'][pit_index]
          else if (r === 3)
            t =
              <NumInput
                className="square" allowFloat={false}
                // changed_callback={result_changed}
                tagname={tbl_index * 10 + c - 1}
              />
          else if (r === 4 && placeID)
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
      if (r === 1 && teeID)
        trclass = `tee${teeID}`
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
        <TeeSelect
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
        <div className='flex_center_center'>
          <Btn
            caption='Save'
            onClicked={save_clicked}
          />
          <Btn
            caption='Return'
            onClicked={return_clicked}
          />
        </div>
      </div >

    </>
  )

}

