'use strict';
(function () {
  var STEP_COUNT = 5;
  var INITIAL_CURRENT_COMMENTS = 5;

  var body = document.querySelector('body');
  var bigPicture = document.querySelector('.big-picture');
  var listComment = bigPicture.querySelector('.social__comments');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var currentComments = INITIAL_CURRENT_COMMENTS;
  var currentCommentsCount = bigPicture.querySelector('.social__comment-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var closeBigPicture = bigPicture.querySelector('.big-picture__cancel');
  var renderComment = function (comment) {
    var commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');
    commentItem.classList.add('visually-hidden');
    var commentImg = document.createElement('img');
    commentImg.classList.add('social__picture');
    commentImg.src = comment.avatar;
    commentImg.alt = comment.name;
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
    listComment.innerHTML = '';

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < comments.length; i++) {
      var comment = renderComment(comments[i]);
      fragment.appendChild(comment);
    }

    listComment.appendChild(fragment);
  };

  var showComments = function () {
    var usersComments = Array.from(listComment.querySelectorAll('.social__comment'));

    if (currentComments < usersComments.length) {
      for (var i = 0; i < currentComments; i++) {
        usersComments[i].classList.remove('visually-hidden');
      }
      commentsLoader.classList.remove('visually-hidden');
      currentCommentsCount.textContent = currentComments + ' из ' + commentsCount.textContent + ' комментариев';
      currentComments = currentComments + STEP_COUNT;
    } else {
      for (var j = 0; j < usersComments.length; j++) {
        usersComments[j].classList.remove('visually-hidden');
      }
      currentCommentsCount.textContent = usersComments.length + ' из ' + commentsCount.textContent + ' комментариев';
      commentsLoader.classList.add('visually-hidden');
    }
  };

  var onShowCommentsClick = function () {
    showComments();
  };

  var renderBigPicture = function (photo) {
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    commentsCount.textContent = photo.comments.length;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    closeBigPicture.addEventListener('click', onClosePictureClick);
    document.addEventListener('keydown', onPopupEscPress);
    commentsLoader.addEventListener('click', onShowCommentsClick);

    renderComments(photo.comments);
    showComments();
  };
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.ESC_CODE) {
      onClosePictureClick();
    }
  };
  var onClosePictureClick = function () {
    currentComments = INITIAL_CURRENT_COMMENTS;
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    commentsLoader.removeEventListener('click', onShowCommentsClick);
    closeBigPicture.removeEventListener('click', onClosePictureClick);
    document.removeEventListener('keydown', onPopupEscPress);
  };
  window.renderBigPicture = renderBigPicture;
})();
