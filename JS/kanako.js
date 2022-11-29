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

let ugoku = document.getElementById('submitbtn');
ugoku.addEventListener('click',function(){
// function kessai_susumu(){

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

});

//購入確認ボタンクリック時の動き
let kaku = document.getElementById('kakunin');
kaku.addEventListener('click',function(){

        //支払い方法などのデータをlocalstorageで保存
        if(window.localStorage){
            let e = sessionStorage.getItem('id');
             //↓セレクトボックスの値を取得
            const sele1 = document.getElementById('bday-month');
            const num = sele1.selectedIndex;//値(数値)を取得
            const str = sele1.options[num].value;// 値(数値)から値(value値)を取得
  
            const sele2 = document.getElementById('bday-month');
            const num2 = sele2.selectedIndex;//値(数値)を取得
            const str2 = sele1.options[num2].value;// 値(数値)から値(value値)を取得

            let data = {
                id:e,
                siha:document.getElementById('sel1').value,
                yuubin:document.getElementById('yuubin').value,
                ken:document.getElementById('ken').value,
                sityou:document.getElementById('sityou').value,
                banti:document.getElementById('banti').value,
                heyaban:document.getElementById('heyaban').value,
                tuki:str,
                day2:str2

            };
            let json = JSON.stringify(data,undefined,1);
            localStorage.setItem('key',json);
        }
        

        let d = sessionStorage.getItem('id');
        $.ajax({
            url: `PHP/itoyama.php/?cart=true&id=${d}$timestamp=${new Date().getTime()}`
        })

        .success(function(res) {
            console.log(res);
            let data1 = localStorage.getItem('key');
            data1 = JSON.parse(data1);
            console.log(data1.siha);
            console.log(data1.tuki);
            console.log(data1.day2);
            document.getElementById('kaku_siha').value = data1.siha;
            // let kakukibou = document.getElementById('kaku_kiboubi');
            // kakukibou.textContent = data1.tosi+data1.tuki+data1.day;
            // let kakujuu = document.getElementById('kaku_juu');
            // kakujuu.textContent = data1.ken+data1.sityou+data1.banti+data1.heyaban;
            //let list = document.getElementsByClassName('swiper-slide modalInSlider');
            // for(let i = 0; i<res.length;i++){
            //     let ele = document.createElement('div');
            //     ele.className = 'list-all';
            //     list.appendChild(ele);
            //     ele = document.createElement('ol');
            //     ele.className = 'sample1';
            //     list.appendChild(ele);
            //     ele = document.createElement('li');
            //     ele.className = 'li';
            //     let tag = document.getElementsByClassName('sample1');
            //     tag.appendChild(ele);
            //     ele = document.createElement('img');
            //     ele.src = "";
            //     ele.alt = "";
            //     ele.className = 'i-img';
            //     tag = document.getElementsByClassName('li');
            //     tag.appendChild(ele);
            //     ele = document.createElement('div');
            //     ele.className = 'ko-gona';
            //     ele.textContent = res[i].item_name;
            //     tag.appendChild(ele);
            //     ele = document.createElement('div');
            //     ele.className = 'ko-dol';
            //     ele.textContent = res[i].item_money;
            // }

            
        }).error(function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("XMLHttpRequest : " + XMLHttpRequest.status);
            console.log("textStatus     : " + textStatus);
            console.log("errorThrown    : " + errorThrown.message);
        });

});

//購入確定のボタンがクリックされたときの処理
let kakutei= document.getElementById('kou_kakutei');
kakutei.addEventListener('click',function(){
    alert("購入が確定しました！");
    location.href = 'home.html';
});
