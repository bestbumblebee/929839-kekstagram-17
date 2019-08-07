'use strict';

(function () {
  var MAX_VALUE = 100;
  var MIN_VALUE = 25;
  var STEP_SCALE = 25;
  var MAX_PERCENT = 100;

  var formChangeFile = document.querySelector('.img-upload__overlay');
  var photo = document.querySelector('.img-upload__preview img');
  var scaleSmaller = formChangeFile.querySelector('.scale__control--smaller');
  var scaleBigger = formChangeFile.querySelector('.scale__control--bigger');
  var scaleInput = formChangeFile.querySelector('.scale__control--value');
  var scaleValue;

  var effect = formChangeFile.querySelector('.effects');
  var effectLevel = formChangeFile.querySelector('.effect-level');
  var effectLevelLine = formChangeFile.querySelector('.effect-level__line');
  var effectLevelValue = formChangeFile.querySelector('.effect-level__value');
  var effectLevelPin = formChangeFile.querySelector('.effect-level__pin');
  var effectLevelDepth = formChangeFile.querySelector('.effect-level__depth');

  var defaultEffectsRadio = document.querySelector('.effects__radio[checked]');
  var effectsPrewiewClass;
  var onFilterChange = function (evt) {
    var element = evt ? evt.target : defaultEffectsRadio;
    photo.classList.remove(effectsPrewiewClass);
    effectsPrewiewClass = 'effects__preview--' + element.value;
    photo.classList.add(effectsPrewiewClass);

    if (photo.classList.contains('effects__preview--none')) {
      effectLevel.style.display = 'none';
      photo.style.filter = 'none';
    } else {
      effectLevel.style.display = 'block';
      effectLevelPin.style.left = '100%';
      effectLevelDepth.style.width = '100%';
      changeEffectLevel(MAX_VALUE);
      changeScale(scaleValue);
    }
  };

  var getStartCondition = function () {
    scaleValue = MAX_VALUE;
    scaleInput.value = '100%';
    photo.style = 'transform: scale(' + getValueFilter(MAX_PERCENT, 0, 1) + ')';
  };

  var getValueFilter = function (percent, minFilter, maxFilter) {
    return percent * (maxFilter - minFilter) / MAX_PERCENT + minFilter;
  };

  var changeScale = function (percent) {
    photo.style = 'transform: scale(' + getValueFilter(percent, 0, 1) + ')';
  };

  var onScaleSmallerClick = function () {
    scaleValue = scaleValue - STEP_SCALE;
    if (scaleValue < MIN_VALUE) {
      scaleValue = MIN_VALUE;
    }
    scaleInput.value = scaleValue + '%';
    changeScale(scaleValue);
  };

  var onScaleBiggerClick = function () {
    scaleValue = scaleValue + STEP_SCALE;
    if (scaleValue > MAX_VALUE) {
      scaleValue = MAX_VALUE;
    }
    scaleInput.value = scaleValue + '%';
    changeScale(scaleValue);
  };

  var changeEffectLevel = function (percent) {
    switch (photo.className) {
      case 'effects__preview--chrome' :
        photo.style.filter = 'grayscale(' + getValueFilter(percent, 0, 1) + ')';
        break;
      case 'effects__preview--sepia' :
        photo.style.filter = 'sepia(' + getValueFilter(percent, 0, 1) + ')';
        break;
      case 'effects__preview--marvin' :
        photo.style.filter = 'invert(' + getValueFilter(percent, 0, 100) + '%)';
        break;
      case 'effects__preview--phobos' :
        photo.style.filter = 'blur(' + getValueFilter(percent, 0, 3) + 'px)';
        break;
      case 'effects__preview--heat' :
        photo.style.filter = 'brightness(' + getValueFilter(percent, 1, 3) + ')';
        break;
    }
  };

  var onEffectLevelPinMousedown = function (evt) {
    var startCoords = {
      x: evt.clientX,
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };
      startCoords.x = moveEvt.clientX;
      var newLeft = effectLevelPin.offsetLeft - shift.x;
      var rightEdge = effectLevelLine.offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      } if (newLeft < 0) {
        newLeft = 0;
      }
      effectLevelPin.style.left = newLeft + 'px';
      var levelEffect = (newLeft * 100) / effectLevelLine.offsetWidth;
      effectLevelDepth.style.width = levelEffect + '%';
      effectLevelValue.value = levelEffect;

      changeEffectLevel(levelEffect);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var addListenersForm = function () {
    getStartCondition();
    onFilterChange();
    formChangeFile.classList.remove('hidden');
    scaleSmaller.addEventListener('click', onScaleSmallerClick);
    scaleBigger.addEventListener('click', onScaleBiggerClick);
    effect.addEventListener('change', onFilterChange);
    effectLevelPin.addEventListener('mousedown', onEffectLevelPinMousedown);
  };

  var removeListenersForm = function () {
    formChangeFile.classList.add('hidden');
    scaleSmaller.removeEventListener('click', onScaleSmallerClick);
    scaleBigger.removeEventListener('click', onScaleBiggerClick);
    effect.removeEventListener('change', onFilterChange);
    effectLevelPin.removeEventListener('mousedown', onEffectLevelPinMousedown);
  };

  window.changeEffect = {
    addListenersForm: addListenersForm,
    removeListenersForm: removeListenersForm
  };
})();
