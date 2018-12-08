/*CowInfoStruct={
    _id,          //(Số hiệu) chuỗi 11 kí tự gồm trang trại nằm trong hệ thống(3 kí tự in hoa), mã con bò (8 kí tự số)
    _sex,         //(Giới tính) 1 (Đực) hoặc 0 (Cái)
    _birthday,    //(Ngày sinh) yyyy/mm/dd
    _birthplace,  //(Nơi sinh) string (tiếng việt có dấu)
    _gender,      //(Mã giống) chuỗi <= 30 kí tự (tiếng việt có dấu)
    _fatherID,    // nếu không có sẽ truyền -1
    _fatherGender,//(Mã giống của cha) chuỗi <= 30 kí tự (tiếng việt có dấu)
    _motherID,    // nếu không có sẽ truyền -1
    _motherGender,//(Mã giống của mẹ) chuỗi <= 30 kí tự (tiếng việt có dấu)
}*/
// import { Coursetro } from '../CowStruct.js';
const myServerUrl = "http://localhost:9000";
var availableFarm = [];
var availableGender = [];
var genderInfo = [];
var farmInfo = [];
var blockchainData;
$(document).ready(function () {
    $("#loader").hide();
    $("#spiner").hide();
    $("#submit_btn").click(function () {  /// khi bấm nút đẩy dữ liệu -> gửi dữ liệu cho server xác thực và tạo id cho bò
        let cowInfo = getCowInfo();
        if (validateCowInfo(cowInfo)) {
            $("#loader").show();
            // $("#CowInfoForm").hide();
            console.log(cowInfo);
            $.ajax({
                url: myServerUrl + "/addCow",
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(cowInfo),
                dataType: 'json',
                success: function (data) {
                    console.log("success")
                    // cowInfo._id = data._id; // lấy id do server trả về và đẩy dữ liệu lên blockchain
                    console.log(data);
                    cowInfo._id = data._id;
                    blockchainData = JSON.stringify(cowInfo);
                    $("#dataBlockchain").text(blockchainData);
                    $("#CowID").text(data._id);
                    $("#CowInfoForm").show();
                    $("#loader").hide();
                    $("#showModal").click();
                    $("#closeChainModal").show();
                    $("#pushToChain_btn").show();
                    // b = data;
                },
                error: function (res) {
                    console.log(res);
                    $("#CowInfoForm").show();
                }
            });
        } else {
            $("#loader").hide()

            return;
        }
    });
    $("#pushToChain_btn").click(function () {
        console.log("đã gọi đế nút đẩy blockchain");
        if (blockchainData._id != "") {
            let id = JSON.parse(blockchainData)._id;
            console.log("called to pushToBlockChain");
            //1 la kieu CowInfo
            let type = 1;
            $("#spiner").show();
            pushDataToBlockchain(id, blockchainData, type);
        }
    })
    $.get(myServerUrl + "/allFarm", (data, status) => {
        if (status == "success") {
            // console.log(data)
            farmInfo = JSON.parse(data);
            makeFarmSuggestion(farmInfo);// tạo data cho gợi ý khi nhập mã trang trại
        }
    });
    $.get(myServerUrl + "/allGender", (data, status) => {
        if (status == "success") {
            // console.log(data)
            genderInfo = JSON.parse(data);
            makeGenderSuggestion();// tạo data cho gợi ý khi nhập mã trang trại
        }
    })
    //Hiển thị gợi ý khi nhập mã trang trại
    //autocompete là hàm của jquery
    $("#_farmID").autocomplete({
        source: availableFarm
    });
    $("#_gender").autocomplete({
        source: availableGender
    }); $("#_fatherGender").autocomplete({
        source: availableGender
    }); $("#_motherGender").autocomplete({
        source: availableGender
    });
    $("#_farmID").blur(function () {
        console.log("changed")
        // console.log(farmInfo);
        farmInfo.forEach(farm => {
            if ($("#_farmID").val() == farm._farmCode) {
                console.log("found");
                $("#_farmName").val(farm._name);
                $("#_farmAddress").val(farm._address);
                $("#_farmOwner").val(farm._ownerName);
                return;
            }
        });
    });
});


function getCowInfo() {
    let cowInfo = {};
    cowInfo._id = ($('#_id2').is(":checked")) ? "" : $('#_id').val().trim();
    cowInfo._sex = $('#_sex').val().trim();
    cowInfo._birthday = $('#_birthday').val().trim();
    // console.log(new Date(cowInfo._birthday).toISOString());
    cowInfo._birthplace = $('#_birthplace').val().trim();
    cowInfo._gender = $('#_gender').val().trim().substring(0, 3);
    cowInfo._fatherID = $('#_fatherID').val().trim();
    cowInfo._fatherGender = $('#_fatherGender').val().trim().substring(0, 3);
    cowInfo._motherID = $('#_motherID').val().trim();
    cowInfo._motherGender = $('#_motherGender').val().trim().substring(0, 3);
    cowInfo._farmID = $('#_farmID').val().trim();
    console.log(cowInfo);
    return cowInfo;
}

function validateCowInfo(cowInfo) {
    console.log("bat dau validate");
    var ok = true;
    //Đặt lại color bình thường
    $('#_id').css('border-color', '');
    $('#_gender').css('border-color', '');
    $('#_birthplace').css('border-color', '');
    $('#_birthday').css('border-color', '');
    $('#_fatherID').css('border-color', '');
    $('#_motherID').css('border-color', '');
    //Nếu có lỗi ở 1 trường thì chuyển border thành đỏ ở input :)
    if (!$('#_id2').is(":checked") && (cowInfo._id.length != 11 || cowInfo._id.includes(" "))) {
        $('#_id').css('border-color', 'red');
        ok = false;
    }
    if (cowInfo._fatherID != "" && (cowInfo._fatherID.length != 11 || cowInfo._fatherID.includes(" "))) {
        $('#_fatherID').css('border-color', 'red');
        ok = false;
    }
    if (cowInfo._motherID != "" && (cowInfo._motherID.length != 11 || cowInfo._motherID.includes(" "))) {
        $('#_motherID').css('border-color', 'red');
        ok = false;
    }
    if (cowInfo._gender == "") {
        $('#_gender').css('border-color', 'red');
        ok = false;
    }
    if (cowInfo._birthplace == "") {
        $('#_birthplace').css('border-color', 'red');
        ok = false;
    }
    if (cowInfo._birthday == "") {
        $('#_birthday').css('border-color', 'red');
        ok = false;
    }
    console.log("ket thuc validate");

    return ok;
}

function makeFarmSuggestion() {
    farmInfo.forEach(farm => {
        // console.log(farm);
        this.availableFarm.push({ label: (farm._farmCode + ': ' + farm._name + "( " + farm._address + ")"), value: farm._farmCode })
    });
    // console.log(this.availableFarm)
}

function makeGenderSuggestion() {
    genderInfo.forEach(gender => {
        // console.log(farm);
        // console.log("o")
        this.availableGender.push({ label: (gender._id + ': ' + gender._title), value: (gender._id + ': ' + gender._title) })
    });
    // console.log(this.availableFarm)
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