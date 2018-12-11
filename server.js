const express = require('express');
const jsonread = require('body-parser');
const app = express();
var path = require('path');
app.set('view engine', 'ejs');
app.use((req, res, next) => {   // hỗ trợ nhận request post/get chứa cookie dạng json từ client
    res.setHeader('Access-Control-Allow-Origin', 'https://cvdhd-serverdb.herokuapp.com');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST')
    next();
});

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname + '/index.html'));
    res.sendFile(path.join(__dirname+ '/index.css'))
})

app.listen(process.env.PORT || 9001, () => {
    console.log("Express đang hoạt động!")
})