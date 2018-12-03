'use strict';

var lengthSimilarAnnouncements = 8;
var roomsMin = 1;
var roomsMax = 5;
var pinMinY = 130;
var pinRangeY = 630 - pinMinY;
var pinMainWidth = 40;
var pinMainHeight = 44;
var limitRandomGuests = 100;
var lowestPrice = 1000;
var lengthPriceRange = 1000000 - lowestPrice;
var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
var fragment = document.createDocumentFragment();
var pinsListElement = map.querySelector('.map__pins');
var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
var card = cardTemplate.cloneNode(true);
var cardCloser = card.querySelector('.popup__close');
var pinMain = map.querySelector('.map__pin--main');
var form = document.querySelector('.ad-form');
var previosDisabledForms = form.getElementsByTagName('fieldset');
var inputPrice = form.querySelector('#price');
var mapFilters = map.querySelector('.map__filters').children;
var formSelectType = form.querySelector('#type');
var formSelectTimeIn = form.querySelector('#timein');
var formSelectTimeOut = form.querySelector('#timeout');
var formSelectRoomNumber = form.querySelector('#room_number');
var formSelectCapacity = form.querySelector('#capacity');
var formSetAddress = form.querySelector('#address');

var mockSimilarAnnouncements = [];
var minPrices = [0, 1000, 5000, 10000];
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
  var pins = [];
  for (var i = 0; i < mockSimilarAnnouncements.length; i++) {
    pins[i] = renderMapPin(mockSimilarAnnouncements[i]);
    fragment.appendChild(pins[i]);
  }
  pinsListElement.appendChild(fragment);
  return pins;
};
var renderCard = function (cardElement) {
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
  card.classList.add('hidden');
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
var openCard = function () {
  card.classList.remove('hidden');
  cardCloser.addEventListener('click', onCardCloserClick);
};
var onCardCloserClick = function () {
  card.classList.add('hidden');
  cardCloser.removeEventListener('click', onCardCloserClick);
};
var onFormSelectTypeClick = function () {
  inputPrice.setAttribute('min',
      '' + minPrices[formSelectType.selectedIndex]);
  inputPrice.setAttribute('placeholder',
      '' + minPrices[formSelectType.selectedIndex]);
};
var onFormSelectTimeInClick = function () {
  for (var i = 0; i < formSelectTimeOut.options; i++) {
    formSelectTimeOut.options[i].
    selected = false;
  }
  formSelectTimeOut.options[formSelectTimeIn.selectedIndex].
    selected = true;
};
var onFormSelectTimeOutClick = function () {
  for (var i = 0; i < formSelectTimeIn.options; i++) {
    formSelectTimeIn.options[i].
    selected = false;
  }
  formSelectTimeIn.options[formSelectTimeOut.selectedIndex].
    selected = true;
};
var onformSelectRoomNumberClick = function () {
  var roomNumber = formSelectRoomNumber.selectedIndex;
  var start = formSelectCapacity.options.length - 2;
  for (var i = 0;
    i < formSelectCapacity.options.length; i++) {
    formSelectCapacity.options[i].setAttribute('disabled', '');
    formSelectCapacity.options[i].selected = false;
  }
  if (roomNumber !== formSelectCapacity.options.length - 1) {
    formSelectCapacity.options[start - roomNumber].selected = true;
    for (i = start; i >= start - roomNumber; i--) {
      formSelectCapacity.options[i].removeAttribute('disabled');
    }
  } else {
    formSelectCapacity.options[roomNumber].selected = true;
    formSelectCapacity.options[roomNumber].removeAttribute('disabled');
  }
};

setDisableToElements(previosDisabledForms);
setDisableToElements(mapFilters);
mockGenerate(lengthSimilarAnnouncements);
renderCard(card);

formSelectType.addEventListener('click', onFormSelectTypeClick);
formSelectTimeIn.addEventListener('click', onFormSelectTimeInClick);
formSelectTimeOut.addEventListener('click', onFormSelectTimeOutClick);
formSelectRoomNumber.addEventListener('click',
    onformSelectRoomNumberClick);

pinMain.addEventListener('mouseup', function () {
  setAbleToElements(previosDisabledForms);
  setAbleToElements(mapFilters);
  map.classList.remove('map--faded');
  var mapPins = renderMapPins();

  form.style.opacity = '1';
  for (var i = 0; i < mapPins.length; i++) {
    mapPins[i].addEventListener('click', function () {
      openCard();
    });
  }
  formSetAddress.value = (parseInt(pinMain.style.left.slice(0, -2), 10) +
    pinMainWidth / 2) + ', ' +
    (parseInt(pinMain.style.top.slice(0, -2), 10) + pinMainHeight);
  console.log((parseInt(pinMain.style.left.slice(0, -2), 10) +
    pinMainWidth / 2) + ', ' +
    (parseInt(pinMain.style.top.slice(0, -2), 10) + pinMainHeight));
  formSetAddress.setAttribute('disabled', '');
});
