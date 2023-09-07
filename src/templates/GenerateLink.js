import * as React from "react";
import Box from "@mui/material/Box";

import reset from "./../css/reset.css"
import base from "./../css/base.css"
import module from "./../css/module.css"

import InputBox from "../atoms/InputBox";
import CustomButton from "../atoms/CustomButton"

const GenerateLink = (props) => {

    return (
        <div class="full-page">

            <p class="billing-title-text">請求リンクの作成</p>


            <div class="billing-title-position">
                <p class="billing-title-font">請求金額</p>
            </div>
            <Box component="form">

                <InputBox />

            </Box>


            <div class="billing-title-position">
                <p class="billing-title-font">メッセージ（任意）</p>
            </div>
            <InputBox />


            <CustomButton
                destination={props.destination}
                button_title={props.button_title}
            />

        </div >
    )
}
export default GenerateLink