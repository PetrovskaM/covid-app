const searchedButton = document.querySelector('.search-button');
const countrySelected = document.querySelector('.country-selected');
const confirmed = document.querySelector('.confirmed');
const recovered = document.querySelector('.recovered');
const deaths = document.querySelector('.deaths');
const countryName = document.querySelector('.search-country');
let countryNameString = '';
const modalRecovered = document.querySelector('.modal-recovered');
const modalDeaths = document.querySelector('.modal-deaths');
const modalConfirmed = document.querySelector('.modal-confirmed');
const deathsYesterday = document.querySelector('.deaths-yesterday');
const confirmedYesterday = document.querySelector('.confirmed-yesterday');
const urlMoreCountries = 'https://covid-api.mmediagroup.fr/v1/vaccines';
const tableBody = document.querySelector('.table-body');

// Searched Country
searchedButton.addEventListener('click', function () {
  countryNameString = countryName.value;
  searchCountryFetch();
})

// Searched country-fetch
searchCountryFetch = () => {
  const urlCountryByName = `https://covid-api.mmediagroup.fr/v1/cases?country=${countryNameString}`;

  fetch(urlCountryByName)
    .then((resp) => resp.json())
    .then(function (data) {
      cardsFlagCountryName(data);
      modalHelpFunc(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Showing searched country flag and cards
cardsFlagCountryName = (data) => {
  countrySelected.innerHTML = countryNameString;
  const flag = `${data.All.abbreviation}`;
  const img = document.createElement('img');
  img.src = `https://www.countryflags.io/${flag}/flat/64.png`;
  countrySelected.appendChild(img);
  confirmed.innerHTML = `<p class="ps-2 pt-2"> ${data.All.confirmed}</p>`
  recovered.innerHTML = `<p class="ps-2 pt-2"> ${data.All.recovered}</p>`
  deaths.innerHTML = `<p class="ps-2 pt-2">${data.All.deaths}</p>`
}

// Modal-Help Function
modalHelpFunc = (data) => {
  const modalTitle = document.querySelector('.modal-title');
  modalTitle.innerHTML = `${countryNameString}`;
  modalRecovered.innerHTML = `Recovered | ${data.All.confirmed}`;
  modalDeaths.innerHTML = `Deaths | ${data.All.deaths}`;
  modalConfirmed.innerHTML = `Confirmed | ${data.All.confirmed}`;
}

// Arrow Button Eventlistener (showing Modal)
const arrowButton = document.querySelectorAll('.arrow-button');
arrowButton.forEach((element) => {
  element.addEventListener('click', function () {
    histiryConfirmedModalFetch();
    historyDeathModalFetch();
  })
})

// Fetch History Death-Modal
historyDeathModalFetch = () => {
  const urlHistoryDeath = `https://covid-api.mmediagroup.fr/v1/history?country=${countryNameString}&status=deaths`;
  fetch(urlHistoryDeath).then((resp) => resp.json())
    .then(function (data) {
      deathsYesterday.innerHTML = `<p class="m-0 py-2"> <strong>${date()}</strong></p><p>${data.All.dates[date()]}</p>`;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Fetch History Confirmed-Modal
histiryConfirmedModalFetch = () => {
  const urlHistoryConfirmed = `https://covid-api.mmediagroup.fr/v1/history?country=${countryNameString}&status=confirmed`;
  fetch(urlHistoryConfirmed).then((resp) => resp.json())
    .then(function (data) {
      confirmedYesterday.innerHTML = `<p class="m-0 py-2"> <strong>${date()}</strong></p><p>${data.All.dates[date()]}</p>`;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Fetch - Table
fetch(urlMoreCountries).then((resp) => resp.json())
  .then(function (data) {
    tableHelpFunc(data);
  })
  .catch(function (error) {
    console.log(error);
  });

// Table - Help function
tableHelpFunc = (data) => {
  let countries = ['France', 'Italy', 'Canada', 'Brazil', 'Croatia', 'Slovenia', 'North Macedonia', 'India', 'Russia', 'Mexico'];
  countries.forEach(index => {
    let tr = document.createElement('tr');
    const updated = `${data[index].All.updated}`;
    const updated2 = updated.substring(0, 10);
    tr.innerHTML = `<td> ${data[index].All.country}</td> <td>${data[index].All.administered}</td> <td>${data[index].All.people_vaccinated}</td> <td>${data[index].All.people_partially_vaccinated}</td> <td>${updated2}</td> <td>${data[index].All.population}</td>`;
    tableBody.appendChild(tr);
  })
}

// footer date now
const d = new Date()
const year = d.getFullYear();
document.getElementById("year").innerHTML = year;

// Date- Help Function
date = () => {
  const d = new Date()
  const year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate() - 2;
  if (month <= 9) {
    month = "0" + month;
  }
  if (day <= 9) {
    day = "0" + day;
  }
  const date = year + "-" + month + "-" + day;
  return date;
}