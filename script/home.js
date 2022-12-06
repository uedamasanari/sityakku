let youfukudata = Array();
let mens = Array();
let ladius = Array();
let accessory = Array();
let nowarray = Array();
let count = [0, 0, 0];
let page = [0, 0, 0];
let maxpage = [0, 0, 0];
let category = [true, true, true, true];
let value1;
let value2;
let now;
window.onload = function () {
    $.ajax({
            url: "./PHP/Ueda.php/?youfuku=true&timestamp=${new Date().getTime()}"
        })
        .success(function (res) {
            console.log(res);
            youfukudata = res;
            for (let i = 0; i < res.length; i++) {
                switch (res[i].item_class) {
                    case "メンズ":
                        mens[mens.length] = res[i];
                        break;
                    case "レディース":
                        ladius[ladius.length] = res[i];
                        break;
                    case "アクセサリー":
                        accessory[accessory.length] = res[i];
                        break;
                }
            }
            maxpage[0] = Math.floor(mens.length / 20);
            maxpage[1] = Math.floor(ladius.length / 20);
            maxpage[2] = Math.floor(accessory.length / 20);
            console.log(maxpage[0]);
            hyouji(0, 2);
            hyouji(1, 2);
            hyouji(2, 2);
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("XMLHttpRequest : " + XMLHttpRequest.status);
            console.log("textStatus     : " + textStatus);
            console.log("errorThrown    : " + errorThrown.message);
        });
    // 実行したい処理
    //プロフィール画面の動き

    // let a = sessionStorage.getItem('id');
    let a = 1;
    $.ajax({
            url: `PHP/itoyama.php/?profile=true&user_id=${a}&timestamp=${new Date().getTime()}`
        })

        .success(function (res) {
            console.log(res);

            let t1 = document.getElementById("user_name");
            t1.setAttribute("value", res[0].user_name);

            let t2 = document.getElementById("user_sintyou");
            t2.setAttribute("value", res[0].user_height);

            let t3 = document.getElementById("user_taiju");
            t3.setAttribute("value", res[0].user_weight);

            let t5 = document.getElementById("user_jusyo");
            t5.setAttribute("value", res[0].user_address);

            if (res[0].user_gender == "男") {
                let te = document.getElementById('user_sei');
                te.innerHTML = '男性';
            } else {
                let te = document.getElementById('user_sei');
                te.innerHTML = '女性';
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
            if (res[0].user_gender == "男") {
                hoge[0].checked = true;
            } else {
                hoge[1].checked = true;
            }

            let select = document.getElementById("select_1");
            if (res[0].user_buy == "銀行振込") {
                select.options[0].selected = true;
            } else if (res[0].user_buy == "コンビニ払い") {
                select.options[1].selected = true;
            } else if (res[0].user_buy == "クレジットカード") {
                select.options[2].selected = true;
            } else {
                select.options[3].selected = true;
            }


        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("XMLHttpRequest : " + XMLHttpRequest.status);
            console.log("textStatus     : " + textStatus);
            console.log("errorThrown    : " + errorThrown.message);
        });

    //console.log("javascript開始");
    // let aa = sessionStorage.getItem('id');
    let aa=1;
    $.ajax({
            url: `PHP/itoyama.php/?cart=true&id=${aa}$timestamp=${new Date().getTime()}`
        })
        .success(function (res) {
            console.log(res);

            //合計金額計算
            let sum = 0;
            for (let aa = 0; aa < res.length; aa++) {
                sum = sum + res[aa].item_money;
            }
            //合計金額表示
            let gou = document.getElementById('goukei');
            gou.innerHTML = sum;
            //カートの中の数量
            let hyou = document.getElementById('suuryou');
            hyou.innerHTML = res.length + "点";

            let co = document.getElementById('cartcou');
            co.innerHTML = res.length;

            for(let ss = 0 ; ss < res.length; ss++){
                let div = document.createElement("div");
                div.className = "productitm div-flex-home div-btween";
                
                let cart_div = document.createElement("div");
                cart_div.className = "cart_div";
                cart_div.appendChild(div);

                let img = document.createElement("img");
                img.src = res[ss].item_image;
                img.className = "thumb";
                img.appendChild(cart_div);
                let div2 = document.createElement("div");
                div2.className = "cart_div2";
                div2.appendChild(div);
                let span = document.createElement("span");
                span.className = "remove";
                span.appendChild(div2);
                let div3 = document.createElement("div");
                div3.className = "wishlist-heart-group";
                div3.appendChild(span);
                let div4 = document.createElement("div");
                div4.className = "cart_hato";
                div4.onclick= "hato()";
                div4.appendChild(div3);
                let img2 = document.createElement("img");
                img2.src="script/heart.png";
                img2.alt="";
                img2.width="16";
                img2.height = "16";
                img2.className ="bi bi-heart";
                img2.appendChild(div4);
                let div5 = document.createElement("div");
                div5.className = "cart_name";
                div5.innerHTML = res[ss].item_name;
                div5.appendChild(div);
                let div6 = document.createElement("div");
                div6.className = "cart_money";
                div6.innerHTML = res[ss].item_money + "円";
                div6.appendChild(div);
                let div7 = document.createElement("div");
                div7.className = "cart_saku";
                div7.onclick = "sakujo()";
                div7.appendChild(div);
                let img3 = document.createElement("img");
                img3.src = "script/sakujo.png";
                img3.alt="";
                img3.width="20";
                img3.height = "20";
                img3.className ="bi bi-trash";
                img3.appendChild(div7);

                let dou = document.getElementsByClassName("tbody");
                dou[0].appendChild(div);
            }



        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("XMLHttpRequest : " + XMLHttpRequest.status);
            console.log("textStatus     : " + textStatus);
            console.log("errorThrown    : " + errorThrown.message);
        });
}

//変更ボタンがクリックされたときの処理

    function henkou(){

        //↓性別の値を取得
        let elements = document.getElementsByName('sei');
        let len = elements.length;
        let checkValue = '';
    
        for (let i = 0; i < len; i++){
            if (elements.item(i).checked){
                checkValue = elements.item(i).value;
            }
        }   
    
        //↓セレクトボックスの値を取得
        const sele1 = document.form1.select1;
        const num = sele1.selectedIndex;//値(数値)を取得
        const str = sele1.options[num].value;// 値(数値)から値(value値)を取得
    
        //↓　ajaxでPHPに送信するための配列作成
        let data = {
            id:sessionStorage.getItem('id'),
            name:document.getElementById('user_name1').value,
            sin:document.getElementById('user_sintyou1').value,
            tai:document.getElementById('user_taiju1').value,
            gen:checkValue,
            buy:str,
            add:document.getElementById('user_jusyo1').value,
        }
    
        //↓ajaxでPHPと通信
        $.ajax({
            type: "post",   //送信の通信だと定義
            url: "PHP/itoyama.php",    //送信先のリンク
            data: data,     //送信するデータを定義
        })
    
        .success(function(res) {
            console.log(res);
            location.href = 'home.html';
            alert("プロフィール変更完了");
        }).error(function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("XMLHttpRequest : " + XMLHttpRequest.status);
            console.log("textStatus     : " + textStatus);
            console.log("errorThrown    : " + errorThrown.message);
        });
    }

