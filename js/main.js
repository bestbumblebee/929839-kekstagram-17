'use strict';
var init = function (pictures) {
  window.renderPictures(pictures);
  window.initFilter(pictures);
};

window.load(init, window.renderMessageError);
