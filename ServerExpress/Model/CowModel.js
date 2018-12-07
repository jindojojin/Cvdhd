var db = require('../Database/database');


var CowModel = {
    generateCowCode: async function (farmCode) {
        try {
            let code = await db.getLastCowCode(farmCode);
            let CowCode = farmCode + pad(code, 8);
            console.log(CowCode);
            return Promise.resolve(CowCode);
        } catch (error) {
            return Promise.reject("")
        }

    },

    addCow: async function (cowInfo) {
        try {
            let id = await this.generateCowCode(cowInfo._farmID);
            console.log("id:");
            console.log(id);
            cowInfo._id = id;
            cowInfo.status = '';
            await db.addCow(cowInfo);
            return Promise.resolve(id);
        } catch (error) {
            return Promise.reject("")
        }
    }
}
module.exports = CowModel;

function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

// CowModel.addCow({
//     _sex:1,
//     _birthday:"2016-20-11",    //(Ngày sinh) yyyy/mm/dd
//     _birthplace:"Trang trại Vui vẻ, tỉnh ASF",  //(Nơi sinh) string (tiếng việt có dấu)
//     _gender:"Bò H-Mông",      //(Mã giống) chuỗi <= 30 kí tự (tiếng việt có dấu)
//     _fatherID:"",    // nếu không có sẽ truyền -1
//     _fatherGender:"",//(Mã giống của cha) chuỗi <= 30 kí tự (tiếng việt có dấu)
//     _motherID:"",    // nếu không có sẽ truyền -1
//     _motherGender:"",//(Mã giống của mẹ) chuỗi <= 30 kí tự (tiếng việt có dấu)
//     _farmID:"F02"
// })