import './formwork.js';
import './util.js';
import {getData, sendData, showAlert} from'./server.js';

/* global L:readonly */
/* global _:readonly */

const adForm = document.querySelector('.ad-form');
const adFildsetsForm = adForm.querySelectorAll('fieldset');
const mapForm = document.querySelector('.map__filters');
const mapFildsetsForm = mapForm.querySelectorAll('fieldset');
const mapSelectsForm = mapForm.querySelectorAll('select');
const address = document.querySelector('#address');

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    () => {
      adForm.reset();
      const success = document.querySelector('#success').content.querySelector('.success');
      const successClon = success.cloneNode(true);
      document.body.append(successClon);
      document.addEventListener('keydown', (evt) => {
        if (isEscEvent(evt)) {
          successClon.classList.add('hidden');
        }
      });
      document.addEventListener('click', () => {
        successClon.classList.add('hidden');
      });
      marker.setLatLng([35.68397, 139.75]);
    },
    () => {
      const error = document.querySelector('#error').content.querySelector('.error');
      const errorClon = error.cloneNode(true);
      const errorButton = errorClon.querySelector('.error__button');
      document.body.append(errorClon);
      document.addEventListener('keydown', (evt) => {
        if (isEscEvent(evt)) {
          errorClon.classList.add('hidden');
        }
      });
      errorButton.addEventListener('click', () => {
        errorClon.classList.add('hidden');
      });
    },
    new FormData(evt.target),
  );
});

const closeAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  adFildsetsForm.forEach((fildset) => {
    fildset.setAttribute('disabled', '');
  });

  mapForm.classList.add('map__filters--disabled');
  mapFildsetsForm.forEach((fildset) => {
    fildset.setAttribute('disabled', '');
  });
  mapSelectsForm.forEach((select) => {
    select.setAttribute('disabled', '');
  });
};

closeAdForm();

const openAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adFildsetsForm.forEach((fildset) => {
    fildset.removeAttribute('disabled');
  });

  mapForm.classList.remove('map__filters--disabled');
  mapFildsetsForm.forEach((fildset) => {
    fildset.removeAttribute('disabled');
  });
  mapSelectsForm.forEach((select) => {
    select.removeAttribute('disabled');
  });
};

window.addEventListener('load', () => {
  openAdForm();
});


