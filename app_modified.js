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

//functions

//function to check navigator
function checkNavigator() {
    if(!navigator.geolocation) {
        console.log("Geolocation not supported :( ");
    }
    else {
        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationFailure);
    }
}

//function if geolocation succeeds in getting data
function geolocationSuccess(position) {
    console.log(position);
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    getWeatherData(lat, long);
}

//function if geolocation incurs an error
function geolocationFailure(positionError) {
    console.log(positionError.message);
}

//function to fetch weather data from openweathermap
async function getWeatherData(lat, long) {
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${config.apiKey}&units=metric`;
    const weatherData = await fetch(api);
    const weatherDataJson = await weatherData.json();
    console.log(weatherDataJson);
}

//checking for navigator permission
window.addEventListener('load', checkNavigator);