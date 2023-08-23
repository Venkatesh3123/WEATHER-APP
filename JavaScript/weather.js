let inputValue = document.getElementById("inputValue");
let tempInDegrees = document.getElementById("tempInDegrees");
let weatherType = document.getElementById("weatherType");
let typedLocation = document.getElementById("typedLocation");
let findButton = document.getElementById("findButton");
let licationName = document.getElementById("locationName");
let viewMore = document.getElementById("viewMore");
let weatherCard = document.getElementById("weatherCard");
let forecastingCard = document.getElementById("forecastingCard");
let backBtn = document.getElementById("backBtn");
let daysArr = ["day1", "day2", "day3", "day4", "day5"];
let weeksArr = ["day1Img", "day2Img", "day3Img", "day4Img", "day5Img"];
let dateValues = ["dateVal1", "dateVal2", "dateVal3", "dateVal4", "dateVal5"];
let weatherTypeArr = [
  "weatherType1",
  "weatherType2",
  "weatherType3",
  "weatherType4",
  "weatherType5",
];
let week = new Date();
let userLocation;
findButton.classList.add("f-btn");
function defaultLocation(userInput) {
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${locationName.textContent}&appid=dbeb7122d309e6951624c7429c02ec6a`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let weatherArr = data.list;
      console.log(data);
      for (i = 0; i < 5; i++) {
        let { temp } = weatherArr[i].main;
        let weatherObj = weatherArr[i].weather;
        let weatherIcon = weatherObj[0].icon;
        let weatherDescription = weatherObj[0].description;
        let localTemp = Math.floor(temp - 273);
        let tempElement = document.getElementById(daysArr[i]);
        tempElement.textContent = localTemp + "°C";
        let imgElememt = document.getElementById(weeksArr[i]);
        imgElememt.src =
          "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
        let dateEl = document.getElementById(dateValues[i]);
        dateEl.textContent =
          "Date : " +
          (week.getDate() + i) +
          "-" +
          week.getMonth() +
          "-" +
          week.getFullYear();
        let weatherTypeEl = document.getElementById(weatherTypeArr[i]);
        weatherTypeEl.textContent = weatherDescription;
      }
    })
    .catch((error) => {
      alert("Something went wrong");
    });
}
defaultLocation();

findButton.addEventListener("click", function () {
  for (j = 0; j < 5; j++) {
    let dateWeather = document.getElementById(dateValues[j]);
    dateValues.textContent = "Loading..";

    let cloudImg = document.getElementById(weeksArr[j]);
    cloudImg.textContent = "Loading..";

    let weatherTypeText = document.getElementById(weatherTypeArr[j]);
    weatherTypeText.textContent = "Loading..";

    let temperatureText = document.getElementById(daysArr[j]);
    temperatureText.textContent = "Loading..";
  }
  locationName.textContent =
    inputValue.value[0].toUpperCase() +
    inputValue.value.slice(1, inputValue.value.length);
  locationName.classList.add("location");
  defaultLocation();
  inputValue.value = "";
});

viewMore.addEventListener("click", function () {
  weatherCard.classList.add("d-none");
  forecastingCard.classList.remove("d-none");
});

backBtn.addEventListener("click", function () {
  weatherCard.classList.remove("d-none");
  forecastingCard.classList.add("d-none");
});
