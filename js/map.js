'use strict';

var lengthSimilarAnnouncements = 8;
var roomsMin = 1;
var roomsMax = 5;
var pinMinY = 130;
var pinMaxY = 630;
var pinMainWidth = 40;
var pinMainHeight = 44;
var limitRandomGuests = 100;
var lowestPrice = 1000;
var lengthPriceRange = 1000000 - lowestPrice;
var dragged = false;
var resetted = false;
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
var pinMainFirstX = pinMain.offsetLeft;
var pinMainFirstY = pinMain.offsetTop;
var form = document.querySelector('.ad-form');
var previosDisabledForms = form.querySelectorAll('fieldset');
var inputPrice = form.querySelector('#price');
var mapFilters = map.querySelector('.map__filters').children;
var formSelectType = form.querySelector('#type');
var formSelectTimeIn = form.querySelector('#timein');
var formSelectTimeOut = form.querySelector('#timeout');
var formSelectRoomNumber = form.querySelector('#room_number');
var formSelectCapacity = form.querySelector('#capacity');
var formSetAddress = form.querySelector('#address');
var formInputs = form.querySelectorAll('input');
var formSelects = form.querySelectorAll('select');
var formSubmit = form.querySelector('.ad-form__submit');
var formReset = form.querySelector('.ad-form__reset');

var mockSimilarAnnouncements = [];
var mapPins = [];
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
    locationY = pinMinY + Math.floor(Math.random() *
      (pinMaxY - pinMinY));
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
  }
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
var onMapPinClick = function () {
  card.classList.remove('hidden');
  cardCloser.addEventListener('click', onCardCloserClick);
};
var onCardCloserClick = function () {
  card.classList.add('hidden');
  cardCloser.removeEventListener('click', onCardCloserClick);
};
var setInvalidBorder = function (array) {
  for (var i = 0; i < array.length; i++) {
    if (!array[i].validity.valid) {
      array[i].style.border = '5px solid red';
      resetValidity(array[i]);
    }
  }
};
var resetValidity = function (field) {
  var onFieldClick = function () {
    resetInvalidBorder(formInputs);
    resetInvalidBorder(formSelects);
    field.removeEventListener('click', onFieldClick);
  };
  field.addEventListener('click', onFieldClick);
};
var resetInvalidBorder = function (array) {
  for (var i = 0; i < array.length; i++) {
    array[i].removeAttribute('style');
  }
};
var onFormSelectTypeClick = function () {
  inputPrice.setAttribute('min',
      '' + minPrices[formSelectType.selectedIndex]);
  inputPrice.setAttribute('placeholder',
      '' + minPrices[formSelectType.selectedIndex]);
};
var synchronizeSelect = function (thisElement, withElement) {
  for (var i = 0; i < thisElement.options.length; i++) {
    thisElement.options[i].selected = false;
  }
  thisElement.options[withElement.selectedIndex].
    selected = true;
};
var onFormSelectTimeInClick = function () {
  synchronizeSelect(formSelectTimeOut, formSelectTimeIn);
};
var onFormSelectTimeOutClick = function () {
  synchronizeSelect(formSelectTimeIn, formSelectTimeOut);
};
var onformSelectRoomNumberClick = function () {
  var roomNumber = formSelectRoomNumber.selectedIndex;
  var start = formSelectCapacity.options.length - 2;
  for (var i = 0; i < formSelectCapacity.options.length; i++) {
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

var onFormResetClick = function () {
  setDisableToElements(previosDisabledForms);
  setDisableToElements(mapFilters);
  map.classList.add('map--faded');
  onCardCloserClick();
  form.removeAttribute('style');
  dragged = false;
  resetted = true;

  pinMain.style.left = pinMainFirstX + 'px';
  pinMain.style.top = pinMainFirstY + 'px';

  for (var i = 0; i < mapPins.length; i++) {
    mapPins[i].removeEventListener('click', onMapPinClick);
    fragment.appendChild(mapPins[i]);
  }
  pinsListElement.removeChild(fragment);
};

var activatePage = function () {
  setAbleToElements(previosDisabledForms);
  setAbleToElements(mapFilters);
  map.classList.remove('map--faded');
  form.style.opacity = '1';

  if (!resetted) {
    mapPins = renderMapPins();
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

setDisableToElements(previosDisabledForms);
setDisableToElements(mapFilters);
mockGenerate(lengthSimilarAnnouncements);
renderCard(card);

formSelectType.addEventListener('click', onFormSelectTypeClick);
formSelectTimeIn.addEventListener('click', onFormSelectTimeInClick);
formSelectTimeOut.addEventListener('click', onFormSelectTimeOutClick);
formSelectRoomNumber.addEventListener('click',
    onformSelectRoomNumberClick);

formSubmit.addEventListener('click', function (evt) {
  evt.preventDefault();
  setInvalidBorder(formInputs);
  setInvalidBorder(formSelects);
});

pinMain.addEventListener('mousedown', function (evt) {
  pinMain.style.position = 'absolute';

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    if (!dragged) {
      activatePage();
    }

    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if (!((pinMain.offsetLeft <= 0 && shift.x >= 0) ||
        (pinMain.offsetLeft >= map.clientWidth - pinMainWidth &&
          shift.x <= 0))) {
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
    } else if (pinMain.offsetLeft <= 0 && shift.x >= 0) {
      pinMain.style.left = 0 + 'px';
    } else {
      pinMain.style.left = map.clientWidth - pinMainWidth + 'px';
    }

    if (!((pinMain.offsetTop <= pinMinY && shift.y >= 0) ||
        (pinMain.offsetTop >= pinMaxY - pinMainHeight &&
          shift.y <= 0))) {
      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
    } else if (pinMain.offsetTop <= pinMinY && shift.y >= 0) {
      pinMain.style.top = pinMinY - pinMainHeight + 'px';
    } else {
      pinMain.style.top = pinMaxY - pinMainHeight + 'px';
    }
    formSetAddress.value = (pinMain.offsetLeft + pinMainWidth / 2) +
      ', ' + (pinMain.offsetTop + pinMainHeight);
  };

  var onMouseUp = function () {
    if (!dragged) {
      activatePage();
      formSetAddress.value = (pinMain.offsetLeft + pinMainWidth / 2) +
        ', ' + (pinMain.offsetTop + pinMainHeight);
    }

    formSetAddress.setAttribute('disabled', '');

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

});
