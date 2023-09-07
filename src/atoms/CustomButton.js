import * as React from 'react'
import { Button, useMediaQuery } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom"

import reset from "./../css/reset.css"
import base from "./../css/base.css"
import module from "./../css/module.css"

const CustomButton = (props) => {

    const navigate = useNavigate()

    return (
        <Button className="custom-button"
            type="submit"
            variant="outlined"
            sx={{
                bgcolor: 'white',
                color: 'black',
                boxShadow: 0,
                borderColor: 'black',
                height: '8vh', // 画面の高さの10%に設定
                borderRadius: 3,
                mt: 3,
                mb: 2,
                width: '79%',
                fontSize: '2rem', // 固定の文字サイズを指定
            }}
            onClick={() => navigate(props.destination)}
        >
            <p class="button-text">{props.button_title}</p>
        </Button>
    )
}

export default CustomButton;