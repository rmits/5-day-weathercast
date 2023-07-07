var searchButton = document.getElementById('searchButton');
var API_KEY = '3ba56d777134dbd577f935196cde9412';
var clearBtn = document.getElementById('clearBtn');

//function that clears out local storage and the created buttons
function clearLocal() {
  var storageCard = document.querySelector('.storageCard');
  var recentSearch = localStorage.getItem('searchedCity');
  storageCard.innerHTML = '';
  localStorage.clear(recentSearch);
}

//function that creates localStorage and grabs the render
function saveSearch() {
  var citySearch = document.querySelector('.citySearch');
  var citySearchInput = citySearch.value;
  localStorage.setItem('searchedCity', citySearchInput);
  renderLocal();
}

//function that gets local storage and generates a button, gives the button functionality
function renderLocal() {
  //these are to grab the necessary items to create the search history buttons
  var storageCard = document.querySelector('.storageCard');
  var recentSearch = localStorage.getItem('searchedCity');

  //creating a button and using the local storage getItem for the text of the button, then appending to the card
  var historyButton = document.createElement('button');
  historyButton.classList.add('historyBtn');
  historyButton.textContent = recentSearch;
  storageCard.appendChild(historyButton);

  historyButton.addEventListener('click', storageGetAPI);
}

//this is the completer of the initial fetch, where it does the fetch for grabbing the weather
//and creates the card
function currentWeatherCompleter(lat, lon) {
  var requestUrlTwo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;

  fetch(requestUrlTwo)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var currentWeatherCard = document.querySelector('.currentWeatherCard');
      currentWeatherCard.innerHTML = '';
      currentWeatherCard.style.border = '5px solid orangered';

      var currentTitle = document.createElement('h2');
      currentTitle.textContent = data.name + " (Today)";

      var currentImage = document.createElement('img');
      currentImage.src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png';

      var currentTemp = document.createElement('h3');
      currentTemp.textContent = "Current Temperature: " + data.main.temp + "°F";

      var currentWind = document.createElement('h3');
      currentWind.textContent = "Wind Speed: " + data.wind.speed + "mph";

      var currentHumidity = document.createElement('h3');
      currentHumidity.textContent = "Humidity Level: " + data.main.humidity + "%";

      currentWeatherCard.appendChild(currentTitle);
      currentWeatherCard.appendChild(currentImage);
      currentWeatherCard.appendChild(currentTemp);
      currentWeatherCard.appendChild(currentWind);
      currentWeatherCard.appendChild(currentHumidity);
    })
}

//this function completes the initial fetch for the 5 day call, where it generates HTMl elements
function fiveDayCompleter(lat, lon) {
  var cnt = 5;
  var requestURL = `api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var fiveDayCard = document.querySelector('.fiveDayCard');
      var weatherContainter = document.querySelector('.weatherContainer');
      fiveDayCard.innerHTML = '';

      var forecastData = data.list;

      // Loop through the forecast data for each day
      for (var i = 0; i < forecastData.length; i++) {
        var forecast = forecastData[i];
        var forecastDate = new Date(forecast.dt * 1000); // Convert Unix timestamp to date

        var dateElement = document.createElement('h2');
        dateElement.textContent = forecastDate.toDateString();

        var temperatureElement = document.createElement('p');
        temperatureElement.textContent = "Temperature: " + forecast.main.temp + "°F";

        var weatherElement = document.createElement('p');
        weatherElement.textContent = "Weather: " + forecast.weather[0].description;

        fiveDayCard.appendChild(dateElement);
        fiveDayCard.appendChild(temperatureElement);
        fiveDayCard.appendChild(weatherElement);
        weatherContainter.appendChild(fiveDayCard);
      }
    });
}

//this function is the intial fetch, where it grabs the coordinates of the user input city and then passes
//the necessary latitude and longitude to the currentWeatherCompleter function
function currentWeatherGetApi() {
  var citySearch = document.querySelector('.citySearch');
  var citySearchInput = citySearch.value;

  var requestUrlOne = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearchInput}&appid=${API_KEY}`;

  fetch(requestUrlOne)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var latitude = data[0].lat;
      var longitude = data[0].lon;
      currentWeatherCompleter(latitude, longitude);
      fiveDayCompleter(latitude, longitude);
    }
    );
}

//this function is inside of my renderLocal function, it does a fetch for the text of the button that is
//clicked in the search history
function storageGetAPI(event) {
  var button = event.target;
  var buttonText = button.textContent;
  console.log(buttonText);

  var requestUrlOne = `http://api.openweathermap.org/geo/1.0/direct?q=${buttonText}&appid=${API_KEY}`;

  fetch(requestUrlOne)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var latitude = data[0].lat;
      var longitude = data[0].lon;
      currentWeatherCompleter(latitude, longitude);
    }
    );
}

searchButton.addEventListener('click', function () {
  currentWeatherGetApi();
  saveSearch();
});

clearBtn.addEventListener('click', clearLocal);