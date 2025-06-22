let majorCities = [
  "London",
  "Paris",
  "Tokyo",
  "Sydney",
  "Los_Angeles",
  "Chicago",
  "Berlin",
  "Rome",
  "Madrid",
  "Singapore",
  "Hong_Kong",
  "Mumbai",
  "Delhi",
  "Shanghai",
  "Beijing",
  "Seoul",
  "Moscow",
  "Cairo",
  "Lagos",
  "Johannesburg",
  "Mexico_City",
  "Buenos_Aires",
  "Lima",
  "Toronto",
  "Vancouver",
  "Montreal",
];

let scrollingCities = majorCities
  .map((city) => {
    let matchingTimezone = moment.tz.names().find((timezone) => {
      if (timezone.includes("/")) {
        let cityPart = timezone.split("/")[1];
        return cityPart === city;
      }
      return false;
    });
    return matchingTimezone;
  })
  .filter((timezone) => timezone !== undefined); // Remove any cities that don't have a matching timezone

function createGlobalTicker() {
  let tickerElement = document.querySelector("#global-ticker");

  // Create the cities twice for seamless looping
  let citiesToShow = [...scrollingCities, ...scrollingCities];
  citiesToShow.forEach((timezone, index) => {
    let cityPart = timezone.split("/")[1];
    let cityName = cityPart.replace(/_/g, " ");
    console.log(`Created city ${index + 1}: ${cityName}`);
    let currentTime = getCurrentTime(timezone);
    let currentDate = getCurrentDate(timezone);
    let cityDiv = document.createElement("div");
    cityDiv.className = "ticker-city";
    cityDiv.innerHTML = `${cityName}: ${currentTime} - ${currentDate}`;
    tickerElement.appendChild(cityDiv);
  });
}

function displayMarquee(event) {
  event.preventDefault();
  let selectElement = document.querySelector("#time-zones");
  let timeZone = selectElement.value;
  if (timeZone === "current-location") {
    timeZone = moment.tz.guess();
  }
  let cityName = selectElement.options[selectElement.selectedIndex].text;
  if (cityName === "My Location") {
    cityName = "My Location";
  }
  let marquee = document.querySelector(".marquee-content");
  if (timeZone) {
    let selectedCity0 = document.querySelector("#selected-city-0");
    let selectedCity1 = document.querySelector("#selected-city-1");
    let selectedCity2 = document.querySelector("#selected-city-2");
    let selectedCity3 = document.querySelector("#selected-city-3");
    let selectedDate0 = document.querySelector("#selected-date-0");
    let selectedDate1 = document.querySelector("#selected-date-1");
    let selectedDate2 = document.querySelector("#selected-date-2");
    let selectedDate3 = document.querySelector("#selected-date-3");
    let selectedTime = document.querySelector("#selected-time");
    let dateToDisplay = getCurrentDate(timeZone);

    let timeToDisplay = getCurrentTime(timeZone);
    selectedCity0.textContent = cityName;
    selectedCity1.textContent = cityName;
    selectedCity2.textContent = cityName;
    selectedCity3.textContent = cityName;
    selectedDate0.textContent = dateToDisplay;
    selectedDate1.textContent = dateToDisplay;
    selectedDate2.textContent = dateToDisplay;
    selectedDate3.textContent = dateToDisplay;
    selectedTime.innerHTML = timeToDisplay;
    marquee.classList.add("show");
  } else {
    marquee.classList.remove("show");
  }
}

function getCurrentDate(timeZone) {
  let currentDate = moment.tz(timeZone).format("dddd, MMMM Do YYYY");
  return currentDate;
}
function getCurrentTime(timeZone) {
  let currentTime = moment.tz(timeZone).format(`h:mm:ss`);
  let ampm = moment.tz(timeZone).format("A");
  return currentTime + `<small>${ampm}</small>`;
}
let timeZone = document.querySelector("#time-zones");
timeZone.addEventListener("change", displayMarquee);

function updateTime() {
  let selectElement = document.querySelector("#time-zones");
  let timeZone = selectElement.value;

  // Handle "My Location" case
  if (timeZone === "current-location") {
    timeZone = moment.tz.guess();
  }

  let selectedTime = document.querySelector("#selected-time");

  if (timeZone) {
    let timeToDisplay = getCurrentTime(timeZone);
    selectedTime.innerHTML = timeToDisplay;
  }
}

// Update time every second
createGlobalTicker();
setInterval(updateTime, 1000);
