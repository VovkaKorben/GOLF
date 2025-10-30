import React, { useEffect, useState } from "react";

function ResultTable({ id }) {
    const cols = ['Reikä', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Ulos', '10', '11', '12', '13', '14', '15', '16', '17', '18', 'Sisään', 'Yht.'];
    const rows = ['Reikä', 'Par', 'K1', 'Netto'];
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetch_game_info = async () => {
            try {

                // load game data from 


            } catch (error) {
                console.error('Ошибка:', error);
            }
        };



        fetch_game_info(id);


    });

    // if (loading) return (<img style={{ width: "80px" }} src='/icons/loading.svg' />);
    // if (error) return <>Ошибка: {error}</>;
    // if (!data) return <>No data</>;
    const renderTable = () => {
        const rowsArray = [];

        rowsArray.push(<tr className="gi_row0" key={0}><td colSpan={22}>game calculation mode</td></tr>)

        for (let r = 0; r <= 3; r++) {
            const colsArray = [];
            for (let c = 0; c <= 21; c++) {
                let t = '';
                if (r === 0 && c > 0)
                    t = cols[c];
                else if (c === 0)
                    t = rows[r];
                colsArray.push(<td key={c}>{t}</td>)
            }

            rowsArray.push(<tr className={`gi_row${r + 1}`} key={r + 1}>{colsArray}</tr>)
        }
        return <table className='game_result'><tbody>{rowsArray}</tbody></table>;
    }

    return (

        <>
            {renderTable()}
        </>

    );
};

export default ResultTable;