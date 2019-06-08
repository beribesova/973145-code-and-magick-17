'use strict';

var CLOUD_WIDTH = 500;
var CLOUD_HEIGHT = 250;
var CLOUD_X = 100;
var CLOUD_Y = 20;
var CLOUD_OFFSET = 10;
var OFFSET = 50;
var FONT_OFFSET = 15;
var TEXT_WIDTH = 50;
var BAR_WIDTH = 40;
var BLACK_COLOR = '#000';
var WHITE_COLOR = '#fff';
var CLOUD_COLOR = 'rgba(0, 0, 0, 0.3)';
var PLAYER_COLUMN_COLOR = 'rgba(255, 0, 0, 1)';

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

var getRandomColor = function () {
  return ['rgb(0, 0, ', (Math.random() * 255).toFixed(0), ')'].join('');
};

var renderResult = function (ctx, name, time, resultX, resultY, resultYTime, resultHeight, resultYHeight, color) {
  ctx.fillStyle = color;
  ctx.fillText(name, resultX, resultY);
  ctx.fillText(time.toFixed(0), resultX, resultYTime);

  if (name === 'Вы') {
    ctx.fillStyle = PLAYER_COLUMN_COLOR;
  } else {
    ctx.fillStyle = getRandomColor();
  }

  ctx.fillRect(resultX, resultYHeight, BAR_WIDTH, resultHeight);
};

var renderResults = function (ctx, names, times, maxTime) {
  for (var i = 0; i < names.length; i++) {
    var resultX = CLOUD_X + OFFSET + FONT_OFFSET + (OFFSET + FONT_OFFSET + BAR_WIDTH) * i;
    var resultY = CLOUD_Y + CLOUD_HEIGHT - OFFSET * 0.5;
    var resultYTime = (barHeight * times[i]) / maxTime * (-1) + OFFSET * 4.25;
    var resultHeight = (barHeight * times[i]) / maxTime * (-1);
    var resultYHeight = CLOUD_HEIGHT - OFFSET * 0.5;
    var name = names[i];
    var time = times[i];
    renderResult(ctx, name, time, resultX, resultY, resultYTime, resultHeight, resultYHeight, BLACK_COLOR);
  }
};

var barHeight = CLOUD_HEIGHT - OFFSET - TEXT_WIDTH - OFFSET;

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_OFFSET, CLOUD_Y + CLOUD_OFFSET, CLOUD_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, WHITE_COLOR);
  var maxTime = getMaxElement(times);
  renderTitle(ctx, BLACK_COLOR);
  renderResults(ctx, names, times, maxTime);
};
