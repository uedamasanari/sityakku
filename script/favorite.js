  //cartモーダル表示
  $(function () {
    $('#openModal').click(function(){
        $('#modalArea').fadeIn();
    });
    $('#closeModal , #modalBg').click(function(){
      $('#modalArea').fadeOut();
    });
  });
  // 
  (function() {
    $(function() {
      var calculateWidths, count, delay, doChange, switcher;
      // word switcher
      switcher = $('#word-switcher');
      delay = 2000;
      count = switcher.find('p').length;
      calculateWidths = function() {
        switcher.find('p').each(function(index) {
          $(this).attr('data-width', $(this).width());
        });
        switcher.width(switcher.find('.active').attr('data-width'));
      };
      doChange = function() {
        var currentItem, nextItem;
        nextItem = void 0;
        currentItem = parseInt(switcher.find('.active').attr('data-oid'));
        if (currentItem === count - 1) {
          nextItem = 0;
        } else {
          nextItem = currentItem + 1;
        }
        switcher.addClass('in');
        switcher.find('[data-oid="' + currentItem + '"]').removeClass('active');
        switcher.find('[data-oid="' + nextItem + '"]').addClass('active');
        switcher.width(switcher.find('[data-oid="' + nextItem + '"]').attr('data-width'));
        setTimeout(doChange, delay);
      };
      calculateWidths();
      $(window).resize(function() {
        calculateWidths();
      });
      setTimeout(doChange, delay);
    });
  
  }).call(this);
  
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxDQUFBLENBQUUsUUFBQSxDQUFBLENBQUE7QUFDRixRQUFBLGVBQUEsRUFBQSxLQUFBLEVBQUEsS0FBQSxFQUFBLFFBQUEsRUFBQSxRQUFBOztJQUNFLFFBQUEsR0FBVyxDQUFBLENBQUUsZ0JBQUY7SUFDWCxLQUFBLEdBQVE7SUFDUixLQUFBLEdBQVEsUUFBUSxDQUFDLElBQVQsQ0FBYyxHQUFkLENBQWtCLENBQUM7SUFFM0IsZUFBQSxHQUFrQixRQUFBLENBQUEsQ0FBQTtNQUNoQixRQUFRLENBQUMsSUFBVCxDQUFjLEdBQWQsQ0FBa0IsQ0FBQyxJQUFuQixDQUF3QixRQUFBLENBQUMsS0FBRCxDQUFBO1FBQ3RCLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQWEsWUFBYixFQUEyQixDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsS0FBUixDQUFBLENBQTNCO01BRHNCLENBQXhCO01BR0EsUUFBUSxDQUFDLEtBQVQsQ0FBZSxRQUFRLENBQUMsSUFBVCxDQUFjLFNBQWQsQ0FBd0IsQ0FBQyxJQUF6QixDQUE4QixZQUE5QixDQUFmO0lBSmdCO0lBT2xCLFFBQUEsR0FBVyxRQUFBLENBQUEsQ0FBQTtBQUNiLFVBQUEsV0FBQSxFQUFBO01BQUksUUFBQSxHQUFXO01BQ1gsV0FBQSxHQUFjLFFBQUEsQ0FBUyxRQUFRLENBQUMsSUFBVCxDQUFjLFNBQWQsQ0FBd0IsQ0FBQyxJQUF6QixDQUE4QixVQUE5QixDQUFUO01BQ2QsSUFBRyxXQUFBLEtBQWUsS0FBQSxHQUFRLENBQTFCO1FBQ0UsUUFBQSxHQUFXLEVBRGI7T0FBQSxNQUFBO1FBR0UsUUFBQSxHQUFXLFdBQUEsR0FBYyxFQUgzQjs7TUFJQSxRQUFRLENBQUMsUUFBVCxDQUFrQixJQUFsQjtNQUNBLFFBQVEsQ0FBQyxJQUFULENBQWMsYUFBQSxHQUFnQixXQUFoQixHQUE4QixJQUE1QyxDQUFpRCxDQUFDLFdBQWxELENBQThELFFBQTlEO01BQ0EsUUFBUSxDQUFDLElBQVQsQ0FBYyxhQUFBLEdBQWdCLFFBQWhCLEdBQTJCLElBQXpDLENBQThDLENBQUMsUUFBL0MsQ0FBd0QsUUFBeEQ7TUFDQSxRQUFRLENBQUMsS0FBVCxDQUFlLFFBQVEsQ0FBQyxJQUFULENBQWMsYUFBQSxHQUFnQixRQUFoQixHQUEyQixJQUF6QyxDQUE4QyxDQUFDLElBQS9DLENBQW9ELFlBQXBELENBQWY7TUFDQSxVQUFBLENBQVcsUUFBWCxFQUFxQixLQUFyQjtJQVhTO0lBY1gsZUFBQSxDQUFBO0lBQ0EsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLE1BQVYsQ0FBaUIsUUFBQSxDQUFBLENBQUE7TUFDZixlQUFBLENBQUE7SUFEZSxDQUFqQjtJQUdBLFVBQUEsQ0FBVyxRQUFYLEVBQXFCLEtBQXJCO0VBL0JBLENBQUY7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbIiQgLT5cbiAgIyB3b3JkIHN3aXRjaGVyXG4gIHN3aXRjaGVyID0gJCgnI3dvcmQtc3dpdGNoZXInKVxuICBkZWxheSA9IDIwMDBcbiAgY291bnQgPSBzd2l0Y2hlci5maW5kKCdwJykubGVuZ3RoXG5cbiAgY2FsY3VsYXRlV2lkdGhzID0gLT5cbiAgICBzd2l0Y2hlci5maW5kKCdwJykuZWFjaCAoaW5kZXgpIC0+XG4gICAgICAkKHRoaXMpLmF0dHIgJ2RhdGEtd2lkdGgnLCAkKHRoaXMpLndpZHRoKClcbiAgICAgIHJldHVyblxuICAgIHN3aXRjaGVyLndpZHRoIHN3aXRjaGVyLmZpbmQoJy5hY3RpdmUnKS5hdHRyKCdkYXRhLXdpZHRoJylcbiAgICByZXR1cm5cblxuICBkb0NoYW5nZSA9IC0+XG4gICAgbmV4dEl0ZW0gPSB1bmRlZmluZWRcbiAgICBjdXJyZW50SXRlbSA9IHBhcnNlSW50KHN3aXRjaGVyLmZpbmQoJy5hY3RpdmUnKS5hdHRyKCdkYXRhLW9pZCcpKVxuICAgIGlmIGN1cnJlbnRJdGVtID09IGNvdW50IC0gMVxuICAgICAgbmV4dEl0ZW0gPSAwXG4gICAgZWxzZVxuICAgICAgbmV4dEl0ZW0gPSBjdXJyZW50SXRlbSArIDFcbiAgICBzd2l0Y2hlci5hZGRDbGFzcyAnaW4nXG4gICAgc3dpdGNoZXIuZmluZCgnW2RhdGEtb2lkPVwiJyArIGN1cnJlbnRJdGVtICsgJ1wiXScpLnJlbW92ZUNsYXNzICdhY3RpdmUnXG4gICAgc3dpdGNoZXIuZmluZCgnW2RhdGEtb2lkPVwiJyArIG5leHRJdGVtICsgJ1wiXScpLmFkZENsYXNzICdhY3RpdmUnXG4gICAgc3dpdGNoZXIud2lkdGggc3dpdGNoZXIuZmluZCgnW2RhdGEtb2lkPVwiJyArIG5leHRJdGVtICsgJ1wiXScpLmF0dHIoJ2RhdGEtd2lkdGgnKVxuICAgIHNldFRpbWVvdXQgZG9DaGFuZ2UsIGRlbGF5XG4gICAgcmV0dXJuXG5cbiAgY2FsY3VsYXRlV2lkdGhzKClcbiAgJCh3aW5kb3cpLnJlc2l6ZSAtPlxuICAgIGNhbGN1bGF0ZVdpZHRocygpXG4gICAgcmV0dXJuXG4gIHNldFRpbWVvdXQgZG9DaGFuZ2UsIGRlbGF5XG4gIHJldHVybiJdfQ==
  //# sourceURL=coffeescript