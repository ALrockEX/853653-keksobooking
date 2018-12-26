'use strict';
(function () {

  var removeMessages = function () {
    window.util.error.classList.add('hidden');
    window.util.success.classList.add('hidden');
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  var onDocumentClick = function () {
    removeMessages();
  };

  var onDocumentKeydown = function (evt) {
    if (evt.keyCode === window.util.esc) {
      removeMessages();
    }
  };

  var loadCase = function (response) {
    window.util.announcements = response;
    window.similars.update();
  };

  var saveCase = function () {
    window.page.deactivate();
    window.util.success.classList.remove('hidden');
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  var errorCase = function (errorMessage) {
    window.util.error.querySelector('p').textContent = errorMessage;
    window.util.error.classList.remove('hidden');
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  window.request = {
    onLoad: loadCase,
    onSave: saveCase,
    onError: errorCase
  };

})();
