var mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://server:NSzE8QWym39iQTL@ds041347.mlab.com:41347/cvdhd';
var ObjectId = require('mongodb').ObjectID;
var dbmodel = {
    addTyper: async function (AccountsInfo) {
        let client = await mongoClient.connect(url, { useNewUrlParser: true });
        let db = client.db('cvdhd');
        try {
            let verify = await db.collection('Accounts').insertOne(AccountsInfo);
            return Promise.resolve(verify.insertedId);
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },
    addLog: async function(message,transaction_hash){
        let client = await mongoClient.connect(url, { useNewUrlParser: true });
        let db = client.db('cvdhd');
        try {
            await db.collection('Log').insertOne({
                "message":message,
                "transaction_hash":transaction_hash
            })
            return Promise.resolve("OK");
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },
    addFarm: async function (FarmInfo) {
        let client = await mongoClient.connect(url, { useNewUrlParser: true });
        let db = client.db('cvdhd');
        try {
            let farm = await db.collection('Farm').insertOne(FarmInfo);
            await db.collection('LastCowCode').insertOne({_farmCode:FarmInfo._farmCode,_lastInsertedCode:0});
            return Promise.resolve(farm.insertedId)
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },
    getAccount: async function (username) {
        let client = await mongoClient.connect(url, { useNewUrlParser: true });
        let db = client.db('cvdhd');
        try {
            let query = { username: username };
            let acc = await db.collection('Accounts').findOne(query);
            console.log(acc);
            return Promise.resolve(acc);
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },
    addCow: async function (CowInfo) {
        let client = await mongoClient.connect(url, { useNewUrlParser: true });
        let db = client.db('cvdhd');
        try {
            await db.collection('Cow').insertOne(CowInfo)
            return Promise.resolve("OK");
        } catch (error) {
            console.log(error)
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },
    addHealth: async function (healthInfo) {
        let client = await mongoClient.connect(url, { useNewUrlParser: true });
        let db = client.db('cvdhd');
        try {
            await db.collection('Health').insertOne(healthInfo)
            return Promise.resolve("OK");
        } catch (error) {
            console.log(error)
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },
    getAllFarm: async function () {
        let client = await mongoClient.connect(url, { useNewUrlParser: true });
        let db = client.db('cvdhd');
        try {
            let list = await db.collection('Farm').find({}).toArray();
            return Promise.resolve(list);
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },
    getAllGender: async function () {
        let client = await mongoClient.connect(url, { useNewUrlParser: true });
        let db = client.db('cvdhd');
        try {
            let list = await db.collection('CowGender').find({}).toArray();
            return Promise.resolve(list);
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },
    getCowInfo:async function(cowID){
        let client = await mongoClient.connect(url, { useNewUrlParser: true });
        let db = client.db('cvdhd');
        try {
            let query={_id:cowID}
            let cow = await db.collection('Cow').findOne(query);
            let gender = await db.collection('CowGender').findOne({_id:cow._gender});
            let farm = await db.collection('Farm').findOne({_farmCode:cow._farmID});
            cow._farmName=farm._farmCode+" "+farm._name;
            cow._genderName=gender._title;
            return Promise.resolve(cow);
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },
    getLastCowCode:async function (farmCode){
        let client = await mongoClient.connect(url, { useNewUrlParser: true });
        let db = client.db('cvdhd');
        try {
            let farm = await db.collection('LastCowCode').findOne({_farmCode:farmCode});
            let code= farm._lastInsertedCode;
            await db.collection('LastCowCode').updateOne({_farmCode:farmCode},{$set:{_lastInsertedCode:code+1}});
            return Promise.resolve(code);
        } catch (error) {
            return Promise.reject("");
        } finally {
            client.close();
        }
    },
    getAllTyper:async function (){
        let client = await mongoClient.connect(url, { useNewUrlParser: true });
        let db = client.db('cvdhd');
        try {
            let list = await db.collection('Accounts').find({type:"typer"}).toArray();
            // console.log(list);
            list.forEach(element => {
                delete element['password'];
            });
            return Promise.resolve(list);
        } catch (error) {
            return Promise.reject("");
        } finally {
            client.close();
        }
    },
    getFarmInfo:async function (farmCode){
        let client = await mongoClient.connect(url, { useNewUrlParser: true });
        let db = client.db('cvdhd');
        try {
            let list = await db.collection('Farm').findOne({_farmCode:farmCode});
            // console.log(list);
            return Promise.resolve(list);
        } catch (error) {
            return Promise.reject("");
        } finally {
            client.close();
        }
    },
    getLog:async function (farmCode){
        let client = await mongoClient.connect(url, { useNewUrlParser: true });
        let db = client.db('cvdhd');
        try {
            let list = await db.collection('Log').find({}).limit(20).toArray();
            // console.log(list);
            list.forEach(element => {
                element.time=ObjectId(element._id).getTimestamp();  
              });
            return Promise.resolve(list);
        } catch (error) {
            console.log(error);
            return Promise.reject("");
        } finally {
            client.close();
        }
    },


}
// dbmodel.addGroup("5bf52190fb6fc0561ffdc0e5",{"name":"Nhóm bò nhập về ngày 20/10/2020","cow":[]});
// dbmodel.addCowToGroup("5bf52354e1b6fd16f44c7da1","5bf52f64f1abf42620b2c641","5bf52ab93a38bb393062f63e");
// dbmodel.getAccount("admin1");
// dbmodel.addBreeder("breeder2","breeder2",{
// "name" : "Trần Quang Linh"})
// dbmodel.getBannedWebSites('5bf4abcae7179a56e213cd2d');
// dbmodel.addUser("5bf3ec04e7179a56e21350f3","May02");
// dbmodel.addFarm({
//     _farmCode:"F02",
//     _name:"Trang trại Vui vẻ",
//     _address:"thôn X, xã ADR, huyện CDF, thành phố Hà Nội, Việt Nam",
//     _ownerName:"Trần Văn A",
//     _ownerCode:"132000342"
// }).then(r=>console.log(r));
// dbmodel.getLog().then(r=>console.log(r)).catch(e=>console.log(e));
module.exports = dbmodel;