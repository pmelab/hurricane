/**
 * @file
 * Hurricane jquery plugin.
 */

/**
 * Hurricane jQuery Plugin.
 */
(function($) {
  // available renderers
  $.hurricane = {};
  var initializing = false;

  // Hurricane Base Class
  $.hurricane.base = function(){};
  $.hurricane.base.extend = function(prop) {
    var parent = this.prototype;
    initializing = true;
    var prototype = new this();
    initializing = false;
    for (var name in prop) {
      if (typeof prop[name] == 'function' && typeof parent[name] == 'function') {
        prototype[name] = (function(name, fn){
            return function() {
              var tmp = this.callParent;
              this.callParent = parent[name];
              var ret = fn.apply(this, arguments);
              this.callParent = tmp;

              return ret;
            };
          }(name, prop[name]));
      }
      else {
        prototype[name] = prop[name];
      }
    }
    function Base() {
      if (!initializing && this.init) {
        this.init.apply(this, arguments);
      }
    }
    Base.prototype = prototype;
    Base.prototype.constructor = Base;
    Base.extend = arguments.callee;
    return Base;
  };

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
        this.hurricane.destroy();
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
        this.hurricane = new renderer(this);
        this.hurricane.setup(options);
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
