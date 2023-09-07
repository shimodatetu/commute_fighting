import React, { useState, useEffect } from 'react';

import Top from "../templates/Top"

import { api_key, initial_user_koza_bango } from "../constants";

import reset from "./../css/reset.css"
import base from "./../css/base.css"
import module from "./../css/module.css"

const TopScreen = () => {

    // constants.jsで指定した口座番号（initial_user_koza_bango）をもとに、ユーザ名・残高を取得する
    const [data, setData] = useState(null);
    useEffect(() => {
        fetchData();
    }, []);
    async function fetchData() {
        try {

            const res = await fetch(`https://sr40iwqw0d.execute-api.ap-northeast-1.amazonaws.com/intern-sample/find-by?koza_bango=${initial_user_koza_bango}`,
                {
                    headers:
                    {
                        "x-api-key":
                            api_key
                    }
                })

            const jsonData = await res.json();
            setData(jsonData);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }


    return (
        <div>
            {data ? (
                <div>
                    <Top
                        koza_bango={data[0].koza_bango}
                        name={data[0].name}
                        zandaka={data[0].zandaka}


                        destination1={'/select-recipient'}
                        button_title1={'送金する'}

                        destination2={'/generate-link'}
                        button_title2={'請求する'}

                        destination3={'/history'}
                        button_title3={'請求履歴'}
                    />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
export default TopScreen





