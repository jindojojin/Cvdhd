const myServerUrl = "https://cvdhd-serverdb.herokuapp.com";
$(document).ready(function () {
    $('#loader').hide();
    $("#login").hide();
    $("#navbar").hide();
    if (getCookie("name") != null) {
        document.getElementById("user").innerHTML = getCookie("name") + "<span class='caret'></span>";
        $("#logout").text('Đăng xuất');
        $("#mainbody").show();
        $("#navbar").show();
        $("#login").hide();
    } else {
        $("#mainbody").hide();
        $("#navbar").hide();
        $("#login").show();
        $("#logout").text('Đăng nhập');
    }
    $("#logout").click(function () {
        if (getCookie("name") != null) {
            deleteAllCookies();
            $("#mainbody").hide();
            $("#navbar").hide();
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
            window.location.replace("http://localhost:3000");
        },
        error: function (res) {
            console.log(res);
            $("#CowInfoForm").show();
            window.alert("Tên đăng nhập hoặc mật khẩu không đúng hoặc server đang không hoat động")
        }
    });
}
console.log(getCookie("name"));
function onloadLoading(){
    $('#loader').hide();
}
function changePage(a) {
    console.log('Changing Page')
    if (a == 'addCow') {
        $('#loader').show();
        $('#mainbody').hide();
        $('#router').show();
        var router = document.getElementById("router");
        router.innerHTML = '<iframe id="routing" style="overflow:hidden;display:block; position: absolute;height: 100%; width: 100%" frameborder="0" src="CowComponent/AddCow/addcow.html" onload="onloadLoading();"></iframe>';
        
        return;
    }
    if (a == 'home') {
        $('#router').hide();
        $('#mainbody').show();
        return;
    }
    if (a == 'food') {
        $('#loader').show();
        $('#mainbody').hide();
        $('#router').show();
        var router = document.getElementById("router");
        router.innerHTML = '<iframe style="overflow:hidden;display:block; position: absolute; height: 100%; width: 100%" frameborder="0" src="CowComponent/Food/food.html" onload="onloadLoading();"></iframe>';
        return;
    }
    if (a == 'cowHealth') {
         $('#loader').show();
        $('#mainbody').hide();
        $('#router').show();
        var router = document.getElementById("router");
        router.innerHTML = '<iframe style="overflow:hidden;display:block; position: absolute; height: 100%; width: 100%" frameborder="0" src="CowComponent/CowHealth/cowhealth.html" onload="onloadLoading();"></iframe>';
        return;
    }
    if (a == 'die') {
         $('#loader').show();
        var router = document.getElementById("router");
        $('#mainbody').hide();
        $('#router').show();
        router.innerHTML = '<iframe style="overflow:hidden;display:block; position: absolute; height: 100%; width: 100%" frameborder="0" src="CowComponent/Die/die.html" onload="onloadLoading();"></iframe>';
        return;
    }
    if (a == 'vaccine') {
         $('#loader').show();
        var router = document.getElementById("router");
        $('#mainbody').hide();
        $('#router').show();
        router.innerHTML = '<iframe style="overflow:hidden;display:block; position: absolute; height: 100%; width: 100%" frameborder="0" src="CowComponent/Vaccine/vaccine.html" onload="onloadLoading();"></iframe>';
        return;
    }
    if (a == 'sellCow') {
         $('#loader').show();
        var router = document.getElementById("router");
        $('#mainbody').hide();
        $('#router').show();
        router.innerHTML = '<iframe style="overflow:hidden;display:block; position: absolute; height: 100%; width: 100%" frameborder="0" src="CowComponent/SellCow/sellcow.html" onload="onloadLoading();"></iframe>';
        return;
    }
    if (a == 'cowSick') {
         $('#loader').show();
        var router = document.getElementById("router");
        $('#mainbody').hide();
        $('#router').show();
        router.innerHTML = '<iframe style="overflow:hidden;display:block; position: absolute; height: 100%; width: 100%" frameborder="0" src="CowComponent/Sick/sick.html" onload="onloadLoading();"></iframe>';
        return;
    }
}
function getCookie(name) {
    const nameLenPlus = (name.length + 1);
    return document.cookie
        .split(';')
        .map(c => c.trim())
        .filter(cookie => {
            return cookie.substring(0, nameLenPlus) === `${name}=`;
        })
        .map(cookie => {
            return decodeURIComponent(cookie.substring(nameLenPlus));
        })[0] || null;
}
