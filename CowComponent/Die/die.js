const myServerUrl = "http://localhost:9000";
var dieInfo = {};
$(document).ready(function () {
    $("#loader").hide();
    $("#spiner").hide();
    $("#submit_btn").click(function () {  /// khi bấm nút đẩy dữ liệu -> gửi dữ liệu cho server xác thực
        getCowDieInfo();
        pushDataToSerVer();
    });
    $("#pushToChain_btn").click(function () {
        if (dieInfo._cowID != "") {
            $("#spiner").show();
            let id = dieInfo._cowID;
            console.log("called to pushToBlockChain");
            let blockchainData = JSON.stringify(dieInfo);
            //3 la kieu bản ghi bò chết
            let type = 3;
            pushDataToBlockchain(id, blockchainData, type);
        }
    });
    $("#_cowID").blur(function () {
        console.log("changed")
        // console.log(farmInfo);
        getCowInfo();
    });
    $("#_checkDay").blur(function () {
        console.log("changed")
        // console.log(farmInfo);
        $("#_cowAge").val(caculateAge()+ " (tháng tuổi)");
    });
})
var cowInfo;
function getCowInfo(){  // lay thong tin cua con bo khi da nhập mã
    $.ajax({
        url: myServerUrl + "/cowInfo/"+$("#_cowID").val(),
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (res) {
            console.log(res);
            $("#_gender").val(res._gender+": "+res._genderName);
            $("#_birthday").val(res._birthday);
            $("#_farm").val(res._farmName);
        },
        error: function (error) {
            window.alert("Cảnh báo: Con bò bạn vừa nhập chưa tồn tại trên hệ thống!")
            console.log("thaat bai")
            console.log(error);
            $("#loader").hide();
            $("#CowInfoForm").show();
        }
    });
}
function caculateAge(){
    let dt2 = new Date($("#_checkDay").val());
    let dt1 = new Date($("#_birthday").val());
    console.log(dt1);
    console.log(dt2);
    //Get 1 day in milliseconds
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24*30));
}
function getCowDieInfo() {
    let x = $("#CowDieInfoForm").serializeArray();
    x.forEach(element => {
        dieInfo[element.name] = element.value;
    });
    console.log(dieInfo);
}
function validateInfo() {
    return true;
}
function pushDataToSerVer() {
    if (!validateInfo()) {
        return;
    }
    $("#loader").show();
    $("#CowDieInfoForm").hide();
    $.ajax({
        url: myServerUrl + "/addDie",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(dieInfo),
        dataType: 'json',
        success: function (res) {
            // cowInfo._id = data._id; // lấy id do server trả về và đẩy dữ liệu lên blockchain
            if (res.status != "OK") {
                window.alert("Dữ liệu chưa được kiểm tra thành công, bạn không thể đẩy thông tin lên blockchain")
            }
            cowID = dieInfo._cowID;
            blockchainData = JSON.stringify(dieInfo);
            $("#dataBlockchain").text(blockchainData);
            $("#CowID").text(cowID);
            $("#showModal").click(); // hiển thị dialog cho phép đẩy dữ liệu lên blockchain;
            $("#closeChainModal").show();
            $("#pushToChain_btn").show();
            $("#CowDieInfoForm").show();
            $("#loader").hide();
            // b = data;
        },
        error: function (error) {
            window.alert("Server đang không hoạt động!")
            console.log("thaat bai")
            console.log(error);
            $("#loader").hide();
            $("#CowInfoForm").show();
        }
    });
}