//extracting the elements from html

const background_img = document.querySelector('.background-image');
const latitude = document.querySelectorAll('.coordinate-value')[0];
const longitude = document.querySelectorAll('.coordinate-value')[1];
const city = document.querySelector('.city > h2');
const country = document.querySelector('.country > h2');
const countryFlag = document.querySelector('.country-flag > img');
const tempvalue = document.querySelector('.temperature').childNodes[0];
const tempDescription = document.querySelector('.temperature-description');
const feelsLike = document.querySelectorAll('.temp-info').item(0);
const minTemp = document.querySelectorAll('.temp-info').item(1);
const maxTemp = document.querySelectorAll('.temp-info').item(2);
const weatherIcon = document.querySelector('.weather-icon > img');
const sunriseTime = document.querySelector('.sunrise-time');
const sunsetTime = document.querySelector('.sunset-time');
const [ pressure, humidity, visibility, wind ] = [...Array.from(document.querySelectorAll('.extra-info h3'))];

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
    updateHtml(weatherDataJson);
}

//function for updating the html based on data received
function updateHtml(data) {
    latitude.textContent = parseFloat(data.coord.lat).toFixed(2);
    longitude.textContent = parseFloat(data.coord.lon).toFixed(2);
    tempvalue.textContent = data.main.temp;
    minTemp.textContent = data.main.temp_min;
    maxTemp.textContent = data.main.temp_max;
    feelsLike.textContent = data.main.feels_like;
    
}

//console.log(pressure.textContent.split(" ")[2].split("hPa")[0])
//call navigator on window load
window.addEventListener('load', checkNavigator);