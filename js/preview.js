'use strict';

(function () {
  var COMMENT_COUNT_MIN = 1;
  var COMMENT_COUNT_MAX = 2;
  var bigFoto = document.querySelector('.big-picture');
  var bigFotoEsc = bigFoto.querySelector('.big-picture__cancel');
  var containerSocialComment = bigFoto.querySelector('.social__comments');
  var socialCommentInput = bigFoto.querySelector('.social__footer-text');
  var miniFotoLink = document.querySelectorAll('.picture__link');

  // Отрисовка большого фото
  var renderBigFoto = function (index) {
    bigFoto.querySelector('.big-picture__img img').src = window.dataFotos.getFotos[index].url;
    bigFoto.querySelector('.likes-count').textContent = window.dataFotos.getFotos[index].likes;
    bigFoto.querySelector('.comments-count').textContent = window.dataFotos.getFotos[index].comments.length;
    bigFoto.querySelector('.social__caption').textContent = window.dataFotos.getFotos[index].description;

    getComments();

    bigFoto.classList.remove('hidden');
    document.addEventListener('keydown', onBigFotoClose);

    return bigFoto;
  };


  // вывод комментариев под фото
  var getComments = function () {
    var countComments = window.random.getRandomNumber(COMMENT_COUNT_MIN, COMMENT_COUNT_MAX);

    deleteOldComments();
    for (var i = 0; i < countComments; i++) {

      var userComents = document.createElement('li');
      userComents.classList.add('social__comment');
      containerSocialComment.appendChild(userComents);

      var usersAvatar = document.createElement('img');
      usersAvatar.classList.add('social__picture');
      usersAvatar.src = 'img/avatar-' + window.random.getRandomNumber(1, 6) + '.svg';
      usersAvatar.alt = 'Аватар комментатора фотографии';
      usersAvatar.width = 35;
      usersAvatar.height = 35;
      userComents.appendChild(usersAvatar);


      var randomComment = window.random.getRandomElement(window.dataFotos.getFotos[i].comments);

      var textUserComments = document.createElement('p');
      textUserComments.classList.add('social__text');
      textUserComments.textContent = randomComment;
      userComents.appendChild(textUserComments);
    }
  };


  // Открытие большой фотографии при клике на маленькой
  for (var j = 0; j < miniFotoLink.length; j++) {
    miniFotoLink[j].addEventListener('click', function (evt) {
      var miniFoto = document.querySelectorAll('.picture__img');
      var target = evt.target;
      var index = Array.from(miniFoto).indexOf(target);
      renderBigFoto(index);
    });
  }

  // Закрытие большой фотографии
  var bigFotoCancel = function () {
    bigFoto.classList.add('hidden');
    document.removeEventListener('keydown', onBigFotoClose);
  };

  var onBigFotoClose = function (evt) {
    if (evt.target !== socialCommentInput) {
      window.util.isEscEvent(evt, bigFotoCancel);
    }
  };

  bigFotoEsc.addEventListener('keydown', onBigFotoClose);

  bigFotoEsc.addEventListener('click', bigFotoCancel);

  var deleteOldComments = function () {
    while (containerSocialComment.firstChild) {
      containerSocialComment.removeChild(containerSocialComment.firstChild);
    }
  };

  // Прячем блок с загрузкой и счетчиком комментариев
  var hideBlocks = function () {
    var commentCount = bigFoto.querySelector('.social__comment-count');
    var commentLoadmore = bigFoto.querySelector('.social__loadmore');

    commentCount.classList.add('visually-hidden');
    commentLoadmore.classList.add('visually-hidden');
  };
  hideBlocks();

})();
