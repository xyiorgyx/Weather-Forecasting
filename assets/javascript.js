
var requestGeoUrl = 'api.openweathermap.org/geo/1.0/direct?q=oceanside&limit=5&appid=22546ad54811a5933d3ccfa20cc45068';

var requestWeather = `api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=22546ad54811a5933d3ccfa20cc45068`;

var location = '';



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

    var lat = data[0].lat
    var lon = data[0].lon
  });




function fetchWeather() {
  fetch(requestWeather, {
    method: 'GET',
    credentials: 'same-origin',
    redirect: 'follow',
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });


}
// inputButton.addEventListener('click', fetchCoordinates);
