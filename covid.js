const searchedButton = document.querySelector('.search-button');
const countrySelected = document.querySelector('.country-selected');
const confirmed = document.querySelector('.confirmed');
const recovered = document.querySelector('.recovered');
const deaths = document.querySelector('.deaths');

// Searched Country
searchedButton.addEventListener('click', function () {
  const countryName = document.querySelector('.search-country').value;
  localStorage.setItem('country-name', countryName);
})

const country = localStorage.getItem('country-name');
countrySelected.innerHTML = country;
const urlCountryByName = `https://covid-api.mmediagroup.fr/v1/cases?country=${country}`;
const modalTitle = document.querySelector('.modal-title');
modalTitle.innerHTML = `${country}`;
const modalRecovered = document.querySelector('.modal-recovered');
const modalDeaths = document.querySelector('.modal-deaths');
const modalConfirmed = document.querySelector('.modal-confirmed');

// Fetch-Modal $ flag icon
fetch(urlCountryByName)
  .then((resp) => resp.json())
  .then(function (data) {
    const country = data.All;
    const flag = `${country.abbreviation}`;
    const img = document.createElement('img');
    img.src = `https://www.countryflags.io/${flag}/flat/64.png`;
    img.setAttribute('class', 'ps-1')
    countrySelected.appendChild(img);
    confirmed.innerHTML = `<p class="ps-2 pt-2"> ${country.confirmed}</p>`
    recovered.innerHTML = `<p class="ps-2 pt-2"> ${country.recovered}</p>`
    deaths.innerHTML = `<p class="ps-2 pt-2">${country.deaths}</p>`
    modalRecovered.innerHTML = `Recovered | ${country.confirmed}`;
    modalDeaths.innerHTML = `Deaths | ${country.deaths}`;
    modalConfirmed.innerHTML = `Confirmed | ${country.confirmed}`;
  })
  .catch(function (error) {
    console.log(error);
  });

const urlHistoryDeath = `https://covid-api.mmediagroup.fr/v1/history?country=${country}&status=deaths`;
const urlHistoryConfirmed = `https://covid-api.mmediagroup.fr/v1/history?country=${country}&status=confirmed`;
const deathsYesterday = document.querySelector('.deaths-yesterday');
const confirmedYesterday = document.querySelector('.confirmed-yesterday');

// Fetch History Death
fetch(urlHistoryDeath).then((resp) => resp.json())
  .then(function (data) {
    const country = data.All.dates;
    deathsYesterday.innerHTML = `<p class="m-0 py-2"> <strong>${date()}</strong></p><p>${country[date()]}</p>`;

  })
  .catch(function (error) {
    console.log(error);
  });

// Fetch History Confirmed
fetch(urlHistoryConfirmed).then((resp) => resp.json())
  .then(function (data) {
    const country = data.All.dates;
    confirmedYesterday.innerHTML = `<p class="m-0 py-2"> <strong>${date()}</strong></p><p>${country[date()]}</p>`;

  })
  .catch(function (error) {
    console.log(error);
  });

// Fetch - Table
const urlMoreCountries = 'https://covid-api.mmediagroup.fr/v1/vaccines';
const tableBody = document.querySelector('.table-body')

fetch(urlMoreCountries).then((resp) => resp.json())
  .then(function (data) {
    let countries = ['France', 'Italy', 'Canada', 'Brazil', 'Croatia', 'Slovenia', 'North Macedonia', 'India', 'Russia', 'Mexico'];
    countries.forEach(index => {
      let tr = document.createElement('tr');
      const updated = `${data[index].All.updated}`;
      const updated2 = updated.substring(0, 10);
      tr.innerHTML = `<td> ${data[index].All.country}</td> <td>${data[index].All.administered}</td> <td>${data[index].All.people_vaccinated}</td> <td>${data[index].All.people_partially_vaccinated}</td> <td>${updated2}</td> <td>${data[index].All.population}</td>`;
      tableBody.appendChild(tr);
    })
  })


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