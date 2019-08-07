'use strict';
(function () {
  var formChangeFile = document.querySelector('.img-upload__overlay');
  var photo = document.querySelector('.img-upload__preview img');
  var scaleSmaller = formChangeFile.querySelector('.scale__control--smaller');
  var scaleBigger = formChangeFile.querySelector('.scale__control--bigger');
  var scaleInput = formChangeFile.querySelector('.scale__control--value');
  var scaleValue;
  var maxValue = 100;
  var minValue = 25;

  var effect = formChangeFile.querySelector('.effects');
  var effectLevel = formChangeFile.querySelector('.effect-level');
  var effectLevelLine = formChangeFile.querySelector('.effect-level__line');
  var effectLevelValue = formChangeFile.querySelector('.effect-level__value');
  var effectLevelPin = formChangeFile.querySelector('.effect-level__pin');
  var effectLevelDepth = formChangeFile.querySelector('.effect-level__depth');
  var onFilterChange = function (evt) {
    var element = evt.target;
    photo.classList.remove(photo.removeAttribute('class'));
    photo.classList.add('effects__preview--' + element.getAttribute('value'));
    onEffectChange();
  };
  var onEffectChange = function () {
    if (!photo.hasAttribute('class') || photo.className === 'effects__preview--none') {
      scaleValue = maxValue;
      scaleInput.value = '100%';
      effectLevel.style.display = 'none';
      photo.style.filter = 'none';
    } else {
      scaleValue = maxValue;
      scaleInput.value = '100%';
      effectLevel.style.display = 'block';
      effectLevelPin.style.left = '100%';
      effectLevelDepth.style.width = '100%';
      changeEffectLevel(maxValue);
      changeScale(scaleValue);
    }
  };

  var getValueFilter = function (procent, minFilter, maxFilter) {
    return procent * (maxFilter - minFilter) / 100 + minFilter;
  };

  var changeScale = function (procent) {
    photo.style = 'transform: scale(' + getValueFilter(procent, 0, 1) + ')';
  };

  var onScaleSmallerClick = function () {
    var step = 25;
    scaleValue = scaleValue - step;
    if (scaleValue < minValue) {
      scaleValue = minValue;
    }
    scaleInput.value = scaleValue + '%';
    changeScale(scaleValue);
  };

  var onScaleBiggerClick = function () {
    var step = 25;
    scaleValue = scaleValue + step;
    if (scaleValue > maxValue) {
      scaleValue = maxValue;
    }
    scaleInput.value = scaleValue + '%';
    changeScale(scaleValue);
  };

  var changeEffectLevel = function (procent) {
    switch (photo.className) {
      case 'effects__preview--chrome' :
        photo.style.filter = 'grayscale(' + getValueFilter(procent, 0, 1) + ')';
        break;
      case 'effects__preview--sepia' :
        photo.style.filter = 'sepia(' + getValueFilter(procent, 0, 1) + ')';
        break;
      case 'effects__preview--marvin' :
        photo.style.filter = 'invert(' + getValueFilter(procent, 0, 100) + '%)';
        break;
      case 'effects__preview--phobos' :
        photo.style.filter = 'blur(' + getValueFilter(procent, 0, 3) + 'px)';
        break;
      case 'effects__preview--heat' :
        photo.style.filter = 'brightness(' + getValueFilter(procent, 1, 3) + ')';
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
      effectLevelValue.setAttribute('value', levelEffect);
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
    onEffectChange();
    formChangeFile.classList.remove('hidden');
    scaleSmaller.addEventListener('click', onScaleSmallerClick);
    scaleBigger.addEventListener('click', onScaleBiggerClick);
    effect.addEventListener('change', onFilterChange);
    effectLevelPin.addEventListener('mousedown', onEffectLevelPinMousedown);
  };

  var removeListenersForm = function () {
    photo.classList.remove(photo.removeAttribute('class'));
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
