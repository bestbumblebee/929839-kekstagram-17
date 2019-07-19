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
// заноси в переменную код кнопки эскейп
var ESC_CODE = 27;
/* создает по очереди четыре переменные в которые заносим данные, которые находимв ДОМе с помощью метода квериселектор :1. Ищет
дом элемент с id upload-file и записівает его в переменную uploadFile 2. ищем элемент с классом img-upload__overlay - это основной
 див в котором лежит вся разметка формы редактирования зображения 3. ищем элемент с классом img-upload__cancel - это кнопка закрытия
  формы, 4. ищем элемент с классом img-upload__preview img - это имг которая лежит в диве*/
var uploadFile = document.querySelector('#upload-file');
var formChangeFile = document.querySelector('.img-upload__overlay');
var closeForm = formChangeFile.querySelector('.img-upload__cancel');
var photo = document.querySelector('.img-upload__preview img');
/*  создает по очереди еще три переменные : 1. на этот раз в найденном элементе который мы внесли в элемент formChangeFil мы ищем
элемент с классом effect-level - это модификатор, который присвоен филдсету, который отвечает за Изменение глубины эффекта,
 накладываемого на изображение, 2. Кнопка изменения глубины эффекта фотографии, 3. Глубина эффекта фотографии (объяснения по классам
  сократил так как они идентичны первому пункту) */
var effectLevel = formChangeFile.querySelector('.effect-level');
var effectLevelpin = formChangeFile.querySelector('.effect-level__pin');
var effectLevelDepth = formChangeFile.querySelector('.effect-level__depth');
/* Создаем переменную, в которую передаем функцию с параметром - объектом evt , сокращение от эвент листеннера, то есть обработчик
события). В функции мы залем условие, что если одно из значений объекта evt, а именно keyCode будет строго равно значению. которое
мы записали в переменную ESC_CODE а именно 27, то тогда сработает функция closePopup которая закрывает попап */
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_CODE) {
    closePopup();
  }
};
/* создаем переменную в которую передаем функцию , которая во-первых в ДОМ элементе , который мы нашли и передали в переменную
formChangeFile (кнопка закрытия попапа с формой) с помощью метода remove удалет класс hidden из списка классов этого элемента,
то етсь делает попап видимым. А во-вторых на документ добавляет обработчик события keydown, которое если наступает , то
срабатывает функция, которую мы передали в переменную onPopupEscPress, а именно если кнопка на которую нажали будет эскеп
то попак закроется. То есть обрабочик на попапе формы запускается вместе с открытием попапа  */
var openPopup = function () {
  formChangeFile.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};
/* создает переменную, зеркально идентичную предыдущей с той разницей, что сейчас ее задача закрыть попап формы путем добавления
класса хайден который скрывает форму, а так же убирает ненужный теперь обработчик события который ослеживет нажатия клавишь и если
нажатие на эскейп, тогда закрывается попап. Удаляется обработчик потому, что если это сделать прямо, то даже при закрытом попапе
он добалялся методом эдд и будет добавляться при каждом открытии попапа */
var closePopup = function () {
  formChangeFile.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

/* Одственно обработчик события change который вешаем на инпут загрузки файла, который запускает 2 функции: 1. открывает попап с
формой и 2. менет эффект фото */
uploadFile.addEventListener('change', function () {
  openPopup();
  changeEffect();
});
// обработчик события клик по кнопке "закрыть форму", который при наступлении собыия закрывает форму
closeForm.addEventListener('click', closePopup);
// передаем в переменную ДОМ элемент с классом .effects это филдсет отвечающий за Наложение эффекта на изображение
var fieldset = document.querySelector('.effects');
/* В на этот филдсет вешаем обработчик события change в котором: 1. присваиваем переменной element ссылку на объект инициатор
события, 2. удаляет с элемента фото атирибут класс, 3. добавляет элементу фото класс, который формируется конкатенацией строк:
начала effects__preview-- к которому дудет добавлена строка, которая будет взята из элеменат в котором наступило событие в котором
будет взято значение атирибута value */
fieldset.addEventListener('change', function (evt) {
  var element = evt.target;
  photo.classList.remove(photo.removeAttribute('class'));
  photo.classList.add('effects__preview--' + element.getAttribute('value'));
  changeEffect();
});
/* передаем в переменную функцию, которая будет менять эффект на фото. В начале в функции содержитс условии, в котором сказано:
если НЕ фото с атрибутом класс или фото с классом строго соответсвующим условию, тогда мы добавляем ДОМ элементу effectLeve который
нашли раньше, инлайновый стиль - дисплей none ТО есть скрывает филдсет Изменение глубины эффекта, накладываемого на изображение.
 Если условие не выполняется, тогда филдсет показывается, а блочку пин через инлайн стиль передается позиция слева 100% и диву который
 отвечает за Глубину эффекта фотографии. дается ширина 100% родителя  */
var changeEffect = function () {
  if (!photo.hasAttribute('class') || photo.className === 'effects__preview--none') {
    effectLevel.style.display = 'none';
  } else {
    effectLevel.style.display = 'block';
    effectLevelpin.style.left = '100%';
    effectLevelDepth.style.width = '100%';
  }
};
