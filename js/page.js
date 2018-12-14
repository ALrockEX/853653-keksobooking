'use strict';
(function () {

  var ESC_KEYCODE = 27;
  var pinMainFirstX = window.util.pinMain.offsetLeft;
  var pinMainFirstY = window.util.pinMain.offsetTop;
  var formReset = window.util.form.querySelector('.ad-form__reset');

  var removeMessages = function () {
    window.util.error.classList.add('hidden');
    window.util.success.classList.add('hidden');
  };

  var activatePage = function () {
    window.util.setAbleToElements(window.util.previosDisabledForms);
    window.util.setAbleToElements(window.util.mapFilters);
    window.util.map.classList.remove('map--faded');
    window.util.form.style.opacity = '1';

    if (!window.util.resetted) {
      window.backend.load(window.requestDisplay.onLoad,
          window.requestDisplay.onError);
    } else {
      for (var i = 0; i < window.util.mapPins.length; i++) {
        window.util.mapPins[i].addEventListener('click', window.requestDisplay.onMapPin);
        window.util.mapPins[i].classList.remove('hidden');
      }
    }
    formReset.addEventListener('click', onFormResetClick);
  };

  var deactivatePage = function () {
    window.util.setDisableToElements(window.util.previosDisabledForms);
    window.util.setDisableToElements(window.util.mapFilters);
    window.util.map.classList.add('map--faded');
    if (window.requestDisplay.indexOpened !== undefined) {
      window.requestDisplay.onCardCloser();
    }
    window.util.form.removeAttribute('style');
    window.util.dragged = false;
    window.util.resetted = true;

    window.util.pinMain.style.left = pinMainFirstX + 'px';
    window.util.pinMain.style.top = pinMainFirstY + 'px';

    for (var i = 0; i < window.util.mapPins.length; i++) {
      window.util.mapPins[i].removeEventListener('click', window.requestDisplay.onMapPin);
      window.util.mapPins[i].classList.add('hidden');
    }

    window.selectors.reset();
    window.util.formSetAddress.value = pinMainFirstX + ', ' + pinMainFirstY;

    formReset.removeEventListener('click', onFormResetClick);
  };

  var onFormResetClick = function () {
    deactivatePage();
  };

  window.util.setDisableToElements(window.util.previosDisabledForms);
  window.util.setDisableToElements(window.util.mapFilters);

  document.addEventListener('click', function () {
    removeMessages();
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      removeMessages();
    }
  });

  window.page = {
    activate: activatePage,
    deactivate: deactivatePage
  };

  window.util.error.classList.add('hidden');
  document.body.insertAdjacentElement('afterbegin',
      window.util.error);

  window.util.success.classList.add('hidden');
  document.body.insertAdjacentElement('afterbegin',
      window.util.success);

})();
