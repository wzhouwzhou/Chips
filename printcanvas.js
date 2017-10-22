/**
 * CANVAS DRAWING
 * -----------------------------
 * Draws a dataset on a canvas and saves the result
 * as a PNG image.
 *
 */

var Canvas = require('canvas');
var fs     = require('fs');
var path   = require('path');
var merge  = require('deepmerge');

var graph = {
  settings: {
    minVal: 0,
    stepSize: 1,
    colHead: 0,
    rowHead: 0,
    margin: 5,
    grey: "rgba(99,99,99,0.3)",
    yScalar: function (opts) {
     return (opts.height - graph.settings.margin) / (opts.max - graph.settings.minVal);
    },
    xScalar: function (opts, length) {
      return (opts.width - graph.settings.rowHead) / length;
    }
  },
  /**
   * Create a line graph
   * @param  {array} dataSet - Array of data points
   * @param  {obj} opts - Object of options
   */
  line: function (dataSet, opts) {
    var canvas = new Canvas(opts.width, opts.height);
    var ctx    = canvas.getContext('2d');
    var maxVal = Math.max.apply(null, dataSet);

    // Set origin at lower-left corner
    ctx.translate(0, canvas.height);
    ctx.scale(1,-1);
    ctx.moveTo(0,0);
    ctx.font = "bold 16px Liberator";
    opts.max = maxVal;

    /* Line */
    graph.drawLine(ctx, dataSet, opts);

    /* Optionals */

    // Points
    if (opts.points){
      graph.points(ctx, dataSet, opts);
    }

    // Stroke
    if (opts.stroke) {
      graph.stroke(ctx, opts);
    }

    /* Grid */
    if (opts.grid) {
      graph.grid(ctx, dataSet, opts);
    }

    /* ---------------------------------------------------- */
    /* Write to image */
    graph.write(canvas, opts);
  },
  /**
   * Add points to each data value (default: true)
   * @param  {canvas} ctx - The Canvas context
   * @param  {array} dataSet - Data values
   * @param  {obj} opts - Options
   */
  points: function (ctx, dataSet, opts) {
    var xScalar = graph.settings.xScalar(opts, dataSet.length);
    var yScalar = graph.settings.yScalar(opts);

    dataSet.forEach(function (data, i) {
      ctx.beginPath();

      var x = i * xScalar;
      var y = yScalar * data;

      ctx.arc(x, y, 3, 0, 2 * Math.PI);

      ctx.fillStyle = opts.pointFill;
      ctx.fill();

      ctx.lineWidth = opts.lineWidth;
      ctx.strokeStyle = opts.pointStroke;
      ctx.stroke();

      ctx.closePath();
    });
  },
  /**
   * Stroke the outlines of a canvas (default: true)
   * @param  {canvas} ctx - The Canvas context
   */
  stroke: function (ctx, opts) {
    ctx.beginPath();

    ctx.lineWidth = 1;
    ctx.strokeStyle = graph.settings.grey;

    ctx.moveTo(0,0);
    ctx.lineTo(0, opts.height);

    ctx.lineTo(opts.width, opts.height);
    ctx.lineTo(opts.width, 0);
    ctx.lineTo(0, 0);

    ctx.stroke();
    ctx.closePath();
  },
  /**
   * Show grid (default: true)
   * @param  {canvas} ctx - The Canvas context
   * @param  {array} dataSet - Data values
   * @param  {obj} opts - Options
   */
  grid: function (ctx, dataSet, opts) {
    var xScalar = graph.settings.xScalar(opts, dataSet.length);
    var yScalar = graph.settings.yScalar(opts);
    var colHead = graph.settings.colHead;
    var margin = graph.settings.margin;
    var minVal = graph.settings.minVal;
    var rowHead = graph.settings.rowHead;
    var stepSize = graph.settings.stepSize;
    var count = 0;

    ctx.beginPath();

    ctx.strokeStyle = graph.settings.grey;

    // Vertical lines
    dataSet.forEach(function (data, i) {
      var x = i * xScalar;

      //console.log(x);

      ctx.moveTo(x, graph.settings.colHead);
      ctx.lineTo(x, opts.height);
    });

    ctx.stroke();

    // Horizontal lines
    for (scale = minVal; scale <= opts.max; scale += stepSize) {
      if (scale % 5 === 0) {
        var y = colHead + (yScalar * count * stepSize);

        yText = (scale % 5 == 0) ? scale : '';

        ctx.save();
        ctx.scale(1,-1);
        ctx.fillText(yText, 0, -y + margin);
        ctx.restore();
        ctx.moveTo(rowHead, y);
        ctx.lineTo(opts.width, y);
      }

      count++;
    }

    ctx.closePath();

  },
  /**
   * Show grid (default: true)
   * @param  {canvas} ctx - The Canvas context
   * @param  {array} dataSet - Data values
   * @param  {obj} opts - Options
   */
  drawLine: function (ctx, dataSet, opts) {
    var xScalar = graph.settings.xScalar(opts, dataSet.length);
    var yScalar = graph.settings.yScalar(opts);

    ctx.beginPath();

    ctx.lineTo(0, 0);

    dataSet.forEach(function (data, i) {
      var y = yScalar * data;
      ctx.lineTo(i * xScalar, y);
    });

    ctx.lineTo(opts.width, 0);

    // Stroke
    ctx.lineWidth = opts.lineWidth;
    ctx.strokeStyle = opts.strokeColor;
    ctx.stroke();

    // Fill
    ctx.fillStyle = opts.fillColor || 'transparent';
    ctx.fill();

    ctx.closePath();
  },
  /**
   * Write canvas to PNG
   * @param  {canvas} canvas - The Canvas
   * @param  {obj} opts - Options
   */
  write: function (canvas, opts) {
    var out = fs.createWriteStream(path.join(path.dirname(require.main.filename),opts.filename + '.png'))
    , stream = canvas.pngStream();

    stream.on('data', function (chunk) {
      out.write(chunk);
    });

    stream.on('end', function () {
      console.log('Graph drawn');
    });
  }
};

/**
 * Setup up the options object
 * @param  {obj} opts - Options
 * @return {obj} - Optional options merged with standard options
 */
function setup (opts) {
  var options = merge({
    filename: 'public/out',
    grid: true,
    height: 450,
    lineWidth: 3,
    points: true,
    pointFill: '#fff',
    pointStroke: '#000',
    stroke: true,
    strokeColor: '#000',
    type: 'line',
    width: 800
  }, opts || {});

  return options;
}

exports.graph = function (data, opts) {
  var options = setup(opts);

  switch (options.type) {
    case 'line':
      graph.line(data, options);
      break;
    default:
      throw Error('Graph type ' + options.type + ' does not exist');
  }
};
