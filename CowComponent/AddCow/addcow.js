/*CowInfoStruct={
    _id,          //(Số hiệu) chuỗi 12 kí tự gồm mã quốc gia (2 kí tự chữ), mã trang trại nằm trong hệ thống(3 kí tự số), mã con bò (8 kí tự số)
    _sex,         //(Giới tính) 1 (Đực) hoặc 0 (Cái)
    _birthday,    //(Ngày sinh) yyyy/mm/dd
    _birthplace,  //(Nơi sinh) string (tiếng việt có dấu)
    _gender,      //(Mã giống) chuỗi <= 30 kí tự (tiếng việt có dấu)
    _fatherID,    // nếu không có sẽ truyền -1
    _fatherGender,//(Mã giống của cha) chuỗi <= 30 kí tự (tiếng việt có dấu)
    _motherID,    // nếu không có sẽ truyền -1
    _motherGender,//(Mã giống của mẹ) chuỗi <= 30 kí tự (tiếng việt có dấu)
}*/
const myServerUrl = "http://localhost:9000"
var availableFarm = [];
var farmInfo = [];
$(document).ready(function () {
    $("#submit_btn").click(function () {
        let cowInfo = getCowInfo();
        if (validateCowInfo(cowInfo)) {
            console.log(cowInfo);
            $.post(myServerUrl + '/addCow', cowInfo, (data, status) => {
                console.log(status);
                console.log(data);
            })
        } else {
            return;
        }
    });
    $.get(myServerUrl + "/allFarm", (data, status) => {
        if (status == "success") {
            console.log(data)
            farmInfo = JSON.parse(data);
            console.log(farmInfo)
            makeSuggestion(farmInfo);// gợi ý khi nhập mã trang trại
        }
    })

    $("#_farmID").autocomplete({
        source: availableFarm
    });
    $("#_farmID").blur(function(){
        console.log("changed")
        // console.log(farmInfo);
        farmInfo.forEach(farm => {
            if($("#_farmID").val() == farm._farmCode){
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
    cowInfo._birthplace = $('#_birthplace').val().trim();
    cowInfo._gender = $('#_gender').val().trim();
    cowInfo._fatherID = $('#_fatherID').val().trim();
    cowInfo._fatherGender = $('#_fatherGender').val().trim();
    cowInfo._motherID = $('#_motherID').val().trim();
    cowInfo._motherGender = $('#_motherGender').val().trim();
    return cowInfo;
}

function validateCowInfo(cowInfo) {
    var ok = true;
    //Đặt lại color bình thường
    $('#_id').css('border-color', '');
    $('#_gender').css('border-color', '');
    $('#_birthplace').css('border-color', '');
    $('#_birthday').css('border-color', '');
    $('#_fatherID').css('border-color', '');
    $('#_motherID').css('border-color', '');
    //Nếu có lỗi ở 1 trường thì chuyển border thành đỏ ở input :)
    if (!$('#_id2').is(":checked") && (cowInfo._id.length != 12 || cowInfo._id.includes(" "))) {
        $('#_id').css('border-color', 'red');
        ok = false;
    }
    if (cowInfo._fatherID != "" && (cowInfo._fatherID.length != 12 || cowInfo._fatherID.includes(" "))) {
        $('#_fatherID').css('border-color', 'red');
        ok = false;
    }
    if (cowInfo._motherID != "" && (cowInfo._motherID.length != 12 || cowInfo._motherID.includes(" "))) {
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
    return ok;
}

function makeSuggestion() {
    farmInfo.forEach(farm => {
        console.log(farm);
        console.log("o")
        this.availableFarm.push({ label: (farm._farmCode + ': '+farm._name+"( " + farm._address+")"), value: farm._farmCode })
    });
    console.log(this.availableFarm)
}