function displayMarquee(event) {
  event.preventDefault();
  let timeZone = document.querySelector("#time-zones").value;
  let marquee = document.querySelector(".marquee-content");
  if (timeZone) {
    let selectedCity1 = document.querySelector("#selected-city-1");
    let selectedCity2 = document.querySelector("#selected-city-2");
    let selectedCity3 = document.querySelector("#selected-city-3");
    let selectedDate1 = document.querySelector("#selected-date-1");
    let selectedDate2 = document.querySelector("#selected-date-2");
    let selectedDate3 = document.querySelector("#selected-date-3");
    let dateToDisplay = getCurrentDate();
    selectedCity1.textContent = timeZone;
    selectedCity2.textContent = timeZone;
    selectedCity3.textContent = timeZone;
    selectedDate1.textContent = dateToDisplay;
    selectedDate2.textContent = dateToDisplay;
    selectedDate3.textContent = dateToDisplay;
    marquee.classList.add("show");
  } else {
    marquee.classList.remove("show");
  }
}

function getCurrentDate() {
  let currentDate = moment().format("dddd, MMMM Do YYYY");
  return currentDate;
}
let timeZone = document.querySelector("#time-zones");
timeZone.addEventListener("change", displayMarquee);