$('.tabmenu-wrap .tab-nav').find('a').on('click', function (e) {
    var $this = $(this);
    var $all_tab_nav = $this.parents('.tab-nav').find('.nav');
    var $tab_contents = $this.parents('.tabmenu-wrap').find('.con-box');
    var id = $this.attr('href');

    e.preventDefault();
    $all_tab_nav.removeClass('on');
    $this.parent().addClass('on');
    $tab_contents.hide();
    $(id).show();
});

//モーダル表示

$(function () {
    $('#openModal').click(function () {
        $('#modalArea').fadeIn();
    });
    $('#closeModal , #modalBg').click(function () {
        $('#modalArea').fadeOut();
    });
});


$(function () {
    $('#openSyousai').click(function () {
        $('#goodsModal').fadeIn();
    });
    $('#close-syousai , #modalBg').click(function () {
        $('#goodsModal').fadeOut();
    });
});

$(function () {
    $('#opensityaku').click(function () {
        $('#modalsityaku').fadeIn();
    });
    $('#close-sityaku , #modalBg').click(function () {
        $('#modalsityaku').fadeOut();
    });
});

// profile-modal
window.addEventListener("DOMContentLoaded", () => {
    // モーダルを取得
    const modal = document.getElementById("modal-pro");
    // モーダルを開く
    const openModalBtns = document.querySelectorAll(".modalOpen");
    // モーダルを閉じる
    const closeModalBtns = document.querySelectorAll(".modalClose");

    // Swiperの設定
    const swiper = new Swiper(".swiper", {
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        spaceBetween: 30, //任意のマージン
    });

    // モーダルのボタンクリック
    openModalBtns.forEach((openModalBtn) => {
        openModalBtn.addEventListener("click", () => {
            // data-modalで設定したスライド番号を取得
            const modalIndex = openModalBtn.getAttribute('data-modal');
            swiper.slideTo(modalIndex);
            modal.classList.add("is-active");
        });
    });

    // モーダルの閉じるボタンクリック
    closeModalBtns.forEach((closeModalBtn) => {
        closeModalBtn.addEventListener("click", () => {
            modal.classList.remove("is-active");
        });
    });
});


