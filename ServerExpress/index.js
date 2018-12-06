const express = require('express');
const jsonread = require('body-parser').json();
const app = express();
const db = require('./Database/database')

app.use((req, res, next) => {   // hỗ trợ nhận request post/get chứa cookie dạng json từ client
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST')
    next();
});

app.post('/addCow', jsonread, (req, res) => {
    console.log(req.body);
    // console.log(req)
    res.statusCode = 201;
    res.send(JSON.stringify({ "adsfsdà": "adfsdfádfád" }));
});

app.get('/allFarm', (req, res) => {
    console.log("Lấy danh sách các trang trại có trong hệ thống");
    db.getAllFarm()
        .then(r => {
            res.statusCode = 200;
            res.send(JSON.stringify(r))
        })
        .catch(e => {
            res.statusCode = 401;
            res.send();
        })
})

app.listen(9000, () => {
    console.log("Express đang hoạt động!")
})