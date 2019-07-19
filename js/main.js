'use strict';

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

var ESC_CODE = 27;

var uploadFile = document.querySelector('#upload-file');
var formChangeFile = document.querySelector('.img-upload__overlay');
var closeForm = formChangeFile.querySelector('.img-upload__cancel');
var photo = document.querySelector('.img-upload__preview img');

var effectLevel = formChangeFile.querySelector('.effect-level');
var effectLevelpin = formChangeFile.querySelector('.effect-level__pin');
var effectLevelDepth = formChangeFile.querySelector('.effect-level__depth');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_CODE) {
    closePopup();
  }
};

var openPopup = function () {
  formChangeFile.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  formChangeFile.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};


uploadFile.addEventListener('change', function () {
  openPopup();
  changeEffect();
});

closeForm.addEventListener('click', closePopup);

var fieldset = document.querySelector('.effects');

fieldset.addEventListener('change', function (evt) {
  var element = evt.target;
  photo.classList.remove(photo.removeAttribute('class'));
  photo.classList.add('effects__preview--' + element.getAttribute('value'));
  changeEffect();
});

var changeEffect = function () {
  if (!photo.hasAttribute('class') || photo.className === 'effects__preview--none') {
    effectLevel.style.display = 'none';
  } else {
    effectLevel.style.display = 'block';
    effectLevelpin.style.left = '100%';
    effectLevelDepth.style.width = '100%';
  }
};
