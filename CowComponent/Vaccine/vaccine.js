var vaccineInfo = {};
$(document).ready(function () {
    $("#loader").hide();
    $("#spiner").hide();
    $("#submit_btn").click(function () {  /// khi bấm nút đẩy dữ liệu -> gửi dữ liệu cho server xác thực
        if(validateInfo()){
        getCowVaccineInfo();
        pushDataToSerVer();
    }
    });
    $("#pushToChain_btn").click(function () {
        if (vaccineInfo._cowID != "") {
            $("#spiner").show();
            let id = vaccineInfo._cowID;
            console.log("called to pushToBlockChain");
            let blockchainData = JSON.stringify(vaccineInfo);
            //6 la kieu bản ghi vaccine
            let type = 6;
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
function getCowVaccineInfo() {
    let x = $("#CowVaccineInfoForm").serializeArray();
    x.forEach(element => {
        vaccineInfo[element.name] = element.value;
    });
    return vaccineInfo;
    console.log(vaccineInfo);
}
function validateInfo() {
    $('#_cowID').css('border-color', '');
    $('#_startDay').css('border-color', '');
    $('#_endDay').css('border-color', '');
    $('#_checkerName').css('border-color', '');
    $('#_vaccineName').css('border-color', '');
    $('#_vaccineUsed').css('border-color', '');
    $('#_causeOfUse').css('border-color', '');
    var res = true;
    let cowInfo = getCowVaccineInfo();
    
    if(cowInfo._cowID=="") {
        $('#_cowID').css('border-color', 'red');
        res= false;
    }
    if(cowInfo._startDay== "") {
        $('#_startDay').css('border-color', 'red');
        res= false;
    }
    if(cowInfo._endDay== "") {
        $('#_endDay').css('border-color', 'red');
        res= false;
    }
    if(cowInfo._checkerName== "") {
        $('#_checkerName').css('border-color', 'red');
        res= false;
    }
    if(cowInfo._vaccineName== "") {
        $('#_vaccineName').css('border-color', 'red');
        res= false;
    }
     if(cowInfo._vaccineUsed== "") {
        $('#_vaccineUsed').css('border-color', 'red');
        res= false;
    }
    if(cowInfo._causeOfUse== "") {
        $('#_causeOfUse').css('border-color', 'red');
        res= false;
    }
    return res;
}
function pushDataToSerVer() {
    if (!validateInfo()) {
        return;
    }
    $("#loader").show();
    $("#CowVaccineInfoForm").hide();
    $.ajax({
        url: myServerUrl + "/addVaccine",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(vaccineInfo),
        dataType: 'json',
        success: function (res) {
            // cowInfo._id = data._id; // lấy id do server trả về và đẩy dữ liệu lên blockchain
            if (res.status != "OK") {
                window.alert("Dữ liệu chưa được kiểm tra thành công, bạn không thể đẩy thông tin lên blockchain")
            }
            cowID = vaccineInfo._cowID;
            blockchainData = JSON.stringify(vaccineInfo);
            $("#dataBlockchain").text(blockchainData);
            $("#CowID").text(cowID);
            $("#showModal").click(); // hiển thị dialog cho phép đẩy dữ liệu lên blockchain;
            $("#closeChainModal").show();
            $("#pushToChain_btn").show();
            $("#CowVaccineInfoForm").show();
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