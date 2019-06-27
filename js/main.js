'use strict'



var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

var getRandomIntager = function (min, max) {
  return Math.random() * (max - min) + min;
};

var getPhoto = function (number) {
  return {
    url: 'photos/' + number + '.jpg',
    likes: getRandomIntager(15, 201),
    comments: getRandomIntager (comments[0], comments.length - 1)
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

var renderPhotos = function (array) {

};
