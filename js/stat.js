'use strict';

var CLOUD_WIDTH = 500;
var CLOUD_HEIGHT = 250;
var CLOUD_X = 100;
var CLOUD_Y = 20;
var OFFSET_CLOUD = 10;
var GAP = 50;
var FONT_GAP = 15;
var TEXT_WIDTH = 50;
var BAR_WIDTH = 40;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderTitle = function (ctx, color) {
  ctx.fillStyle = color;
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 110, 45);
  ctx.fillText('Список результатов:', 110, 65);
};

var renderResult = function (ctx, names, times, i, resultX, resultY, maxTime, color) {
  ctx.fillStyle = color;
  ctx.fillText(names[i], resultX, resultY);
  ctx.fillText(times[i].toFixed(0), resultX, (barHeight * times[i]) / maxTime * (-1) + GAP * 4.25);

  if (names[i] === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    ctx.fillStyle = ['rgb(0, 0, ', (Math.random() * 255).toFixed(0), ')'].join('');
  }

  ctx.fillRect(resultX, CLOUD_HEIGHT - GAP * 0.5, BAR_WIDTH, (barHeight * times[i]) / maxTime * (-1));
};

var renderResults = function (ctx, names, times, maxTime) {
  for (var i = 0; i < names.length; i++) {
    var resultX = CLOUD_X + GAP + FONT_GAP + (GAP + FONT_GAP + BAR_WIDTH) * i;
    var resultY = CLOUD_Y + CLOUD_HEIGHT - GAP * 0.5;
    renderResult(ctx, names, times, i, resultX, resultY, maxTime, '#000');
  }
};

var barHeight = CLOUD_HEIGHT - GAP - TEXT_WIDTH - GAP;

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + OFFSET_CLOUD, CLOUD_Y + OFFSET_CLOUD, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  var maxTime = getMaxElement(times);
  renderTitle(ctx, '#000');
  renderResults(ctx, names, times, maxTime);
};
