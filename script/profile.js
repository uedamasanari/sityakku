window.addEventListener("load", function () {
    // 実行したい処理
    //alert('ページの読み込みが完了したよ！');

    let a = sessionStorage.getItem('id');
    $.ajax({
        url: `PHP/itoyama.php/?profile=true&user_id=${a}&timestamp=${new Date().getTime()}`
    })

    .success(function(res) {
        console.log(res);

        let t1 = document.getElementById("user_name"); 
	    t1.setAttribute("value", res[0].user_name);

        let t2 = document.getElementById("user_sintyou"); 
	    t2.setAttribute("value", res[0].user_height);

        let t3 = document.getElementById("user_taiju"); 
	    t3.setAttribute("value", res[0].user_weight);

        let t5 = document.getElementById("user_jusyo"); 
	    t5.setAttribute("value", res[0].user_address);

        if(res[0].user_gender == "男"){
            let te = document.getElementById('user_sei');
            te.innerHTML= '男性';
        }else{
            let te = document.getElementById('user_sei');
            te.innerHTML= '女性';
        }

        let t6 = document.getElementById('user_siharai');
        t6.innerHTML = res[0].user_buy;

        //編集画面の動き
        let hename = document.getElementById("user_name1"); 
	    hename.setAttribute("value", res[0].user_name);

        let hesin = document.getElementById("user_sintyou1"); 
	    hesin.setAttribute("value", res[0].user_height);

        let hetai = document.getElementById("user_taiju1"); 
	    hetai.setAttribute("value", res[0].user_weight);

        let heju = document.getElementById("user_jusyo1"); 
	    heju.setAttribute("value", res[0].user_address);

        let hoge = document.getElementsByName("sei");
        if(res[0].user_gender == "男"){
            hoge[0].checked = true;
        }else{
            hoge[1].checked = true;
        }

        let select = document.getElementById("select_1");
        if(res[0].user_buy == "銀行振込"){
            select.options[0].selected = true;
        }else if(res[0].user_buy == "コンビニ払い"){
            select.options[1].selected = true;
        }else if(res[0].user_buy == "クレジットカード"){
            select.options[2].selected = true;
        }else{
            select.options[3].selected = true;
        }


    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("XMLHttpRequest : " + XMLHttpRequest.status);
        console.log("textStatus     : " + textStatus);
        console.log("errorThrown    : " + errorThrown.message);
    });
});

function henkou(){

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

    .success(function(res) {
        console.log(res);
    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("XMLHttpRequest : " + XMLHttpRequest.status);
        console.log("textStatus     : " + textStatus);
        console.log("errorThrown    : " + errorThrown.message);
    });
}