'use strict';

(function () {
  var ESC_CODE = 27;

  var uploadFile = document.querySelector('#upload-file');
  var closeForm = document.querySelector('.img-upload__cancel');
  var textDescription = document.querySelector('.text__description');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_CODE && document.activeElement !== textDescription) {
      onClosePopupClick();
    }
  };

  var onUploadFileChange = function () {
    window.changeEffect.onFilterChange();
    window.changeEffect.formChangeFile.classList.remove('hidden');
    closeForm.addEventListener('click', onClosePopupClick);
    document.addEventListener('keydown', onPopupEscPress);
    window.changeEffect.effectLevelPin.addEventListener('mousedown', window.changeEffect.onEffectLevelPinMousedown);
  };

  var onClosePopupClick = function () {
    window.changeEffect.photo.classList.remove(window.changeEffect.photo.removeAttribute('class'));
    window.changeEffect.formChangeFile.classList.add('hidden');
    closeForm.removeEventListener('click', onClosePopupClick);
    document.removeEventListener('keydown', onPopupEscPress);
    window.changeEffect.effectLevelPin.removeEventListener('mousedown', window.changeEffect.onEffectLevelPinMousedown);
  };

  uploadFile.addEventListener('change', onUploadFileChange);
})();
