'use strict';

(function () {
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;
  var COMMENT_COUNT_MIN = 1;
  var COMMENT_COUNT_MAX = 2;
  var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
  var FOTOS_NUMBERS = 25;
  var randomFotos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
  var similarFotoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var similarFotoList = document.querySelector('.pictures');
  var bigFoto = document.querySelector('.big-picture');
  var bigFotoEsc = bigFoto.querySelector('.big-picture__cancel');
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


  var mixArr = function () {
    return Math.random() - 0.5;
  };

  var urlFoto = randomFotos.sort(mixArr);

  var getFotos = function () {
    var fotos = [];

    for (var i = 0; i < FOTOS_NUMBERS; i++) {
      var foto = {
        url: 'photos/' + urlFoto[i] + '.jpg',
        likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
        comments: getComments(),
        description: getRandomElement(DESCRIPTION)
      };
      fotos.push(foto);
    }
    return fotos;
  };
  var usersFotos = getFotos();

  var getFotoElement = function (foto) {
    var fotoElement = similarFotoTemplate.cloneNode(true);

    fotoElement.querySelector('.picture__img').src = foto.url;
    fotoElement.querySelector('.picture__stat--likes').textContent = foto.likes;
    fotoElement.querySelector('.picture__stat--comments').textContent = foto.description;

    return fotoElement;
  };

  var renderFoto = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < usersFotos.length; i++) {
      fragment.appendChild(getFotoElement(usersFotos[i]));
    }
    return similarFotoList.appendChild(fragment);
  };
  renderFoto();


  var renderBigFoto = function (index) {
    bigFoto.querySelector('.big-picture__img img').src = usersFotos[index].url;
    bigFoto.querySelector('.likes-count').textContent = usersFotos[index].likes;
    bigFoto.querySelector('.comments-count').textContent = usersFotos[index].comments.length;
    bigFoto.querySelector('.social__caption').textContent = usersFotos[index].description;

    /* вывод комментариев под фото */
    deleteOldComments();
    for (var i = 0; i < usersFotos[index].comments.length; i++) {
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
      textUserComments.classList.add('social__text');
      textUserComments.textContent = getComments();
      userComents.appendChild(textUserComments);
    }

    bigFoto.classList.remove('hidden');
    document.addEventListener('keydown', onEditImgEscPress);

    return bigFoto;
  };

  var miniFotoLink = document.querySelectorAll('.picture__link');

  for (var j = 0; j < miniFotoLink.length; j++) {
    miniFotoLink[j].addEventListener('click', function (evt) {
      var miniFoto = document.querySelectorAll('.picture__img');
      var target = evt.target;
      var index = Array.from(miniFoto).indexOf(target);
      renderBigFoto(index);
    });
  }

  var onBigFotoCancel = function () {
    bigFoto.classList.add('hidden');
    document.removeEventListener('keydown', onEditImgEscPress);
  };
  bigFotoEsc.addEventListener('click', onBigFotoCancel);


  var deleteOldComments = function () {
    while (containerSocialComment.firstChild) {
      containerSocialComment.removeChild(containerSocialComment.firstChild);
    }
  };

  var hideBlocks = function () {
    var commentCount = bigFoto.querySelector('.social__comment-count');
    var commentLoadmore = bigFoto.querySelector('.social__loadmore');

    commentCount.classList.add('visually-hidden');
    commentLoadmore.classList.add('visually-hidden');
  };
  hideBlocks();

  /* Загрузка изображения и показ формы редактирования */
  var ESC_KEYCODE = 27;
  var uploadImg = document.querySelector('#upload-select-image');
  var uploadImgLabel = uploadImg.querySelector('#upload-file');
  var uploadImgOpen = uploadImg.querySelector('.img-upload__overlay');
  var uploadImgClose = uploadImg.querySelector('#upload-cancel');

  var onEditImgEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onBigFotoCancel();
      closeEditImg();
    }
  };

  var openEditImg = function () {
    uploadImgOpen.classList.remove('hidden');
    filterPreview.classList.add(filterDefault);
    resizeControl.value = valueResizeDefault + '%';
    valueResize = valueResizeDefault;
    imgPreview.style.transform = 'none';

    document.addEventListener('keydown', onEditImgEscPress);
  };

  var closeEditImg = function () {
    uploadImgOpen.classList.add('hidden');

    uploadImgLabel.removeEventListener('change', openEditImg);
    document.removeEventListener('keydown', onEditImgEscPress);
  };

  uploadImgLabel.addEventListener('change', function () {
    openEditImg();
  });

  uploadImgClose.addEventListener('click', function () {
    closeEditImg();
  });

  /* Масштаб загружаемого изображения*/
  var VALUE_RESIZE_MIN = 25;
  var VALUE_RESIZE_MAX = 100;
  var RESIZE_STEP = 25;
  var resizeControl = uploadImg.querySelector('.resize__control--value');
  var reduceImg = uploadImg.querySelector('.resize__control--minus');
  var increaseImg = uploadImg.querySelector('.resize__control--plus');
  var valueResizeDefault = resizeControl.value = 100;
  var valueResize = valueResizeDefault;
  var imgPreview = document.querySelector('.img-upload__preview');

  var resizeMinus = function () {
    valueResize = Math.max(valueResize - RESIZE_STEP, VALUE_RESIZE_MIN);
    resizeControl.value = valueResize + '%';

    return transformImg();
  };

  var resizePlus = function () {
    valueResize = Math.min(valueResize + RESIZE_STEP, VALUE_RESIZE_MAX);
    resizeControl.value = valueResize + '%';

    return transformImg();
  };

  var transformImg = function () {
    var transformImgValue = valueResize / 100;
    imgPreview.style.transform = 'scale(' + transformImgValue + ')';
  };

  reduceImg.addEventListener('click', resizeMinus);

  increaseImg.addEventListener('click', resizePlus);

  /* Наложение эффекта на изображение */

  var filterInputs = document.querySelectorAll('.effects__radio');
  var filterPreview = imgPreview.querySelector('.img-upload__preview img');
  var filterInputCheck = document.querySelector('.effects__radio[checked]');
  var filterDefault = 'effects__preview--' + filterInputCheck.value;
  var scaleBox = uploadImgOpen.querySelector('.scale');
  var scaleLine = scaleBox.querySelector('.scale__line');
  var scalePin = scaleBox.querySelector('.scale__pin');


  var getPinValue = function (evt) {
    var scaleLineCoords = scaleLine.getBoundingClientRect();
    var scaleLineLeft = scaleLineCoords.left;
    var scaleLineWidth = scaleLineCoords.width;
    var scalePinCoordX = evt.clientX - scaleLineLeft;

    var getFilterValueEffects = function (a, b) {
      var secondaryFilterValue = scalePinCoordX / scaleLineWidth;
      var paramFilter = secondaryFilterValue * (b - a) + a;

      return paramFilter;
    };

    var effectChrome = imgPreview.querySelector('.effects__preview--chrome');
    var effectSepia = imgPreview.querySelector('.effects__preview--sepia');
    var effectMarvin = imgPreview.querySelector('.effects__preview--marvin');
    var effectPhobos = imgPreview.querySelector('.effects__preview--phobos');
    var effectHeat = imgPreview.querySelector('.effects__preview--heat');

    if (effectChrome) {
      effectChrome.style.filter = 'grayscale(' + getFilterValueEffects(0, 1) + ')';
    }
    if (effectSepia) {
      effectSepia.style.filter = 'sepia(' + getFilterValueEffects(0, 1) + ')';
    }
    if (effectMarvin) {
      effectMarvin.style.filter = 'invert(' + getFilterValueEffects(0, 100) + '%)';
    }
    if (effectPhobos) {
      effectPhobos.style.filter = 'blur(' + getFilterValueEffects(0, 3) + 'px)';
    }
    if (effectHeat) {
      effectHeat.style.filter = 'brightness(' + getFilterValueEffects(1, 3) + ')';
    }
  };

  var setEffects = function (evt) {
    scalePin.addEventListener('mouseup', getPinValue);
    filterPreview.classList = '';
    var filterClass = 'effects__preview--' + evt.target.value;
    filterPreview.classList.add(filterClass);
    filterPreview.style = 'none';
    scaleBox.classList.toggle('hidden', evt.target.value === 'none');
  };

  for (var i = 0; i < filterInputs.length; i++) {
    filterInputs[i].addEventListener('change', setEffects);
  }

})();
