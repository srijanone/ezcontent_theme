(function ($, Drupal, drupalSettings) {
    Drupal.behaviors.ezcontent_theme = {
        attach: function (context) {
          Drupal.behaviors.ezcontent_theme.layout_configration_block_media_edit(context);
          Drupal.behaviors.ezcontent_theme.ui_dialog_overlay(context);
          Drupal.behaviors.ezcontent_theme.ui_dialog_overlay_close(context);
        },

        /** layout configration block -- media edit block box height issue **/
        layout_configration_block_media_edit: function (context) {
          $(document).ajaxComplete(function(){
           $(".ui-dialog  .ui-widget-content.ui-dialog-buttonpane.ui-helper-clearfix").siblings(".ui-dialog .ui-widget-content.ui-dialog-content").addClass("edit-ui-widget");
          })
        },
        
        /** UI Dialog overlay div append **/
        ui_dialog_overlay: function (context) {
          $(document).ajaxComplete(function(){
           if ($(".ui-widget.ui-dialog.ui-dialog-off-canvas").length >= 0){
             $(".ui-widget.ui-dialog.ui-dialog-off-canvas", context).once().after('<div class="ui-widget-overlay-block"></div>');
            }
          })
        },

        /** UI Dialog overlay close function **/
        ui_dialog_overlay_close: function (context) {
          $(document).ajaxComplete(function(){
            $('.ui-dialog-off-canvas .ui-dialog-titlebar-close', context).click(function(){
              $('.ui-widget-overlay-block', context).remove();
            })
          })
        } 
    };
}(jQuery, Drupal, drupalSettings));
