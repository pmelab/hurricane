/**
 * @file
 * Provides Hurricane default renderer "drop".
 */

jQuery.hurricane.drop = function (paper, options, s) {
  var circle = paper.circle(64, 64, 16 + 48 * options['line-height'] / 100).attr({
    stroke:'none',
    fill:options['background-color'],
    opacity:parseFloat(options['font-weight']) / 10
  });
  var stopped = true;
  var speed = 12500 / options['word-spacing'];
  var pulseUp = function () {
    if (stopped) {
      circle.animate({
        fill:options['background-color']
      }, speed, '<>');
      return;
    }
    circle.animate({
      fill:options['color'],
      opacity:1
    }, speed, '<>', pulseDown);
  };

  var pulseDown = function () {
    var me = this;
    circle.animate({
      opacity:options['font-weight'] / 10
    }, speed, '<>', pulseUp);
  };

  this.start = function () {
    if (stopped) {
      stopped = false;
      pulseUp();
    }
  };

  this.stop = function () {
    stopped = true;
  };
  return this;
};
