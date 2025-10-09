// 檔案路徑: netlify/functions/login.js

const fs = require('fs');
const path = require('path');

// 1. 將帳號密碼資訊安全地存放在後端
const users = [
    { username: 'C73449', password: '19940201' },
    { username: 'C84730', password: '19851010' },
    { username: 'C80624', password: '19930109' },
    { username: 'page', password: 'page0201' }
];

exports.handler = async function(event, context) {
    // 只允許 POST 請求
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        // 2. 從前端傳來的請求中，解析出帳號和密碼
        const { username, password } = JSON.parse(event.body);

        // 3. 在後端驗證帳號密碼是否正確
        const foundUser = users.find(user => user.username === username && user.password === password);

        if (foundUser) {
            // 4. 如果驗證成功，讀取課程內容 HTML 檔案
            //const coursePath = path.resolve(__dirname, 'course-content.html'); 
            //const courseHTML = fs.readFileSync(coursePath, 'utf8');
            
            // 5. 將課程內容回傳給前端，並帶上使用者名稱
            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    success: true, 
                    html: "<h1>Login OK</h1>",
                    username: foundUser.username // 把使用者名稱也傳回去
                })
            };
        } else {
            // 6. 如果驗證失敗，回傳錯誤訊息
            return {
                statusCode: 401, // 401 代表「未授權」
                body: JSON.stringify({ success: false, message: '帳號或密碼錯誤' })
            };
        }
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ message: '伺服器發生錯誤' }) };
    }

};

