'use strict';
(function () {

  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 44;

  window.util.pinMain.addEventListener('mousedown', function (evt) {

    window.util.pinMain.style.position = 'absolute';

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      if (!window.util.dragged) {
        window.page.activate();
      }

      window.util.dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (!((window.util.pinMain.offsetLeft <= 0 && shift.x >= 0) ||
          (window.util.pinMain.offsetLeft >= window.util.map.clientWidth - PIN_MAIN_WIDTH &&
            shift.x <= 0))) {
        window.util.pinMain.style.left = (window.util.pinMain.offsetLeft - shift.x) + 'px';
      } else if (window.util.pinMain.offsetLeft <= 0 && shift.x >= 0) {
        window.util.pinMain.style.left = 0 + 'px';
      } else {
        window.util.pinMain.style.left = window.util.map.clientWidth - PIN_MAIN_WIDTH + 'px';
      }

      if (!((window.util.pinMain.offsetTop <= window.util.pinMinY && shift.y >= 0) ||
          (window.util.pinMain.offsetTop >= window.util.pinMaxY - PIN_MAIN_HEIGHT &&
            shift.y <= 0))) {
        window.util.pinMain.style.top = (window.util.pinMain.offsetTop - shift.y) + 'px';
      } else if (window.util.pinMain.offsetTop <= window.util.pinMinY && shift.y >= 0) {
        window.util.pinMain.style.top = window.util.pinMinY - PIN_MAIN_HEIGHT + 'px';
      } else {
        window.util.pinMain.style.top = window.util.pinMaxY - PIN_MAIN_HEIGHT + 'px';
      }
      window.util.formSetAddress.value = (window.util.pinMain.offsetLeft + PIN_MAIN_WIDTH / 2) +
        ', ' + (window.util.pinMain.offsetTop + PIN_MAIN_HEIGHT);
    };

    var onMouseUp = function () {
      if (!window.util.dragged) {
        window.page.activate();
        window.util.formSetAddress.value = (window.util.pinMain.offsetLeft + PIN_MAIN_WIDTH / 2) +
          ', ' + (window.util.pinMain.offsetTop + PIN_MAIN_HEIGHT);
      }

      window.util.formSetAddress.setAttribute('disabled', '');

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

})();
