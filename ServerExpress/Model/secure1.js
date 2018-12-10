var crypto = require('crypto');
var jwt = require('jsonwebtoken');
let jwtsecurehash="adfádfadsfaduhvákjfhấudf";

var secure = {
    createSalt : function(){
        return crypto.randomBytes(10).toString('hex');
    },
    encrypt : function(str){
        return crypto.createHash('md5').update(str).digest('hex');
    },
    compare : function(pass,hash){      
        return (this.encrypt(pass)==hash);
    },
    createUserToken: function(user){
        return jwt.sign(user,jwtsecurehash,{expiresIn : 86400});
    },
    verifyUserToken: function(token){
        try {
            return  jwt.verify(token,jwtsecurehash)
        } catch (error) {
            return null;
        }        
    },    
}
module.exports = secure;
// var u = {
//     username: "adsfasdfasdf",
//     password: "adfafa",
// }
// console.log(u);
// var a=secure.createUserToken(u);
// var b=secure.verifyUserToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkc2Zhc2RmYXNkZiIsInBhc3N3b3JkIjoiYWRmYWZhIiwiaWF0IjoxNTI0MDM4NzQ2LCJleHAiOjE1MjQwNDg3NDZ9.iRX1hY_vtSwRKp-SyUJLqe4r307ftdkvViccD6QbMRU");
// // console.log(a);
// console.log(b);
// console.log(secure.encrypt("Tran Quang","Linh"));





