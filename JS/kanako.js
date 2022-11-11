function login(){
    const formElements = document.forms['tameshilogin'];

    //↓　ajaxでPHPに送信するための配列作成
    let data = {
        mail:formElements.elements['mail'].value,
        pass:formElements.elements['pass'].value
    }
    console.log(data.mail+" "+data.pass);
    //↓ajaxでPHPと通信
    $.ajax({
        type: "post",   //送信の通信だと定義
        url: "PHP/itoyama.php",    //送信先のリンク
        data: data,     //送信するデータを定義
    })
    .success(function(data) {
        //通信に成功
        console.log(data[0].user_id);
        if(data[0].state == '成功'){
            sessionStorage.setItem('id',data[0].user_id);
            //console.log(`dataの型は${typeof data}`); 型の確認
            location.href='http://localhost/Web/sityakku/home.html';
        }else{
            location.href='http://localhost/Web/sityakku/toroku.html';
        }
    })
    .error(function(XMLHttpRequest, textStatus, errorThrown) {
        //通信に失敗
        console.log("XMLHttpRequest : " + XMLHttpRequest.status);  //エラーの番号
        console.log("textStatus     : " + textStatus);             //エ
        console.log("errorThrown    : " + errorThrown.message);    //エラーの情報
        //PHPのエラーではなくDBのエラーをどうするか
    });
}