import { Button } from "@mui/material";

import reset from "./../css/reset.css"
import base from "./../css/base.css"
import module from "./../css/module.css"

import CustomButton from "../atoms/CustomButton"

const CopyLink = (props) => {

    return (
        <div class="full-page">

            <p class="link-title" >請求リンクが作成されました</p>

            <div class="link-position">
                ここにリンク
            </div>

            <div class="link-button-position">
                <Button
                    type="submit"
                    color="success"
                    variant="contained"
                    sx={{ bgcolor: 'success', color: 'white', boxShadow: 0, borderColor: 'black', height: 50, borderRadius: 3, mt: 3, mb: 2, width: '79%' }}
                >
                    <p class="button-text">リンクをコピー</p>
                </Button>

                <CustomButton
                    destination={props.destination}
                    button_title={props.button_title}
                />
            </div>

        </div>
    )
}
export default CopyLink