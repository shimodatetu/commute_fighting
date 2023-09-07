import { useNavigate } from "react-router-dom"
import * as React from 'react';
import Stack from '@mui/joy/Stack';

import human2 from "./../images/human2.png"
import human3 from "./../images/human3.png"
import human4 from "./../images/human4.png"
import human5 from "./../images/human5.png"
import human6 from "./../images/human6.png"

import reset from "./../css/reset.css"
import base from "./../css/base.css"
import module from "./../css/module.css"


const SelectRecipient = ({ users }) => {
    const navigate = useNavigate()

    // 画像表示用
    const imageArray = [human2, human3, human4, human5, human6];

    // 送金先として選択した人のデータ（氏名、番号）を遷移先ページに渡す（画像データは渡せないため、遷移先ページで再作成する）
    const handleClick = (param1, param2, param3) => {

        navigate("/transfer", {
            state:
            {
                destination_koza_bango: param1,
                name: param2,
                index: param3
            }
        })
    }


    return (
        <div>

            <p class="selection-title">送金相手を選択</p>

            <div class="people-list-area">
                {users.map((user, index) => (
                    <div className="select-people-button" onClick={() => handleClick(user.koza_bango, user.name, index)}>
                        <Stack direction="row">

                            <img className="image" src={imageArray[index]} />
                            <p class="icon-username-text">{user.name}</p>

                        </Stack>
                    </div>
                ))}
            </div>
        </div>

    )
}
export default SelectRecipient