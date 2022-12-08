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

        let cc = sessionStorage.getItem('id');

        //支払い方法などのデータをlocalstorageで保存
        //if(window.localStorage){
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
            let jusyo =ken+sityou+banti+heyaban;
            //let time1 = str+'月'+str2+'日';

            let reslte = window.confirm(str+'月'+str2+'日'+str3+''+'〒'+yuubin+ken+sityou+banti+heyaban+'の内容でよろしかったでしょうか。');
            
            if(reslte == true){
            alert("購入が確定しました！");

                    //決済にデータを入れる処理をする
                    let cc1 = Number(cc);
                    let data1 = {
                        kid : cc1,
                        buy     : str3,
                        address1 : jusyo,
                    }
                    console.log(data1);
                    //↓ajaxでPHPと通信
                    $.ajax({
                        type: "post",   //送信の通信だと定義
                        url: "PHP/itoyama.php",    //送信先のリンク
                        data: data1,     //送信するデータを定義
                    })
                    .success(function(data) {
                        //通信に成功
                        //alert('段階１');
                        //カートの中身を全部消す処理の前にセッションの削除
                        $.ajax({
                            url: `PHP/itoyama.php/?cart=true&id=${cc}$timestamp=${new Date().getTime()}`
                        })
                        .success(function(mo1) {
                            console.log(mo1);
                            let sakuco = mo1.length;
                            if(sakuco == 1){
                                let storageItem1 = JSON.parse(sessionStorage.getItem('itemdata1'));
                                let saku1 = storageItem1.itemid1;
                                sessionStorage.removeItem('itemdata1');
                                //決済詳細へデータを保存する処理1
                                let ke1 = {
                                    kid1 : cc1,//sessonid
                                    iid1 :saku1,
                                }
                                console.log(data1);
                                //↓ajaxでPHPと通信
                                $.ajax({
                                    type: "post",   //送信の通信だと定義
                                    url: "PHP/itoyama.php",    //送信先のリンク
                                    data: ke1,     //送信するデータを定義
                                })
                                .success(function(mo22) {
                                    console.log(mo22);
                                    //alert('決済詳細完了');
                                    
                                }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                                    console.log("XMLHttpRequest : " + XMLHttpRequest.status);
                                    console.log("textStatus     : " + textStatus);
                                    console.log("errorThrown    : " + errorThrown.message);
                                });
                            }else if(sakuco == 2){
                                let storageItem1 = JSON.parse(sessionStorage.getItem('itemdata1'));
                                let saku1 = storageItem1.itemid1;
                                let storageItem2 = JSON.parse(sessionStorage.getItem('itemdata2'));
                                let saku2 = storageItem2.itemid2;
                                sessionStorage.removeItem('itemdata1');
                                sessionStorage.removeItem('itemdata2');
                                //決済詳細へデータを保存する処理1
                                let ke2 = {
                                    kid2 : cc1,//sessonid
                                    iid1 :saku1,
                                    iid2 :saku2
                                }
                                console.log(data1);
                                //↓ajaxでPHPと通信
                                $.ajax({
                                    type: "post",   //送信の通信だと定義
                                    url: "PHP/itoyama.php",    //送信先のリンク
                                    data: ke2,     //送信するデータを定義
                                })
                                .success(function(mo22) {
                                    console.log(mo22);
                                    //alert('決済詳細完了');
                                    
                                }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                                    console.log("XMLHttpRequest : " + XMLHttpRequest.status);
                                    console.log("textStatus     : " + textStatus);
                                    console.log("errorThrown    : " + errorThrown.message);
                                });
                            }else if(sakuco == 3){
                                let storageItem1 = JSON.parse(sessionStorage.getItem('itemdata1'));
                                let saku1 = storageItem1.itemid1;
                                let storageItem2 = JSON.parse(sessionStorage.getItem('itemdata2'));
                                let saku2 = storageItem2.itemid2;
                                let storageItem3 = JSON.parse(sessionStorage.getItem('itemdata3'));
                                let saku3 = storageItem3.itemid3;
                                sessionStorage.removeItem('itemdata1');
                                sessionStorage.removeItem('itemdata2');
                                sessionStorage.removeItem('itemdata3');
                                //決済詳細へデータを保存する処理1
                                let ke3 = {
                                    kid3 : cc1,//sessonid
                                    iid1 :saku1,
                                    iid2 :saku2,
                                    iid3 :saku3
                                }
                                console.log(ke3);
                                //↓ajaxでPHPと通信
                                $.ajax({
                                    type: "post",   //送信の通信だと定義
                                    url: "PHP/itoyama.php",    //送信先のリンク
                                    data: ke3,     //送信するデータを定義
                                })
                                .success(function(mo22) {
                                    console.log(mo22);
                                    alert('決済詳細3完了');
                                    
                                }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                                    console.log("XMLHttpRequest : " + XMLHttpRequest.status);
                                    console.log("textStatus     : " + textStatus);
                                    console.log("errorThrown    : " + errorThrown.message);
                                });
                            }else if(sakuco == 4){
                                let storageItem1 = JSON.parse(sessionStorage.getItem('itemdata1'));
                                let saku1 = storageItem1.itemid1;
                                let storageItem2 = JSON.parse(sessionStorage.getItem('itemdata2'));
                                let saku2 = storageItem2.itemid2;
                                let storageItem3 = JSON.parse(sessionStorage.getItem('itemdata3'));
                                let saku3 = storageItem3.itemid3;
                                let storageItem4 = JSON.parse(sessionStorage.getItem('itemdata4'));
                                let saku4 = storageItem4.itemid4;
                                sessionStorage.removeItem('itemdata1');
                                sessionStorage.removeItem('itemdata2');
                                sessionStorage.removeItem('itemdata3');
                                sessionStorage.removeItem('itemdata4');
                                //決済詳細へデータを保存する処理1
                                let ke4 = {
                                    kid4 : cc1,//sessonid
                                    iid1 :saku1,
                                    iid2 :saku2,
                                    iid3 :saku3,
                                    iid4 :saku4
                                }
                                console.log(ke4);
                                //↓ajaxでPHPと通信
                                $.ajax({
                                    type: "post",   //送信の通信だと定義
                                    url: "PHP/itoyama.php",    //送信先のリンク
                                    data: ke4,     //送信するデータを定義
                                })
                                .success(function(mo22) {
                                    console.log(mo22);
                                    //alert('決済詳細4完了');
                                    
                                }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                                    console.log("XMLHttpRequest : " + XMLHttpRequest.status);
                                    console.log("textStatus     : " + textStatus);
                                    console.log("errorThrown    : " + errorThrown.message);
                                });
                            }
                            
                        }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                            console.log("XMLHttpRequest : " + XMLHttpRequest.status);
                            console.log("textStatus     : " + textStatus);
                            console.log("errorThrown    : " + errorThrown.message);
                        });
                        
                    })
                    .error(function(XMLHttpRequest, textStatus, errorThrown) {
                        //通信に失敗
                        console.log("XMLHttpRequest : " + XMLHttpRequest.status);  //エラーの番号
                        console.log("textStatus     : " + textStatus);             //エ
                        console.log("errorThrown    : " + errorThrown.message);    //エラーの情報
                        //PHPのエラーではなくDBのエラーをどうするか
                    });

                //location.href = 'home.html';
            }

 }
//}  



function shinkihe(){
    location.href = 'toroku.html';
}

function shinkirogu(){
    location.href = 'rogin.html';
}




//カートの中身を全部消す処理
// $.ajax({
//     url: `PHP/itoyama.php/?cartallsaku=true&id=${cc}&timestamp=${new Date().getTime()}`
// })
// .success(function(mo2) {
//     console.log(mo2);
//     //alert('カートの中身削除完了');
    
// }).error(function(XMLHttpRequest, textStatus, errorThrown) {
//     console.log("XMLHttpRequest : " + XMLHttpRequest.status);
//     console.log("textStatus     : " + textStatus);
//     console.log("errorThrown    : " + errorThrown.message);
// });