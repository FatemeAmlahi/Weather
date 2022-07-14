function currentDate() {
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day},${hours}:${minutes}`;
}

let now = new Date();
let calendar = document.querySelector("#time");
calendar.innerHTML = currentDate();

function showTemprature(response) {
  let temprature = document.querySelector("#temprature");
  let city = document.querySelector("#city");
  let description = document.querySelector("#description");
  let feelsLike = document.querySelector("#feelLike");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");

  temprature.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = `${response.data.name},${response.data.sys.country}`;
  description.innerHTML = response.data.weather[0].description;
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

let apiKey = "d79f110cc683c7f64eae529b0bc53eaf";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Tehran&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemprature);
