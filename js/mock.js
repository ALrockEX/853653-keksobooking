'use strict';
(function () {

  var lowestPrice = 1000;
  var lengthPriceRange = 1000000 - lowestPrice;
  var roomsMin = 1;
  var roomsMax = 5;
  var limitRandomGuests = 100;
  var lengthSimilarAnnouncements = 8;

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
  var posibleFeaturesUtil = [
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

  var makeSet = function (array) {
    var set = [];
    for (var i = 0; i < array.length; i++) {
      if (Math.random() > 0.5) {
        set[i] = array[i];
      }
    }
    return set;
  };

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

  var mockGenerate = function (mockLength) {
    titles = shuffle(titles);
    var locationX;
    var locationY;
    for (var i = 0; i < mockLength; i++) {
      locationX = Math.floor(Math.random() * window.util.map.clientWidth);
      locationY = window.util.pinMinY + Math.floor(Math.random() *
        (window.util.pinMaxY - window.util.pinMinY));
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
          features: makeSet(posibleFeaturesUtil),
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

  mockGenerate(lengthSimilarAnnouncements);
  window.mock = {
    similars: mockSimilarAnnouncements,
    posibleFeatures: posibleFeaturesUtil
  };

})();