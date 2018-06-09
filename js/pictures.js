'use strict';

(function () {
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;
  var COMMENTS =['Всё отлично!', 'В целом всё неплохо. Но не всё.',   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
  var FOTOS_NUMBERS = 25;
  var similarFotoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var similarFotoList = document.querySelector('.pictures');

  var getRandomLikes = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + Math.floor(min);
  };

  var getRandomString = function (strings) {
    return strings[Math.floor(Math.random() * strings.length)]
  };

  var getComments = function () {
    var comments_two_phrase = getRandomString(COMMENTS) + ' ' + getRandomString(COMMENTS);
    var comments_phrase = getRandomString(COMMENTS);
    var comments = [comments_phrase, comments_two_phrase];

    return getRandomString(comments);
  };

  var getFotos = function () {
    var fotos = [];

    for (var i = 0; i < FOTOS_NUMBERS; i++) {
      var foto = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: getRandomLikes(LIKES_MIN, LIKES_MAX),
        comments: getComments(),
        description: getRandomString(DESCRIPTION)
      };
      fotos.push(foto);
    }
    return fotos;
  };

  var renderFoto = function (foto) {
    var fotoElement = similarFotoTemplate.cloneNode(true);

    fotoElement.querySelector('.picture__img').src = foto.url;
    fotoElement.querySelector('.picture__stat--likes').textContent = foto.likes;
    fotoElement.querySelector('.picture__stat--comments').textContent = foto.comments;

    return fotoElement;
  };

  var addFoto = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < getFotos().length; i++) {
      fragment.appendChild(renderFoto(getFotos()[i]));
    }
    return similarFotoList.appendChild(fragment);
  };
  addFoto();
})();
