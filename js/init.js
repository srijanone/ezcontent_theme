(function($) {
  var sw = document.body.clientWidth,
    sh = document.body.clientHeight;

  $(document).resize(function() {
    //Update dimensions on resize
    sw = document.body.clientWidth;
    sh = document.body.clientHeight;

    //updateAds();
  });

  //Navigation toggle
  $('.nav-toggle-menu').click(function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.nav').toggleClass('active');
  });

  //Navigation toggle
  $('.nav-toggle-search').click(function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.header .search-form').toggleClass('active');
  });

  //language switcher
  var languageswitcher = function(){
    $('#block-languageswitcher ul.links').each(function() {
      var select = $(document.createElement('select')).insertBefore($(this).hide());
      $('>li a', this).each(function() {
        var a = $(this).click(function() {
          if ($(this).attr('target')==='_blank') {
            window.open(this.href);
          }
          else {
            window.location.href = this.href;
          }
        }),
        option = $(document.createElement('option')).appendTo(select).val(this.href).html($(this).html()).click(function() {
          a.click();
        });
      });
    });
    
    var li_index = $('#block-languageswitcher ul li.is-active').index();
    $('#block-languageswitcher select option').eq(li_index).attr("selected", "selected");
  
    $('#block-languageswitcher select').change(function(){
      window.location.href = $(this).val();   
    });
    
  }
  languageswitcher();
  
})(jQuery);
