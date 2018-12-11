const myServerUrl = "https://cvdhd-serverdb.herokuapp.com";
$(document).ready(function () {
    $("#login_btn").click(function () {
        if(validateUser()){
            username= $("#username").val();
            password=$("#password").val();
            login(username,password);
            console.log("đang đăng nhập");
        }
    });
});
function validateUser(){
    return true;
}

function login(u,p){
    $.ajax({
        url: myServerUrl + "/login",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({"username":u,"password":p}),
        dataType: 'json',
        success: function (data) {
            console.log(data);
            setCookie("name", data.name, 1);
            setCookie("tk", data.token, 1);
            window.location.replace("http://192.168.100.23:3000"); 
        },
        error: function (res) {
            console.log(res);
            $("#CowInfoForm").show();
            window.alert("Tên đăng nhập hoặc mật khẩu không đúng hoặc server đang không hoat động")
        }
    });
}