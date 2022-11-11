window.onload = function(){
  $.ajax({
    url: "PHP/Ueda.php/?youfuku=true&timestamp=${new Date().getTime()}"
  })
  .success(function(res) {
      console.log(res);
      const div1 = document.getElementById("list");
      for(let i=0;i<res.length;i++){
          let ele = document.createElement("div");
          ele.className = 'list--item';
          div1.appendChild(ele);

          ele = document.createElement("figure");
          ele.className = 'list--item_div';
          let tag = document.getElementsByClassName("list--item")[i];
          tag.appendChild(ele);

          ele = document.createElement("a");
          ele.className = 'atag';
          ele.href = "#";
          tag = document.getElementsByClassName("list--item_div")[i];
          tag.appendChild(ele);

          ele = document.createElement("img");
          ele.src = res[i].item_image;
          tag = document.getElementsByClassName("atag")[i];
          tag.appendChild(ele);

          ele = document.createElement("header");
          ele.className = 'headertag';
          tag = document.getElementsByClassName("list--item_div")[i];
          tag.appendChild(ele);

          ele = document.createElement("h2");
          ele.textContent = res[i].item_name;
          tag = document.getElementsByClassName("headertag")[i];
          tag.appendChild(ele);

          ele = document.createElement("figcaption");
          ele.textContent = res[i].item_money+'円';
          tag = document.getElementsByClassName("list--item_div")[i];
          tag.appendChild(ele);
      }
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