const map = L.map('map-canvas')
  .setView({
    lat: 35.68379,
    lng: 139.75021,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  {
    lat: 35.68379,
    lng: 139.75021,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const pinIcons = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housings = [housingType, housingPrice, housingRooms, housingGuests]

const filterWifi = document.querySelector('#filter-wifi');
const filterDishwasher = document.querySelector('#filter-dishwasher');
const filterParking = document.querySelector('#filter-parking');
const filterWasher = document.querySelector('#filter-washer');
const filterElevator = document.querySelector('#filter-elevator');
const filterConditioner = document.querySelector('#filter-conditioner');
const filters = [filterWifi, filterDishwasher, filterParking, filterWasher, filterElevator, filterConditioner]

const markerGroup = L.layerGroup().addTo(map);

const popapCreater = (data) => {

  markerGroup.clearLayers();

  const getPoppapFilterRank= (advertisements) => {

    const offer = advertisements.offer;

    let rank = 0;

    if (housingType.value === offer.type) {
      rank += 1;
    }
    switch (housingPrice.value) {
      case 'any':
        break;
      case 'middle':
        rank += 1;
        break;
      case 'low':
        rank += 1;
        break;
      case 'high':
        rank += 1;
        break;
    }
    switch (housingRooms.value) {
      case '1':
        rank += 1;
        break;
      case '2':
        rank += 1;
        break;
      case '3':
        rank += 1;
        break;
    }
    switch (housingGuests.value) {
      case '1':
        rank += 1;
        break;
      case '2':
        rank += 1;
        break;
      case '0':
        rank += 1;
        break;
    }
    filters.forEach((filter) => {
      if (filter.checked) {
        rank += 1;
      }
    })
    return rank;
  }

  const getPoppapRank= (advertisements) => {

    const offer = advertisements.offer;

    let rank = 0;

    if (housingType.value === offer.type) {
      rank += 1;
    }
    switch (housingPrice.value) {
      case 'any':
        break;
      case 'middle':
        if (offer.price > 10000 && offer.price < 50000) {
          rank += 1;
        }
        break;
      case 'low':
        if (offer.price < 10000) {
          rank += 1;
        }
        break;
      case 'high':
        if (offer.price > 50000) {
          rank += 1;
        }
        break;
    }
    switch (housingRooms.value) {
      case '1':
        if (offer.rooms === 1) {
          rank += 1;
        }
        break;
      case '2':
        if (offer.rooms === 2) {
          rank += 1;
        }
        break;
      case '3':
        if (offer.rooms === 3) {
          rank += 1;
        }
        break;
    }
    switch (housingGuests.value) {
      case '1':
        if (offer.guests === 1) {
          rank += 1;
        }
        break;
      case '2':
        if (offer.guests === 2) {
          rank += 1;
        }
        break;
      case '0':
        if (offer.guests === 0) {
          rank += 1;
        }
        break;
    }

    filters.forEach((filter) => {
      const features = offer.features;
      if (filter.checked && features != undefined) {
        features.forEach((feature) => {
          if (filter.value === feature) {
            rank += 1;
          }
        })
      }
    })

    return rank;
  };

  const comparePoppaps = (offerA, offerB) => {
    const rankA = getPoppapRank(offerA);
    const rankB = getPoppapRank(offerB);

    return rankB - rankA;
  }

  let massiveRank = []
  for (let i = 0; i < data.length; i++) {
    massiveRank.push(getPoppapFilterRank(data[i]));
  }

  const popap = document.querySelector('#card').content.querySelector('.popup');

  data.slice().sort(comparePoppaps).slice(0, 10).forEach((advertisements) => {
    if (getPoppapRank(advertisements) === Math.max(...massiveRank)) {
      const popapClon = popap.cloneNode(true);
      const offer = advertisements.offer;
      popapClon.querySelector('.popup__title').textContent = offer.title;
      popapClon.querySelector('.popup__text--address').textContent = offer.address;
      popapClon.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
      const  offerType = () => { switch (offer.type) {
        case 'palace':
          return 'Дворец';
        case 'flat':
          return 'Квартира';
        case 'house':
          return 'Дом';
        case 'bungalow':
          return 'Бунгало';
      }};
      popapClon.querySelector('.popup__type').textContent = offerType();
      popapClon.querySelector('.popup__text--capacity').textContent = offer.rooms +' комнаты для ' + offer.guests +' гостей';
      popapClon.querySelector('.popup__text--time').textContent = 'Заезд после '+ offer.checkin + ', выезд до ' + offer.checkout;
      const popupFeatures = popapClon.querySelector('.popup__features');
      for (let index = 0; index < 6; index++) {
        popupFeatures.removeChild(popapClon.querySelector('.popup__feature'));
      }
      const features = offer.features;
      if ( features != undefined ) {
        for (let index = 0; index < features.length; index++) {
          popupFeatures.insertAdjacentHTML('beforeend', '  <li class="popup__feature popup__feature--' + features[index] +'"></li>');
        }
      }
      popapClon.querySelector('.popup__description').textContent = offer.description;
      const popupPhotos = popapClon.querySelector('.popup__photos');
      popupPhotos.removeChild(popapClon.querySelector('.popup__photo'));
      const photos = offer.photos;
      if ( photos != undefined ) {
        for (let index = 0; index < photos.length; index++) {
          popupPhotos.insertAdjacentHTML('beforeend', '  <img src="' + photos[index] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
        }
      }

      const author = advertisements.author;
      popapClon.querySelector('.popup__avatar').src = author.avatar;

      const Location = advertisements.location;
      const marker = L.marker({
        lat: Location.lat,
        lng: Location.lng,
      },
      {
        icon: pinIcons,
      },
      );
      marker.addTo(markerGroup).bindPopup(popapClon);
    }
  });
};

getData((advertisement) => {
  popapCreater(advertisement);
  housings.forEach((housing) => {
    housing.addEventListener('change', _.debounce(
      () => popapCreater(advertisement),
      400,
    ));
  });
  filters.forEach((filter) => {
    filter.addEventListener('click', _.debounce(
      () => popapCreater(advertisement),
      400,
    ));
  });
},
() => {
  showAlert('Не удалось загрузить данные. Попробуйте ещё раз');
});

marker.addTo(map);

address.value = '35.68397, 139.75'
marker.on('moveend', (evt) => {
  const LatLng = evt.target.getLatLng()
  address.value =  Math.round10(LatLng.lat , -5) + ', ' + Math.round10(LatLng.lng , -5);
});

