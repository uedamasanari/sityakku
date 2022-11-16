let youfukudata=Array();
let mens=Array();
let ladius=Array();
let accessory=Array();
let count=[0,0,0];
let page=[0,0,0];
let maxpage=[0,0,0];
window.onload = function(){
  $.ajax({
    url: "PHP/Ueda.php/?youfuku=true&timestamp=${new Date().getTime()}"
  })
  .success(function(res) {
      console.log(res);
      youfukudata=res;
      for(let i=0;i<res.length;i++){
        switch(res[i].item_class){
          case "メンズ":
            mens[mens.length]=res[i];
            break;
          case "レディース":
            ladius[ladius.length]=res[i];
            break;
          case "アクセサリー":
            accessory[accessory.length]=res[i];
            break;
        }
      }
      maxpage[0]=Math.floor(mens.length/20);
      maxpage[1]=Math.floor(ladius.length/20);
      maxpage[2]=Math.floor(accessory.length/20);
      console.log(maxpage[0]);
      hyouji(0,2);
      hyouji(1,2);
      hyouji(2,2);
  }).error(function(XMLHttpRequest, textStatus, errorThrown) {
      console.log("XMLHttpRequest : " + XMLHttpRequest.status);
      console.log("textStatus     : " + textStatus);
      console.log("errorThrown    : " + errorThrown.message);
  });
}

$('.tabmenu-wrap .tab-nav').find('a').on('click', function(e) {
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
  $('#openModal').click(function(){
      $('#modalArea').fadeIn();
  });
  $('#closeModal , #modalBg').click(function(){
    $('#modalArea').fadeOut();
  });
});


$(function () {
  $('#openSyousai').click(function(){
      $('#goodsModal').fadeIn();
  });
  $('#close-syousai , #modalBg').click(function(){
    $('#goodsModal').fadeOut();
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

const hyouji=(a,b)=>{
  //上のそれぞれのfunctionをここにまとめる
  let list=document.getElementsByClassName("list")[a];
  let sw=0;
  let loop=20;
  let kari=Array();
  let index;
  if(b==0){
    if(page[a]==0){
      alert("このページが一番最初です。");
    }else{
      page[a]--;
    }
  }else if(b==1){
    if(maxpage[a]<page[a]+1){
      alert("このページが一番最後です。");
    }else{
      page[a]++;
    }
  }
  index=page[a]*20;
  switch(a){
    case 0:
      while(list.firstChild){
        list.removeChild(list.firstChild);
      }
      if(mens.length-page[a]*20<20){
        loop=mens.length-page[a]*20;
      }
      count[0]=0;
      kari=mens;
      break;
    case 1:
      while(list.firstChild){
        list.removeChild(list.firstChild);
      }
      if(ladius.length-page[a]*20<20){
        loop=ladius.length-page[a]*20;
      }
      count[1]=0;
      sw=count[0];
      kari=ladius;
      break;
    case 2:
      while(list.firstChild){
        list.removeChild(list.firstChild);
      }
      if(accessory.length-page[a]*20<20){
        loop=accessory.length-page[a]*20;
      }
      count[2]=0;
      sw=count[0]+count[1];
      kari=accessory;
      break;
  }
  for(let i=0;i<loop;i++){
    let ele = document.createElement("div");
    ele.className = 'list--item';
    list.appendChild(ele);
    ele = document.createElement("figure");
    ele.className = 'list--item_div';
    let tag = document.getElementsByClassName("list--item")[sw];
    tag.appendChild(ele);

    ele = document.createElement("a");
    ele.className = 'atag';
    ele.href = "#";
    tag = document.getElementsByClassName("list--item_div")[sw];
    tag.appendChild(ele);

    ele = document.createElement("img");
    ele.src = kari[index].item_image;
    ele.style = "height:250px;width:250px;"
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
    ele.textContent = kari[index].item_money+'円';
    tag = document.getElementsByClassName("list--item_div")[sw];
    tag.appendChild(ele);
    console.log(i);
    count[a]++;
    sw++;
    index++;
  }
}
