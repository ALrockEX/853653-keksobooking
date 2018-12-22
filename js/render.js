'use strict';
(function () {
  var LENGTH_SIMILARS = 5;
  var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  var renderMapPin = function (similar) {
    if (similar.offer !== null) {
      var pinElement = pinTemplate.cloneNode(true);
      var pinImage = pinElement.getElementsByTagName('img')[0];
      var pinWidth = pinImage.width;
      var pinHeight = pinImage.height;

      pinElement.style =
          'left: ' + (similar.location.x - pinWidth / 2) +
          'px; top: ' + (similar.location.y - pinHeight) + 'px;';
      pinImage.src = similar.author.avatar;
      pinImage.alt = similar.offer.title;
      return pinElement;
    }
    return null;
  };
  var renderMapPins = function (similars) {
    var pins = [];
    for (var i = 0; i < Math.min(similars.length,
        LENGTH_SIMILARS); i++) {
      pins[i] = renderMapPin(similars[i]);
    }
    return pins;
  };
  var renderCard = function (similar) {
    if (similar.offer !== null) {
      var cardElement = window.util.card.cloneNode(true);
      var featuresElement = cardElement.querySelector('.popup__features');
      var photoList = cardElement.querySelector('.popup__photos');
      var photo;

      cardElement.querySelector('.popup__title').textContent =
          similar.offer.title;
      cardElement.querySelector('.popup__text--address').textContent =
          similar.offer.address;
      cardElement.querySelector('.popup__text--price').textContent =
          similar.offer.price + '₽/ночь';
      switch (similar.offer.type) {
        case 'flat':
          cardElement.querySelector('.popup__type').textContent = 'Квартира';
          break;
        case 'bungalo':
          cardElement.querySelector('.popup__type').textContent = 'Бунгало';
          break;
        case 'house':
          cardElement.querySelector('.popup__type').textContent = 'Дом';
          break;
        case 'palace':
          cardElement.querySelector('.popup__type').textContent = 'Дворец';
          break;
      }
      cardElement.querySelector('.popup__text--capacity').textContent =
          similar.offer.rooms +
          ' комнаты для ' +
          similar.offer.guests +
          ' гостей';
      cardElement.querySelector('.popup__text--time').textContent =
          'Заезд после ' +
          similar.offer.checkin +
          ', выезд до ' +
          similar.offer.checkout;
      if (similar.offer.features.length === 0) {
        featuresElement.classList.add('hidden');
      } else {
        for (var i = 0; i < featuresElement.children.length; i++) {
          if (similar.offer.features[i] === undefined) {
            featuresElement.children[i].style.display = 'none';
          }
        }
      }
      cardElement.querySelector('.popup__description').textContent =
          similar.offer.description;
      photoList.children[0].src =
          similar.offer.photos[0];

      for (i = 1; i < similar.offer.photos.length; i++) {
        photo = photoList.children[0].cloneNode(true);
        photo.src = similar.offer.photos[i];
        photoList.appendChild(photo);
      }
      cardElement.querySelector('.popup__avatar').src =
          similar.author.avatar;
      cardElement.classList.add('hidden');
      return cardElement;
    }
    return null;
  };

  var renderCards = function (similars) {
    var cards = [];
    for (var i = 0; i < Math.min(similars.length,
        LENGTH_SIMILARS); i++) {
      cards[i] = renderCard(similars[i]);
    }
    return cards;
  };

  window.render = {
    mapPins: renderMapPins,
    cards: renderCards
  };
})();
