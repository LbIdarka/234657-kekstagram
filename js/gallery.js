'use strict';

(function () {

  var similarPhotoList = document.querySelector('.pictures');

  // отрисовываем галерею миниатюр
  var renderPhotos = function (photos) {
    var fragment = document.createDocumentFragment();

    photos.forEach(function (photo) {
      fragment.appendChild(window.miniPicture.getPhotoElement(photo));
    });

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
    updatePhotos();
  });

  var showNewPhotos = window.debounce.debounce(function () {
    var photosCopy = window.photos.slice();
    var newPhotos = photosCopy.sort(window.util.flipCoin).slice(0, 10);
    photos = newPhotos;
    updatePhotos();
  });

  var showDiscussedPhotos = window.debounce.debounce(function () {
    var photosCopy = window.photos.slice();
    var discussedPhoto = photosCopy.sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
    photos = discussedPhoto;
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

    similarPhotoList.querySelectorAll('.picture__link').forEach(function (element) {
      similarPhotoList.removeChild(element);
    });

    var idFilter = evt.target.id;
    evt.target.classList.add('img-filters__button--active');
    classToFilter[idFilter]();
  };

  filterForm.addEventListener('click', showFiltersPhoto);

  window.backend.load(loadPhotos, window.util.onError);

})();
