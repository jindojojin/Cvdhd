const myServerUrl = "https://cvdhd-serverdb.herokuapp.com";
$(document).ready(function () {
    if (getCookie("name") != null) {
        document.getElementById("user").innerHTML = getCookie("name") + "<span class='caret'></span>";
        $("#logout").text('Đăng xuất');
        $("#mainbody").show();
        $("#login").hide();
    } else {
        $("#mainbody").hide();
        $("#login").show();
        $("#logout").text('Đăng nhập');
    }
    $("#logout").click(function () {
        if (getCookie("name") != null) {
            deleteAllCookies();
            $("#mainbody").hide();
            $("#login").show();
            $("#logout").text('Đăng nhập');
            window.location.reload();
        } else {

        }
    })

    $("#login_btn").click(function () {
        if (validateUser()) {
            username = $("#username").val();
            password = $("#password").val();
            login(username, password);
            console.log("đang đăng nhập");
        }
    });
});
function validateUser() {
    return true;
}

function login(u, p) {
    $.ajax({
        url: myServerUrl + "/login",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ "username": u, "password": p }),
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
console.log(getCookie("name"));
function changePage(a) {
    console.log('Changing Page')
    if (a == 'addCow') {
        var router = document.getElementById("router");
        $('#router').show();
        $('#mainbody').hide();
        router.innerHTML = '<iframe style="overflow:hidden;display:block; position: absolute; height: 100%; width: 100%" frameborder="0" src="CowComponent/AddCow/addcow.html"></iframe>';
        return;
    }
    if (a == 'home') {
        $('#router').hide();
        $('#mainbody').show();
        return;
    }
    if (a == 'food') {
        $('#mainbody').hide();
        $('#router').show();
        var router = document.getElementById("router");
        router.innerHTML = '<iframe style="overflow:hidden;display:block; position: absolute; height: 100%; width: 100%" frameborder="0" src="CowComponent/Food/food.html"></iframe>';
        return;
    }
    if (a == 'cowHealth') {
        $('#mainbody').hide();
        $('#router').show();
        var router = document.getElementById("router");
        router.innerHTML = '<iframe style="overflow:hidden;display:block; position: absolute; height: 100%; width: 100%" frameborder="0" src="CowComponent/CowHealth/cowhealth.html"></iframe>';
        return;
    }
    if (a == 'die') {
        var router = document.getElementById("router");
        $('#mainbody').hide();
        $('#router').show();
        router.innerHTML = '<iframe style="overflow:hidden;display:block; position: absolute; height: 100%; width: 100%" frameborder="0" src="CowComponent/Die/die.html"></iframe>';
        return;
    }
    if (a == 'vaccine') {
        var router = document.getElementById("router");
        $('#mainbody').hide();
        $('#router').show();
        router.innerHTML = '<iframe style="overflow:hidden;display:block; position: absolute; height: 100%; width: 100%" frameborder="0" src="CowComponent/Vaccine/vaccine.html"></iframe>';
        return;
    }
    if (a == 'sellCow') {
        var router = document.getElementById("router");
        $('#mainbody').hide();
        $('#router').show();
        router.innerHTML = '<iframe style="overflow:hidden;display:block; position: absolute; height: 100%; width: 100%" frameborder="0" src="CowComponent/SellCow/sellcow.html"></iframe>';
        return;
    }
}
