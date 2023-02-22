
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
function aquireWeatherData(lat, lon, cityName, state) {
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
function displayWeather(data, cityName, state) {
  displayweeksWeather(data.daily);
  const curWeatherBox = document.querySelector('#weatherSection');
  const title = document.createElement('h1');
  title.innerHTML = cityName + ', ' + state;
  curWeatherBox.append(title);
  var icon = data.current.weather[0].icon
  var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
  var weatherIcon = document.createElement('img')
  curWeatherBox.append(weatherIcon);
  weatherIcon.setAttribute('src', iconurl);
  const list = document.createElement('ul');
  curWeatherBox.append(list);
  var listItem = document.createElement('li');
  var listItem2 = document.createElement('li');
  var listItem3 = document.createElement('li');
  list.append(listItem)
  list.append(listItem2)
  list.append(listItem3)
  var currentTemp = data.current.temp;
  listItem.append('Current Temperature: ' + currentTemp + " F°");
  var windSpeed = data.current.wind_speed;
  listItem2.append('Current Wind Speed: ' + windSpeed + ' mph');
  var humidity = data.current.humidity;
  listItem3.append('Current Humidity ' + humidity + " %");
  
}

// function displayweeksWeather(data) {
  
//   for (let i = 0; i < 5; i++) {
  
//     const weekWeatherBox = document.querySelector('#weeksWeather');
//     const dayDiv = document.createElement('div');
//     weekWeatherBox.append(dayDiv);

//     var weatherIcon = document.createElement('img')
//     var icon = data.daily[0].weather[0].icon
//     var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
//     dayDiv.append(weatherIcon);
//     weatherIcon.setAttribute('src', iconurl);
//     const list = document.createElement('ul');
//     var listItem = document.createElement('li');
//     var listItem2 = document.createElement('li');
//     var listItem3 = document.createElement('li');
//     list.append(listItem)
//     list.append(listItem2)
//     list.append(listItem3)
//     var currentTemp = data.daily[0].temp.day;
//     listItem.append('Current Temperature: ' + currentTemp + " F°");
//     var windSpeed = data.daily[0].wind_speed;
//     listItem2.append('Current Wind Speed: ' + windSpeed + ' mph');
//     var humidity = data.daily[0].humidity;
//     listItem3.append('Current Humidity ' + humidity + " %");
//     console.log(list)
//   }
// }


function displayweeksWeather(data){
var weatherHtml = '';

for(let i=0; i<5; i++){
  var current = data[i];

  weatherHtml += `
  <div class="col">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${current.dt}</h5>
          <ul>
            <li>Temp: ${current.temp.day}degrees</li>
            <li>Wind Speed: ${current.wind_speed}knots</li>
            <li>Humidty: ${current.humidity}%</li>
          </ul>
        </div>
      </div>
    </div>
  `
}

$("#weeksWeather").html(weatherHtml)

}