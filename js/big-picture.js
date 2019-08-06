'use strict';

(function () {

  var bigPicture = document.querySelector('.big-picture');
  var listComments = bigPicture.querySelector('.social__comments');

  var renderComment = function (comment) {
    var commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');

    var commentImg = document.createElement('img');
    commentImg.classList.add('social__picture');
    commentImg.src = comment.avatar;
    commentImg.alt = 'Аватар комментатора фотографии';
    commentImg.width = '35';
    commentImg.height = '35';
    commentItem.appendChild(commentImg);

    var commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = comment.message;
    commentItem.appendChild(commentText);

    return commentItem;
  };

  var renderComments = function (comments) {
    listComments.innerHTML = '';

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < comments.length; i++) {
      var comment = renderComment(comments[i]);
      fragment.appendChild(comment);
    }
    listComments.appendChild(fragment);
  };

  var renderBigPicture = function (photo) {

    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

    bigPicture.querySelector('.big-picture__img img').src = photo.url;

    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.social__caption').textContent = photo.description;

    renderComments(photo.comments);
  };
  window.renderBigPicture = renderBigPicture;
})();
