'use strict';
// создает данные
(function () {
  var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
    'В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var names = [
    'Шелдон',
    'Леонард',
    'Говард',
    'Раджеш',
    'Пенни',
    'Бернадед'
  ];

  var getRandomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getPictures = function () {
    var photos = [];
    for (var i = 1; i <= 25; i++) {
      var picture = {
        url: 'photos/' + i + '.jpg',
        likes: getRandomInRange(15, 200),
        comment: [{
          avatar: 'img/avatar-' + getRandomInRange(1, 6) + '.svg',
          message: comments[getRandomInRange(1, comments.length)],
          name: names[getRandomInRange(1, names.length)],
        }]
      };
      photos.push(picture);
    }
    return photos;
  };

  var pictures = getPictures();

  var listElement = document.querySelector('.pictures');

  var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

  var renderPicture = function (photo) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__comments').textContent = photo.comment.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;

    return pictureElement;
  };

  var renderPictures = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
      listElement.appendChild(fragment);
    }
  };

  renderPictures();
})();
