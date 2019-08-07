'use strict';

(function () {
  var getTextError = function (hashtag) {
    var tags = hashtag.split(' ');
    var tagsCopy = tags.map(function (hash) {
      return hash.toLowerCase();
    });

    var textError = '';

    if (hashtag.trim() !== '') {
      if (tags.length > 5) {
        textError = 'Хештегов должно быть не больше 5';
        return textError;
      }

      for (var i = 0; i < tags.length; i++) {
        var hash = tags[i];

        if (hash.length > 20) {
          textError = 'Длина хештега должна быть не больше 20 символов';
        } else if (hash === '#') {
          textError = 'Хештег не может состоять только из #';
        } else if (hash[0] !== '#') {
          textError = 'Хештег должен начинаться с #';
        } else if (tagsCopy.indexOf(hash.toLowerCase(), i + 1) !== -1) {
          textError = 'Хештеги не должны повторяться';
        }

        if (textError) {
          break;
        }
      }
    }
    return textError;
  };

  window.getTextError = getTextError;
})();