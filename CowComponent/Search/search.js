var CowInfo=[];
var CowHealth=[];

$(document).ready(function () {
    $("#search_btn").click(function () {
        id = $("#CowID").val();
        console.log(typeof (id));
        type = 1;//kieu du CowInfo
        Coursetro.findID(id, type, (err, res) => {
            if (res) {
                console.log(res);
                res.forEach(element => {
                    console.log(element.c[0]);
                    Coursetro.getInfoAt(element.c[0], (err, data) => {
                        if (data) {
                            console.log(data);
                            CowInfo.push(JSON.parse(data[1]));
                        }
                    });
                });
            }
        });
        type = 2;
        Coursetro.findID(id, type, (err, res) => {
            if (res) {
                console.log(res);
                res.forEach(element => {
                    console.log(element.c[0]);
                    Coursetro.getInfoAt(element.c[0], (err, data) => {
                        if (data) {
                            console.log(data);
                            let x = JSON.parse(data[1]);
                            CowHealth.push(x);
                        }
                    });
                });
            }
        });
        
        console.log(CowInfo);
    })
})