var CowInfo = [];
var CowHealth = [];

$(document).ready(function () {
    $("#infoData").hide()
    $("#spiner").hide()
    $("#search_btn").click(function () {
        $("#spiner").show();
        $("#infoData").hide()
        id = $("#CowID").val();
        console.log(typeof (id));
        getCowInfo(id);
        getFoodInfo(id);
        getDieInfo(id);
        getVaccineInfo(id);
        getHealthInfo(id);
        getSellInfo(id);
        getSickInfo(id);
    })
})
var DICT = new Map([
    ['_id', 'Số hiệu'],
    ['_gender', 'Mã giống'],
    ['_sex', 'Giới tính'],
    ["_farmID", 'Trang trại'],
    ['_birthday', 'Ngày sinh'],
    ['_birthplace', 'Nơi sinh'],
    ['_fatherID', 'Số hiệu bò bố'],
    ['_motherID', 'Số hiệu bò mẹ'],
    ['_fatherGender', 'Mã giống bò bố'],
    ['_motherGender', 'Mã giống bò mẹ'],
    ['1', 'Đực'],
    ['0', 'Cái']
])
function convertKey(key) { // ánh xạ key sang mảng thông tin
    let x = DICT.get(key)
    return (x != undefined) ? x : key;
}
function getCowInfo(id) {
    type = 1;//kieu du CowInfo
    Coursetro.findID(id, type, (err, res) => {
        if (res) {
            console.log(res);
            res.forEach(element => {
                console.log(element.c[0]);
                $("#spiner").hide();////// cẩn thận chỗ này
                Coursetro.getInfoAt(element.c[0], (err, data) => {
                    if (data) {
                        $('#infoData').show()
                        $('#cow-info').html = "";
                        console.log("info" + data);
                        var x = JSON.parse(data[1]);
                        let arr = Object.keys(x).map(function (index) {
                            return { key: index, value: x[index] };
                        })
                        console.log(arr);
                        arr.forEach(element => {
                            $("#cow-info")
                                .append("<li class='list-group-item d-flex justify-content-between lh-condensed'><div><h6 class='my-0'>"
                                    + convertKey(element.key) + ": " + convertKey(element.value) +
                                    "</h6><small class='text-muted'>")
                        });
                    }
                });
            });
        }
    });
}

function getHealthInfo(id) {
    type = 2;
    Coursetro.findID(id, type, (err, res) => {
        if (res) {
            console.log(res);
            res.forEach(element => {
                console.log(element.c[0]);
                Coursetro.getInfoAt(element.c[0], (err, data) => {
                    if (data) {
                        console.log("health" + data)
                        var x = JSON.parse(data[1]);
                        // $("#health-info").append("adsdsdsdsàdsà")
                        $("#health-info").append("<tr><th scope='row'>"
                            + x['_checkDay'] + "</th><td>" + x._cowHeight + "</td><td>"
                            + x._cowWeight + "</td><td>" + x._cowWidth + "</td></tr>")
                        // console.log(x._cowHeight);
                    }
                });
            });
        }
    });
}
function getDieInfo(id) {
    type = 3;
    Coursetro.findID(id, type, (err, res) => {
        if (res) {
            console.log(res);
            res.forEach(element => {
                console.log(element.c[0]);
                Coursetro.getInfoAt(element.c[0], (err, data) => {
                    if (data) {
                        console.log("die" + data);

                        var x = JSON.parse(data[1]);
                        $("#die-info").append("<p>adfadfadâdfadfa</p>")
                    }
                });
            });
        }
    });
}


function getFoodInfo(id) {
    type = 4;
    Coursetro.findID(id, type, (err, res) => {
        if (res) {
            console.log(res);
            res.forEach(element => {
                console.log(element.c[0]);
                Coursetro.getInfoAt(element.c[0], (err, data) => {
                    if (data) {
                        console.log("food" + data);
                        var x = JSON.parse(data[1]);
                        $("#food-info").append("<tr><th scope='row'>"
                            + x['_cowFood'] + "</th><td>" + x['_cowHeft'] + "</td><td>" + x._checkDay + "</td></tr>")
                    }
                });
            });
        }
    });
}
function getSellInfo(id) {
    type = 5;
    Coursetro.findID(id, type, (err, res) => {
        if (res) {
            console.log(res);
            res.forEach(element => {
                console.log(element.c[0]);
                Coursetro.getInfoAt(element.c[0], (err, data) => {
                    if (data) {
                        console.log("sell" + data);
                        var x = JSON.parse(data[1]);
                        $("#sellDate").text("Ngày xuất chuồng: " + x._checkDay);
                        $("#sellHeight").text("Chiều cao: " + x._cowHeight);
                        $("#sellWeight").text("Cân nặng: " + x._cowWeight);
                        $("#sellLenght").text("Chiều dài: " + x._cowWidth);
                        $("#sellTo").text("Nơi xuất đến: " + x._cowSell);
                    }
                });
            });
        }
    });
}

function getVaccineInfo(id) {
    type = 6;
    Coursetro.findID(id, type, (err, res) => {
        if (res) {
            console.log(res);
            res.forEach(element => {
                console.log(element.c[0]);
                Coursetro.getInfoAt(element.c[0], (err, data) => {
                    if (data) {
                        console.log("vaccine" + data);
                        var x = JSON.parse(data[1]);
                        if (x._startDay == undefined) return;
                        $("#vaccine-info").append("<tr><th scope='row'>"
                            + x._startDay + "</th><td>"
                            + x._vaccineName + "</td><td>"
                            + x._vaccineUsed + "</td><td>"
                            + x._causeOfUse + "</td></tr>")
                    }
                });
            });
        }
    });
}

function getSickInfo(id) {
    type = 7;
    Coursetro.findID(id, type, (err, res) => {
        if (res) {
            console.log(res);
            res.forEach(element => {
                console.log(element.c[0]);
                Coursetro.getInfoAt(element.c[0], (err, data) => {
                    if (data) {
                        console.log("sick" + data);
                        var x = JSON.parse(data[1]);
                        $("#sick-info").append("<tr><th scope='row'>"
                            + x._checkDay + "</th><td>"
                            + x._cowSymptom + "</td><td>"
                            + x._cowSickness + "</td><td>"
                            + x._cowEvaluation + "</td></tr>")
                    }
                });
            });
        }
    });
}