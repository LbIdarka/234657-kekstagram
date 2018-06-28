'use strict';

(function () {
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;
  var PHOTOS_NUMBERS = 25;
  var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
  var randomPhotos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

  var urlPhoto = randomPhotos.sort(window.util.flipCoin);
  var randomComments = COMMENTS.sort(window.util.flipCoin);


  var getPhotos = function () {
    var photos = [];

    for (var i = 0; i < PHOTOS_NUMBERS; i++) {
      var photo = {
        url: 'photos/' + urlPhoto[i] + '.jpg',
        likes: window.util.getRandomNumber(LIKES_MIN, LIKES_MAX),
        comments: randomComments,
        description: window.util.getRandomElement(DESCRIPTION)
      };
      photos.push(photo);
    }
    return photos;
  };
  var usersPhotos = getPhotos();

  window.dataPhotos = {
    getPhotos: usersPhotos
  };

})();
