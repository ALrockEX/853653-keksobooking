'use strict';
(function () {

  var resetted = false;
  var pinMainFirstX = window.util.pinMain.offsetLeft;
  var pinMainFirstY = window.util.pinMain.offsetTop;
  var fragment = document.createDocumentFragment();
  var pinsListElement = window.util.map.querySelector('.map__pins');
  var cardCloser = window.util.card.querySelector('.popup__close');
  var mapPins = [];
  var formReset = window.util.form.querySelector('.ad-form__reset');

  var onMapPinClick = function () {
    window.util.card.classList.remove('hidden');
    cardCloser.addEventListener('click', onCardCloserClick);
  };

  var onCardCloserClick = function () {
    window.util.card.classList.add('hidden');
    cardCloser.removeEventListener('click', onCardCloserClick);
  };

  var onFormResetClick = function () {
    window.util.setDisableToElements(window.util.previosDisabledForms);
    window.util.setDisableToElements(window.util.mapFilters);
    window.util.map.classList.add('map--faded');
    onCardCloserClick();
    window.util.form.removeAttribute('style');
    window.util.dragged = false;
    resetted = true;

    window.util.pinMain.style.left = pinMainFirstX + 'px';
    window.util.pinMain.style.top = pinMainFirstY + 'px';

    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].removeEventListener('click', onMapPinClick);
      fragment.appendChild(mapPins[i]);
    }
    pinsListElement.removeChild(fragment);
  };

  window.activatePage = function () {
    window.util.setAbleToElements(window.util.previosDisabledForms);
    window.util.setAbleToElements(window.util.mapFilters);
    window.util.map.classList.remove('map--faded');
    window.util.form.style.opacity = '1';

    if (!resetted) {
      mapPins = window.render.mapPins();
    }
    for (var i = 0; i < mapPins.length; i++) {
      fragment.appendChild(mapPins[i]);
    }
    pinsListElement.appendChild(fragment);

    for (i = 0; i < mapPins.length; i++) {
      mapPins[i].addEventListener('click', onMapPinClick);
    }

    formReset.addEventListener('click', onFormResetClick);
  };

  window.util.setDisableToElements(window.util.previosDisabledForms);
  window.util.setDisableToElements(window.util.mapFilters);
  window.render.card(window.util.card);


})();
