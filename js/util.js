'use strict';
(function () {
  var PIN_MIN_Y = 130;
  var PIN_MAX_Y = 630;
  var ESC_KEYCODE = 27;

  var mapUtil = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');
  var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
  var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
  var formUtil = document.querySelector('.ad-form');
  var filters = document.querySelector('.map__filters');

  window.util = {
    map: mapUtil,
    card: cardTemplate,
    error: errorTemplate.cloneNode(true),
    success: successTemplate.cloneNode(true),
    form: formUtil,
    pinMinY: PIN_MIN_Y,
    pinMaxY: PIN_MAX_Y,
    esc: ESC_KEYCODE,
    dragged: false,
    resetted: false,
    allValid: true,
    indexOpen: undefined,
    fragmentPins: document.createDocumentFragment(),
    fragmentCards: document.createDocumentFragment(),
    pinMain: mapUtil.querySelector('.map__pin--main'),
    mapFilters: mapUtil.querySelector('.map__filters').children,
    pinsListElement: mapUtil.querySelector('.map__pins'),
    formInputs: formUtil.querySelectorAll('input'),
    formSelects: formUtil.querySelectorAll('select'),
    formSubmit: formUtil.querySelector('.ad-form__submit'),
    previosDisabledForms: formUtil.querySelectorAll('fieldset'),
    formSetAddress: formUtil.querySelector('#address'),
    filterType: filters.querySelector('#housing-type'),
    filterPrice: filters.querySelector('#housing-price'),
    filterRooms: filters.querySelector('#housing-rooms'),
    filterGuests: filters.querySelector('#housing-guests'),
    filterFeatures: filters.querySelectorAll('input'),
    announcements: [],
    mapPins: [],
    cards: [],
    setDisableToElements: function (elements) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].setAttribute('disabled', '');
      }
    },
    setAbleToElements: function (elements) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].removeAttribute('disabled');
      }
    }
  };
})();
