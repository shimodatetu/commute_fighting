import * as React from "react";
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';

import reset from "./../css/reset.css"
import base from "./../css/base.css"
import module from "./../css/module.css"

const GenerateLinkScreen = () => {

    const navigate = useNavigate()
    const [kingaku, setNum] = React.useState();
    const [message, setText] = React.useState();

    // 請求金額の入力ボックスへの入力チェック
    const handleChange = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setNum(e.target.value);
        }
    };

    // リンク作成ボタン押下時に、金額とメッセージを、遷移先ページに渡す
    const handleClick = (param1, param2) => {
        navigate("/copy-link", {
            state:
            {
                kingaku: param1,
                message: param2
            }
        })
    }

    return (
        <div class="full-page">

            <p class="billing-title-text">請求リンクの作成</p>


            <div class="billing-title-position">
                <p class="billing-title-font">請求金額</p>
            </div>
            <Box component="form">
                <TextField
                    type="text"
                    id="outlined-basic"
                    placeholder="金額"
                    variant="outlined"
                    sx={{
                        bgcolor: 'white',
                        color: 'black',
                        boxShadow: 0,
                        borderColor: 'black',
                        height: '8vh',
                        borderRadius: 3,
                        mt: 3,
                        mb: 2,
                        width: '79%',
                        fontSize: '1rem', // 固定の文字サイズを指定
                    }}
                    onChange={(e) => handleChange(e)}
                    value={kingaku}
                    InputProps={{
                        style: {
                            borderRadius: "10px",
                            height: '100%', // 親要素の高さに合わせる
                        },
                        inputProps: {
                            style: { textAlign: "center", fontSize: '3.5rem', padding: 10 },
                        },
                        endAdornment:
                            <InputAdornment position="end">
                                <Typography variant="h6" style={{ fontSize: '3.5rem' }}>
                                    円
                                </Typography>
                            </InputAdornment>
                    }}
                />
            </Box>


            <div class="billing-title-position">
                <p class="billing-title-font">メッセージ（任意）</p>
            </div>
            <TextField
                name="message"
                placeholder="メッセージ"
                sx={{
                    bgcolor: 'white',
                    color: 'black',
                    boxShadow: 0,
                    borderColor: 'black',
                    height: '8vh',
                    borderRadius: 3,
                    mt: 3,
                    mb: 2,
                    width: '79%',
                    fontSize: '1rem', // 固定の文字サイズを指定
                }}
                margin="normal"
                value={message}
                onChange={(e) => setText(e.target.value)}
                InputProps={{
                    style: {
                        borderRadius: "10px",
                        height: '100%', // 親要素の高さに合わせる
                    },
                    inputProps: {
                        style: { textAlign: "center", fontSize: '3.5rem', padding: 10 },
                    }
                }}
            />


            <Button
                type="submit"
                color="error"
                variant="contained"
                sx={{
                    bgcolor: 'red',
                    color: 'black',
                    boxShadow: 0,
                    borderColor: 'black',
                    height: '8vh',
                    borderRadius: 3,
                    mt: 3,
                    mb: 2,
                    width: '79%',
                    fontSize: '1rem', // 固定の文字サイズを指定
                }}
                onClick={() => handleClick({ kingaku }, { message })}
            >
                <p class="billing-kingaku-font">リンクを作成</p>
            </Button>

        </div >
    )
}
export default GenerateLinkScreen