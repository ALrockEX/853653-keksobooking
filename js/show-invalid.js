'use strict';
(function () {

  var resetInvalid = function (array) {
    for (var i = 0; i < array.length; i++) {
      array[i].removeAttribute('style');
    }
  };

  var resetValidity = function (field) {
    var onFieldClick = function () {
      resetInvalid(window.util.formInputs);
      resetInvalid(window.util.formSelects);
      field.removeEventListener('click', onFieldClick);
    };
    field.addEventListener('click', onFieldClick);
  };

  window.showInvalid = function (array) {
    for (var i = 0; i < array.length; i++) {
      if (!array[i].validity.valid) {
        array[i].style.border = '5px solid red';
        resetValidity(array[i]);
      }
    }
  };

})();
