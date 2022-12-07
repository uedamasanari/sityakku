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
              location.href = 'home.html';
        }else{
            if(data[0].er == 1){
                let element = document.getElementById('error');
                element.innerHTML = 'パスワードが正しくありません。';
            }else{
                let element = document.getElementById('error');
                element.innerHTML = 'メールアドレスが正しくありません。';
            }
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

//新規登録ボタンがクリックされたときの処理
    function shinki1(){

    const formElements1 = document.forms['shinki'];

    //↓　ajaxでPHPに送信するための配列作成
    let data = {
        shinkimail:formElements1.elements['shinkimail'].value,
        shinkipass:formElements1.elements['shinkipass'].value
    }
    console.log(data.shinkimail+" "+data.shinkipass);
    //↓ajaxでPHPと通信
    $.ajax({
        type: "post",   //送信の通信だと定義
        url: "PHP/itoyama.php",    //送信先のリンク
        data: data,     //送信するデータを定義
    })
    .success(function(data1) {
        //通信に成功
        console.log(data1);
        if(data1[0].state == '成功'){
                alert('新規登録成功');
              location.href = 'home.html';
        }else{
                let element = document.getElementById('error1');
                element.innerHTML = '既にメールアドレスが登録されています';

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


//購入画面へ進むボタンがクリックされたときの処理
 function kessai_susumu(){

    let c = sessionStorage.getItem('id');
    $.ajax({
        url: `PHP/itoyama.php/?profile=true&user_id=${c}&timestamp=${new Date().getTime()}`
    })
    .success(function(mo) {
        console.log(mo);

        //console.log('購入画面へ進める');
        //支払い方法選択表示
        let select = document.getElementById("sel1");
        if(mo[0].user_buy == "銀行振込"){
            select.options[1].selected = true;
        }else if(mo[0].user_buy == "コンビニ払い"){
            select.options[2].selected = true;
        }else if(mo[0].user_buy == "クレジットカード"){
            select.options[3].selected = true;
        }else{
            select.options[4].selected = true;
        }
        

        
    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("XMLHttpRequest : " + XMLHttpRequest.status);
        console.log("textStatus     : " + textStatus);
        console.log("errorThrown    : " + errorThrown.message);
    });

}

//購入確認ボタンクリック時の動き
    function kakunin(){

        //支払い方法などのデータをlocalstorageで保存
        if(window.localStorage){
            let e = sessionStorage.getItem('id');
             //↓セレクトボックスの値を取得
            let sele1 = document.getElementById('bday-month');
            let num = sele1.selectedIndex;//値(数値)を取得
            let str = sele1.options[num].value;// 値(数値)から値(value値)を取得月
  
            let sele2 = document.getElementById('bday-day');
            let num2 = sele2.selectedIndex;//値(数値)を取得
            let str2 = sele2.options[num2].value;// 値(数値)から値(value値)を取得日にち

            let sele3 = document.getElementById('sel1');
            let num3 = sele3.selectedIndex;//値(数値)を取得
            let str3 = sele3.options[num3].value;// 値(数値)から値(value値)を取得支払い

            let yuubin = document.getElementById('yuubin').value;
            let ken = document.getElementById('ken').value;
            let sityou = document.getElementById('sityou').value;
            let banti = document.getElementById('sityou').value;
            let heyaban = document.getElementById('heyaban').value;

            let reslte = window.confirm(str+'月'+str2+'日'+str3+''+'〒'+yuubin+ken+sityou+banti+heyaban+'の内容でよろしかったでしょうか。');
            if(reslte == true){
            alert("購入が確定しました！");
            location.href = 'home.html';
            }

 }
}  



function shinkihe(){
    location.href = 'toroku.html';
}

function shinkirogu(){
    location.href = 'rogin.html';
}

// let tbody = document.getElementsByClassName('tbody');
// let add_code = '<div class="productitm div-flex-home div-btween"><div class="cart_div"><img src="https://i.imgur.com/8goC6r6.png" class="thumb"></div><div class="cart_div2"><span class="remove"><div class="wishlist-heart-group"><input name="product-333" id="product-333" data-product-id="333" type="checkbox" /><div class="cart_hato" onclick="hato()"><img src="script/heart.png" alt="" width="16" height="16" class="bi bi-heart"></div></div></span></div><div class="cart_name">じゃっけと</div><div class="cart_money">1000円</div><div class="cart_saku" onclick="sakujo()"><img src="script/sakujo.png" alt="" width="20" height="20" class="bi bi-trash"></div></div>';
// tbody.innerHTML = add_code;

//やるべきこと
//カートの削除機能でのitemidを取得してPHP側で動かせる・カートに入っている情報を繰り返し表示させる
//カートでのハートボタンのJSの動作 あと少し

