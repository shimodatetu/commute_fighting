import * as React from "react";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "@mui/material";
import Stack from '@mui/joy/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';

import { api_key, initial_user_koza_bango } from "../constants";

import human2 from "./../images/human2.png"
import human3 from "./../images/human3.png"
import human4 from "./../images/human4.png"
import human5 from "./../images/human5.png"
import human6 from "./../images/human6.png"

import reset from "./../css/reset.css"
import base from "./../css/base.css"
import module from "./../css/module.css"

const TransferScreen = () => {
    const navigate = useNavigate()

    // 前ページから渡される情報を受け取る
    const { state } = useLocation();
    const { name, destination_koza_bango, index } = state || {};

    const [num, setNum] = React.useState('');
    const [isDisabled, changeState] = useState(true);

    // 画像表示用
    const imageArray = [human2, human3, human4, human5, human6];

    const [errorMessage, setErrorMessage] = useState('');

    //　送金出来る上限金額を表示するため、onstants.jsで指定した口座番号（initial_user_koza_bango）をもとに、残高を取得する
    const [data, setData] = useState(null);
    useEffect(() => {
        fetchData();
    }, []);
    async function fetchData() {
        try {
            const res = await fetch(`https://sr40iwqw0d.execute-api.ap-northeast-1.amazonaws.com/intern-sample/find-by?koza_bango=${initial_user_koza_bango}`,
                {
                    headers:
                    {
                        "x-api-key":
                            api_key
                    }
                })

            const jsonData = await res.json();
            setData(jsonData);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }

    // dataがnullの場合、ローディングや取得エラーを表示する等の処理を行う
    if (data === null) {
        return <div>Loading...</div>;
    }

    // 送金金額に入力されている値のチェックを行う
    const handleChange = (e) => {
        const regex = /^[0-9\b]+$/;
        const inputValue = e.target.value;

        // 入力が数字の場合か、空の場合にのみ num の値を更新する
        if (inputValue === "" || regex.test(inputValue)) {
            setNum(inputValue);
        }

        // 送金上限額を超えている場合、エラーメッセージを表示する
        const button = document.getElementById('button');
        const errMsgPassRe = document.querySelector('.err-msg-passre');

        if (inputValue === "" || Number(inputValue) > data[0].zandaka) {
            setErrorMessage(inputValue === "" ? '' : '送金上限額を超えています');
            button.disabled = true; // ボタンを非活性化
            changeState(true); // changeStateをtrueに設定（エラーメッセージの表示をリセット）
        } else {
            setErrorMessage('');
            button.disabled = false; // ボタンを活性化
            changeState(false);
        }
    };


    // 送金ボタン押下時にDynamoDBの操作を行い、その後、画面遷移する
    const transaction = (kingaku) => {

        //自分の口座から減算
        const res1 = fetch(`https://sr40iwqw0d.execute-api.ap-northeast-1.amazonaws.com/intern-sample/transfer?koza_bango=${initial_user_koza_bango}&kingaku=-${kingaku}`,
            {
                method: "POST",
                headers:
                {
                    "x-api-key":
                        api_key
                }
            }
        );

        //相手の口座に加算する
        const res2 = fetch(`https://sr40iwqw0d.execute-api.ap-northeast-1.amazonaws.com/intern-sample/transfer?koza_bango=${destination_koza_bango}&kingaku=${kingaku}`,
            {
                method: "POST",
                headers:
                {
                    "x-api-key":
                        api_key
                }
            }
        );
        navigate('/success');
    }


    return (
        <div class="full-page">

            <div class="address-title-position">
                <div class="transfer-title-position">
                    <p class="transfer-title-font">送金先</p>
                </div>
            </div>

            <div class="transfer-title-position">
                <Stack direction="row">
                    <img className="image" src={imageArray[index]} />
                    <p class="icon-username-text">{name}</p>
                </Stack >
            </div >


            <div class="transfer-title-position">
                <p class="transfer-title-font">送金上限額</p>
            </div>

            <p class="transfer-zandaka-text">{data[0].zandaka}円</p>


            <div class="transfer-kingaku-title-position">
                <div class="transfer-title-position">
                    <p class="transfer-title-font">送金金額</p>
                </div>
            </div>


            <div>
                <TextField
                    type="number"
                    placeholder="金額"
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
                        fontSize: '3rem', // 固定の文字サイズを指定
                    }}
                    onChange={(e) => handleChange(e)}
                    value={num}
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
                {/* エラーメッセージを表示 */}
                {errorMessage !== "" && (
                    <div className="error-message">
                        <p>{errorMessage}</p>
                    </div>
                )}
            </div>



            <div class="transfer-title-position">
                <p class="transfer-title-font">メッセージ（任意）</p>
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
                id="button"
                disabled={isDisabled}
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
                onClick={() => transaction(Number(num))}
            >
                <p class="transfer-kingaku-font">送金</p>
            </Button>

        </div >
    )
}
export default TransferScreen;







