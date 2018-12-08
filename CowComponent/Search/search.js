$(document).ready(function () {
    $("#search_btn").click(function () {
        id = $("#CowID").val();
        console.log(typeof(id));
        type=1;//kieu du CowInfo
        Coursetro.findID(id,type, (err, res) => {
            if (res){
                console.log(res);
                Coursetro.getInfoAt(res[0].e, (err, data) => {
                    if (data)
                        $("#data").text(data[1]);
                });
            }
        });
        type=2;
        Coursetro.findID(id,type, (err, res) => {
            if (res){
                console.log(res);
                Coursetro.getInfoAt(res[0].e, (err, data) => {
                    if (data)
                        $("#data").text(data[1]);
                });
            }
        });

    })
})