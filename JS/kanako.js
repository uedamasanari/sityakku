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
        //console.log(data[0].user_id);
        console.log(data);
        if(data[0].state == '成功'){
            sessionStorage.setItem('id',data[0].user_id);
            //console.log(`dataの型は${typeof data}`); 型の確認
           // location.href='http://xampp/htdocs/Web/sityakku/home.html';
              location.href = 'home.html';
        }else{
            if(data[0].er == 1){
                let element = document.getElementById('error');
                element.innerHTML = 'パスワードが正しくありません。';
            }else{
                let element = document.getElementById('error');
                element.innerHTML = 'メールアドレスが正しくありません。';
            }
            
            //location.href='http://localhost/Web/kanako/toroku.html';
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

function profilehen(){
    let a = sessionStorage.getItem('id');
    $.ajax({
        url: `PHP/itoyama.php/?profile=true&user_id=${a}&timestamp=${new Date().getTime()}`
    })

    .success(function(res) {
        console.log(res);

        let t1 = document.getElementById("user_name1"); 
	    t1.setAttribute("value", res[0].user_name);

        let t2 = document.getElementById("user_sintyo1"); 
	    t2.setAttribute("value", res[0].user_height);

        let t3 = document.getElementById("user_taiju1"); 
	    t3.setAttribute("value", res[0].user_weight);

        let t5 = document.getElementById("user_jusyo1"); 
	    t5.setAttribute("value", res[0].user_address);

    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("XMLHttpRequest : " + XMLHttpRequest.status);
        console.log("textStatus     : " + textStatus);
        console.log("errorThrown    : " + errorThrown.message);
    });
}