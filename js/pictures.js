'use strict';

(function () {
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;
  var COMMENT_COUNT_MIN = 1;
  var COMMENT_COUNT_MAX = 2;
  var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
  var FOTOS_NUMBERS = 25;
  var similarFotoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var similarFotoList = document.querySelector('.pictures');
  var bigFoto = document.querySelector('.big-picture');
  var containerSocialComment = document.querySelector('.social__comments');

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  };

  var getRandomElement = function (strings) {
    return strings[Math.floor(Math.random() * strings.length)];
  };

  var getComments = function () {
    var randomComments = [];
    var randomCommentsLength = getRandomNumber(COMMENT_COUNT_MIN, COMMENT_COUNT_MAX);

    while (randomComments.length < randomCommentsLength) {
      randomComments.push(getRandomElement(COMMENTS));
    }

    return randomComments;
  };

  var getFotos = function () {
    var fotos = [];
    var fotoComments = getComments();

    for (var i = 0; i < FOTOS_NUMBERS; i++) {
      var foto = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
        comments: fotoComments,
        description: getRandomElement(DESCRIPTION)
      };
      fotos.push(foto);
    }
    return fotos;
  };

  var getFotoElement = function (foto) {
    var fotoElement = similarFotoTemplate.cloneNode(true);

    fotoElement.querySelector('.picture__img').src = foto.url;
    fotoElement.querySelector('.picture__stat--likes').textContent = foto.likes;
    fotoElement.querySelector('.picture__stat--comments').textContent = foto.comments;

    return fotoElement;
  };

  var renderFoto = function () {
    var fragment = document.createDocumentFragment();
    var otherFotos = getFotos();

    for (var i = 0; i < otherFotos.length; i++) {
      fragment.appendChild(getFotoElement(otherFotos[i]));
    }
    return similarFotoList.appendChild(fragment);
  };
  renderFoto();


  var renderBigFoto = function () {
    bigFoto.classList.remove('hidden');
    var dataFotos = getFotos();

    bigFoto.querySelector('.big-picture__img img').src = dataFotos[0].url;
    bigFoto.querySelector('.likes-count').textContent = dataFotos[0].likes;
    bigFoto.querySelector('.comments-count').textContent = dataFotos[0].comments.length;
    bigFoto.querySelector('.social__caption').textContent = dataFotos[0].description;

    return bigFoto;
  };
  renderBigFoto();

  var deleteOldComments = function () {
    while (containerSocialComment.firstChild) {
      containerSocialComment.removeChild(containerSocialComment.firstChild);
    }
  };
  deleteOldComments();

  var renderUsersComments = function () {
    var dataFotos = getFotos();

    for (var i = 0; i < dataFotos[0].comments.length; i++) {
      var userComents = document.createElement('li');
      userComents.classList.add('social__comment');
      containerSocialComment.appendChild(userComents);

      var usersAvatar = document.createElement('img');
      usersAvatar.classList.add('social__picture');
      usersAvatar.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
      usersAvatar.alt = 'Аватар комментатора фотографии';
      usersAvatar.width = 35;
      usersAvatar.height = 35;
      userComents.appendChild(usersAvatar);

      var textUserComments = document.createElement('p');
      textUserComments.textContent = getComments();
      userComents.appendChild(textUserComments);
    }
  };
  renderUsersComments();

  var hideBlocks = function () {
    var commentCount = bigFoto.querySelector('.social__comment-count');
    var commentLoadmore = bigFoto.querySelector('.social__loadmore');

    commentCount.classList.add('visually-hidden');
    commentLoadmore.classList.add('visually-hidden');
  };
  hideBlocks();
})();
