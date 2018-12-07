'use strict';
(function () {
  var mapUtil = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');
  var cardUtil = cardTemplate.cloneNode(true);
  var formUtil = document.querySelector('.ad-form');

  window.util = {
    map: mapUtil,
    card: cardUtil,
    form: formUtil,
    pinMinY: 130,
    pinMaxY: 630,
    dragged: false,
    pinMain: mapUtil.querySelector('.map__pin--main'),
    mapFilters: mapUtil.querySelector('.map__filters').children,
    formInputs: formUtil.querySelectorAll('input'),
    formSelects: formUtil.querySelectorAll('select'),
    formSubmit: formUtil.querySelector('.ad-form__submit'),
    previosDisabledForms: formUtil.querySelectorAll('fieldset'),
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
