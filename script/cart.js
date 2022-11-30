window.onload = function () {

    //console.log("javascript開始");
    let a = sessionStorage.getItem('id');
    $.ajax({
        url: `PHP/itoyama.php/?cart=true&id=${a}$timestamp=${new Date().getTime()}`
    })
    .success(function(res) {
        console.log(res);

        //合計金額計算
        let sum = 0;
        for(let a = 0; a < res.length;a++){
            sum = sum +  res[a].item_money;
        }
        //console.log(sum);//合計金額表示
        let gou = document.getElementById('goukei');
        gou.innerHTML = sum;
        //console.log(res.length);//カートの中の数量
        let hyou = document.getElementById('suuryou');
        hyou.innerHTML = res.length + "点";

        let co = document.getElementById('cartcount');
        co.innerHTML = res.length;

        //表示される分の枠を作る必要がある
        for(let i = 0; i < res.length; i++){

            let mei = document.getElementById('syouhin_mei');
            let kin = document.getElementById('syouhin_kin');
            let pic = document.getElementsByClassName('thumb');
            pic.innerHTML = res[i].item_image;
            mei.innerHTML = res[i].item_name;
            kin.innerHTML = res[i].item_money + "円";
        }

        
    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("XMLHttpRequest : " + XMLHttpRequest.status);
        console.log("textStatus     : " + textStatus);
        console.log("errorThrown    : " + errorThrown.message);
    });
}

let cartsakujo = document.getElementById('sakujo');
cartsakujo.addEventListener('click',function(){

    let b = sessionStorage.getItem('id');
    document.getElementsByClassName('remove').addEventListener('click',hoge);
    $.ajax({
        url: `PHP/itoyama.php/?cartsakujo=true&id=${b}&itemid=${item}$timestamp=${new Date().getTime()}`
    })
    .success(function(data) {
        //通信に成功
        console.log(data);
        
    })
    .error(function(XMLHttpRequest, textStatus, errorThrown) {
        //通信に失敗
        console.log("XMLHttpRequest : " + XMLHttpRequest.status);  
        console.log("textStatus     : " + textStatus);             
        console.log("errorThrown    : " + errorThrown.message);    
        //PHPのエラーではなくDBのエラーをどうするか
    });
});

function hoge(e){
    console.log(e.target.id);
}

