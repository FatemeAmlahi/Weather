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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function showForcast(response) {
  let forcast = response.data.daily;
  let forcastElement = document.querySelector("#forcast");
  let forcastHTML = `<div class="row">`;
  forcast.forEach(function (forcastDay, index) {
    if (index < 7) {
      forcastHTML =
        forcastHTML +
        `             
            <div class="col">
                <div>${formatDay(forcastDay.dt)}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forcastDay.weather[0].icon
                  }@2x.png"
                  alt="forcastIcon"
                  width="30px"
                />
                <div class="forcast-temp">
                  <span class="forcast-temp-max">${Math.round(
                    forcastDay.temp.max
                  )}°</span>
                  <span class="forcast-temp-min"> ${Math.round(
                    forcastDay.temp.min
                  )}°</span>
                </div>
          </div>`;
    }
  });

  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
}
function getForcast(coordinates) {
  let apiKey = "d79f110cc683c7f64eae529b0bc53eaf";
  let Url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly&appid=${apiKey}&units=metric`;
  axios.get(Url).then(showForcast);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value;
  let apiKey = "d79f110cc683c7f64eae529b0bc53eaf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemprature);
}
let locationForm = document.querySelector("#location-form");
locationForm.addEventListener("submit", changeCity);
function showTemprature(response) {
  celsiusTemp = response.data.main.temp;
  feelLikeTemp = response.data.main.feels_like;
  document.querySelector("#temprature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#city"
  ).innerHTML = `${response.data.name},${response.data.sys.country}`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#feelLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  getForcast(response.data.coord);
}
