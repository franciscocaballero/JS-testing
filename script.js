'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//old school way of doing AJAX in Javscript:
const request = new XMLHttpRequest();
request.open('GET', 'https://restcountries.eu/rest/v2/name/spain');
request.send();

request.addEventListener('load', function () {
  const [data] = JSON.parse(this.responseText);
  console.log(data);
});
