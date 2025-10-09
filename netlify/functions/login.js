// 【偵錯專用版】netlify/functions/login.js
const fs = require('fs');
const path = require('path');

const users = [
    { username: 'C73449', password: '19940201' },
    { username: 'C84730', password: '19851010' },
    { username: 'C80624', password: '19930109' },
    { username: 'page', password: 'page0201' }
];

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        console.log('--- 函式開始執行 ---');
        const { username, password } = JSON.parse(event.body);
        const foundUser = users.find(user => user.username === username && user.password === password);

        if (foundUser) {
            console.log('使用者驗證成功:', foundUser.username);

            const filePath = path.resolve(__dirname, 'test.html'); // 我們仍然使用 test.html 來測試
            console.log('準備讀取檔案，路徑為:', filePath);

            const fileContent = fs.readFileSync(filePath, 'utf8');

            console.log('檔案讀取成功！');

            return {
                statusCode: 200,
                body: JSON.stringify({ 
                    success: true, 
                    html: fileContent,
                    username: foundUser.username
                })
            };
        } else {
            console.log('使用者驗證失敗:', username);
            return {
                statusCode: 401,
                body: JSON.stringify({ success: false, message: '帳號或密碼錯誤' })
            };
        }
    } catch (error) {
        // ★★★★★ 這是最重要的部分 ★★★★★
        // 我們將詳細的錯誤訊息印在後台的終端機裡
        console.error('!!! 函式執行發生錯誤 !!!');
        console.error(error);
        // ★★★★★★★★★★★★★★★★★★★★★

        // 依然回傳通用的錯誤訊息給前端瀏覽器
        return { statusCode: 500, body: JSON.stringify({ message: '伺服器發生錯誤' }) };
    }
};
