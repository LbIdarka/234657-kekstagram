'use strict';

(function () {
  var MIN_QUANTITY_AVATARS = 1;
  var MAX_QUANTITY_AVATARS = 6;
  var bigPhoto = document.querySelector('.big-picture');
  var bigPhotoEsc = bigPhoto.querySelector('.big-picture__cancel');
  var containerSocialComment = bigPhoto.querySelector('.social__comments');
  var socialCommentInput = bigPhoto.querySelector('.social__footer-text');
  var modal = document.querySelector('body');

  // Отрисовка большого фото
  var renderBigPhoto = function (photo, comments) {
    comments = photo.comments;

    bigPhoto.querySelector('.big-picture__img img').src = photo.url;
    bigPhoto.querySelector('.likes-count').textContent = photo.likes;
    bigPhoto.querySelector('.comments-count').textContent = photo.comments.length;
    bigPhoto.querySelector('.social__caption').textContent = photo.description;

    renderComments(comments);

    bigPhoto.classList.remove('hidden');
    modal.classList.add('modal-open');
    document.addEventListener('keydown', onBigPhotoEscClose);

    return bigPhoto;
  };


  // Вывод комментариев под фото
  var renderComments = function (comments) {

    containerSocialComment.innerHTML = '';

    comments.forEach(function (comment) {
      var userComments = document.createElement('li');
      userComments.classList.add('social__comment');
      containerSocialComment.appendChild(userComments);

      var usersAvatar = document.createElement('img');
      usersAvatar.classList.add('social__picture');
      usersAvatar.src = 'img/avatar-' + window.util.getRandomNumber(MIN_QUANTITY_AVATARS, MAX_QUANTITY_AVATARS) + '.svg';
      usersAvatar.alt = 'Аватар комментатора фотографии';
      usersAvatar.width = 35;
      usersAvatar.height = 35;
      userComments.appendChild(usersAvatar);

      var textUserComment = document.createElement('p');
      textUserComment.classList.add('social__text');
      textUserComment.textContent = comment;
      userComments.appendChild(textUserComment);
    });
  };

  // Закрытие большой фотографии
  var closeBigPhoto = function () {
    bigPhoto.classList.add('hidden');
    modal.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPhotoEscClose);
    document.removeEventListener('click', closeBigPhoto);
  };

  var onBigPhotoEscClose = function (evt) {
    if (evt.target !== socialCommentInput) {
      window.util.isEscEvent(evt, closeBigPhoto);
    }
  };

  bigPhotoEsc.addEventListener('keydown', onBigPhotoEscClose);

  bigPhotoEsc.addEventListener('click', closeBigPhoto);

  // Прячем блок с загрузкой и счетчиком комментариев
  var commentLoadMore = bigPhoto.querySelector('.social__loadmore');
  var hideBlocks = function () {
    var commentCount = bigPhoto.querySelector('.social__comment-count');

    commentCount.classList.add('visually-hidden');
    commentLoadMore.classList.add('visually-hidden');
  };
  hideBlocks();

  window.preview = {
    renderBigPhoto: renderBigPhoto
  };

})();
