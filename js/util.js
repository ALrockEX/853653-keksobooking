'use strict';
(function () {
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

  window.util = {
    map: mapUtil,
    card: cardTemplate,
    error: errorTemplate.cloneNode(true),
    success: successTemplate.cloneNode(true),
    form: formUtil,
    pinMinY: 130,
    pinMaxY: 630,
    dragged: false,
    resetted: false,
    allValid: true,
    fragmentPins: document.createDocumentFragment(),
    fragmentCards: document.createDocumentFragment(),
    pinMain: mapUtil.querySelector('.map__pin--main'),
    mapFilters: mapUtil.querySelector('.map__filters').children,
    formInputs: formUtil.querySelectorAll('input'),
    formSelects: formUtil.querySelectorAll('select'),
    formSubmit: formUtil.querySelector('.ad-form__submit'),
    previosDisabledForms: formUtil.querySelectorAll('fieldset'),
    pinsListElement: mapUtil.querySelector('.map__pins'),
    formSetAddress: formUtil.querySelector('#address'),
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
