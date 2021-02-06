//extracting the elements from html

const background_img = document.querySelector('.background-img');
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
    background_img.setAttribute('src', getBackgroundImgUrl());
    latitude.textContent = parseFloat(data.coord.lat).toFixed(2);
    longitude.textContent = parseFloat(data.coord.lon).toFixed(2);
    tempvalue.textContent = data.main.temp;
    minTemp.textContent = data.main.temp_min;
    maxTemp.textContent = data.main.temp_max;
    feelsLike.textContent = data.main.feels_like;
    pressure.textContent = `Pressure : ${data.main.pressure} hPa`;
    humidity.textContent = `Humidity : ${data.main.humidity} %`;
    visibility.textContent = `Visibility : ${(parseFloat(data.visibility)/1000).toFixed(2)} km`;
    wind.textContent = `Wind : ${data.wind.speed} m/s ${getWindDirection(data.wind.deg)}`;
    tempDescription.textContent = data.weather[0].description;
    country.textContent = data.sys.country;
    city.textContent = `${data.name},`;
    sunriseTime.textContent = convertUnixTime(data.sys.sunrise);
    sunsetTime.textContent = convertUnixTime(data.sys.sunset);
    weatherIcon.setAttribute('src', getWeatherIconUrl(data.weather[0].icon));
    countryFlag.setAttribute('src', getCountryFlagIconUrl(data.sys.country));
}

//function to determine wind direction from degree
function getWindDirection(deg) {
    let direction = ['N', 'NW', 'W', 'SW', 'S', 'SE', 'E', 'NE'];
    return direction[(Math.round((deg/45)%8))];
}

//function to convert Unix timestamp to local time string
function convertUnixTime(time) {
    const date = new Date( parseInt(time)*1000);
    return date.toLocaleTimeString();
}

//function to get the weather icon url
function getWeatherIconUrl(iconId) {
    return `http://openweathermap.org/img/wn/${iconId}@4x.png`;
}

//function to get the country flag icon url
function getCountryFlagIconUrl(countryCode) {
    let flagStyle = "flat";
    let flagSize = "48";
    return `https://www.countryflags.io/${countryCode}/${flagStyle}/${flagSize}.png`;
}

//function to determine the background image
function getBackgroundImgUrl() {
    let date = new Date();
    let imgUrl = ''
    //date.toTimeString();
    if(date.getHours()>= 06 && date.getHours()<= 17) imgUrl = "./assets/morning.jpg";
    else if(date.getHours()>= 17 && date.getHours()<= 20) imgUrl = "./assets/evening.jpg";
    else imgUrl = "./assets/night.png";
    return imgUrl;
}

//console.log(pressure.textContent.split(" ")[2].split("hPa")[0])
//call navigator on window load
window.addEventListener('load', checkNavigator);