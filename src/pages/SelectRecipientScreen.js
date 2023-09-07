import React, { useState, useEffect } from 'react';
import SelectRecipient from "../templates/SelectRecipient"

import { api_key, initial_user_koza_bango } from "../constants";

const SelectRecipientScreen = () => {

    // 送金先のユーザを表示するために、全ユーザ情報を取得する
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    async function fetchData() {
        try {
            const res = await fetch('https://sr40iwqw0d.execute-api.ap-northeast-1.amazonaws.com/intern-sample/get-all-users',
                {
                    headers:
                    {
                        "x-api-key":
                            api_key
                    }
                })

            const jsonData = await res.json();

            // 取得したユーザ情報には、自分自身のユーザ情報が含まれているため、その情報を除く
            const specificKozaBango = initial_user_koza_bango;
            const filteredData = jsonData.filter(item => item.koza_bango !== specificKozaBango);

            setData(filteredData);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }


    return (
        <div>
            <SelectRecipient
                users={data}
            />
        </div>
    );
}
export default SelectRecipientScreen