'use strict';
(function () {

  var pinMainFirstX = window.util.pinMain.offsetLeft;
  var pinMainFirstY = window.util.pinMain.offsetTop;
  var formReset = window.util.form.querySelector('.ad-form__reset');

  var closeCard = function () {
    if (window.util.indexOpen !== undefined) {
      window.display.cardClose();
      window.util.indexOpen = undefined;
    }
  };

  var activatePage = function () {
    window.util.setAbleToElements(window.util.previosDisabledForms);
    window.util.setAbleToElements(window.util.mapFilters);
    window.util.map.classList.remove('map--faded');
    window.util.form.style.opacity = '1';

    if (!window.util.resetted) {
      window.backend.load(window.request.onLoad,
          window.request.onError);
    } else {
      window.similars.update();
    }

    window.util.filterType.addEventListener('change', onFilterChange);
    window.util.filterPrice.addEventListener('change', onFilterChange);
    window.util.filterRooms.addEventListener('change', onFilterChange);
    window.util.filterGuests.addEventListener('change', onFilterChange);

    for (var i = 0; i < window.util.filterFeatures.length; i++) {
      window.util.filterFeatures[i].addEventListener('click', onFilterChange);
    }

    formReset.addEventListener('click', onFormResetClick);
  };

  var deactivatePage = function () {
    window.util.setDisableToElements(window.util.previosDisabledForms);
    window.util.setDisableToElements(window.util.mapFilters);
    window.util.map.classList.add('map--faded');
    closeCard();
    window.util.form.removeAttribute('style');
    window.util.dragged = false;
    window.util.resetted = true;

    window.util.pinMain.style.left = pinMainFirstX + 'px';
    window.util.pinMain.style.top = pinMainFirstY + 'px';

    for (var i = 0; i < window.util.mapPins.length; i++) {
      window.util.mapPins[i].removeEventListener('click', window.display.onMapPin);
      window.util.mapPins[i].classList.add('hidden');
    }

    window.selectors.selectChoose(window.util.filterType, 0);
    window.selectors.selectChoose(window.util.filterPrice, 0);
    window.selectors.selectChoose(window.util.filterRooms, 0);
    window.selectors.selectChoose(window.util.filterGuests, 0);

    window.selectors.featuresReset(window.util.filterFeatures);

    window.util.filterType.removeEventListener('change', onFilterChange);
    window.util.filterPrice.removeEventListener('change', onFilterChange);
    window.util.filterRooms.removeEventListener('change', onFilterChange);
    window.util.filterGuests.removeEventListener('change', onFilterChange);

    for (i = 0; i < window.util.filterFeatures.length; i++) {
      window.util.filterFeatures[i].removeEventListener('click', onFilterChange);
    }

    window.selectors.reset();
    window.util.formSetAddress.value = pinMainFirstX + ', ' + pinMainFirstY;

    formReset.removeEventListener('click', onFormResetClick);
  };

  var onFormResetClick = function () {
    deactivatePage();
  };

  var onFilterChange = window.debounce(function () {
    closeCard();
    window.similars.update();
  });

  window.util.setDisableToElements(window.util.previosDisabledForms);
  window.util.setDisableToElements(window.util.mapFilters);

  window.util.error.classList.add('hidden');
  document.querySelector('main').insertAdjacentElement('afterbegin',
      window.util.error);

  window.util.success.classList.add('hidden');
  document.querySelector('main').insertAdjacentElement('afterbegin',
      window.util.success);

  window.page = {
    activate: activatePage,
    deactivate: deactivatePage,
  };

})();
