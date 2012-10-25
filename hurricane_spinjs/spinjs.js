/**
 * @file
 * Spin.js hurricane renderer.
 */
(function($){
  $.hurricane.spinjs = $.hurricane.base.extend({
    setup: function (options) {
      var radius = this.$el.width() / 2;
      var length = radius * (options['line-height'] / 100);
      var thickness = length * options['font-size'] / 100;
      this.speed = options['word-spacing'] / 25;
      this.opts = {
        lines: options['letter-spacing'], // The number of lines to draw
        length: length - thickness, // The length of each line
        width: thickness, // The line thickness
        radius: radius * (1 - options['line-height'] / 100), // The radius of the inner circle
        corners: options['text-indent'] / 100, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        color: options['color'], // #rgb or #rrggbb
        speed: 0, // Rounds per second
        trail: options['font-weight'] * 10, // Afterglow percentage
        shadow: options['text-decoration'] > 1, // Whether to render a shadow
        hwaccel: options['text-decoration'] > 2, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 0, // The z-index (defaults to 2000000000)
        top: 'auto', // Top position relative to parent in px
        left: 'auto' // Left position relative to parent in px
      };
      this.spinner = new Spinner(this.opts).spin(this.$el[0]);
    },

    destroy: function() {
      this.spinner.stop();
    },

    start: function() {
      this.spinner.stop();
      var o = $.extend({}, this.opts, {speed: this.speed});
      this.spinner = new Spinner(o).spin(this.$el[0]);
    },

    stop: function() {
      this.spinner.stop();
      this.spinner = new Spinner(this.opts).spin(this.$el[0]);
    }
  });
}(jQuery));