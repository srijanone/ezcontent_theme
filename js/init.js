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
    jQuery('#block-languageswitcher ul.links').each(function() {
      var select = jQuery(document.createElement('select')).insertBefore(jQuery(this).hide());
      jQuery('>li a', this).each(function() {
        var a = jQuery(this).click(function() {
          if (jQuery(this).attr('target')==='_blank') {
            window.open(this.href);
          }
          else {
            window.location.href = this.href;
          }
        }),
        option = jQuery(document.createElement('option')).appendTo(select).val(this.href).html(jQuery(this).html()).click(function() {
          a.click();
        });
      });
    });
    
    var li_index = jQuery('#block-languageswitcher ul li.is-active').index();
    jQuery('#block-languageswitcher select option').eq(li_index).attr("selected", "selected");
  
    jQuery('#block-languageswitcher select').change(function(){
      window.location.href = jQuery(this).val();   
    });
    
  }
  languageswitcher();
  
})(jQuery);
