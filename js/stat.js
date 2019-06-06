'use strict';

var CLOUD_WIDTH = 500; // ширина popup
var CLOUD_HEIGHT = 250; // высота popup
var CLOUD_X = 100; // положение облака по Х
var CLOUD_Y = 20; // положение облака по Y
var GAP_CLOUD = 10; // тень отступ
var GAP = 50; // расстояние между полосами (столбиками)
var FONT_GAP = 15; // расстояние между именами
var TEXT_WIDTH = 50; // ширина которую занимает имя
var BAR_WIDTH = 40; // ширина полосы (столбика)
var barHeight = CLOUD_HEIGHT - GAP - TEXT_WIDTH - GAP;

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

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP_CLOUD, CLOUD_Y + GAP_CLOUD, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  var maxTime = getMaxElement(times);
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 110, 45);
  ctx.fillText('Список результатов:', 110, 65);
  for (var i = 0; i < names.length; i++) {

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + GAP + FONT_GAP + (GAP + FONT_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP * 0.5);

    ctx.fillText(times[i].toFixed(0), CLOUD_X + GAP + FONT_GAP + (GAP + FONT_GAP + BAR_WIDTH) * i, (barHeight * times[i]) / maxTime * (-1) + GAP * 4.25);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = ['rgb(0, 0, ', (Math.random() * 255).toFixed(0), ')'].join('');
    }

    ctx.fillRect(CLOUD_X + GAP + FONT_GAP + (GAP + FONT_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP * 0.5, BAR_WIDTH, (barHeight * times[i]) / maxTime * (-1));
  }
};
