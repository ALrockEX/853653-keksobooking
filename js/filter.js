'use strict';
(function () {

  var onFilterChange = window.debounce(function () {
    window.page.closeCard();
    window.similars.update();
  });

  window.util.filterType.addEventListener('change', onFilterChange);
  window.util.filterPrice.addEventListener('change', onFilterChange);
  window.util.filterRooms.addEventListener('change', onFilterChange);
  window.util.filterGuests.addEventListener('change', onFilterChange);

  for (var i = 0; i < window.util.filterFeatures.length; i++) {
    window.util.filterFeatures[i].addEventListener('click', onFilterChange);
  }
})();
