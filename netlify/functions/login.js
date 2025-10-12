// 【最終版】netlify/functions/login.js
const fs = require('fs');
const path = require('path');

const users = [
{ username: 'C73449', password: '19940201', name: '李培智' },
{ username: 'C84730', password: '19851010', name: '李志仁' },
{ username: 'C80624', password: '19930109', name: '葉欣宜' },
{ username: 'C91517', password: '20010721', name: '劉懷懋' },
{ username: 'C87976', password: '19980216', name: '林俊翔' },
{ username: 'guesttest', password: '2025', name: '訪客' }
];

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
    try {
        const { username, password } = JSON.parse(event.body);
        const foundUser = users.find(user => user.username === username && user.password === password);
        if (foundUser) {
            // 登入成功，只回傳成功狀態和使用者名稱
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, username: foundUser.username })
            };
        } else {
            return {
                statusCode: 401,
                body: JSON.stringify({ success: false, message: '帳號或密碼錯誤' })
            };
        }
    } catch (error) {
        // 加上 console.error 方便未來除錯
        console.error(error);
        return { statusCode: 500, body: JSON.stringify({ message: '伺服器發生內部錯誤' }) };
    }
};







