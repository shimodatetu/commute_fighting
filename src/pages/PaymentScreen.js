import { useEffect, useCallback } from "react";
import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";

import { api_key, initial_user_koza_bango } from "../constants";

const PaymentScreen = () => {

    const navigate = useNavigate();
    const useQuery = () => {
        const { search } = useLocation();
        return useMemo(() => new URLSearchParams(search), [search]);
    };

    // クエリ情報を取得出来るようにする
    const query = useQuery();

    async function fetchData() {
        try {
            // timeの値を取得する
            let iso = query.get("time");

            // 自分の口座番号
            const self_koza_bango = initial_user_koza_bango;

            // idを生成する
            const id = iso + self_koza_bango;

            // kingakuの値を取得する
            const kingaku = query.get("kingaku");

            //　請求者の口座番号
            const destination_kozabango = query.get("koza_bango");

            //　messageの値を取得する
            const message = query.get("message");

            //  請求・支払いの履歴を管理するテーブルで、各データが請求or支払いなのかを管理するフラグ
            const type = "shiharai"

            // 現在の時刻を取得する
            let now = new Date();
            const time = now.toISOString();

            // 請求された金額を、自分の口座から減算する
            fetch(`https://sr40iwqw0d.execute-api.ap-northeast-1.amazonaws.com/intern-sample/transfer?koza_bango=${self_koza_bango}&kingaku=-${kingaku}`,
                {
                    method: "POST",
                    headers:
                    {
                        "x-api-key":
                            api_key
                    }
                }
            );

            // 請求された金額を、相手の口座に加算する
            fetch(`https://sr40iwqw0d.execute-api.ap-northeast-1.amazonaws.com/intern-sample/transfer?koza_bango=${destination_kozabango}&kingaku=${kingaku}`,
                {
                    method: "POST",
                    headers:
                    {
                        "x-api-key":
                            api_key
                    }
                }
            );

            // 支払い履歴を記録する
            fetch(`https://88ucq3d3o6.execute-api.ap-northeast-1.amazonaws.com/intern-sample/shiharai-history?id=${id}&koza_bango=${destination_kozabango}&kingaku=${kingaku}&message=${message}&type=${type}&self_koza_bango=${self_koza_bango}&time=${time}`,
                {
                    method: 'POST',
                    headers:
                    {
                        "x-api-key":
                            api_key
                    }
                }
            );

        } catch (error) {
            console.log("Error Payment Failed :", error);
        }
        navigate('/success');
    }

    // ボタンのクリックイベントを処理する関数
    const handleButtonClick = useCallback(() => {
        fetchData();
    }, []); // 空の依存配列によりこの関数は変更されない

    useEffect(() => {
    }, []); // 空の依存配列のuseEffectは、マウント時のみ実行される

    return (
        <div>
            < div class="address-title-position" >
                <div class="transfer-title-position">
                    <p class="transfer-title-font">送金先</p>
                </div>
            </div >
            <div class="transfer-title-position">



            </div>

            <div class="transfer-title-position">
                <p class="transfer-title-font">送金金額</p>
                <p class="payment-info-text">円</p>
            </div>

            <div class="transfer-title-position">
                <p class="transfer-title-font">メッセージ</p>
                <p class="payment-info-text">ここにメッセージ</p>
            </div>


            <Button
                id="button"
                type="submit"
                color="error"
                variant="outlined"
                sx={{
                    bgcolor: "white",
                    color: "black",
                    boxShadow: 0,
                    borderColor: "black",
                    height: 50,
                    borderRadius: 3,
                    mt: 3,
                    mb: 2,
                    width: "79%",
                }}
                onClick={handleButtonClick}
            >
                <p class="button-text">支払い</p>
            </Button>

        </div>
    );
};
export default PaymentScreen;