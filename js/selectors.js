'use strict';
(function () {

  var INITIALY_TIME_INDEX = 0;
  var INITIALY_TYPE_INDEX = 1;
  var INITIALY_ROOMS_INDEX = 0;
  var MIN_PRICES = [0, 1000, 5000, 10000];
  var inputPrice = window.util.form.querySelector('#price');
  var formSelectTimeIn = window.util.form.querySelector('#timein');
  var formSelectTimeOut = window.util.form.querySelector('#timeout');
  var formSelectType = window.util.form.querySelector('#type');
  var formSelectRoomNumber = window.util.form.querySelector('#room_number');
  var formSelectCapacity = window.util.form.querySelector('#capacity');
  var features = window.util.form.querySelectorAll('.feature__checkbox');
  var description = window.util.form.querySelector('#description');

  var chooseSelect = function (selector, index) {
    for (var i = 0; i < selector.options.length; i++) {
      selector.options[i].selected = false;
    }
    selector.options[index].selected = true;
  };

  var resetFeatures = function (checkBoxes) {
    for (var i = 0; i < checkBoxes.length; i++) {
      checkBoxes[i].checked = false;
    }
  };

  var resetForm = function () {
    for (var i = 0; i < window.util.formInputs.length; i++) {
      window.util.formInputs[i].value = '';
    }

    resetFeatures(features);

    description.value = '';

    chooseSelect(formSelectTimeIn, INITIALY_TIME_INDEX);
    chooseSelect(formSelectTimeOut, formSelectTimeIn.selectedIndex);

    chooseSelect(formSelectRoomNumber, INITIALY_ROOMS_INDEX);
    onformSelectRoomNumberClick();

    chooseSelect(formSelectType, INITIALY_TYPE_INDEX);
    onFormSelectTypeClick();
  };

  var onFormSelectTimeInClick = function () {
    chooseSelect(formSelectTimeOut, formSelectTimeIn.selectedIndex);
  };

  var onFormSelectTimeOutClick = function () {
    chooseSelect(formSelectTimeIn, formSelectTimeOut.selectedIndex);
  };

  var onFormSelectTypeClick = function () {
    inputPrice.setAttribute('min',
        '' + MIN_PRICES[formSelectType.selectedIndex]);
    inputPrice.setAttribute('placeholder',
        '' + MIN_PRICES[formSelectType.selectedIndex]);
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
    if (window.util.allValid) {
      window.backend.save(new FormData(window.util.form),
          window.request.onSave,
          window.request.onError);
    }
  });

  window.selectors = {
    reset: resetForm,
    selectChoose: chooseSelect,
    featuresReset: resetFeatures
  };

})();
