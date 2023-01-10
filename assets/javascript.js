
var requestGeoUrl = 'api.openweathermap.org/geo/1.0/direct?q=oceanside&limit=5&appid=22546ad54811a5933d3ccfa20cc45068';
// the following function sends an api request for the coordinates of a given city
fetch("http://api.openweathermap.org/geo/1.0/direct?q=oceanside&limit=5&appid=22546ad54811a5933d3ccfa20cc45068", {
  method: 'GET',
  credentials: 'same-origin',
  redirect: 'follow',
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(data[0].lat)
    console.log(data[0].lon)

    var lat = data[0].lat;
    var lon = data[0].lon;
    var cityName = data[0].name;
    var state = data[0].state;
    aquireWeatherData(lat, lon, cityName, state);
  });
// the next function takes the lat and lon of a given city and requests weather information in that area
function aquireWeatherData(lat, lon, cityName, state){
fetch(`http://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=22546ad54811a5933d3ccfa20cc45068`, {
  method: 'GET',
  credentials: 'same-origin',
  redirect: 'follow',
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    
    displayWeather(data, cityName, state)
  });
}
// we now take the weather information that we requested and append it into our html file.
function displayWeather(data, cityName, state){
  const curWeatherBox = document.querySelector('#weatherSection');
  const title = document.createElement('h1');
  title.innerHTML= cityName + ', '+ state;
  curWeatherBox.append(title);
  var currentTemp = data.current.temp
  var windSpeed = data.current.wind_speed;
  var humidity = current.humidity;
  var weatherIcon = current.weather[0].icon;


}


// inputButton.addEventListener('click', fetchCoordinates);

