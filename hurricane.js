/**
 * @file
 * Hurricane jquery plugin.
 */

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false;
  var fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
  // The base Class implementation (does nothing)
  this.Class = function(){};

  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
          typeof _super[name] == "function" && fnTest.test(prop[name]) ?
          (function(name, fn){
            return function() {
              var tmp = this._super;

              // Add a new ._super() method that is the same method
              // but on the super-class
              this._super = _super[name];

              // The method only need to be bound temporarily, so we
              // remove it when we're done executing
              var ret = fn.apply(this, arguments);
              this._super = tmp;

              return ret;
            };
          })(name, prop[name]) :
          prop[name];
    }

    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if (!initializing && this.init) {
        this.init.apply(this, arguments);
      }
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;

    return Class;
  };
})();

/**
 * Hurricane jQuery Plugin.
 */
(function($) {
  // available renderers
  $.hurricane = {};

  // Interface definition for hurricane renderers
  $.hurricane.base = Class.extend({
    init: function (element) {
      this.$el = $(element);
    },
    destroy: function () {},
    setup: function (parameters) {},
    start: function() {},
    stop: function() {}
  });

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
