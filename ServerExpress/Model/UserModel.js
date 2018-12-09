
const se = require("./secure");
const db = require("../Database/database")
var userModel={
    login: async function(username,password){
        let acc = await db.getAccount(username);
        if(se.compare(password,acc.hash));
    }
}