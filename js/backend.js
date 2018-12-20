'use strict';
(function () {

  var STATUS_OK = 200;
  var TIMEOUT_LOAD = 10000;
  var TIMEOUT_SAVE = 10000;
  var URL = 'https://js.dump.academy/keksobooking';
  var TIMEOUT_MESSAGE_LOAD = 'Запрос не успел выполниться';
  var TIMEOUT_MESSAGE_SAVE = 'Отправка данных не успела выполниться';

  var backendLoad = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_LOAD;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case STATUS_OK:
          onLoad(xhr.response);
          break;
        default:
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError(TIMEOUT_MESSAGE_LOAD + ' за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  var backendSave = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_SAVE;
    if (!data.has('address')) {
      data.append('address', window.util.formSetAddress.value);
    }
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case STATUS_OK:
          onLoad();
          break;
        default:
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError(TIMEOUT_MESSAGE_SAVE + ' за ' + xhr.timeout + 'мс');
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: backendLoad,
    save: backendSave
  };

})();
