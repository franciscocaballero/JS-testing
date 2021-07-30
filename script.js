'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//old school way of doing AJAX in Javscript:

// const getCoutrydata = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//     <article class="country">
//     <img class="country__img" src="${data.flag}" />
//     <div class="country__data">
//     <h3 class="country__name">${data.name}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${(
//       +data.population / 1000000
//     ).toFixed(1)} people</p>
//       <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//       <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//       </div>
//       </article>
//       `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCoutrydata('Spain');
// getCoutrydata('Japan');
// getCoutrydata('usa');
// getCoutrydata('china');

const rednerError = function (msg) {
  countriesContainer.insertAdjacentHTML('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const renderHtml = function (data, className = '') {
  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
  <h3 class="country__name">${data.name}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
    1
  )} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const getCoutryAndNeighbour = function (country) {
//   //AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     renderHtml(data);

//     //Get neighbour country 2
//     const [neighbour] = data.borders;

//     if (!neighbour) return;

//     //AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       // console.log(this.responseText);

//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);
//       renderHtml(data2, 'neighbour');
//     });
//   });
// };

// getCoutryAndNeighbour('usa');
// getCoutryAndNeighbour('el salvador');

//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();

// const request = fetch('https://restcountries.eu/rest/v2/name/usa');
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderHtml(data[0]);
//     });
// };

// getCountryData('usa');

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);

    return response.json();
  });
};

// const getCountryData = function (country) {
//   getJSON(
//     `https://restcountries.eu/rest/v2/name/${country}`,
//     `Country not found`
//   )
//     .then(data => {
//       renderHtml(data[0]);

//       const neighbour = data[0].borders[0];

//       if (!neighbour) throw new Error('No Neighbour found!');
//       //Country 2
//       return getJSON(
//         `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
//         `Country not found`
//       );
//     })

//     .then(data => renderHtml(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 🤯🤯🤯`);
//       rednerError(`Somethis is wrong🤯 ${err}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// Refernce
const getCountryData = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => {
      console.log(response);
      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      return response.json();
    })
    .then(data => {
      renderHtml(data[0]);

      const neighbour = data[0].borders[0];

      if (!neighbour) return;
      //Country 2
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderHtml(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 🤯🤯🤯`);
      rednerError(`Somethis is wrong🤯 ${err}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener('click', function () {
//   getCountryData('spain');
// });

// navigator.geolocation.getCurrentPosition(data => {
//   console.log(data);
//   const lat = data.coords.latitude;
//   const lng = data.coords.longitude;
//   console.log(lat, lng);
// });

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//       console.log(response);
//       if (response.status === 403)
//         throw new Error(`Something went wrong ERROR:${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`Your are in ${data.statename}, ${data.country}`);
//       getCountryData(data.country);
//     })
//     .catch(err => {
//       console.error(`${err.message}`);
//     });
// };

//38.8599262 -77.0648597
// whereAmI(38.8599262, -77.0648597);

// console.log('Test Start');
// setTimeout(() => console.log('0 sec timer'), 0);

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('lotter draw is happening');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN 💰');
//     } else {
//       reject('You lost your money');
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

// Promisifying a setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// wait(2)
//   .then(() => {
//     console.log('one second');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('two seconds');
//   });

// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.log(err)
// );

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition().then(pos => console.log(pos));

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })

//     .then(response => {
//       console.log(response);
//       if (response.status === 403)
//         throw new Error(`Something went wrong ERROR:${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`Your are in ${data.statename}, ${data.country}`);
//       getCountryData(data.country);
//     })
//     .catch(err => {
//       console.error(`${err.message}`);
//     });
// };

// btn.addEventListener('click', whereAmI);

// wait(2)
//   .then(() => {
//     console.log('one second');
//     return wait(1);
//   })

// / wait(2)
//   .then(() => {
//     console.log('one second');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('two seconds');
//   })

// const pic = document.createElement('img');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     pic.src = imgPath;
//     pic.addEventListener('load', e => {
//       document.querySelector('.images').appendChild(pic);
//     });
//     resolve(`${pic}`);
//     pic.addEventListener('error', event => {
//       reject(`${pic}`);
//     });
//   });
// };

// createImage('../img/img-1.jpg')
//   .then(data => {
//     pic.addEventListener('load', function () {
//       wait(2)
//         .then(() => {
//           return wait(1);
//         })
//         .then(() => {
//           createImage('../img/img-2.jpg');
//           pic.addEventListener('load', function () {
//             pic.style.display = 'none';
//           });
//         });
//     });
//   })
//   .catch(err => console.log(`${err.message}`));

/////////////////////////////////////////////////
// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     pic.src = imgPath;
//     pic.addEventListener('load', e => {
//       document.querySelector('.images').appendChild(pic);
//       resolve(`${pic}`);
//     });
//     pic.addEventListener('error', event => {
//       reject(new Error('img not found '));
//     });
//   });
// };

// let currentImg;
// createImage('../img/img-1.jpg')
//   .then(data => {
//     currentImg = pic;
//     console.log('img 1 has been loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('../img/img-2.jpg');
//   })
//   .then(pic => {
//     currentImg = pic;
//     console.log('image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     // currentImg.style.display = 'none';
//   })

//   .catch(err => console.log(`${err.message}`));

// using async await

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function (country) {
  //Geolocation
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    //Reverse geolocation
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('problem getting location data');
    const dataGeo = await resGeo.json();
    console.log(dataGeo);
    //XCoutry data
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );

    const data = await res.json();
    if (!res.ok) throw new Error('problem getting location data');

    console.log(data);
    renderHtml(data[0]);

    return `You are in ${dataGeo.city}`;
  } catch (err) {
    console.error(err);
  }
};

// /     .then(pos => {
//   //       const { latitude: lat, longitude: lng } = pos.coords;
//   //       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//   //     })

whereAmI();
console.log('first');

(async function () {
  try {
    const city = await whereAmI();
    console.log(`2; ${city}`);
  } catch (err) {
    console.log(`2: ${err.message} `);
  }
  console.log(`3: Finshed getting location`);
})();

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c3}`
    // );

    const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('usa', 'japan', 'spain');
