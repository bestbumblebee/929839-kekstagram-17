'use strict';

var ESC_CODE = 27;

var commentsTemplates = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

var getRandomIntager = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var getComments = function () {
  var comments = [];
  for (var i = 1; i <= getRandomIntager(1, 6); i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomIntager(1, 6) + '.svg',
      message: commentsTemplates[getRandomIntager(0, commentsTemplates.length - 1)],
      name: 'Артем'
    };
    comments.push(comment);
  }

  return comments;
};

var getPhoto = function (number) {
  return {
    url: 'photos/' + number + '.jpg',
    likes: getRandomIntager(15, 200),
    comments: getComments()
  };
};

var getPhotos = function () {
  var array = [];
  for (var i = 1; i <= 25; i++) {
    array.push(getPhoto(i));
  }
  return array;
};

var photos = getPhotos();

var template = document.querySelector('#picture').content.querySelector('.picture');
var pictures = document.querySelector('.pictures');

var renderPhotos = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    var element = template.cloneNode(true);
    var photo = array[i];
    element.querySelector('.picture__img').src = photo.url;
    element.querySelector('.picture__likes').textContent = photo.likes;
    element.querySelector('.picture__comments').textContent = photo.comments.length;
    fragment.appendChild(element);
  }
  pictures.appendChild(fragment);
};

renderPhotos(photos);

var uploadFile = document.querySelector('#upload-file');
var formChangeFile = document.querySelector('.img-upload__overlay');
var closeForm = formChangeFile.querySelector('.img-upload__cancel');
var photo = document.querySelector('.img-upload__preview img');

var effectLevel = formChangeFile.querySelector('.effect-level');
var effectLevelLine = formChangeFile.querySelector('.effect-level__line');
var effectLevelValue = formChangeFile.querySelector('.effect-level__value');
var effectLevelPin = formChangeFile.querySelector('.effect-level__pin');
var effectLevelDepth = formChangeFile.querySelector('.effect-level__depth');

var textDescription = formChangeFile.querySelector('.text__description');


var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_CODE && document.activeElement !== textDescription) {
    onPopupCloseClick();
  }
};

var onPopupOpenChange = function () {
  changeEffect();
  formChangeFile.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  fieldset.addEventListener('change', onFieldsetChange);
  closeForm.addEventListener('click', onPopupCloseClick);
};

var onPopupCloseClick = function () {
  formChangeFile.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  fieldset.removeEventListener('change', onFieldsetChange);
  closeForm.removeEventListener('click', onPopupCloseClick);
};

uploadFile.addEventListener('change', function () {
  onPopupOpenChange();
});

var fieldset = document.querySelector('.effects');

var onFieldsetChange = function (evt) {
  var element = evt.target;
  photo.classList.remove(photo.removeAttribute('class'));
  photo.classList.add('effects__preview--' + element.getAttribute('value'));
  changeEffect();
};

var changeEffect = function () {
  if (!photo.hasAttribute('class') || photo.className === 'effects__preview--none') {
    effectLevel.style.display = 'none';
    photo.style.filter = 'none';
  } else {
    effectLevel.style.display = 'block';
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = '100%';
    changeEffectLevel(100);
  }
};

// получает значение фильтра

var getValueFilter = function (procent, minFilter, maxFilter) {
  return procent * (maxFilter - minFilter) / 100 + minFilter;
};

// изменяет фильтр

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

// перемещает ползунок

effectLevelPin.addEventListener('mousedown', function (evt) {
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
});
