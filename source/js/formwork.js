const type = document.querySelector('#type');
const price = document.querySelector('#price');

type.addEventListener('click', function () {
  switch (type.value) {
    case 'bungalow':
      price.min = 0;
      break;
    case 'flat':
      price.min = 1000;
      break;
    case 'house':
      price.min = 5000;
      break;
    case 'palace':
      price.min = 10000;
      break;
  }
});

const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');

timein.addEventListener('change', function () {
  switch (timein.value) {
    case '12:00':
      timeout.value = '12:00';
      break;
    case '13:00':
      timeout.value = '13:00';
      break;
    case '14:00':
      timeout.value = '14:00';
      break;
  }
});

timeout.addEventListener('change', function () {
  switch (timeout.value) {
    case '12:00':
      timein.value = '12:00';
      break;
    case '13:00':
      timein.value = '13:00';
      break;
    case '14:00':
      timein.value = '14:00';
      break;
  }
});

const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity').children;

roomNumber.addEventListener('click', function () {
  for (let i = 0; i < capacity.length; i++) {
    capacity[i].setAttribute('disabled', '');
  }
  switch (roomNumber.value) {
    case '1':
      capacity[2].removeAttribute('disabled');
      break;
    case '2':
      capacity[1].removeAttribute('disabled');
      capacity[2].removeAttribute('disabled');
      break;
    case '3':
      capacity[0].removeAttribute('disabled');
      capacity[1].removeAttribute('disabled');
      capacity[2].removeAttribute('disabled');
      break;
    case '100':
      capacity[3].removeAttribute('disabled');
      break;
  }
});

const fileChooser = document.querySelector('#avatar');
const preview = document.querySelector('.ad-form-header__preview').children;
const fileChooserImages = document.querySelector('#images');
const previewImages = document.querySelector('.ad-form__photo');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];


fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview[0].src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

fileChooserImages.addEventListener('change', () => {
  const file = fileChooserImages.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewImages.insertAdjacentHTML('beforeend', '  <img src="' + reader.result + '" alt="Аватар пользователя" width="45" height="40">');
    });

    reader.readAsDataURL(file);
  }
});
