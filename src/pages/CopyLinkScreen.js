import { useLocation } from "react-router-dom"
import { Button } from "@mui/material";

import CustomButton from "../atoms/CustomButton"

import { api_key, initial_user_koza_bango } from "../constants";

import reset from "./../css/reset.css"
import base from "./../css/base.css"
import module from "./../css/module.css"

const CopyLinkScreen = () => {

    // 請求・支払いの履歴を管理するテーブルで、各データが請求or支払いなのかを管理するフラグ
    const type = "seikyu";

    //現在の時刻を取得する
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let data = time.getDate();
    let day = time.getDay();
    day = ["日", "月", "火", "水", "木", "金", "土"][day];
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let millisecond = time.getMilliseconds();
    const time_now = `${year}-${month}-${data}-${hours}-${minutes}-${seconds}-${millisecond}`;

    //請求金額・メッセージを取得する
    const { state } = useLocation();
    const { kingaku } = state.kingaku || {};
    const { message } = state.message || {};

    // リンクを作成する
    const link = "http://localhost:3000/payment/?time=" + time_now + "&koza_bango=" + initial_user_koza_bango + "&kingaku=" + kingaku + "&message=" + message;

    const isoStr = time.toISOString();

    // 請求情報を登録する
    fetch(`https://88ucq3d3o6.execute-api.ap-northeast-1.amazonaws.com/intern-sample/seikyu-history?id=${isoStr}&koza_bango=${initial_user_koza_bango}&kingaku=${kingaku}&message=${message}&type=${type}&self_koza_bango=${initial_user_koza_bango}&time=${isoStr}`,
        {
            method: 'POST',
            headers:
            {
                "x-api-key":
                    api_key
            }
        })
        .then(response => {
            // レスポンスの処理
        })
        .catch(error => {
            // エラーハンドリング
            console.log("Error Failed to register data", error);
            throw error;
        });

    //生成したリンクをクリップボードにコピーする
    const copyToClipboard = async () => {
        await global.navigator.clipboard.writeText(link);
    };


    return (
        <div class="full-page">

            <p class="link-title" >請求リンクが作成されました</p>

            <div class="link-position">
                <a class="link-font" href={link}>{link}</a>
            </div>

            <div class="link-button-position">
                <Button
                    type="submit"
                    color="success"
                    variant="contained"
                    sx={{
                        bgcolor: 'success',
                        color: 'white',
                        boxShadow: 0,
                        borderColor: 'black',
                        height: '8vh',
                        borderRadius: 3,
                        mt: 3,
                        mb: 2,
                        width: '79%',
                        fontSize: '1rem', // 固定の文字サイズを指定
                    }}
                    onClick={() => copyToClipboard()}
                >
                    <p class="copy-button-text">リンクをコピー</p>
                </Button>

                <CustomButton
                    destination={'/'}
                    button_title={'トップ画面に戻る'}
                />

            </div>
        </div>
    )
}
export default CopyLinkScreen