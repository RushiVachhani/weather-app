let timezonePlace = document.querySelector('.timezone-timezone');
let timezoneCountry = document.querySelector('.timezone-country');
let temperature = document.querySelector('.temperature');
let temperatureDegree = document.querySelector('.temperature-degree');
let temperatureDescription = document.querySelector('.temperature-description');
let degreeSection = document.querySelector('.degree-section')

window.addEventListener('load', () => {
    let long;
    let lat;
    if(navigator.geolocation) {
        const data = navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    else {
        console.log("Geolocation not working or permission not granted :( ");
    }
});

function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    console.log(`latitude: ${latitude} || longitude: ${longitude}`);
    getWeatherData(latitude, longitude);
}

function onError() {
    console.log("Unable to retrieve location");
}

async function getWeatherData(latitude, longitude) {
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${config.apiKey}&units=metric`;
    const apiResponse = await fetch(api);
    const apiRsponseJson = await apiResponse.json();
    updateHtml(apiRsponseJson);
}

function updateHtml(data) {
    console.log(data);
    const {temp} = data.main;
    const place = data.name;
    const {country} = data.sys;
    const {description, icon} = data.weather[0];
    console.log(temp, place, country, description);
    timezonePlace.textContent = place;
    timezoneCountry.textContent = country;
    temperatureDegree.textContent = temp;
    temperatureDescription.textContent = description;
    addFlag(country);
    addIcon(icon);
    temperature.addEventListener('click', changeUnits);
}   

function addFlag(countryCode) {
    let flagStyle = "flat";
    let flagSize = "24";
    document.getElementById("country_flag").src = `https://www.countryflags.io/${countryCode}/${flagStyle}/${flagSize}.png`;
}

function addIcon(iconId) {
    document.getElementById('weather_icon').src = `http://openweathermap.org/img/wn/${iconId}@2x.png`
}

function changeUnits() {
    let tempUnit = degreeSection.querySelector('span')
    let tempValue = degreeSection.querySelector('h2')
    tempUnit.innerHTML==='C' ? convertToFarenheit(tempValue.innerText) : convertToCelcius(tempValue.innerText);
}

function convertToCelcius(value) {
    temperatureDegree.innerText = ((5/9)*(parseFloat(value) - 32)).toFixed(1);
    degreeSection.querySelector('span').innerText = "C";
}

function convertToFarenheit(value) {
    temperatureDegree.innerText = ((9/5)*parseFloat(value) + 32).toFixed(1);
    degreeSection.querySelector('span').innerText = "F";
}
