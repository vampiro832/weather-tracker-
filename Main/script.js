var requestURL = "http://api.weatherstack.com/" + city + "&appid=" + APIKey;
var APIKey = '227a9f33076f89d7f4e96b09f8b2af24';

let search = document.getElementById('search-input')

dayjs.extend(dayjs_plugin_utc);
dayjs.extend(dayjs_plugin_timezone);
dayjs.tz.setDefault('America/Florida');


function search(event) {
  event.preventDefault();
  const cityName = cityInputEl.value.trim();
  if (!cityName) return;

  // fetch current weather data
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=cc4496aafcd2900ef57cbab9a41da868`)
    .then(response => response.json())
    .then(data => {

      const city = data.name;

      // add city to search history
      if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        searchHistoryEl.innerHTML += `<button>${city}</button>`;
      }

      // fetch 5-day forecast data
      return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=cc4496aafcd2900ef57cbab9a41da868`);
    })
    .then(response => response.json())
    .then(data => {
      // display 5-day forecast data for current time
      const forecast = data.list.filter(item => dayjs.unix(item.dt).tz().isSame(currentTime, 'hour')); // filter for current hour

      forecast.forEach(i => {
        var city = document.createElement('p');
        var temperature = document.createElement('p');
        var humidity = document.createElement('p');
        var windSpeed = document.createElement('p');

        city.textContent = data[i].dayjs.unix(item.dt).tz().format('MMMM D, YYYY h:mm A z');
        const icon = `https://openweathermap.org/img/w/${item.weather[0].icon}.png`;
        temperature.textContent = data[i].Math.round((item.main.temp - 273.15) * 9 / 5 + 32); // convert to Fahrenheit
        humidity.textContent = data[i].main.humidity;
        windSpeed.textContent = data[i].title;

        issuecity.append(city);
        issuetemperature.append(temperature);
        issuehumidity.append(humidity);
        issuewindSpeed.append(windSpeed);
      })
        .catch(error => {
          console.error(error);
          currentWeatherEl.textContent = 'Error fetching data. Please try again later.';
        });
    });

  // function to handle search history button click
  function HistoryClick(event) {
        const cityName = event.target.textContent;
        cityInputEl.value = cityName;
        Submit(event);
      };


  // add event listeners
  cityFormEl.addEventListener('submit', handleFormSubmit);
  //   searchHistoryEl.addEventListener('click', handleSearchHistoryClick);
}

search.addEventListener('click', Submit);

// function Submit(event) {
//     event.preventDefault();
//     const cityName = cityInputEl.value.trim();
//     if (!cityName) return;
  
//     // fetch current weather data
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=cc4496aafcd2900ef57cbab9a41da868`)
//       .then(response => response.json())
//       .then(data => {
  
//         const city = data.name;
        
//         // add city to search history
//         if (!searchHistory.includes(city)) {
//           searchHistory.push(city);
//           searchHistoryEl.innerHTML += `<button>${city}</button>`;
//         }
  
//         // fetch 5-day forecast data
//         return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=cc4496aafcd2900ef57cbab9a41da868`);
//       })
//       .then(response => response.json())
//       .then(data => {
//         // display 5-day forecast data for current time
//         const forecast = data.list.filter(item => dayjs.unix(item.dt).tz().isSame(currentTime, 'hour')); // filter for current hour
//         let forecastHtml = '';
//         forecast.forEach(item => {
//           const date = dayjs.unix(item.dt).tz().format('MMMM D, YYYY h:mm A z');
//           const icon = `https://openweathermap.org/img/w/${item.weather[0].icon}.png`;
//           const temp = Math.round((item.main.temp - 273.15) * 9/5 + 32); // convert to Fahrenheit
//           const humidity = item.main.humidity;
//           const windSpeed = item.wind.speed;
          
//           data.textContent = data[i].



//       })
//       .catch(error => {
//         console.error(error);
//         currentWeatherEl.textContent = 'Error fetching data. Please try again later.';
//       });
//   }
  
//   // function to handle search history button click
//   function handleSearchHistoryClick(event) {
//     const cityName = event.target.textContent;
//     cityInputEl.value = cityName;
//     handleFormSubmit(event);
//   }
  
  
//   // add event listeners
//   cityFormEl.addEventListener('submit', handleFormSubmit);
// //   searchHistoryEl.addEventListener('click', handleSearchHistoryClick);