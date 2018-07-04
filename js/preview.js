'use strict';

(function () {
  var bigPhoto = document.querySelector('.big-picture');
  var bigPhotoEsc = bigPhoto.querySelector('.big-picture__cancel');
  var containerSocialComment = bigPhoto.querySelector('.social__comments');
  var socialCommentInput = bigPhoto.querySelector('.social__footer-text');

  // Отрисовка большого фото
  var renderBigPhoto = function (photo, index, comments) {
    comments = photo.comments;

    bigPhoto.querySelector('.big-picture__img img').src = photo.url;
    bigPhoto.querySelector('.likes-count').textContent = photo.likes;
    bigPhoto.querySelector('.comments-count').textContent = photo.comments.length;
    bigPhoto.querySelector('.social__caption').textContent = photo.description;

    renderComments(index, comments);

    bigPhoto.classList.remove('hidden');
    document.addEventListener('keydown', onBigPhotoClose);

    return bigPhoto;
  };


  // вывод комментариев под фото
  var renderComments = function (index, comments) {
    deleteOldComments();

    for (var i = 0; i < comments.length; i++) {
      var userComments = document.createElement('li');
      userComments.classList.add('social__comment');
      containerSocialComment.appendChild(userComments);

      var usersAvatar = document.createElement('img');
      usersAvatar.classList.add('social__picture');
      usersAvatar.src = 'img/avatar-' + window.util.getRandomNumber(1, 6) + '.svg';
      usersAvatar.alt = 'Аватар комментатора фотографии';
      usersAvatar.width = 35;
      usersAvatar.height = 35;
      userComments.appendChild(usersAvatar);

      var textUserComment = document.createElement('p');
      textUserComment.classList.add('social__text');
      textUserComment.textContent = comments[i];
      userComments.appendChild(textUserComment);
    }

  };

  // Закрытие большой фотографии
  var bigPhotoCancel = function () {
    window.pictureEffects.filterDefault();
    bigPhoto.classList.add('hidden');
    document.removeEventListener('keydown', onBigPhotoClose);
    bigPhotoEsc.removeEventListener('click', bigPhotoCancel);
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
    renderBigPhoto: renderBigPhoto
  };

})();
