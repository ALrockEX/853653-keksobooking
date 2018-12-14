'use strict';
(function () {

  var indexOpen;

  var displayUtil = function () {
    for (var i = 0; i < window.util.mapPins.length; i++) {
      window.util.fragmentPins.appendChild(window.util.mapPins[i]);
      window.util.fragmentCards.appendChild(window.util.cards[i]);
    }
    window.util.pinsListElement.appendChild(window.util.fragmentPins);
    window.util.map.insertBefore(window.util.fragmentCards,
        window.util.map.querySelector('.map__filters-container'));

    for (i = 0; i < window.util.mapPins.length; i++) {
      window.util.mapPins[i].addEventListener('click', onMapPinClick);
    }
  };

  var loadCase = function (response) {
    window.util.mapPins = window.render.mapPins(response);
    window.util.cards = window.render.cards(response);
    displayUtil();
  };

  var saveCase = function () {
    window.page.deactivate();
    window.util.success.classList.remove('hidden');
  };

  var errorCase = function (errorMessage) {
    window.util.error.querySelector('p').textContent = errorMessage;
    window.util.error.classList.remove('hidden');
  };

  var onMapPinClick = function () {
    if (indexOpen !== undefined) {
      onCardCloserClick();
    }
    for (var i = 0; i < window.util.mapPins.length; i++) {
      if (window.util.mapPins[i] ===
        window.util.pinsListElement.querySelector('.map__pin:active')) {
        window.util.cards[i].classList.remove('hidden');
        window.util.cards[i].querySelector('.popup__close')
          .addEventListener('click', onCardCloserClick);
        indexOpen = i;
        window.requestDisplay.indexOpened = indexOpen;
      }
    }
  };

  var onCardCloserClick = function () {
    window.util.cards[indexOpen].classList.add('hidden');
    window.util.cards[indexOpen].querySelector('.popup__close')
        .removeEventListener('click', onCardCloserClick);
  };


  window.requestDisplay = {
    onMapPin: onMapPinClick,
    onCardCloser: onCardCloserClick,
    display: displayUtil,
    onLoad: loadCase,
    onSave: saveCase,
    onError: errorCase
  };

})();
