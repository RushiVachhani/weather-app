//extracting the elements from html

const background_img = document.querySelector('.background-image');
const { latitude, longitude } = document.querySelectorAll('.coordinate-value');
const city = document.querySelector('.city > h2');
const country = document.querySelector('.country > h2');
const countryFlag = document.querySelector('.country-flag > img');
const tempvalue = document.querySelector('.temperature');
const tempDescription = document.querySelector('.temperature-description');
const { feelsLike, minTemp, maxTemp} = document.querySelectorAll('.temp-info');
const weatherIcon = document.querySelector('.weather-icon > img');
const sunriseTime = document.querySelector('.sunrise-time');
const sunsetTime = document.querySelector('.sunset-time');
const { pressure, humidity, visibility, wind } = document.querySelectorAll('.extra-info');
