'use strict';
(function () {

  var inputPrice = window.util.form.querySelector('#price');
  var minPrices = [0, 1000, 5000, 10000];
  var formSelectTimeIn = window.util.form.querySelector('#timein');
  var formSelectTimeOut = window.util.form.querySelector('#timeout');
  var formSelectType = window.util.form.querySelector('#type');
  var formSelectRoomNumber = window.util.form.querySelector('#room_number');
  var formSelectCapacity = window.util.form.querySelector('#capacity');

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

  formSelectType.addEventListener('click', onFormSelectTypeClick);
  formSelectTimeIn.addEventListener('click', onFormSelectTimeInClick);
  formSelectTimeOut.addEventListener('click', onFormSelectTimeOutClick);
  formSelectRoomNumber.addEventListener('click',
      onformSelectRoomNumberClick);

  window.util.formSubmit.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.showInvalid(window.util.formInputs);
    window.showInvalid(window.util.formSelects);
  });

})();
