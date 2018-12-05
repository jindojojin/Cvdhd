function changePage(a){
    console.log('Changing Page')
    if(a == 'addCow'){
        var router = document.getElementById("router");
        // router.removeChild();
        router.innerHTML='<iframe width="100%" height="100%" frameborder="0" src="CowComponent/AddCow/addcow.html"></iframe>';
        return;
    }
    if(a == 'home'){
        var router = document.getElementById("router");
        // router.removeChild();
        router.innerHTML='<iframe width="100%" height="100%" frameborder="0" src="index.html"></iframe>';
        return;
    }
    if(a == 'foods'){
        var router = document.getElementById("router");
        // router.removeChild();
        router.innerHTML='<iframe width="100%" height="100%" frameborder="0" src="CowComponent/Food/food.html"></iframe>';
        return;
    }
    if(a == 'cowHealth'){
        var router = document.getElementById("router");
        // router.removeChild();
        router.innerHTML='<iframe width="100%" height="100%" frameborder="0" src="CowComponent/CowHealth/cowhealth.html"></iframe>';
        return;
    }
    if(a == 'image'){
        var router = document.getElementById("router");
        // router.removeChild();
        router.innerHTML='<iframe width="100%" height="100%" frameborder="0" src="CowComponent/Image/image.html"></iframe>';
        return;
    }
    if(a == 'vaccine'){
        var router = document.getElementById("router");
        // router.removeChild();
        router.innerHTML='<iframe width="100%" height="100%" frameborder="0" src="CowComponent/Vaccine/vaccine.html"></iframe>';
        return;
    }
    if(a == 'sellCow'){
        var router = document.getElementById("router");
        // router.removeChild();
        router.innerHTML='<iframe width="100%" height="100%" frameborder="0" src="CowComponent/SellCow/sellcow.html"></iframe>';
        return;
    }
}