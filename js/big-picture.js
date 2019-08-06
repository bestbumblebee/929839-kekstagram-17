'use strict';

(function () {

  var bigPicture = document.querySelector('.big-picture');
  var listComments = bigPicture.querySelector('.social__comments');

  var renderComment = function (comment) {
    var commentElement = listComments.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };

  var renderComments = function (comments) {
    listComments.innerHtml = '';

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < comments.length; i++) {
      fragment.appendChild(renderComment(comments[i]));
    }
    listComments.appendChild(fragment);
  };

  var renderBigPicture = function (photo) {

    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

    bigPicture.querySelector('.big-picture__img').src = photo.url;

    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.description').textContent = photo.description;

    renderComments(photo.comments);
  };
  window.renderBigPicture = renderBigPicture;
})();
