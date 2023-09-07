import * as React from "react";

import reset from "./../css/reset.css"
import base from "./../css/base.css"
import module from "./../css/module.css"

import CustomButton from "../atoms/CustomButton"
import Userinfo from "../atoms/Userinfo"
import InputBox from "../atoms/InputBox";

const Transfer = (props) => {

    return (
        <div class="full-page">

            <div class="address-title-position">
                <div class="transfer-title-position">
                    <p class="transfer-title-font">送金先</p>
                </div>
            </div>

            <Userinfo
                name={props.name}
            />



            <div class="transfer-title-position">
                <p class="transfer-title-font">送金上限額</p>
            </div>

            {props.zandaka}



            <div class="transfer-kingaku-title-position">
                <div class="transfer-title-position">
                    <p class="transfer-title-font">送金金額</p>
                </div>
            </div>

            <InputBox />

            <td class="err-msg-passre"></td>



            <div class="transfer-title-position">
                <p class="transfer-title-font">メッセージ（任意）</p>
            </div>

            <InputBox />

            <CustomButton />

        </div >
    )
}
export default Transfer;