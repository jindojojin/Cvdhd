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
                        console.log("info"+data);
                        var x= JSON.parse(data[1]);
                        $("#cow-info").append("<li class='list-group-item d-flex justify-content-between lh-condensed'><div><h6 class='my-0'>"+"</h6><small class='text-muted'>Brief description</small></div><span class='text-muted'>$12</span></li>")

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
                        console.log("health"+data)
                        var x= JSON.parse(data[1]);
                        $("#health-info").append("<p>adfadfadâdfadfa</p>")
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
                        console.log("die"+data);
                        
                        var x= JSON.parse(data[1]);
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
                        console.log("food"+data);
                        var x= JSON.parse(data[1]);
                        $("#food-info").append("<p>adfadfadâdfadfa</p>")
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
                        console.log("sell"+data);
                        var x= JSON.parse(data[1]);
                        $("#sell-info").append("<li class='list-group-item d-flex justify-content-between lh-condensed'><div><h6 class='my-0'>"+"</h6><small class='text-muted'>Brief description</small></div><span class='text-muted'>$12</span></li>")
                    }
                });
            });F
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
                        console.log("vaccine"+data);

                        var x= JSON.parse(data[1]);
                        $("#vaccine-info").append("<p>adfadfadâdfadfa</p>")
                    }
                });
            });
        }
    });
}