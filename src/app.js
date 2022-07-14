function currentDate() {
  let date = now.getDate();
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
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${month}${date},${day},${hours}:${minutes}`;
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

  temprature.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = `${response.data.name},${response.data.sys.country}`;
  description.innerHTML = response.data.weather[0].description;
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  console.log(response.data);
}

let apiKey = "d79f110cc683c7f64eae529b0bc53eaf";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Tehran&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemprature);
