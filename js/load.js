'use strict';
(function () {
  var TIME_OF_ANSWER = 10000;
  var STATUS_OK = 200;

  var URL = 'https://js.dump.academy/kekstagram/data';

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Ошибка при загрузке данных с сервера');
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIME_OF_ANSWER;

    xhr.open('GET', URL);
    xhr.send();
  };

  window.load = load;
})();
