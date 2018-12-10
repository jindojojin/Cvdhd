
const se = require("./secure");
const db = require("../Database/database")
var userModel={
    login: async function(username,password){
        try {
            let acc = await db.getAccount(username);
            if(se.compare(password,acc.password)){
                let user = {"name":acc.name,"id":acc._id};
                let token = se.createUserToken(user);
                user.token=token;
                return Promise.resolve(user);
            }else{
                return Promise.reject("");
            }
            
        } catch (error) {
            return Promise.reject("");
        }
    }
}
module.exports=userModel;