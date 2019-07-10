'use strict';


// Создает массив с моки комментами и записывает его в переменную commentsTemplates
var commentsTemplates = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
/* создает функцию для вывода рендомного значения (в дальнейшем будет многократно применяться),
функция возвращает значение в сокращенном виде, записана в переменную getRandomIntager */
var getRandomIntager = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};
/* Сщздает функцию, которая возвращет массив объектов, в массиве содержится: аватар (картинка с рендомным номером от 1 до 6),
 рендомный коммент (из массива выше), а так же имя. в функции создан пустой массив comments куда добавляются все обьекты
 функция возвращает массив объектов, функция записана в переменную getComments */
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
/* создает функцию которую записывает в переменную getPhoto с параметром number, функция возвращает
массив со значениями url (номер от 1 до 25, переберем вызвав функцию ниже), likes (рендомное значение в диапазоне от 15 до 200),
comments (вызывает функцию , записанную в переменную getComments, что возвращает массив объектов функции getComments выше  ) */
var getPhoto = function (number) {
  return {
    url: 'photos/' + number + '.jpg',
    likes: getRandomIntager(15, 200),
    comments: getComments()
  };
};
/* записывает в переменную getPhotos функцию , которая создает пустой массив , в который записывает все значения,
вызванные функцией getPhoto, а именно обект сосотоящий из url, likes, comments. Объект создается 25 раз и меняет свои значения в
соответсвии с вызовом функции getPhoto, то есть меняется количество лайков, меняется урл фото, а так же коммент,
таким обрзом создается 25 обектов, функция возвращает массив этих 25 объектов */
var getPhotos = function () {
  var array = [];
  for (var i = 1; i <= 25; i++) {
    array.push(getPhoto(i));
  }
  return array;
};
// Вызывает функцию getPhotos, описанную выше, то есть функция начинает работать
var photos = getPhotos();
/* находит дом элемент (ноду, узел), записанный в файле индекс.хтмл, в теге темплейт с идом picture, берем ту часть ДОМа,
которая содержится в теге с классом .picture - это тег а (ссылка), записывает эту ноду в переменную template,
так же находит и записывает содердимое ДОМ элемента с классом .pictures в переменную pictures */
var template = document.querySelector('#picture').content.querySelector('.picture');
var pictures = document.querySelector('.pictures');
/* создает функцию, которую записывает в переменную renderPhotos. Функция создает фрагмент и записывает его в переменную fragment,
далее в функции создает цикл со значениями от нуля до кол-ва элементов массива array (рендомное значение от 1 до 6),
в массиве создает переменную element в которую клонирует ноду, записанную в переменную template, создает переменную photo ,
которая является активным элементом массива array, а затем подкручивает необходимые значения переменной element в которой
содержится фрагмент в которм хранится весь узел который мы записали в темплейте, а именно: находит и меняет значение в теге с классом
 .picture__img урл фото, находит и меняет текстовое значение тега с классом .picture__likes (количество лайков на всех фотках будет
  разное), находит и меняет текстовое значение тега с классом .picture__comments (комменты), а затем добавляет все эти измененные
  элементы во фрагмент, затем добавляет содержание фрагмента в дом не по одному элементику, а весь фрагмент и записсанные в
  него элементы  */
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
// вызывает функцию renderPhotos, почле которой все совершается
renderPhotos(photos);
