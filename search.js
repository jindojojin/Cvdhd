var CowInfo = [];
var CowHealth = [];

$(document).ready(function () {
    $("#search_btn").click(function () {
        id = $("#CowID").val();
        console.log(typeof (id));
        getCowInfo(id);
        getFoodInfo(id);
        getDieInfo(id);
        getVaccineInfo(id);
        getHealthInfo(id);
        getSellInfo(id);
    })
})

function getCowInfo(id) {
    type = 1;//kieu du CowInfo
    Coursetro.findID(id, type, (err, res) => {
        if (res) {
            console.log(res);
            res.forEach(element => {
                console.log(element.c[0]);
                Coursetro.getInfoAt(element.c[0], (err, data) => {
                    if (data) {
                        // console.log(data);
                        var x= JSON.parse(data[1]);
                        $("#cow-info").text(data);
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
                        var x= JSON.parse(data[1]);
                        $("#health-info").text(data);
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
                        var x= JSON.parse(data[1]);
                        $("#die-info").text(data);
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
                        var x= JSON.parse(data[1]);
                        $("#food-info").text(data);
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
                        var x= JSON.parse(data[1]);
                        $("#sell-info").text(data);
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
                        var x= JSON.parse(data[1]);
                        $("#vaccine-info").text(data);
                    }
                });
            });
        }
    });
}