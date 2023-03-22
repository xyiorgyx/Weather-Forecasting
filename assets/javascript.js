const searchButton = document.querySelector('#searchButton')


// function renderPreviousSearches (){
//   (let i = 0; i < localStorage.length; i++) { console.log(localStorage.getItem(localStorage.key(i))); 
    
//      createHistoryButton (cityName, state);
//   }

// }
// renderPreviousSearches();


function fetchUrl (){
let userInput = document.getElementById("userInput").value; 
console.log(userInput)
// var userInput = document.getElementById('userInputer').value;
var requestGeoUrl = `api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=22546ad54811a5933d3ccfa20cc45068`;
console.log(requestGeoUrl)
// the following function sends an api request for the coordinates of a given city
fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=22546ad54811a5933d3ccfa20cc45068`, {
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
  
}
// the next function takes the lat and lon of a given city and requests weather information in that area
function aquireWeatherData(lat, lon, cityName, state) {
  fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=22546ad54811a5933d3ccfa20cc45068`, {
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
      createHistoryButton(cityName, state);
      
    });
}
// we now take the weather information that we requested and append it into our html file.
function displayWeather(data, cityName, state) {
  var todayWeatherHtml='';
  var todaysDate = data.current.dt;
var icon = (data.current.weather[0].icon)
  todayWeatherHtml += `
  <div id="Today" class="col">
  <h2> ${cityName}, ${state}  <h2>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${dayjs(todaysDate * 1000).format('dddd MMMM D, YYYY')}</h5>
          <img src = "http://openweathermap.org/img/w/${icon}.png"> </img> 
          <ul>
            <li>Temp: ${data.current.temp}degrees</li>
            <li>Wind Speed: ${data.current.wind_speed}knots</li>
            <li>Humidty: ${data.current.humidity}%</li>
          </ul>
        </div>
      </div>
    </div>
  `

  $("#weatherSection").html(todayWeatherHtml)
  displayweeksWeather(data)

}

function createHistoryButton (cityName, state){
  let historySection = document.getElementById("searchHistoryButton");
  let newListItem = document.createElement('li')
  let newButton =document.createElement('button')
  newListItem.append(newButton)
  let searchText= `${cityName}, ${state}`
  newButton.append(searchText)
  historySection.append(newListItem)
  historySection.append(newButton);
  localStorage.setItem(searchText, cityName)
}

function displayweeksWeather(data){
var weatherHtml = '';

for(let i=1; i<6; i++){
  var current = data.daily[i];
  var icon = current.weather[0].icon;
  todaysDate = current.dt
  weatherHtml += `
  <div class="col">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${dayjs(todaysDate * 1000).format('dddd MMMM D, YYYY')}</h5>
          <img src = "http://openweathermap.org/img/w/${icon}.png"> </img> 
          <ul>
            <li>Temp: ${current.temp.day}degrees</li>
            <li>Wind Speed: ${current.wind_speed}knots</li>
            <li>Humidty: ${current.humidity}%</li>
          </ul>
        </div>
      </div>
    </div>
  `
  $("#weeksWeather").html(weatherHtml)
}
}




 


// function displayPreviousSearch (){
//   let chosenCity =  $(this).val();
// }

searchButton.addEventListener("click",fetchUrl);
// let historyButton = querySelector("#search").childNodes()
// historyButton.addEventListener("click",displayPreviousSearch);