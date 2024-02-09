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

console.log(response.data);

picture.innerHTML = `<img id="sun" src="${response.data.condition.icon_url}" alt="">`;
cityData.innerHTML = response.data.city;
specification.innerHTML = response.data.condition.description;
percent.innerHTML = response.data.temperature.humidity + "%";
km.innerHTML = response.data.wind.speed + "km/h";
dayTime.innerHTML = makeDate(date);

temperatureChange.innerHTML = Math.round(temperatureNow);     
}

function makeDate (date) {
let hours = date.getHours();
let minutes = date.getMinutes();
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day =  days[date.getDay()];

if (minutes < 10) {
    minutes = `0${minutes}`    
}
return `${day} ${hours}:${minutes}`
} 

function chooseCity(cityname) {
      let apiKey = "a4o42d4123dtaddfba780dacafeb203f"; 
      let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityname.value}&key=${apiKey}&units=metric`;
   axios.get(apiUrl).then(weatherUpdate);
  }

function searchRunSubmit(event) {
        event.preventDefault();
        let inputFormSearch = document.querySelector("#input-city");
        chooseCity(inputFormSearch);
}

let formSearchCity = document.querySelector("#form-search-input");
formSearchCity.addEventListener("submit", searchRunSubmit);

chooseCity({value:"Zurich"});