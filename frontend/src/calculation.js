import { API_BASE_URL } from './consts.js';
const null18 = () => {
    let r = {};
    for (let i = 1; i <= 18; i++)
        r[i] = null;
    return r;
}
const init_data = () => {
    return {
        input: {
            ehcp: null,
            place_id: null,
            mode_id: null,
            tee_id: null,
            gender_id: null,
            strokes: null18(),
            strokes2: null18(),
        },

        output: {
            cr: null, slope: null,
            player_handicap: null,
            par: null18(),
            hcp: null18(),
            distance: null18(),
            result: null18(),
            result_lvl: null

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
    }
    return s
}
const calc1 = async (input) => {

    // reset output before fetch
    const output = {
        cr: null,
        slope: null,
        player_handicap: null,
        par: null18(),
        hcp: null18(),
        distance: null18(),
        result: null18(),
        result_lvl: null
    };

    if (input.place_id !== null) {


        // load PAR/HCP for place
        const resp1 = await fetch(`${API_BASE_URL}pits/${input.place_id}`);
        const data1 = await resp1.json();
        for (const value of data1) {
            output.hcp[value.pit_no] = value.hcp;
            output.par[value.pit_no] = value.par;
        }

        // load distance for PLACE + TEE
        if (input.tee_id !== null) {

            const resp2 = await fetch(`${API_BASE_URL}tee/${input.place_id}/${input.tee_id}`);
            const data2 = await resp2.json();

            for (const value of data2)
                output.distance[value.pit_no] = value.distance;

            // load cr/slope for PLACE + TEE + GENDER
            if (input.gender_id !== null) {
                const resp3 = await fetch(`${API_BASE_URL}crslope/${input.place_id}/${input.tee_id}/${input.gender_id}`);
                const data3 = await resp3.json();

                if (data3.length > 0) {
                    output.cr = data3[0].cr;
                    output.slope = data3[0].slope;
                }

                if (input.ehcp !== null) {

                    const resp4 = await fetch(`${API_BASE_URL}lvl/?place_id=${input.place_id}&gender_id=${input.gender_id}&tee_id=${input.tee_id}&ehcp=${input.ehcp}`);
                    const data4 = await resp4.json();

                    if (data4.length > 0) {
                        output.player_handicap = data4[0].lvl;
                    }

                    const pit_count = 18;
                    switch (input.mode_id) {
                        case 0: { // Lyöntipeli (Stroke play)

                            const bonus_pits = output.player_handicap - pit_count;
                            const hcp = Object.values(output.hcp);
                            const hcp_sorted = hcp.sort((a, b) => a - b);
                            const min_bonus = hcp_sorted[bonus_pits - 1];
                            let sum_result = 0;
                            for (let pit_no = 1; pit_no <= pit_count; pit_no++)
                                if (input.strokes[pit_no] !== null) {
                                    const bonus_hits = output.hcp[pit_no] <= min_bonus ? 2 : 1;
                                    const max_allowed = output.par[pit_no] + 2 + bonus_hits;
                                    const tmp = Math.max(0, input.strokes[pit_no] - max_allowed);
                                    output.result[pit_no] = input.strokes[pit_no] - tmp;
                                    sum_result += output.result[pit_no];
                                }
                            output.result_lvl = (113 / output.slope) * (sum_result - output.cr);
                            output.result_lvl = output.result_lvl.toFixed(1);
                            break;
                        }
                        case 1:
                            { // Reikäpeli (Match play)
                                // console.log(`Reikäpeli: ${JSON.stringify(input)}`);
                                for (let pit_no = 1; pit_no <= pit_count; pit_no++)
                                    if ((input.strokes[pit_no] !== null) && (input.strokes2[pit_no] !== null)) {

                                        output.result[pit_no] =Math.sign( input.strokes[pit_no] - input.strokes2[pit_no]);

                                    }
                                break;
                            }
                        case 2: { // Pistebogey (Bogey play)
                            const bonus_pits = pit_count - output.player_handicap;
                            const hcp = Object.values(output.hcp);
                            const hcp_sorted = hcp.sort((a, b) => b - a);
                            const min_bonus = hcp_sorted[bonus_pits];

                            for (let pit_no = 1; pit_no <= pit_count; pit_no++)
                                if (input.strokes[pit_no] !== null) {

                                    let tmp = output.par[pit_no] + ((min_bonus >= output.hcp[pit_no]) ? 1 : 0);
                                    tmp = 2 - (input.strokes[pit_no] - tmp);
                                    output.result[pit_no] = tmp;
                                }

                            break;
                        }
                        case 3: { // Scratch (Stroke play)
                            for (let pit_no = 1; pit_no <= pit_count; pit_no++)
                                if (input.strokes[pit_no] !== null) {
                                    output.result[pit_no] = input.strokes[pit_no];
                                }


                            break;
                        }
                    }

                }

            }
        }

    }

    const v = {
        input: input,
        output: output
    }

    // console.log(`calc1: ${JSON.stringify(v)}`);

    return v
}

export { get_sum, null18, init_data, calc1 };
