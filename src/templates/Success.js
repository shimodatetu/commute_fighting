import { useNavigate } from "react-router-dom"

import approval from "./../images/approval.png"

import reset from "./../css/reset.css"
import base from "./../css/base.css"
import module from "./../css/module.css"

import CustomButton from "../atoms/CustomButton"

const Success = (props) => {
    const navigate = useNavigate()

    return (
        <div class="full-page">

            <img class="approval-image" src={approval} />

            <p class="approval-text">送金処理が完了しました</p>

            <CustomButton
                destination={props.destination}
                button_title={props.button_title}
            />

        </div>
    )
}
export default Success