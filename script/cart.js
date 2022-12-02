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

