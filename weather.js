const weather = document.querySelector(".js-weather");
const city = document.querySelector(".js-city");


const API_KEI = '40d6e6d0b06a0d6f350d623853d01f04';
const COORDS = "coords";

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEI}&units=metric`).then(function(response) {
        return response.json();
    }).then(function(json) {
        console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} ℃`;
        city.innerText = `${place}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handelGeoSuccess(position) {
    console.log("position");
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsOjb = {
        latitude,
        longitude
    };
    saveCoords(coordsOjb);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Cant access geo location")
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handelGeoSuccess, handleGeoError);
}


function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    }
    else {
        const parsedCoords = JSON.parse(loadedCoords);
        console.log(parsedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();