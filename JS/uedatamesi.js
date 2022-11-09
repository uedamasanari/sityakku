// let reslogin={};
// let resyoufuku={};

function hyouji(){
    $.ajax({
        url: "PHP/Ueda.php/?login=true&timestamp=${new Date().getTime()}"
    })
    .success(function(reslogin) {
        console.log(reslogin);
    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("XMLHttpRequest : " + XMLHttpRequest.status);
        console.log("textStatus     : " + textStatus);
        console.log("errorThrown    : " + errorThrown.message);
    });
}
function youfuku(){
    $.ajax({
        url: "PHP/Ueda.php/?youfuku=true&timestamp=${new Date().getTime()}"
    })
    .success(function(resyoufuku) {
        console.log(resyoufuku);
        for(let i=0;i<100;i++){
            const p = document.createElement("kekka");
            p.innerHTML = '<img src="'+resyoufuku[0].item_image+'">';
            document.body.appendChild(p);
        }
    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("XMLHttpRequest : " + XMLHttpRequest.status);
        console.log("textStatus     : " + textStatus);
        console.log("errorThrown    : " + errorThrown.message);
    });
}
function syuppin(){
    const formElements = document.forms['postshouhin'];
    //↓base64(画像を文字へ変換)
    const uploadImage = document.querySelector('#image')
    const file = uploadImage.files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
        imagetxt = event.currentTarget.result;
        //変換したものにimgタグで表示できるようにdata~の文を追加
        imagetxt = imagetxt.replace("data:image/png;base64,", "");
        
        //ajaxでPHPに送信するための配列作成
        let data = {
            a:formElements.elements['syouhin'].value,
            b:formElements.elements['kategori'].value,
            c:formElements.elements['bunrui'].value ,
            d:formElements.elements['size'].value ,
            e:formElements.elements['nedan'].value ,
            f:formElements.elements['tokucyou'].value,
            g:imagetxt
        }
        //↓ajaxでPHPと通信
        $.ajax({
            type: "post",   //送信の通信だと定義
            url: "PHP/Ueda.php",    //送信先のリンク
            data: data,     //送信するデータを定義
        })
        .success(function(data) {
            //通信に成功
            console.log(data);
        }).error(function(XMLHttpRequest, textStatus, errorThrown) {
            //通信に失敗
            console.log("XMLHttpRequest : " + XMLHttpRequest.status);
            console.log("textStatus     : " + textStatus);
            console.log("errorThrown    : " + errorThrown.message);
        });
    }
    reader.readAsDataURL(file);
    //↑base64終了
}
function mysyuppin(){
    $.ajax({
        url: `PHP/Ueda.php/?mysyuppin=true&user_id=1&timestamp=${new Date().getTime()}`
    })
    .success(function(res) {
        console.log(res);
    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("XMLHttpRequest : " + XMLHttpRequest.status);
        console.log("textStatus     : " + textStatus);
        console.log("errorThrown    : " + errorThrown.message);
    });
}
function hensyuu(){
    const formElements = document.forms['postshouhin'];
    //↓base64(画像を文字へ変換)
    const uploadImage = document.querySelector('#image')
    const file = uploadImage.files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
        imagetxt = event.currentTarget.result;
        //変換したものにimgタグで表示できるようにdata~の文を追加
        imagetxt = imagetxt.replace("data:image/png;base64,", "");
        
        //ajaxでPHPに送信するための配列作成
        let data = {
            A:formElements.elements['syouhin'].value,
            b:formElements.elements['kategori'].value,
            c:formElements.elements['bunrui'].value ,
            d:formElements.elements['size'].value ,
            e:formElements.elements['nedan'].value ,
            f:formElements.elements['tokucyou'].value,
            g:imagetxt
        }
        //↓ajaxでPHPと通信
        $.ajax({
            type: "post",   //送信の通信だと定義
            url: "PHP/Ueda.php",    //送信先のリンク
            data: data,     //送信するデータを定義
        })
        .success(function(data) {
            //通信に成功
            console.log(data);
        }).error(function(XMLHttpRequest, textStatus, errorThrown) {
            //通信に失敗
            console.log("XMLHttpRequest : " + XMLHttpRequest.status);
            console.log("textStatus     : " + textStatus);
            console.log("errorThrown    : " + errorThrown.message);
            //PHPのエラーではなくDBのエラーをどうするか
        });
    }
    reader.readAsDataURL(file);
    //↑base64終了
}
            