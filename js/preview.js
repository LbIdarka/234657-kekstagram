'use strict';

(function () {
  var COMMENT_COUNT_MIN = 1;
  var COMMENT_COUNT_MAX = 2;
  var bigPhoto = document.querySelector('.big-picture');
  var bigPhotoEsc = bigPhoto.querySelector('.big-picture__cancel');
  var containerSocialComment = bigPhoto.querySelector('.social__comments');
  var socialCommentInput = bigPhoto.querySelector('.social__footer-text');
  var miniPhotoLink = document.querySelectorAll('.picture__link');

  // Отрисовка большого фото
  var renderBigPhoto = function (index) {
    index = window.dataPhotos.getPhotos[index];

    bigPhoto.querySelector('.big-picture__img img').src = index.url;
    bigPhoto.querySelector('.likes-count').textContent = index.likes;
    bigPhoto.querySelector('.comments-count').textContent = index.comments.length;
    bigPhoto.querySelector('.social__caption').textContent = index.description;

    getComments();

    bigPhoto.classList.remove('hidden');
    document.addEventListener('keydown', onBigPhotoClose);

    return bigPhoto;
  };


  // вывод комментариев под фото
  var getComments = function () {
    var countComments = window.util.getRandomNumber(COMMENT_COUNT_MIN, COMMENT_COUNT_MAX);

    deleteOldComments();
    for (var i = 0; i < countComments; i++) {

      var userComents = document.createElement('li');
      userComents.classList.add('social__comment');
      containerSocialComment.appendChild(userComents);

      var usersAvatar = document.createElement('img');
      usersAvatar.classList.add('social__picture');
      usersAvatar.src = 'img/avatar-' + window.util.getRandomNumber(1, 6) + '.svg';
      usersAvatar.alt = 'Аватар комментатора фотографии';
      usersAvatar.width = 35;
      usersAvatar.height = 35;
      userComents.appendChild(usersAvatar);


      var randomComment = window.util.getRandomElement(window.dataPhotos.getPhotos[i].comments);

      var textUserComments = document.createElement('p');
      textUserComments.classList.add('social__text');
      textUserComments.textContent = randomComment;
      userComents.appendChild(textUserComments);
    }
  };

  var openPreview = function () {
    for (var j = 0; j < miniPhotoLink.length; j++) {
      miniPhotoLink[j].addEventListener('click', function (evt) {
        var target = evt.currentTarget;
        var index = target.dataset.currentIndex;
        renderBigPhoto(index);
      });
    }
  };
  openPreview();

  // Закрытие большой фотографии
  var bigPhotoCancel = function () {
    bigPhoto.classList.add('hidden');
    document.removeEventListener('keydown', onBigPhotoClose);
  };

  var onBigPhotoClose = function (evt) {
    if (evt.target !== socialCommentInput) {
      window.util.isEscEvent(evt, bigPhotoCancel);
    }
  };

  bigPhotoEsc.addEventListener('keydown', onBigPhotoClose);

  bigPhotoEsc.addEventListener('click', bigPhotoCancel);

  var deleteOldComments = function () {
    while (containerSocialComment.firstChild) {
      containerSocialComment.removeChild(containerSocialComment.firstChild);
    }
  };

  // Прячем блок с загрузкой и счетчиком комментариев
  var hideBlocks = function () {
    var commentCount = bigPhoto.querySelector('.social__comment-count');
    var commentLoadmore = bigPhoto.querySelector('.social__loadmore');

    commentCount.classList.add('visually-hidden');
    commentLoadmore.classList.add('visually-hidden');
  };
  hideBlocks();

  window.preview = {
    renderBigPhoto: function () {
      renderBigPhoto();
    }
  };

})();
