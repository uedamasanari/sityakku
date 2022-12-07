

//カートのお気に入りボタンがクリックされたときの処理
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

