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

  var renderPictures = function (pictures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
    }
    listElement.appendChild(fragment);
  };
  window.renderPictures = renderPictures;
})();
