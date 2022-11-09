window.onload = function(){
  $.ajax({
    url: "PHP/Ueda.php/?youfuku=true&timestamp=${new Date().getTime()}"
  })
  .success(function(res) {
      console.log(res);
      const div1 = document.getElementById("list");
      for(let i=0;i<100;i++){
          const p = document.createElement("list");
          p.innerHTML = '<div class="list--item"><figure class="list--item_div"><a href=""><img src="'+res[0].item_image+'" alt=""></a><header><h2>'+res[0].item_name+'</h2></header><figcaption>'+res[0].item_money+'円</figcaption></figure></div>';
          div1.appendChild(p);
          // div1.innerHTML += '<img src="'+resyoufuku[0].item_image+'">';
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

