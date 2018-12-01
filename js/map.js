'use strict';

var lengthSimilarAnnouncements = 8;
var roomsMin = 1;
var roomsMax = 5;
var pinMinY = 130;
var pinRangeY = 630 - pinMinY;
var limitRandomGuests = 100;
var lowestPrice = 1000;
var lengthPriceRange = 1000000 - lowestPrice;
var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
var fragment = document.createDocumentFragment();
var pinsListElement = map.querySelector('.map__pins');
var cardTemplate = document.querySelector('#card').content;
var pinMain = map.querySelector('.map__pin--main');
var form = document.querySelector('.ad-form');
var previosDisabledForms = form.getElementsByTagName('fieldset');
var mapFilters = map.querySelector('.map__filters').children;

var mockSimilarAnnouncements = [];
var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var types = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var checkins = [
  '12:00',
  '13:00',
  '14:00'
];
var checkouts = [
  '12:00',
  '13:00',
  '14:00'
];
var posibleFeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var mockPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var shuffle = function (array) {
  var randomIndex;
  var replacedElement;
  for (var i = array.length - 1; i > 0; i--) {
    randomIndex = Math.floor(Math.random() * (i + 1));
    replacedElement = array[randomIndex];
    array[randomIndex] = array[i];
    array[i] = replacedElement;
  }
  return array;
};
var makeSet = function (array) {
  var set = [];
  for (var i = 0; i < array.length; i++) {
    if (Math.random() > 0.5) {
      set[i] = array[i];
    }
  }
  return set;
};
var mockGenerate = function (mockLength) {
  titles = shuffle(titles);
  var locationX;
  var locationY;
  for (var i = 0; i < mockLength; i++) {
    locationX = Math.floor(Math.random() * map.clientWidth);
    locationY = pinMinY + Math.floor(Math.random() * pinRangeY);
    mockSimilarAnnouncements[i] = {
      author: {
        avatar: 'img/avatars/user0' +
            Math.floor(Math.random() * mockLength) +
            '.png'
      },
      offer: {
        title: titles[i],
        address: locationX + ', ' + locationY,
        price: lowestPrice + Math.floor(Math.random() * lengthPriceRange),
        type: types[Math.floor(Math.random() * types.length)],
        rooms: roomsMin + Math.floor(Math.random() * roomsMax),
        guests: Math.floor(Math.random() * limitRandomGuests),
        checkin: checkins[Math.floor(Math.random() * checkins.length)],
        checkout: checkouts[Math.floor(Math.random() * checkouts.length)],
        features: makeSet(posibleFeatures),
        description: '',
        photos: shuffle(mockPhotos)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  }
};
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
  for (var i = 0; i < mockSimilarAnnouncements.length; i++) {
    fragment.appendChild(renderMapPin(mockSimilarAnnouncements[i]));
  }
  pinsListElement.appendChild(fragment);
};
var renderCard = function () {
  var cardElement = cardTemplate.cloneNode(true);
  var featuresElement = cardElement.querySelector('.popup__features');
  var mockOffer = mockSimilarAnnouncements[0].offer;

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
      if (mockOffer.features[i] !== posibleFeatures[i]) {
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
      mockSimilarAnnouncements[0].author.avatar;
  map.insertBefore(cardElement, map.querySelector('.map__filters-container'));
};
var setDisableToElements = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute('disabled', '');
  }
};
var setAbleToElements = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute('disabled');
  }
};

setDisableToElements(previosDisabledForms);

setDisableToElements(mapFilters);

mockGenerate(lengthSimilarAnnouncements);

pinMain.addEventListener('mouseup', function () {
  setAbleToElements(previosDisabledForms);
  setAbleToElements(mapFilters);
  map.classList.remove('map--faded');
  form.style.opacity = '1';
  renderMapPins();
  renderCard();
});
