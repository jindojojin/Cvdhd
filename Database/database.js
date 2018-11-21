var mongoClient = require('mongodb').MongoClient;
const url='mongodb://server:NSzE8QWym39iQTL@ds041347.mlab.com:41347/cvdhd';
var ObjectId = require('mongodb').ObjectID;
var dbmodel= {

    addCow: async function(BreederID,CowInfo){
        if(! ObjectId.isValid(BreederID)) return Promise.reject("invalid BreederID");
        let client = await mongoClient.connect(url,{useNewUrlParser : true});
        let db = client.db('cvdhd');
        try {            
            const cowInserted = await db.collection('Cows').insertOne(CowInfo);
            let query = { _id: { $in: [ BreederID, new ObjectId(BreederID) ]}};
            let Breeder = await db.collection('Breeders').findOne(query);
            Breeder.defaultCowGroup.push(cowInserted.insertedId+"");
            let newValue = {$set:{defaultCowGroup:Breeder.defaultCowGroup}};
            await db.collection('Breeders').updateOne(query,newValue);
            return Promise.resolve("OK");
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },

    addGroup:  async function(BreederID,GroupInfo){
        if(! ObjectId.isValid(BreederID)) return Promise.reject("invalid BreederID");
        let client = await mongoClient.connect(url,{useNewUrlParser : true});
        let db = client.db('cvdhd');
        try {            
            const groupInserted = await db.collection('GroupCows').insertOne(GroupInfo);
            let query = { _id: { $in: [ BreederID, new ObjectId(BreederID) ]}};
            let Breeder = await db.collection('Breeders').findOne(query);
            Breeder.otherCowGroup.push(groupInserted.insertedId+"");
            let newValue = {$set:{otherCowGroup:Breeder.otherCowGroup}};
            await db.collection('Breeders').updateOne(query,newValue);
            return Promise.resolve("OK");
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },

    addCowToGroup: async function(CowID,GroupID,oldGroupID){ // if oldGroupID == null => dont delete cow from oldGroup
        if(! ObjectId.isValid(CowID)) return Promise.reject("invalid BreederID");
        let client = await mongoClient.connect(url,{useNewUrlParser : true});
        let db = client.db('cvdhd');
        try {            
            let query = { _id: { $in: [ GroupID, new ObjectId(GroupID) ]}};
            let Group = await db.collection('GroupCows').findOne(query);
            Group.cows.push(CowID);
            let newValue = {$set:{cows:Group.cows}};
            await db.collection('GroupCows').updateOne(query,newValue);
            if(oldGroupID != null){
                let query = { _id: { $in: [ oldGroupID, new ObjectId(oldGroupID) ]}};
                let Group = await db.collection('GroupCows').findOne(query);
                let index = Group.cows.indexOf(CowID);
                delete Group.cows[index];
                let newValue = {$set:{cows:Group.cows}};
                await db.collection('GroupCows').updateOne(query,newValue);
            }
            return Promise.resolve("OK");
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },
 
}
// dbmodel.addGroup("5bf52190fb6fc0561ffdc0e5",{"name":"Nhóm bò nhập về ngày 20/10/2020","cow":[]});
dbmodel.addCowToGroup("5bf52354e1b6fd16f44c7da1","5bf52f64f1abf42620b2c641","5bf52ab93a38bb393062f63e");
// dbmodel.getBannedWebSites('5bf4abcae7179a56e213cd2d');
// dbmodel.addUser("5bf3ec04e7179a56e21350f3","May02");

module.exports =dbmodel;