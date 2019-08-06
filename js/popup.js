'use strict';

(function () {
  var ESC_CODE = 27;

  var uploadFile = document.querySelector('#upload-file');
  var closeForm = document.querySelector('.img-upload__cancel');
  var textDescription = document.querySelector('.text__description');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_CODE && document.activeElement !== textDescription) {
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
