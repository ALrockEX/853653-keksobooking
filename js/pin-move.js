'use strict';
(function () {

  var pinMainWidth = 65;
  var pinMainHeight = 44;
  var formSetAddress = window.util.form.querySelector('#address');

  window.util.pinMain.addEventListener('mousedown', function (evt) {

    window.util.pinMain.style.position = 'absolute';

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      if (!window.util.dragged) {
        window.activatePage();
        console.log('Функция:\n' + window.activatePage);
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
          (window.util.pinMain.offsetLeft >= window.util.map.clientWidth - pinMainWidth &&
            shift.x <= 0))) {
        window.util.pinMain.style.left = (window.util.pinMain.offsetLeft - shift.x) + 'px';
      } else if (window.util.pinMain.offsetLeft <= 0 && shift.x >= 0) {
        window.util.pinMain.style.left = 0 + 'px';
      } else {
        window.util.pinMain.style.left = window.util.map.clientWidth - pinMainWidth + 'px';
      }

      if (!((window.util.pinMain.offsetTop <= window.util.pinMinY && shift.y >= 0) ||
          (window.util.pinMain.offsetTop >= window.util.pinMaxY - pinMainHeight &&
            shift.y <= 0))) {
        window.util.pinMain.style.top = (window.util.pinMain.offsetTop - shift.y) + 'px';
      } else if (window.util.pinMain.offsetTop <= window.util.pinMinY && shift.y >= 0) {
        window.util.pinMain.style.top = window.util.pinMinY - pinMainHeight + 'px';
      } else {
        window.util.pinMain.style.top = window.util.pinMaxY - pinMainHeight + 'px';
      }
      formSetAddress.value = (window.util.pinMain.offsetLeft + pinMainWidth / 2) +
        ', ' + (window.util.pinMain.offsetTop + pinMainHeight);
    };

    var onMouseUp = function () {
      if (!window.util.dragged) {
        window.activatePage();
        formSetAddress.value = (window.util.pinMain.offsetLeft + pinMainWidth / 2) +
          ', ' + (window.util.pinMain.offsetTop + pinMainHeight);
      }

      formSetAddress.setAttribute('disabled', '');

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

})();
