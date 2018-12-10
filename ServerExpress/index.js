const express = require('express');
const jsonread = require('body-parser');
const app = express();
const db = require('./Database/database')
const Cow = require('./Model/CowModel')
const User = require('./Model/UserModel')
app.use((req, res, next) => {   // hỗ trợ nhận request post/get chứa cookie dạng json từ client
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST')
    next();
});

app.post('/login',jsonread.json(),(req,res)=>{
    console.log(req.body);
    User.login(req.body.username,req.body.password).then(u=>{
        console.log(u);
        res.statusCode=200;
        res.send(JSON.stringify(u));
    }).catch(e => {
        res.statusCode = 401;
        res.send();
    });
    
});
app.get('/cowInfo/:id',(req,res)=>{
    console.log("Xem thông tin của bò theo số hiệu");
    console.log(req.params.id);
    db.getCowInfo(req.params.id).then(r=>{
        console.log(r);
        res.statusCode=200;
        res.send(JSON.stringify(r));
    }).catch(e => {
        res.statusCode = 401;
        res.send();
    });
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
app.post('/addCow', jsonread.json(), (req, res) => {
    console.log(req.body);
    Cow.addCow(req.body).then(id => {
        console.log("id nhận được ở route:")
        console.log(id);
        res.statusCode = 201;
        res.send(JSON.stringify({ _id: id }));
    }).catch(e => {
        res.statusCode = 401;
        res.send();
    })
});
app.post('/addHealth', jsonread.json(), (req, res) => {
    console.log(req.body);
    Cow.addHealth(req.body).then(r => {
        console.log("đã cập nhập bản ghi sức khỏe");
        res.statusCode = 201;
        res.send(JSON.stringify({"status":"OK"})); 
    }).catch(e => {
        res.statusCode = 401;
        res.send();
    });
});
app.post('/addFood', jsonread.json(), (req, res) => {
    console.log(req.body);
    Cow.addHealth(req.body).then(r => {
        console.log("đã cập nhập bản ghi sức khỏe");
        res.statusCode = 201;
        res.send(JSON.stringify({"status":"OK"})); 
    }).catch(e => {
        res.statusCode = 401;
        res.send();
    });
});
app.post('/addDie', jsonread.json(), (req, res) => {
    console.log(req.body);
    Cow.addHealth(req.body).then(r => {
        console.log("đã cập nhập bản ghi sức khỏe");
        res.statusCode = 201;
        res.send(JSON.stringify({"status":"OK"})); 
    }).catch(e => {
        res.statusCode = 401;
        res.send();
    });
});
app.post('/addVaccine', jsonread.json(), (req, res) => {
    console.log(req.body);
    Cow.addHealth(req.body).then(r => {
        console.log("đã cập nhập bản ghi sức khỏe");
        res.statusCode = 201;
        res.send(JSON.stringify({"status":"OK"})); 
    }).catch(e => {
        res.statusCode = 401;
        res.send();
    });
});
app.post('/addSell', jsonread.json(), (req, res) => {
    console.log(req.body);
    Cow.addHealth(req.body).then(r => {
        console.log("đã cập nhập bản ghi sức khỏe");
        res.statusCode = 201;
        res.send(JSON.stringify({"status":"OK"})); 
    }).catch(e => {
        res.statusCode = 401;
        res.send();
    });
});
app.post('/addLog', jsonread.json(), (req, res) => {
    console.log(req.body);
    db.addLog(req.body.log,req.body.transaction_hash).then(r => {
        console.log("đã cập nhập log");
        res.statusCode = 201;
        res.send(JSON.stringify({"status":"OK"})); 
    }).catch(e => {
        res.statusCode = 401;
        res.send();
    });
});


app.listen(process.env.PORT || 9000, () => {
    console.log("Express đang hoạt động!")
})