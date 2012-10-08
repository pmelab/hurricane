/**
 * @file
 * Replace autocomplete-textfield throbbers with hurricane.
 */

(function($){
  /**
   * Wrap Drupal.jsAC.prototype.setStatus to properly active autocompletion throbber.
   */
  var hurricane_setStatus = Drupal.jsAC.prototype.setStatus;
  Drupal.jsAC.prototype.setStatus = function(status) {
    hurricane_setStatus.apply(this, arguments);
    switch (status) {
      case 'begin':
        $(this.input).parent().find('.throbber').hurricane('start');
        break;
      case 'cancel':
      case 'error':
      case 'found':
        $(this.input).parent().find('.throbber').hurricane('stop');
        break;
    }
  };
  /**
   * Attach throbbers to autocomplete textfields.
   */
  Drupal.behaviors.hurricane_autocomplete = {
    attach: function(context, settings) {
      $(document).ready(function() {
        // TODO: find a better solution than polling for visible autocomplete fields
        var count_fields = $('input.form-autocomplete', context).length;
        var check = window.setInterval(function() {
          $('input.form-autocomplete:visible', context).once('hurricane-autocomplete', function() {
            var height = $(this).height();
            var width = $(this).width();
            var top = parseInt($(this).css('margin-top')) + parseInt($(this).css('border-top-width')) + parseInt($(this).css('padding-top'));
            var left = parseInt($(this).css('margin-left')) + parseInt($(this).css('border-left-width')) + parseInt($(this).css('padding-left')) + $(this).width() - height;
            $wrapper = $('<div class="hurricane-autocomplete ajax-progress"><div class="throbber"></div></div>');
            $throbber = $('.throbber', $wrapper);
            $throbber.css({
              'width': height + 'px',
              'height': height + 'px',
              'margin-top': top + 'px',
              'margin-left': left + 'px'
            });
            $(this).before($wrapper);
            $throbber.hurricane();
            if (--count_fields === 0) {
              window.clearInterval(check);
            }
          });
        }, 500);
      });
    }
  };
}(jQuery));
