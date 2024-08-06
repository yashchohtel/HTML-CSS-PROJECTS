/* selecting all required element */

let cityName = document.querySelector(".city");
let countryName = document.querySelector(".country");
let dateAndTime = document.querySelector(".date_and_time");
let temperature = document.querySelector(".temperature");
let condition = document.querySelector(".condition");
let image = document.querySelector(".image");
let humidity = document.querySelector(".humidity span");
let windSpeed = document.querySelector(".wind_speed span");
let seaLevel = document.querySelector(".sea_level span");
let groundLevel = document.querySelector(".ground_level span");
let form = document.querySelector(".myForm");
let searchField = document.querySelector(".searchField");
let searchBtn = document.querySelector("#searchBtn");
let errorBox = document.querySelector(".error");
let loading = document.querySelector(".loder");

// default city for the result
let city = "jabalpur";

// function for formatting date and time with the api bellow ⬇⬇⬇
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
let getDateTime = (dt) => {
  const curDate = new Date(dt * 1000);

  let options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options).format(curDate);
  return formatter;
};

// function for tetching weather data
const getWeatherData = async () => {
  // showind loading animation before data loading
  loading.style.display = "flex";

  let weatherAPi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=34bc63dff4a679ee8b239278932e0619`;

  try {
    let response = await fetch(weatherAPi);
    let data = await response.json();

    // destructuring result from the api
    let { main, name, weather, wind, sys, dt } = data;

    // displaying city name
    cityName.innerText = name;

    // displaying country name
    const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
      type: "region",
    });
    countryName.innerText = regionNamesInEnglish.of(sys.country);

    // displaying date and time
    dateAndTime.innerText = getDateTime(dt);

    // displaying temperature
    temperature.innerText = `${Math.floor(main.temp)}°C`;

    // displaying weather description
    condition.innerHTML = `${weather[0].description}`;

    // displaying addional information
    humidity.innerHTML = `Humidity ${main.humidity} %`;
    windSpeed.innerHTML = `Wind speed ${wind.speed} mph`;
    seaLevel.innerHTML = `Sea level ${main.sea_level} hPa`;
    groundLevel.innerHTML = `Ground level ${main.grnd_level} hPa`;

    // displaying images
    switch (weather[0].main) {
      case "Clear":
        image.src = "/images/clear.png";
        break;

      case "Rain":
        image.src = "/images/rain.png";
        break;

      case "Snow":
        image.src = "/images/snow.png";
        break;

      case "Clouds":
        image.src = "/images/cloud.png";
        break;

      case "Mist":
        image.src = "/images/mist.png";
        break;

      case "Haze":
        image.src = "/images/mist.png";
        break;

      default:
        image.src = "/images/cloud.png";
    }
  } catch (error) {
    errorBox.classList.add("err_act");
  } finally {
    // Hide the loading animation
    loading.style.display = "none";
  }
};


getWeatherData();

// getting and setting value of input search field in document
form.addEventListener("submit", (e) => {
  // preventing form to submit default
  e.preventDefault();

  // removing error box is visible
  if (errorBox.classList.contains("err_act")) {
    errorBox.classList.remove("err_act");
  }

  // result after the searcch
  let searchValue = searchField.value.trim();

  // condition chekc for empty search value;
  if (searchValue == "") {
    return;
  }

  // setting result for city
  city = searchValue;

  // calling get weather data fuction
  getWeatherData();

  // resetting value of search field to empty
  searchField.value = "";
});
