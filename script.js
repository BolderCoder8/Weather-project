// Feature 1

let now = new Date();
console.log(now);
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wedneday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = ("0" + now.getMinutes()).slice(-2);
let currentDate = now.getDate();

let currentTime = document.querySelector("#current-time");

currentTime.innerHTML = `${day} ${currentDate}, ${hour}:${minute}`;

// Feature 2

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let mainTemp = document.querySelector("#current-temp");
  mainTemp.innerHTML = temperature;
  let updateLocation = document.querySelector("#area");
  updateLocation.innerHTML = response.data.name;
  let updateDescription = document.querySelector("#weather-description");
  updateDescription.innerHTML = response.data.weather[0].description;
}

function cityUpdate(event) {
  event.preventDefault();
  let searchEntry = document.querySelector("#search-text-input");
  console.log(searchEntry.value);
  let cityName = document.querySelector("#area");
  cityName.innerHTML = `${searchEntry.value}`;
  let city = searchEntry.value;
  let units = "metric";
  let apiKey = "cf794339bb437422a6881c419dd75e02";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let searchBar = document.querySelector("#weather-search-form");
searchBar.addEventListener("submit", cityUpdate);

function showPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "cf794339bb437422a6881c419dd75e02";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let geoLocation = document.querySelector("#current-location-button");
geoLocation.addEventListener("click", currentLocation);
