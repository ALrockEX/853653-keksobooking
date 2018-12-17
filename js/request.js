'use strict';
(function () {

  var loadCase = function (response) {
    window.util.announcements = response;
    window.similars.update();
  };

  var saveCase = function () {
    window.page.deactivate();
    window.util.success.classList.remove('hidden');
  };

  var errorCase = function (errorMessage) {
    window.util.error.querySelector('p').textContent = errorMessage;
    window.util.error.classList.remove('hidden');
  };

  window.request = {
    onLoad: loadCase,
    onSave: saveCase,
    onError: errorCase
  };

})();
