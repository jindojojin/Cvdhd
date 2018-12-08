const myServerUrl = "http://localhost:9000";
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
    $("#CowHealthInfoForm").validate({
        rules: {
            _cowID: "required",
            _checkDate: "required",
            _cowHeight: "required",
            _checkerName: {
                required: true,
                minlength: 2
            }
        },
        messages: {
            _cowID: "Vui lòng nhập họ",
            _checkDate: "Vui lòng nhập tên",
            _cowHeight: "kiding me?",
            _checkerName: {
                required: "Vui lòng nhập địa chỉ",
                minlength: "Địa chỉ ngắn vậy, chém gió ah?"
            }
        }
    })
})


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
    $("#showModal").click();
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