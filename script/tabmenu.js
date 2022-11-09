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
 
 $(function () {
     $('#openModal').click(function(){
         $('#modalArea').fadeIn();
     });
     $('#modal-close , #modalBg').click(function(){
       $('#modalArea').fadeOut();
     });
   });