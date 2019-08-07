'use strict';
(function () {
  var ESC_CODE = 27;
  var uploadFile = document.querySelector('#upload-file');
  var closeForm = document.querySelector('.img-upload__cancel');
  var textDescription = document.querySelector('.text__description');
  var hashtag = document.querySelector('.text__hashtags');
  var submit = document.querySelector('.img-upload__submit');
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');
  var successButton = successMessage.querySelector('.success__button');

  hashtag.addEventListener('focus', function () {
    hashtag.style = 'border: 2px inset initial';
  });
  var customValidation = function () {
    var value = hashtag.value;
    var listOfTags = value.split(' ');
    var listOfTagsCopy = listOfTags.slice();
    var text = '';

    if (value !== '') {
      if (listOfTags.length > 5) {
        text = 'Хештегов должно быть не больше 5';
        return text;
      }
      for (var i = 0; i < listOfTags.length; i++) {
        var hash = listOfTags[i];
        if (hash.length > 20) {
          text = 'Длина хештега должна быть не больше 20 символов';
        } else if (hash === '#') {
          text = 'Хештег не может состоять только из #';
        } else if (hash[0] !== '#') {
          text = 'Хештег должен начинаться с #';
        } else if (listOfTagsCopy.indexOf(hash.toLowerCase(), i + 1) !== -1) {
          text = 'Хештеги не должны повторяться';
        }
        if (text) {
          break;
        }
      }
    }
    return text;
  };
  var successPopup = function () {
    main.appendChild(successMessage);
    closeForm.click();

    successButton.addEventListener('click', function () {
      successMessage.remove();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_CODE) {
        successMessage.remove();
      }
    });
  };

  submit.addEventListener('click', function (evt) {
    evt.preventDefault();
    var errorText = customValidation();
    if (errorText) {
      hashtag.setCustomValidity(errorText);
      hashtag.style = 'border: 2px solid red';
    } else {
      successPopup();
    }
  });
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_CODE && document.activeElement !== textDescription && document.activeElement !== hashtag) {
      onCloseFormClick();
    }
  };
  var onUploadFileChange = function () {
    window.changeEffect.addListenersForm();
    closeForm.addEventListener('click', onCloseFormClick);
    document.addEventListener('keydown', onPopupEscPress);
  };
  var onCloseFormClick = function () {
    window.changeEffect.removeListenersForm();
    closeForm.removeEventListener('click', onCloseFormClick);
    document.removeEventListener('keydown', onPopupEscPress);
  };
  uploadFile.addEventListener('change', onUploadFileChange);
})();
