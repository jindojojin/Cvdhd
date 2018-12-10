$(document).ready(function () {
    if (getCookie("name") != null) {
        document.getElementById("user").innerHTML = getCookie("name") + "<span class='caret'></span>";
        $("#logout").text('Đăng xuất');
    } else {
        $("#logout").text('Đăng nhập');
        $("#logout").attr("href") = "http://localhost:3000/login.html";
    }
    $("#logout").click(function () {
        if(getCookie("name") != null){
        deleteAllCookies();
        $("#logout").text('Đăng nhập');
        $("#logout").attr("href") = "http://localhost:3000/login.html";
        window.location.reload();
        }else{

        }
    })
})
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
