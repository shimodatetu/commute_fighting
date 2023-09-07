import * as React from "react";

import human1 from "./../images/human1.png"

import reset from "./../css/reset.css"
import base from "./../css/base.css"
import module from "./../css/module.css"

import Userinfo from "../atoms/Userinfo"

const Payment = (props) => {

    return (
        <div class="full-page">

            < div class="address-title-position" >
                <div class="transfer-title-position">
                    <p class="transfer-title-font">送金先</p>
                </div>
            </div >
            <div class="transfer-title-position">

                <Userinfo />

            </div>

            <div class="transfer-title-position">
                <p class="transfer-title-font">送金金額</p>
                <p class="payment-info-text">円</p>
            </div>

            <div class="transfer-title-position">
                <p class="transfer-title-font">メッセージ</p>
                <p class="payment-info-text">ここにメッセージ</p>
            </div>

        </div >
    )
}
export default Payment;