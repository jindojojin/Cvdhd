const express = require('express');
const jsonread = require('body-parser');
const app = express();
const db = require('./Database/database')
const Cow = require('./Model/CowModel')
app.use((req, res, next) => {   // hỗ trợ nhận request post/get chứa cookie dạng json từ client
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST')
    next();
});

app.post('/addCow',jsonread.json(), (req, res) => {
    // console.log(req.body);
    Cow.addCow(req.body).then(id => {
        console.log("id nhận được ở route:")
        console.log(id);
        res.statusCode = 201;
        res.send(JSON.stringify({_id:id}));
    }).catch(e => {
        res.statusCode = 401;
        res.send();
    })
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
app.get('/allGender', (req, res) => {
    console.log("Lấy danh sách các giống có trong hệ thống");
    db.getAllGender()
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