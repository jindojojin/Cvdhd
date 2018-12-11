var healthInfo = {};
$(document).ready(function () {
    $("#loader").hide();
    $("#spiner").hide();
    $("#submit_btn").click(function () {  /// khi bấm nút đẩy dữ liệu -> gửi dữ liệu cho server xác thực và tạo id cho bò
        getCowHealthInfo();
        pushDataToSerVer();
    });
    $("#pushToChain_btn").click(function () {
        if (healthInfo._cowID != "") {
            $("#spiner").show();
            let id = healthInfo._cowID;
            console.log("called to pushToBlockChain");
            let blockchainData = JSON.stringify(healthInfo);
            //2 la kieu bản ghi sức khỏe
            let type = 2;
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

function getCowHealthInfo() {
    let x = $("#CowHealthInfoForm").serializeArray();
    x.forEach(element => {
        healthInfo[element.name] = element.value;
    });
    console.log(healthInfo);
}
function validateCowInfo() {
    return true;
}
function pushDataToSerVer() {
    $("#loader").show();
    $("#CowHealthInfoForm").hide();
    $.ajax({
        url: myServerUrl + "/addHealth",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(healthInfo),
        dataType: 'json',
        success: function (res) {
            // cowInfo._id = data._id; // lấy id do server trả về và đẩy dữ liệu lên blockchain
            console.log("dfsghgghgfdghjhgfdghjgfdghjgfdsfgh")
            console.log(res)
            cowID = healthInfo._cowID;
            blockchainData = JSON.stringify(healthInfo);
            $("#dataBlockchain").text(blockchainData);
            $("#CowID").text(cowID);
            $("#showModal").click();
            $("#closeChainModal").show();
            $("#pushToChain_btn").show();
            $("#CowHealthInfoForm").show();
            $("#loader").hide();
            // b = data;
        },
        error: function (error) {
            console.log("thaat bai")
            console.log(error);
            $("#loader").hide();
            $("#CowInfoForm").show();
        }
    });
}
// Biến import từ CowStruct để theo dõi kết quả đẩy lên blockchain
returnEvent.watch(function (error, result) {
    if (result) {
        $("#loader").hide();
        // $("#instructor").html(result.args.cowID + ' ' + result.args.data);
        console.log(result.args);
        $("#closeChainModal").click();
    } else {
        $("#loader").hide();
    }
});