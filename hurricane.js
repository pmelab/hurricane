/**
 * Hurricane jquery plugin.
 */
(function($) {
  // available renderers
  $.hurricane = {};

  /**
   * Retrieve a specific renderer.
   * @param font
   *   the font to search for
   * @return {*}
   *   a renderer object
   */
  $.hurricaneRenderer = function (font) {
    if (typeof $.hurricane[font] === 'undefined') {
      return $.hurricane.drop;
    }
    return $.hurricane[font];
  };

  /**
   * Adds a centered spinner to the element.
   */
  $.fn.hurricane = function(operation) {
    $(this).each(function() {
      if (operation === 'redraw' && this.hurricane) {
        this.hurricane.paper.remove();
        this.hurricane = false;
      }
      if (typeof this.hurricane === 'undefined' || this.hurricane === false) {
        $root = $(this);
        $.each(Drupal.settings.hurricane.map, function(property, info){
          $root.css(property, '');
        });
        var font = $(this).css('font-family');
        var renderer = $.hurricaneRenderer(font);
        var options = {};
        $.each(Drupal.settings.hurricane.map, function(property, info){
          if (property === 'font-family') {
            return;
          }
          $root.css(property, '');
          if (typeof info === 'object') {
            var value = $root.css(property);
            if (property === 'font-weight') {
              if (value === 'normal') {
                value = 400;
              }
              else if (value === 'bold') {
                value = 700;
              }
              else {
                value = parseInt(value);
              }
            }
            options[property] = $.inArray(value, info);
          }
          else if (info) {
            options[property] = parseInt($root.css(property));
          }
          else {
            options[property] = $root.css(property);
          }
        });

        if ($(this).css('position') === 'static') {
          $(this).css('position', 'relative');
        }

        var width = $(this).width();
        var height = $(this).height();
        var size = Math.min(width, height);
        var paper = Raphael(this, size, size);
        this.hurricane = new renderer(paper, options);
        paper.setViewBox(0, 0, 128, 128, true);
        this.hurricane.paper = paper;
        $.each(Drupal.settings.hurricane.map, function(property, info){
          if (property === 'line-height' || property === 'font-size') {
            $root.css(property, '0px');
          }
          if (property === 'background-color') {
            $root.css(property, 'transparent');
          }
          else {
            $root.css(property, 'inherit');
          }
        });
      }

      if (operation === 'start' && typeof this.hurricane.start === 'function') {
        this.hurricane.start();
      }

      if (operation === 'stop' && typeof this.hurricane.stop === 'function') {
        this.hurricane.stop();
      }
    });
    return this;
  };
}(jQuery));