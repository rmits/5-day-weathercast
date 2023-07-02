var citySearchInput = document.getElementById('citySearch');
var searchButton = document.getElementById('searchButton');
var currentWeatherCard = document.querySelector('.currentWeatherCard');
var API_KEY = '3ba56d777134dbd577f935196cde9412';

function currentWeatherGetApi() {
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
          var cityName = document.createElement('h3');
          var weatherImage = document.createElement('img');
          var temp = document.createElement('p');
          var wind = document.createElement('p');
          var humidity = document.createElement('p');
          var searchedCity = citySearchInput.input;

          cityNameName.textContent = data.user.login;
          issueTitle.textContent = data[i].title;
          currentWeatherCard.append(cityName);
          currentWeatherCard.append(weatherImage);
        }
      );
  }

searchButton.addEventListener('click', currentWeatherGetApi);