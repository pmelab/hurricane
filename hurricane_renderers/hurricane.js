/**
 * @file
 * "hurricane" hurricane renderer
 */
jQuery.hurricane.hurricane = function(paper, options) {
  // TODO: better solution for vml rotation center
  var center = 64;
  if (typeof document.addEventListener === 'undefined') {
    center = 59;
  }
  var deg = 360 / options['letter-spacing'];
  var height = options['line-height'] * 64 / 100;
  var width = height * options['font-size'] / 100;
  var lines = [];


  for (var i = 0; i < options['letter-spacing']; i++) {
    line = paper.rect(64 - width / 2, 0, width, height).attr({
      'stroke': 'none',
      'fill': options['color'],
      'opacity': 0.2,
      'r': width * options['text-indent'] / 200
    });
    line.rotate(deg * i + deg / 2, center, center);
    lines.push(line);
  }

  var step = 0.8 / Math.floor(options['letter-spacing'] * (options['font-weight'] / 8));
  var op = [];
  var timer = false;
  var speed = 1000 / ((options['word-spacing'] / 25) * options['letter-spacing']);
  var round = 0;
  var stopped = true;

  function tick() {
    if (stopped && round === 0) {
      op.pop();
      op.unshift(0);
    } else {
      op.unshift(op.pop());
      round = ++round % options['letter-spacing'];
    }
    var done = true;
    for (var i = 0; i < op.length; i++) {
      if (op[i] > 0) {
        done = false;
      }
      lines[i].animate({
        opacity: 0.2 + Math.max(op[i], 0)
      }, speed);
    }
    if (done) {
      window.clearInterval(timer);
      timer = false;
    }
  }

  this.start = function() {
    if ((!stopped) || timer) {
      return;
    }
    stopped = false;
    op = [];
    for (var i = lines.length - 1; i >= 0; i--) {
      op.push(1 - i * step);
    }
    timer = window.setInterval(tick, speed);
  };

  this.stop = function() {
    return stopped = true;
  };

  return this;
};
