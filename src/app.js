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
function showForcast() {
  let forcastElement = document.querySelector("#forcast");
  let forcastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forcastHTML =
      forcastHTML +
      `             
            <div class="col">
                <div>${day}</div>
                <img
                  src="http://openweathermap.org/img/wn/04n@2x.png"
                  alt="forcastIcon"
                  width="30px"
                />
                <div class="forcasr-temp">
                  <span class="forcast-temp-max">18°</span>
                  <span class="forcast-temp-min"> 12°</span>
                </div>
          </div>`;
  });

  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
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
}
function showFahrenheitTemp(event) {
  event.preventDefault();
  document.querySelector("#temprature").innerHTML = Math.round(
    (celsiusTemp * 9) / 5 + 32
  );
  document.querySelector("#feelLike").innerHTML = Math.round(
    (feelLikeTemp * 9) / 5 + 32
  );
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}
function showCelsiusTemp(event) {
  event.preventDefault();
  document.querySelector("#temprature").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#feelLike").innerHTML = Math.round(feelLikeTemp);
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemp);
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsiusTemp);

let celsiusTemp = null;
let feelLikeTemp = null;
showForcast();
