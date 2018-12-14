'use strict';
(function () {

  var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  var renderMapPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinImage = pinElement.getElementsByTagName('img')[0];
    var pinWidth = pinImage.width;
    var pinHeight = pinImage.height;

    pinElement.style =
        'left: ' + (pin.location.x + pinWidth / 2) +
        'px; top: ' + (pin.location.y + pinHeight) + 'px;';
    pinImage.src = pin.author.avatar;
    pinImage.alt = pin.offer.title;

    return pinElement;
  };
  var renderMapPins = function () {
    var pins = [];
    for (var i = 0; i < window.mock.similars.length; i++) {
      pins[i] = renderMapPin(window.mock.similars[i]);
    }
    return pins;
  };
  var renderCard = function (cardElement) {
    var featuresElement = cardElement.querySelector('.popup__features');
    var mockOffer = window.mock.similars[0].offer;

    cardElement.querySelector('.popup__title').textContent =
        mockOffer.title;
    cardElement.querySelector('.popup__text--address').textContent =
        mockOffer.address;
    cardElement.querySelector('.popup__text--price').textContent =
        mockOffer.price + '₽/ночь';
    switch (mockOffer.type) {
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
        mockOffer.rooms +
        ' комнаты для ' +
        mockOffer.guests +
        ' гостей';
    cardElement.querySelector('.popup__text--time').textContent =
        'Заезд после ' +
        mockOffer.checkin +
        ', выезд до ' +
        mockOffer.checkout;
    if (mockOffer.features.length === 0) {
      featuresElement.classList.add('hidden');
    } else {
      for (var i = 0; i < featuresElement.children.length; i++) {
        if (mockOffer.features[i] !== window.mock.posibleFeatures[i]) {
          featuresElement.children[i].style.display = 'none';
        }
      }
    }
    cardElement.querySelector('.popup__description').textContent =
        mockOffer.description;
    cardElement.querySelector('.popup__photos').children[0].src =
        mockOffer.photos[0];
    var photoElement;
    for (i = 1; i < mockOffer.photos.length; i++) {
      photoElement = cardElement.querySelector('.popup__photos')
        .children[0]
        .cloneNode(true);
      photoElement.src = mockOffer.photos[i];
      cardElement.querySelector('.popup__photos')
        .appendChild(photoElement);
    }
    cardElement.querySelector('.popup__avatar').src =
        window.mock.similars[0].author.avatar;
    window.util.map.insertBefore(cardElement, window.util.map.querySelector('.map__filters-container'));
    window.util.card.classList.add('hidden');
  };

  window.renderMock = {
    mapPins: renderMapPins,
    card: renderCard
  };
})();
