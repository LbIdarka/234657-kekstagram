'use strict';

(function () {

  var similarPhotoList = document.querySelector('.pictures');

  // отрисовываем галерею миниатюр
  var renderPhotos = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(window.miniPicture.getPhotoElement(photos[i]));
    }
    return similarPhotoList.appendChild(fragment);
  };

  // загружаем данные с сервера
  var photos = [];

  var loadPhotos = function (data) {
    photos = data;
    window.photos = data;
    updatePhotos();
    filtersPhoto.classList.remove('img-filters--inactive');
  };

  var updatePhotos = function () {
    renderPhotos(photos);
  };

  // фильтрация по фотографиям
  var filtersPhoto = document.querySelector('.img-filters');

  var showPopularPhotos = window.debounce.debounce(function () {
    photos = window.photos;
    similarPhotoList.innerHTML = '';
    updatePhotos();
  });

  var showNewPhotos = window.debounce.debounce(function () {
    var photosCopy = window.photos.slice();
    var newPhotos = photosCopy.sort(window.util.flipCoin).slice(0, 10);
    photos = newPhotos;
    similarPhotoList.innerHTML = '';
    updatePhotos();
  });

  var showDiscussedPhotos = window.debounce.debounce(function () {
    var photosCopy = window.photos.slice();
    var discussedPhoto = photosCopy.sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
    photos = discussedPhoto;
    similarPhotoList.innerHTML = '';
    updatePhotos();
  });

  var classToFilter = {
    'filter-popular': showPopularPhotos,
    'filter-new': showNewPhotos,
    'filter-discussed': showDiscussedPhotos,
  };

  var filterForm = filtersPhoto.querySelector('.img-filters__form');
  var filterBtn = filtersPhoto.querySelectorAll('.img-filters__button');

  var showFiltersPhoto = function (evt) {
    filterBtn.forEach(function (btn) {
      btn.classList.remove('img-filters__button--active');
    });
    var idFilter = evt.target.id;
    evt.target.classList.add('img-filters__button--active');
    classToFilter[idFilter]();
  };

  filterForm.addEventListener('click', function (evt) {
    showFiltersPhoto(evt);
  });

  window.backend.load(loadPhotos, window.util.onError);

})();
