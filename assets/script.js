var searchButton = document.getElementById('searchButton');
var API_KEY = '3ba56d777134dbd577f935196cde9412';

function saveSearch() {
  var citySearch = document.querySelector('.citySearch');
  var citySearchInput = citySearch.value;
  localStorage.setItem('searchedCity', citySearchInput);
  renderLocal();
}

function renderLocal() {
  //these are to grab the necessary items to create the search history buttons
  var storageCard = document.querySelector('.storageCard');
  var recentSearch = localStorage.getItem('searchedCity');
  
  //creating a button and using the local storage getItem for the text of the button, then appending to the card
  var historyButton = document.createElement('button');
  historyButton.textContent = recentSearch;
  storageCard.appendChild(historyButton);
}

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
      currentWeatherCard.style.border = '2px solid white';

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
        }
      );
  }

searchButton.addEventListener('click', function() {
  currentWeatherGetApi(); 
  saveSearch(); 
});