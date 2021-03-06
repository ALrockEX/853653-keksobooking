'use strict';
(function () {
  var MAIN_PIN_INDEX = 1;

  var onMapPinClick = function () {
    if (window.util.indexOpen !== undefined) {
      onCardCloserClick();
      window.util.mapPins[window.util.indexOpen].classList.remove('map__pin--active');
    }
    for (var i = 0; i < window.util.mapPins.length; i++) {
      if (window.util.mapPins[i] ===
        window.util.pinsListElement.querySelector('.map__pin:focus')) {
        window.util.mapPins[i].classList.add('map__pin--active');
        window.util.cards[i].classList.remove('hidden');
        window.util.cards[i].querySelector('.popup__close')
          .addEventListener('click', onCardCloserClick);
        window.util.cards[i].querySelector('.popup__close')
          .addEventListener('keydown', onCardCloserKeydown);
        window.util.indexOpen = i;
      }
    }
  };

  var closeCard = function () {
    window.util.cards[window.util.indexOpen].classList.add('hidden');
    window.util.cards[window.util.indexOpen].querySelector('.popup__close')
        .removeEventListener('click', onCardCloserClick);
    window.util.cards[window.util.indexOpen].querySelector('.popup__close')
        .removeEventListener('keydown', onCardCloserKeydown);
  };

  var onCardCloserKeydown = function (evt) {
    if (evt.keyCode === window.util.esc) {
      closeCard();
    }
  };

  var onCardCloserClick = function () {
    closeCard();
  };

  var displayUpdate = function () {
    var oldCards = window.util.map.querySelectorAll('.map__card');

    for (var i = window.util.pinsListElement.children.length - 1;
      i > MAIN_PIN_INDEX; i--) {
      window.util.pinsListElement
          .removeChild(window.util.pinsListElement.children[i]);
    }
    for (i = 0; i < window.util.mapPins.length; i++) {
      window.util.fragmentPins.appendChild(window.util.mapPins[i]);
      window.util.fragmentCards.appendChild(window.util.cards[i]);
      window.util.mapPins[i].addEventListener('click', onMapPinClick);

      if (oldCards[window.util.mapPins.length - 1 - i]) {
        window.util.map.removeChild(oldCards[window.util.mapPins.length - 1 - i]);
      }
    }
    window.util.pinsListElement.appendChild(window.util.fragmentPins);
    window.util.map.insertBefore(window.util.fragmentCards,
        window.util.map.querySelector('.map__filters-container'));
  };

  window.display = {
    onMapPin: onMapPinClick,
    cardClose: closeCard,
    update: displayUpdate
  };

})();
