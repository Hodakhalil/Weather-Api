// -----current-day---

let input_find = document.getElementById("input_find");
let search = document.getElementById("search");
let todayName = document.getElementById("today-date-name");
let todayDayNumber = document.getElementById("today-day-number");
let todayDayMonth = document.getElementById("today-day-month");
let todayLocation = document.getElementById("today-location");
let todayTemp = document.getElementById("today-temp");
let todatCondationImg = document.getElementById("todat-condation-img");
let todayCondationText = document.getElementById("today-condation-text");
let humidaty = document.getElementById("humidaty");
let wind = document.getElementById("wind");
let windDir = document.getElementById("wind-dir");

// ------next-day----
let tomorrowDate = document.getElementsByClassName("tomorrow-date");
let nextCondationImage = document.getElementsByClassName(
  "next-condation-image"
);
let todayMaxTemp = document.getElementsByClassName("today-max-temp");
let todayMinTemp = document.getElementsByClassName("today-min-temp");
let nextCondationText = document.getElementsByClassName("next-condation-text");

// let date = new Date();
// console.log(date);
// console.log(date.getDate());
// console.log(date.toLocaleDateString("en-US", { weekday: "long" }));
// console.log(date.toLocaleDateString("en-US", { month: "long" }));
//fetch Api

async function getWeatherData(cityName) {
  let weatherResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=946bd8386f92446981054147241301&q=${cityName}&days=3`
  );
  let weatherData = await weatherResponse.json();
  return weatherData;
}

function DisplayData(data) {
  let todayNam = new Date();
  todayName.innerHTML = todayNam.toLocaleDateString("en-US", {
    weekday: "long",
  });
  todayDayNumber.innerHTML = todayNam.getDate();
  todayDayMonth.innerHTML = todayNam.toLocaleDateString("en-US", {
    month: "long",
  });

  todayLocation.innerHTML = data.location.name;
  todayTemp.innerHTML = data.current.temp_c;
   todatCondationImg.setAttribute("src", data.current.condition.icon);
  todayCondationText.innerHTML = data.current.condition.text;

  humidaty.innerHTML = data.current.humidity + "%";
  wind.innerHTML = data.current.wind_kph + "km/hr";
  windDir.innerHTML = data.current.wind_dir;
}

function displayNextDay(data) {
  let forecastDay = data.forecast.forecastday;
  for (let i = 0; i < 2; i++) {
    nextDate = new Date(forecastDay[i + 1].date);
    tomorrowDate[i].innerHTML = nextDate.toLocaleDateString("en-US", {
      weekday: "long",
    });

    todayMaxTemp[i].innerHTML = forecastDay[i + 1].day.maxtemp_c;
    todayMinTemp[i].innerHTML = forecastDay[i + 1].day.mintemp_c;
    nextCondationImage[i].setAttribute(
      "src",
      forecastDay[i + 1].day.condition.icon
    );
    nextCondationText[i].innerHTML = forecastDay[i + 1].day.condition.text;
  }
}

async function startApp(city = "cairo") {
  let weatherData = await getWeatherData(city);

  if (!weatherData.error) {
    DisplayData(weatherData);
    displayNextDay(weatherData);
  }
}
startApp();

input_find.addEventListener("input", function () {
  startApp(input_find.value);
});
