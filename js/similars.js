'use strict';
(function () {

  var FIRST_DEGREE = 10000;
  var SECOND_DEGREE = 50000;

  var posibleFeatures = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var getValue = function (selector) {
    return selector.options[selector.selectedIndex].value;
  };

  var ascToReturn = function (similarValue, selectedValue) {
    if (selectedValue !== 'any') {
      if (Number.isInteger(similarValue)) {
        return similarValue === parseInt(selectedValue, 10);
      }
      return similarValue === selectedValue;
    }
    return true;
  };

  var checkFeatures = function (features, similarFeatures) {
    var setLast = 0;
    var setFeatures = [];
    for (var i = 0; i < features.length; i++) {
      if (features[i].checked === true) {
        setFeatures[setLast++] = posibleFeatures[i];
      }
    }
    if (setLast !== 0) {
      for (i = 0; i < setLast - 1; i++) {
        if (similarFeatures.indexOf(setFeatures[i]) === -1) {
          return false;
        }
      }
      return true;
    }
    return true;
  };

  var updatePins = function () {
    var filtered = window.util.announcements.filter(function (similar) {
      window.util.selectedType = getValue(window.util.filterType);
      return ascToReturn(similar.offer.type, window.util.selectedType);

    }).filter(function (similar) {
      window.util.selectedRooms = getValue(window.util.filterRooms);
      return ascToReturn(similar.offer.rooms, window.util.selectedRooms);

    }).filter(function (similar) {
      window.util.selectedGuests = getValue(window.util.filterGuests);
      return ascToReturn(similar.offer.guests, window.util.selectedGuests);

    }).filter(function (similar) {
      window.util.selectedPrice = getValue(window.util.filterPrice);
      switch (window.util.selectedPrice) {
        case 'low':
          return similar.offer.price <= FIRST_DEGREE;
        case 'middle':
          return (similar.offer.price >= FIRST_DEGREE) &&
            (similar.offer.price <= SECOND_DEGREE);
        case 'high':
          return similar.offer.price >= SECOND_DEGREE;
      }
      return true;
    }).filter(function (similar) {
      return checkFeatures(window.util.filterFeatures, similar.offer.features);
    }).slice().sort(function (left, right) {
      return right.offer.features.length - left.offer.features.length;
    });

    window.util.mapPins = window.render.mapPins(filtered);
    window.util.cards = window.render.cards(filtered);
    window.display.update();
  };

  window.similars = {
    update: updatePins
  };

})();
