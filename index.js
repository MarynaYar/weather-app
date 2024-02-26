function weatherUpdate(response) {
  let temperatureChange = document.querySelector("#temperature-span");
  let temperatureNow = response.data.temperature.current;
  let cityData = document.querySelector("#city-weather");
  let specification = document.querySelector("#specification-weather");
  let percent = document.querySelector("#percent");
  let km = document.querySelector("#km");
  let dayTime = document.querySelector("#day-time");
  let date = new Date(response.data.time * 1000);
  let picture = document.querySelector("#img-date");


  picture.innerHTML = `<img id="sun" src="${response.data.condition.icon_url}" alt="">`;
  cityData.innerHTML = response.data.city;
  specification.innerHTML = response.data.condition.description;
  percent.innerHTML = response.data.temperature.humidity + "%";
  km.innerHTML = response.data.wind.speed + "km/h";
  dayTime.innerHTML = makeDate(date);

  temperatureChange.innerHTML = Math.round(temperatureNow);

  getWeather(response.data.city)
}

function makeDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  return `${day} ${hours}:${minutes}`
}

function chooseCity(city) {
  let apiKey = "a4o42d4123dtaddfba780dacafeb203f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city.value}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherUpdate);
}

function searchRunSubmit(event) {
  event.preventDefault();
  let inputFormSearch = document.querySelector("#input-city");
  chooseCity(inputFormSearch);
}

let formSearchCity = document.querySelector("#form-search-input");
formSearchCity.addEventListener("submit", searchRunSubmit);

chooseCity({ value: "Zurich" });

function getWeather(city) {
  let apiKey = "a4o42d4123dtaddfba780dacafeb203f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherDays);

}
function displayWeatherDays(response) {
  let forecast = document.querySelector("#forecast");
  let daysHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      daysHTML = daysHTML +
        `<div class="forecast-days">
    <div class="forecast-day">${formatDays(day.time)}</div>
      <div class="forecast-img"><img id="forecast-img-id" src="${day.condition.icon_url}" alt="forecast"></div>
        <div class="forecast-temperature"><span>${Math.round(day.temperature.maximum)}°</span><span class="temperature-minimum">${Math.round(day.temperature.minimum)}°</span></div>
</div>`}
  });
  forecast.innerHTML = daysHTML
}

function formatDays(timestamp) {
  let date = new Date(timestamp * 1000)
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()]
}