const hyouji = (a, b) => {
    let list = document.getElementsByClassName("list")[a];
    let sw = 0;
    let loop = 20;
    let kari = Array();
    let index;
    let boo = true;
    if (b == 0) {
        if (page[a] == 0) {
            swal("このページが一番最初です。", "", "error");
            boo = false;
        } else {
            page[a]--;
        }
    } else if (b == 1) {
        if (maxpage[a] < page[a] + 1) {
            swal("このページが一番最後です。", "", "error");
            boo = false;
        } else {
            page[a]++;
        }
    }
    index = page[a] * 20;
    if (boo) {
        switch (a) {
            case 0:
                while (list.firstChild) {
                    list.removeChild(list.firstChild);
                }
                if (mens.length - page[a] * 20 < 20) {
                    loop = mens.length - page[a] * 20;
                }
                count[0] = 0;
                kari = mens;
                break;
            case 1:
                while (list.firstChild) {
                    list.removeChild(list.firstChild);
                }
                if (ladius.length - page[a] * 20 < 20) {
                    loop = ladius.length - page[a] * 20;
                }
                count[1] = 0;
                sw = count[0];
                kari = ladius;
                break;
            case 2:
                while (list.firstChild) {
                    list.removeChild(list.firstChild);
                }
                if (accessory.length - page[a] * 20 < 20) {
                    loop = accessory.length - page[a] * 20;
                }
                count[2] = 0;
                sw = count[0] + count[1];
                kari = accessory;
                break;
        }
        for (let i = 0; i < loop; i++) {
            if (category[kari[index].category_id - 1]) {
                let ele = document.createElement("div");
                ele.className = 'list--item';
                list.appendChild(ele);
                ele = document.createElement("figure");
                ele.className = 'list--item_div';
                let tag = document.getElementsByClassName("list--item")[sw];
                tag.appendChild(ele);

                ele = document.createElement("a");
                ele.className = 'atag';
                ele.id = "openSyousai";
                tag = document.getElementsByClassName("list--item_div")[sw];
                tag.appendChild(ele);

                ele = document.createElement("img");
                ele.src = kari[index].item_image;
                ele.style = "height:250px;width:250px;";
                ele.onclick = function () {
                    $('#goodsModal').fadeIn();
                    syouhinsyousai(a, i);
                };
                tag = document.getElementsByClassName("atag")[sw];
                tag.appendChild(ele);

                ele = document.createElement("header");
                ele.className = 'headertag';
                tag = document.getElementsByClassName("list--item_div")[sw];
                tag.appendChild(ele);

                ele = document.createElement("h2");
                ele.textContent = kari[index].item_name;
                tag = document.getElementsByClassName("headertag")[sw];
                tag.appendChild(ele);

                ele = document.createElement("figcaption");
                ele.textContent = kari[index].item_money + '円';
                tag = document.getElementsByClassName("list--item_div")[sw];
                tag.appendChild(ele);
                count[a]++;
                sw++;
            }
            index++;
        }
    }
}


