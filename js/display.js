'use strict';
(function () {

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
        window.util.indexOpen = i;
      }
    }
  };

  var onCardCloserClick = function () {
    window.util.cards[window.util.indexOpen].classList.add('hidden');
    window.util.cards[window.util.indexOpen].querySelector('.popup__close')
        .removeEventListener('click', onCardCloserClick);
  };

  var displayUpdate = function () {
    var oldCard;
    for (var i = window.util.pinsListElement.children.length - 1; i > 1; i--) {
      window.util.pinsListElement
          .removeChild(window.util.pinsListElement.children[i]);
    }
    for (i = 0; i < window.util.mapPins.length; i++) {
      window.util.fragmentPins.appendChild(window.util.mapPins[i]);
      window.util.fragmentCards.appendChild(window.util.cards[i]);
      oldCard = window.util.map
          .querySelectorAll('.map__card')[window.util.mapPins.length - 1 - i];
      if (oldCard) {
        window.util.map.removeChild(oldCard);
      }
    }
    window.util.pinsListElement.appendChild(window.util.fragmentPins);
    window.util.map.insertBefore(window.util.fragmentCards,
        window.util.map.querySelector('.map__filters-container'));

    for (i = 0; i < window.util.mapPins.length; i++) {
      window.util.mapPins[i].addEventListener('click', onMapPinClick);
    }
  };

  window.display = {
    onMapPin: onMapPinClick,
    onCardCloser: onCardCloserClick,
    update: displayUpdate
  };

})();
