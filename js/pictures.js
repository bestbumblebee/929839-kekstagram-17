'use strict';

(function () {
  var listElement = document.querySelector('.pictures');

  var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

  var renderPicture = function (photo) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;

    return pictureElement;
  };

  var renderPicturesSuccess = function (pictures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
      listElement.appendChild(fragment);
    }
  };
  var renderPicturesError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #eed21e;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '15px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(renderPicturesSuccess, renderPicturesError);
  window.pictures = {
    renderPicturesSuccess: renderPicturesSuccess,
    renderPicturesError: renderPicturesError
  };
})();


