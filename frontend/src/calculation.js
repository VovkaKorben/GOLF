const null18 = () => {
    let r = {};
    for (let i = 1; i <= 18; i++)
        r[i] = null;
    return r;
}



const init_data = () => {
    return {
        cr: null, slope: null, game_level: null,


        par: null18(),
        hcp: null18(),
        distance: null18(),
        base: {
            ehcp: null,
            place_id: null,
            mode_id: null,
            tee_id: null,
            gender_id: null,
            stroke: null18(),
        }

    }
}

const get_sum = (obj, from, to, allow_null) => {
    let s = 0
    for (let i = from; i <= to; i++) {
        if (obj[i] === null) {
            if (!allow_null)
                return null;
        } else
            s += obj[i]
        //if (!(i in obj) || obj[i] === null)            return '';        s += obj[i]
    }
    return s
}
const calc1 = async (params) => {
    return {
        input: params,
        output: params
    }
}

export { get_sum, null18, init_data, calc1 };

/*
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
        load_data();*/