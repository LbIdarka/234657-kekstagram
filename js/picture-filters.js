'use strict';

(function () {
  var showFilters = function (filters) {
    var filtersPhoto = document.querySelector('.img-filters');

    filters = window.miniPicture.loadPhotos ? filtersPhoto.classList.remove('img-filters--inactive') : window.miniPicture.loadPhotos;
    return filters;
  };
  showFilters();
})();
