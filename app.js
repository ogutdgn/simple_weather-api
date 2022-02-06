// Select Elements

const iconElement = document.querySelector(".weather-icon")
const tempElement = document.querySelector(".temperature-value p")
const descElement = document.querySelector(".temperature-description")
const locationElement = document.querySelector(".location p")
const notificationElement = document.querySelector(".notification")

// App Data

const weather = {};
weather.temperature = {
    unit: "celcius"
};

//CONST and Variables
const KELVIN = 273;
//API KEY
const key = "5407f0a13e688feaf7178fd22567279b";

//Check if the Browser Supports Geolocalization


// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(setPosition, showError)

// it also works like this

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError)
}else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> Browser doesn't support Geolocalization`;
}

//Set User Position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

//Show Error when there is an issue with geolocalization Service

function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message}`;
}

//Get weather from API Provider
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`

    fetch(api).then(function(response) {
        let data = response.json();
        return data;
    })
    .then(function(data) {
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    });
}

//Display Weather to UI

function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}