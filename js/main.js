'use strict';
var init = function (pictures) {
  window.renderPictures(pictures);
  window.renderBigPicture(pictures[0]);
  window.initFilter(pictures);
};

window.load(init, window.renderMessageError);