const sort = () => {
    const c1 = document.getElementById("c1");
    const c2 = document.getElementById("c2");
    const c3 = document.getElementById("c3");
    const c4 = document.getElementById("c4");
    const radio1 = document.getElementsByName("radio1");
    const radio2 = document.getElementsByName("radio2");
    c1.checked ? category[0] = true : category[0] = false;
    c2.checked ? category[1] = true : category[1] = false;
    c3.checked ? category[2] = true : category[2] = false;
    c4.checked ? category[3] = true : category[3] = false;

    for (let i = 0; i < radio1.length; i++) {
        if (radio1.item(i).checked) {
            value1 = radio1.item(i).value;
        }
    }
    for (let i = 0; i < radio2.length; i++) {
        if (radio2.item(i).checked) {
            value2 = radio2.item(i).value;
        }
    }
    //並び替え条件式
    if (value1 == 1) {
        if (value2 == 1) {
            mens.sort(function (a, b) {
                if (a.item_time > b.item_time) {
                    return 1;
                } else {
                    return -1;
                }
            })
        } else if (value2 == 2) {
            mens.sort(function (a, b) {
                if (a.item_time < b.item_time) {
                    return 1;
                } else {
                    return -1;
                }
            })
        }
    } else if (value1 == 2) {
        if (value2 == 1) {
            mens.sort(function (a, b) {
                if (a.item_money > b.item_money) {
                    return 1;
                } else {
                    return -1;
                }
            })
        } else if (value2 == 2) {
            mens.sort(function (a, b) {
                if (a.item_money < b.item_money) {
                    return 1;
                } else {
                    return -1;
                }
            })
        }
    }

    if (value1 == 1) {
        if (value2 == 1) {
            ladius.sort(function (a, b) {
                if (a.item_time > b.item_time) {
                    return 1;
                } else {

                    return -1;
                }
            })
        } else if (value2 == 2) {
            ladius.sort(function (a, b) {
                if (a.item_time < b.item_time) {
                    return 1;
                } else {
                    return -1;
                }
            })
        }
    } else if (value1 == 2) {
        if (value2 == 1) {
            ladius.sort(function (a, b) {
                if (a.item_money > b.item_money) {
                    return 1;
                } else {
                    return -1;
                }
            })
        } else if (value2 == 2) {
            ladius.sort(function (a, b) {
                if (a.item_money < b.item_money) {
                    return 1;
                } else {
                    return -1;
                }
            })
        }
    }
    if (value1 == 1) {
        if (value2 == 1) {
            accessory.sort(function (a, b) {
                if (a.item_time < b.item_time) {
                    return 1;
                } else {
                    return -1;
                }
            })
        } else if (value2 == 2) {
            accessory.sort(function (a, b) {
                if (a.item_time > b.item_time) {
                    return 1;
                } else {
                    return -1;
                }
            })
        }
    } else if (value1 == 2) {
        if (value2 == 1) {
            accessory.sort(function (a, b) {
                if (a.item_money > b.item_money) {
                    return 1;
                } else {
                    return -1;
                }
            })
        } else if (value2 == 2) {
            accessory.sort(function (a, b) {
                if (a.item_money < b.item_money) {
                    return 1;
                } else {
                    return -1;
                }
            })
        }
    }
    hyouji(0, 2);
    hyouji(1, 2);
    hyouji(2, 2);

}

function syouhinsyousai(seibetu, a) {
    switch (seibetu) {
        case 0:
            nowarray = mens;
            break;
        case 1:
            nowarray = ladius;
            break;
        case 2:
            nowarray = accessory;
            break;
    }
    document.getElementById("itemImg").src = nowarray[a].item_image;
    document.getElementById("itemName").textContent = nowarray[a].item_name;
    document.getElementById("size").textContent = nowarray[a].item_size;
    document.getElementById("price").textContent = nowarray[a].item_money;
    document.getElementById("ProductDetails").textContent = nowarray[a].item_feature;
    now=a;
}
const favorite=()=>{
    console.log(now);
    $.ajax({
        url: `PHP/itoyama.php/?favo=${nowarray[now].item_id}&favo_user_id=${1}&timestamp=${new Date().getTime()}`
    })
    .success(function (res) {
        console.log(res);
        swal(res[0].message, "", res[0].state);
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        console.log("XMLHttpRequest : " + XMLHttpRequest.status);
        console.log("textStatus     : " + textStatus);
        console.log("errorThrown    : " + errorThrown.message);
    });
}
const cartadd=()=>{
    console.log(now);
    $.ajax({
        url: `PHP/itoyama.php/?cartadd=${nowarray[now].item_id}&cartadd_user_id=${1}&timestamp=${new Date().getTime()}`
    })
    .success(function (res) {
        console.log(res);
        swal(res[0].message, "", res[0].state);
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        console.log("XMLHttpRequest : " + XMLHttpRequest.status);
        console.log("textStatus     : " + textStatus);
        console.log("errorThrown    : " + errorThrown.message);
    });
}
