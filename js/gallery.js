'use strict';

(function () {

  var MIN_QUANTITY_NEW_PHOTOS = 0;
  var MAX_QUANTITY_NEW_PHOTOS = 10;
  var similarPhotoList = document.querySelector('.pictures');

  // Отрисовываем галерею миниатюр
  var renderPhotos = function (photos) {
    var fragment = document.createDocumentFragment();

    photos.forEach(function (photo) {
      fragment.appendChild(window.miniPicture.getPhoto(photo));
    });

    return similarPhotoList.appendChild(fragment);
  };

  // Загружаем данные с сервера
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

  // Фильтрация по фотографиям
  var filtersPhoto = document.querySelector('.img-filters');

  var showPopularPhotos = function () {
    photos = window.photos;
    updatePhotos();
  };

  var showNewPhotos = function () {
    var photosCopy = window.photos.slice();
    var newPhotos = photosCopy.sort(window.util.flipCoin).slice(MIN_QUANTITY_NEW_PHOTOS, MAX_QUANTITY_NEW_PHOTOS);
    photos = newPhotos;
    updatePhotos();
  };

  var showDiscussedPhotos = function () {
    var photosCopy = window.photos.slice();
    var discussedPhoto = photosCopy.sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
    photos = discussedPhoto;
    updatePhotos();
  };

  var classToFilter = {
    'filter-popular': showPopularPhotos,
    'filter-new': showNewPhotos,
    'filter-discussed': showDiscussedPhotos,
  };

  var filterForm = filtersPhoto.querySelector('.img-filters__form');
  var filterButtons = filtersPhoto.querySelectorAll('.img-filters__button');

  var showFilterPhotos = window.debounce(function (evt) {
    filterButtons.forEach(function (btn) {
      btn.classList.remove('img-filters__button--active');
    });

    similarPhotoList.querySelectorAll('.picture__link').forEach(function (element) {
      similarPhotoList.removeChild(element);
    });

    var idFilter = evt.target.id;
    evt.target.classList.add('img-filters__button--active');
    classToFilter[idFilter]();
  });

  filterForm.addEventListener('click', showFilterPhotos);

  window.backend.load(loadPhotos, window.util.onError);

})();
