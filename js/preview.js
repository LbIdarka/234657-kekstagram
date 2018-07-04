'use strict';

(function () {
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
    document.addEventListener('keydown', onBigPhotoClose);

    modal.classList.add('modal-open');

    return bigPhoto;
  };


  // вывод комментариев под фото
  var renderComments = function (comments) {
    // удаляем старые комментарии
    containerSocialComment.innerHTML = '';

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
    bigPhoto.classList.add('hidden');
    modal.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPhotoClose);
    document.removeEventListener('click', bigPhotoCancel);
  };

  var onBigPhotoClose = function (evt) {
    if (evt.target !== socialCommentInput) {
      window.util.isEscEvent(evt, bigPhotoCancel);
    }
  };

  bigPhotoEsc.addEventListener('keydown', onBigPhotoClose);

  bigPhotoEsc.addEventListener('click', bigPhotoCancel);

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
