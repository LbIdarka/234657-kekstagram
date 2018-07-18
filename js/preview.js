'use strict';

(function () {
  var MIN_QUANTITY_AVATARS = 1;
  var MAX_QUANTITY_AVATARS = 6;
  var MIN_QUANTITY_COMMENTS = 0;
  var MAX_QUANTITY_COMMENTS = 5;
  var bigPhoto = document.querySelector('.big-picture');
  var bigPhotoEsc = bigPhoto.querySelector('.big-picture__cancel');
  var containerSocialComment = bigPhoto.querySelector('.social__comments');
  var socialCommentInput = bigPhoto.querySelector('.social__footer-text');
  var commentLoadMore = bigPhoto.querySelector('.social__loadmore');
  var modal = document.querySelector('body');

  // Отрисовка большого фото
  var renderBigPhoto = function (photo, comments) {
    comments = photo.comments;
    containerSocialComment.innerHTML = '';

    bigPhoto.querySelector('.big-picture__img img').src = photo.url;
    bigPhoto.querySelector('.likes-count').textContent = photo.likes;
    bigPhoto.querySelector('.comments-count').textContent = photo.comments.length;
    bigPhoto.querySelector('.social__caption').textContent = photo.description;

    if (comments.length > MAX_QUANTITY_COMMENTS) {
      loadMoreComments(comments);
      commentLoadMore.classList.remove('visually-hidden');
    } else {
      renderComments(comments);
      commentLoadMore.classList.add('visually-hidden');
      showCountComments(comments.length, comments);
    }

    bigPhoto.classList.remove('hidden');
    modal.classList.add('modal-open');
    document.addEventListener('keydown', onBigPhotoEscClose);

    return bigPhoto;
  };

  // Вывод комментариев под фото
  var renderComments = function (comments) {

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

  // Загрузка дополнительных комментариев, если их больше 5ти
  var loadMoreComments = function (comments) {
    renderComments(comments.slice(MIN_QUANTITY_COMMENTS, MAX_QUANTITY_COMMENTS));
    var startIndex = MIN_QUANTITY_COMMENTS;
    var quantity = MAX_QUANTITY_COMMENTS;
    var copyComments = [];
    showCountComments(quantity, comments);

    commentLoadMore.addEventListener('click', function () {
      startIndex += quantity;
      copyComments = comments.slice(startIndex, startIndex + quantity);
      renderComments(copyComments);
      showCountComments(startIndex + copyComments.length, comments);
    });
  };

  // Счетчик комментариев
  var commentCount = bigPhoto.querySelector('.social__comment-count');
  var showCountComments = function (count, comments) {
    if (count === comments.length) {
      commentLoadMore.classList.add('visually-hidden');
    }
    commentCount.childNodes[0].textContent = count + ' из ';
  };

  // Закрытие большой фотографии
  var closeBigPhoto = function () {
    bigPhoto.classList.add('hidden');
    modal.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPhotoEscClose);
    document.removeEventListener('click', closeBigPhoto);
    commentLoadMore.removeEventListener('click', loadMoreComments);
  };

  var onBigPhotoEscClose = function (evt) {
    if (evt.target !== socialCommentInput) {
      window.util.isEscEvent(evt, closeBigPhoto);
    }
  };

  bigPhotoEsc.addEventListener('keydown', onBigPhotoEscClose);
  bigPhotoEsc.addEventListener('click', closeBigPhoto);

  window.preview = {
    renderBigPhoto: renderBigPhoto
  };

})();
