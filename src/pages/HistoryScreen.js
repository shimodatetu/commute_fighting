import { useState } from "react"
import * as React from "react";
import { useMemo } from "react";
import { useEffect } from "react";

import { api_key, initial_user_koza_bango } from "../constants";

import reset from "./../css/reset.css"
import base from "./../css/base.css"
import module from "./../css/module.css"

const HistoryScreen = () => {

    const [arr, setArr] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const res = await fetch('https://sr40iwqw0d.execute-api.ap-northeast-1.amazonaws.com/intern-sample/get-all-users',
                {
                    headers:
                    {
                        "x-api-key":
                            api_key
                    }
                });
            const jsonData = await res.json();
            setArr(jsonData);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }

    // 配列を連想配列（オブジェクト）に変換する
    const userMap = {};
    arr.forEach(({ koza_bango, name }) => {
        userMap[koza_bango] = name;
    });


    function getItems(data) {
        return data.Items.map((item) => {
            const newItem = {};
            for (const key in item) {
                newItem[key] = item[key].N || item[key].S;
            }
            return newItem;
        });
    }

    const [data, setData] = useState([]);
    async function main() {
        try {
            const response = await fetch(`https://88ucq3d3o6.execute-api.ap-northeast-1.amazonaws.com/intern-sample/history?koza_bango=${initial_user_koza_bango}`,
                {
                    headers:
                    {
                        "x-api-key":
                            api_key
                    }
                });
            const data = await response.json();
            const items = getItems(data);
            return items;
        } catch (error) {
            console.log("失敗しました", error);
            throw error;
        }
    }
    useEffect(() => {
        main().then((items) => {
            setData(items);
        });
    }, []);

    // koza_bangoに対応するユーザ名を取得する関数
    const getUsernameByKozaBango = (koza_bango) => {
        const kozaBangoList = koza_bango.split(', ');
        let usernames = [];
        for (let i = 0; i < kozaBangoList.length; i++) {
            const username = userMap[kozaBangoList[i]];
            if (username !== undefined) {
                usernames.push(username);
            } else {
                usernames.push("ユーザ名未定義");
            }
        }
        return usernames.join(', ');
    };

    // 年月日 時間(hour:minute:second)に修正
    function formatDate(datetime) {
        const date = new Date(datetime);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        const hour = ("0" + date.getHours()).slice(-2);
        const minute = ("0" + date.getMinutes()).slice(-2);
        const second = ("0" + date.getSeconds()).slice(-2);
        return `${year}年${month}月${day}日 ${hour}:${minute}:${second}`;
    }

    // フィルタリングする文字列（部分一致）（ここでseikyuを削除対象する）
    const filteredString = 'seikyu';

    // グループ化したデータのうち、一部をフィルダリングする
    const filteredGroupedData = useMemo(() => {

        // item（渡したデータ）のtypeに「seikyu」が含まれていない要素だけを抜き出す
        const filteredData = data.filter(item => !item.type.includes(filteredString));

        const groups = {};
        filteredData.forEach((item) => {

            const date = formatDate(item.time);
            const month = date.slice(0, 7);
            if (!groups[month]) {
                groups[month] = {};
            }

            if (!groups[month][date]) {
                groups[month][date] = [];
            }
            groups[month][date].push(item);
        });

        return groups;
    }, [data, filteredString]);



    // 画面表示用にデータをまとめる関数
    const finalGroupedData = {};
    const generateGroupedData = (data) => {
        const result = {};

        data.forEach(item => {
            const idPrefix = item.id.slice(0, 22);

            if (!result[idPrefix]) {
                result[idPrefix] = {
                    id: idPrefix,
                    items: [item],
                };
            } else {
                result[idPrefix].items.push(item);
            }

            // ここでfinalGroupedDataにデータを追加する
            if (!finalGroupedData[idPrefix]) {
                finalGroupedData[idPrefix] = {
                    id: idPrefix,
                    items: [item],
                };
            } else {
                finalGroupedData[idPrefix].items.push(item);
            }
        });

        return result;
    };



    // 日付をフォーマットする関数
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }


    return (

        <div className="full-page">
            {Object.keys(filteredGroupedData).sort().reverse().map(month => (
                <div key={month}>
                    <p class="history-month">{month}分</p> {/* 月を表示 */}
                    {Object.keys(filteredGroupedData[month]).sort().reverse().map(day => {
                        generateGroupedData(filteredGroupedData[month][day]);
                    })}
                </div>
            ))}

            {Object.values(finalGroupedData).map((groupedItem, index) => (
                <div key={index}>

                    {
                        [...new Set(groupedItem.items.map(item => item.id.slice(0, 22)))].map((idPrefix, index) => {
                            const duplicateCount = groupedItem.items.filter(item => item.id.startsWith(idPrefix)).length;
                            const uniqueItem = groupedItem.items.find(item => item.id.startsWith(idPrefix));

                            return (
                                <div key={index} className="detail-border">
                                    <p class="history-date">{formatDate(uniqueItem.time.slice(0, 10))}</p>
                                    <p class="history-kingaku">{uniqueItem.kingaku}円</p>
                                    <p class="history-message">{uniqueItem.message !== undefined && uniqueItem.message !== "undefined" ? uniqueItem.message : 'メッセージなし'}</p>
                                    <p class="history-paid">支払済み（{duplicateCount}人）</p>
                                    {Array.from({ length: duplicateCount }).map((_, imgIndex) => (
                                        < img class="history-image" key={imgIndex} src={require('./../images/human' + (imgIndex + 2) + '.png')} />
                                    ))}
                                </div>
                            );
                        })
                    }
                </div>
            ))}
        </div>
    )
}
export default HistoryScreen
