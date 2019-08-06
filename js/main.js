'use strict';
var utils = function (pictures) {
  window.renderPictures(pictures);
  window.renderBigPicture(pictures[0]);
  window.initFilter(pictures);
};

window.load(utils, window.renderMessageError);
