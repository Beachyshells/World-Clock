function displayMarquee(event) {
  event.preventDefault();
  let selectElement = document.querySelector("#time-zones");
  let timeZone = selectElement.value;
  let cityName = selectElement.options[selectElement.selectedIndex].text;
  let marquee = document.querySelector(".marquee-content");
  if (timeZone) {
    let selectedCity1 = document.querySelector("#selected-city-1");
    let selectedCity2 = document.querySelector("#selected-city-2");
    let selectedCity3 = document.querySelector("#selected-city-3");
    let selectedDate1 = document.querySelector("#selected-date-1");
    let selectedDate2 = document.querySelector("#selected-date-2");
    let selectedDate3 = document.querySelector("#selected-date-3");
    let selectedTime = document.querySelector("#selected-time");
    let dateToDisplay = getCurrentDate(timeZone);

    let timeToDisplay = getCurrentTime(timeZone);

    selectedCity1.textContent = cityName;
    selectedCity2.textContent = cityName;
    selectedCity3.textContent = cityName;
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
  let selectedTime = document.querySelector("#selected-time");

  if (timeZone) {
    let timeToDisplay = getCurrentTime(timeZone);
    selectedTime.innerHTML = timeToDisplay;
  }
}

// Update time every second
setInterval(updateTime, 1000);
