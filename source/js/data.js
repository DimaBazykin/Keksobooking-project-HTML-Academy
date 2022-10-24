import { getRandomInt, getRandomfloor } from './util.js'


const advertisementCreate = () => {
  const avatarCreate = () => {
    return{avatar:'img/avatars/user' + '0' + getRandomInt(1, 8)+'.png',
    };
  }

  const LocationCreate = () => {
    return{
      x: getRandomfloor(35.65000, 35.70000, 5),
      y: getRandomfloor(139.70000, 139.80000, 5)};
  }

  const offerCreate = () => {
    const typeCreate = () =>{
      switch (getRandomInt(0,3)) {
        case 0:
          return 'palace';
        case 1:
          return 'flat';
        case 2:
          return 'house';
        case 3:
          return 'bungalow';
      }
    };
    const checkinCreate = () => {
      switch (getRandomInt(0,2)) {
        case 0:
          return '12:00';
        case 1:
          return '13:00';
        case 2:
          return '14:00';
      }
    };
    const featuresCreate = () =>{
      let FeatureMasive = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
      let FeatureMasiveNew = [];
      for (let index = 0; index < getRandomInt(1, 6); index++) {
        FeatureMasiveNew.push(FeatureMasive[index]);
      }
      return FeatureMasiveNew;
    };
    const photosCreate = () =>{
      let PhotosMasive = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
      let PhotosMasiveNew = [];
      for (let index = 0; index < getRandomInt(1, 3); index++) {
        PhotosMasiveNew.push(PhotosMasive[index]);
      }
      return PhotosMasiveNew;
    };
    return {
      title : 'Самые красивые ципочки, только тут!!!',
      addres: String(Location.x) + ' , ' + String(Location.y),
      price: getRandomInt(1,10000),
      type: typeCreate(),
      rooms: getRandomInt(1,5),
      guests:getRandomInt(1,10),
      checkin: checkinCreate(),
      checkout: checkinCreate(),
      features: featuresCreate(),
      description:'Такие красивые стены, что у нас их воруют!',
      photos:photosCreate(),
    };
  }
  const author = avatarCreate();
  const Location = LocationCreate();
  const offer = offerCreate();
  return [author, offer, Location];
};

const advertisement = new Array(10).fill(null).map(() => advertisementCreate());

export { advertisement};
