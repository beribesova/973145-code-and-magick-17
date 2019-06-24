'use strict';

(function () {
  window.colorize = function (element, colorType) {
    element.addEventListener('click', function () {
      var color = colorType[window.util.randomNumber(0, colorType.length)];
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }
    });
  };
})();
