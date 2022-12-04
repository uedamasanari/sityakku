let youfukudata = Array();
let mens = Array();
let ladius = Array();
let accessory = Array();
let count = [0, 0, 0];
let page = [0, 0, 0];
let maxpage = [0, 0, 0];
let category = [true, true, true, true];
let value1;
let value2;
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
    //alert('ページの読み込みが完了したよ！');

    let a = sessionStorage.getItem('id');
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
    let aa = sessionStorage.getItem('id');
    $.ajax({
            url: `PHP/itoyama.php/?cart=true&id=${aa}$timestamp=${new Date().getTime()}`
        })
        .success(function (res) {
            console.log(res);

            //合計金額計算
            let sum = 0;
            for (let aa = 0; aa < res.length; a++) {
                sum = sum + res[a].item_money;
            }
            //合計金額表示
            let gou = document.getElementById('goukei');
            gou.innerHTML = sum;
            //カートの中の数量
            let hyou = document.getElementById('suuryou');
            hyou.innerHTML = res.length + "点";

            let co = document.getElementById('cartcount');
            co.innerHTML = res.length;

            //表示される分の枠を作る必要がある　ここをなんとかする！！！
            // for(let i = 0; i < res.length; i++){

            //     let mei = document.getElementById('syouhin_mei');
            //     let kin = document.getElementById('syouhin_kin');
            //     let pic = document.getElementsByClassName('thumb');
            //     pic.innerHTML = res[i].item_image;
            //     mei.innerHTML = res[i].item_name;
            //     kin.innerHTML = res[i].item_money + "円";
            // }

            let stockList = []; //ここが配列になる
            for (let i = 0; i < res.length; i++) {
                stockList.push('<li></li><img src = "' + res[i].item_img + '"><div>' + res[i].item_name + '</div><div>' + res[i].item_money + '</div></li>'); //ここにpush()がくる
            }

            document.getElementById('li1').innerHTML = stockList.join(''); //innerHTMLへ入れる時にjoin()で文字列にする

        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
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
    let kari = Array();
    switch (seibetu) {
        case 0:
            kari = mens;
            break;
        case 1:
            kari = ladius;
            break;
        case 2:
            kari = accessory;
            break;
    }
    document.getElementById("itemImg").src = kari[a].item_image;
    document.getElementById("itemName").textContent = kari[a].item_name;
    document.getElementById("size").textContent = kari[a].item_size;
    document.getElementById("price").textContent = kari[a].item_money;
    document.getElementById("ProductDetails").textContent = kari[a].item_feature;
}