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
        //合計金額表示
        let gou = document.getElementById('goukei');
        gou.innerHTML = sum;
        //カートの中の数量
        let hyou = document.getElementById('suuryou');
        hyou.innerHTML = res.length + "点";

        let co = document.getElementById('cartcount');
        co.innerHTML = res.length;

        //表示される分の枠を作る必要がある　ここをなんとかする！！！
        // for(let i = 0; i < res.length; i++){

        //     let mei = document.getElementById('syouhin_mei');
        //     let kin = document.getElementById('syouhin_kin');
        //     let pic = document.getElementsByClassName('thumb');
        //     pic.innerHTML = res[i].item_image;
        //     mei.innerHTML = res[i].item_name;
        //     kin.innerHTML = res[i].item_money + "円";
        // }
        
        // let stockList = []; //ここが配列になる
        // for (let i=0; i<res.length; i++){
        // stockList.push('<li></li><img src = "'+res[i].item_img+'"><div>'+res[i].item_name+'</div><div>'+res[i].item_money+'</div></li>'); //ここにpush()がくる
        // }

        // document.getElementById('li1').innerHTML = stockList.join(''); //innerHTMLへ入れる時にjoin()で文字列にする
        
    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("XMLHttpRequest : " + XMLHttpRequest.status);
        console.log("textStatus     : " + textStatus);
        console.log("errorThrown    : " + errorThrown.message);
    });
}

//カートの削除ボタンが押されたときの処理    itemidを取得する
// let cartsakujo = document.getElementById('sakujo');
// cartsakujo.addEventListener('click',function(){
    function sakujo(){

    let b = sessionStorage.getItem('id');
    $.ajax({
        url: `PHP/itoyama.php/?cart=true}&id=${b}$timestamp=${new Date().getTime()}`,
        //ここ！！url: `PHP/itoyama.php/?cartsakujo=true}&id=${b}&itemid=${item}$timestamp=${new Date().getTime()}`

    })
    .success(function(data1) {
        //通信に成功
        console.log(data1);
        //console.log(data2);

        
    })
    .error(function(XMLHttpRequest, textStatus, errorThrown) {
        //通信に失敗
        console.log("XMLHttpRequest : " + XMLHttpRequest.status);  
        console.log("textStatus     : " + textStatus);             
        console.log("errorThrown    : " + errorThrown.message);    
        //PHPのエラーではなくDBのエラーをどうするか
    });
}

//カートのお気に入りボタンがクリックされたときの処理
// let okini = document.getElementById('okiniiri');
// okini.addEventListener('click',function(){
    function hato(){
        let okiid = sessionStorage.getItem('id');
        $.ajax({
            url: `PHP/itoyama.php/?cart=true&id=${okiid}$timestamp=${new Date().getTime()}`
        })
    
        .success(function(data) {
            //通信に成功
            console.log(data);
            let user = data.user_id;
            let item = data.item_id;
            $.ajax({
                url: `PHP/itoyama.php/?favo=true&id=${user}&itemid=${item}$timestamp=${new Date().getTime()}`
            })
            .success(function(sei){
                console.log(sei);
                alert('お気に入り登録完了');
            })
            .error(function(XMLHttpRequest, textStatus, errorThrown) {
                //通信に失敗
                console.log("XMLHttpRequest : " + XMLHttpRequest.status);  //エラーの番号
                console.log("textStatus     : " + textStatus);             //エ
                console.log("errorThrown    : " + errorThrown.message);    //エラーの情報
                //PHPのエラーではなくDBのエラーをどうするか
            });
            
        })
        .error(function(XMLHttpRequest, textStatus, errorThrown) {
            //通信に失敗
            console.log("XMLHttpRequest : " + XMLHttpRequest.status);  //エラーの番号
            console.log("textStatus     : " + textStatus);             //エ
            console.log("errorThrown    : " + errorThrown.message);    //エラーの情報
            //PHPのエラーではなくDBのエラーをどうするか
        });
    }

