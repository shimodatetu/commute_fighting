import { Card } from "@mui/material";

import CustomButton from "../atoms/CustomButton"
import Userinfo from "../atoms/Userinfo"

import reset from "./../css/reset.css"
import base from "./../css/base.css"
import module from "./../css/module.css"

const Top = (props) => {
    return (
        <div className="full-page">

            <div className="userinfo">
                <Userinfo
                    name={props.name}
                />
            </div>

            <p className="kozabango-text">口座番号: {props.koza_bango}</p>

            <p className="zandaka-title">預金残高</p>
            <Card variant="outlined" className="zandaka_area" style={{ border: '1px solid black', borderRadius: '10px' }}>
                <p className="zandaka-text">{props.zandaka}円</p>
            </Card>

            <CustomButton
                destination={props.destination1}
                button_title={props.button_title1}
            />

            <CustomButton
                destination={props.destination2}
                button_title={props.button_title2}
            />

            <CustomButton
                destination={props.destination3}
                button_title={props.button_title3}
            />

        </div>
    )
}
export default Top;
