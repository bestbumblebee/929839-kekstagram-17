'use strict';

(function () {
  var effect = window.form.formChangeFile.querySelector('.effects');
  var effectLevel = window.form.formChangeFile.querySelector('.effect-level');
  var effectLevelLine = window.form.formChangeFile.querySelector('.effect-level__line');
  var effectLevelValue = window.form.formChangeFile.querySelector('.effect-level__value');
  var effectLevelPin = window.form.formChangeFile.querySelector('.effect-level__pin');
  var effectLevelDepth = window.form.formChangeFile.querySelector('.effect-level__depth');

  effect.addEventListener('change', function (evt) {
    var element = evt.target;

    window.form.photo.classList.remove(window.form.photo.removeAttribute('class'));
    window.form.photo.classList.add('effects__preview--' + element.getAttribute('value'));
    onChangeEffect();
  });

  var onChangeEffect = function () {
    if (!window.form.photo.hasAttribute('class') || window.form.photo.className === 'effects__preview--none') {
      effectLevel.style.display = 'none';
      window.form.photo.style.filter = 'none';
    } else {
      effectLevel.style.display = 'block';
      effectLevelPin.style.left = '100%';
      effectLevelDepth.style.width = '100%';
      changeEffectLevel(100);
    }
  };

  window.changeEffect = {
    effectLevelPin: effectLevelPin,
    onChangeEffect: onChangeEffect,
    onEffectLevelPin: onEffectLevelPin
  };

  // получает значения фильтра
  var getValueFilter = function (procent, minFilter, maxFilter) {
    return procent * (maxFilter - minFilter) / 100 + minFilter;
  };

  // изменяет фильтр
  var changeEffectLevel = function (procent) {
    switch (window.form.photo.className) {
      case 'effects__preview--chrome' :
        window.form.photo.style.filter = 'grayscale(' + getValueFilter(procent, 0, 1) + ')';
        break;

      case 'effects__preview--sepia' :
        window.form.photo.style.filter = 'sepia(' + getValueFilter(procent, 0, 1) + ')';
        break;

      case 'effects__preview--marvin' :
        window.form.photo.style.filter = 'invert(' + getValueFilter(procent, 0, 100) + '%)';
        break;

      case 'effects__preview--phobos' :
        window.form.photo.style.filter = 'blur(' + getValueFilter(procent, 0, 3) + 'px)';
        break;

      case 'effects__preview--heat' :
        window.form.photo.style.filter = 'brightness(' + getValueFilter(procent, 1, 3) + ')';
        break;
    }
  };

  var onEffectLevelPin = function (evt) {
    // перемещает ползунок
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
})();
