// require("../node_modules/web3/dist/web3.min.js");
var CowStruct = {
    findID: function (id) {
        Coursetro.findID(id, (err, res) => {
            if (err) console.log("lỗi ở findID:"+ err);
            var arr=[];
            res.forEach(element => {
                arr.push(element.c[0]);
            });
            var cacbanghi=[];
            arr.forEach(element => {
                var banghi=[];
                Coursetro.getInfoAt(element, (err, res) => {
                    if (err) console.log(err);
                    // console.log(res);
                    for(var i =1 ; i< res.length; i++){
                        banghi.push(web3.toAscii(res[i]));
                    }
                    // console.log(web3.toAscii(res[4]));
                });
                cacbanghi.push(banghi);
            });
            console.log(cacbanghi);
            // console.log(arr);
        });
    }
}
// module.exports = CowStruct;