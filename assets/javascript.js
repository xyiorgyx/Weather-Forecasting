//var inputBox =  document.

var userLocation = document.inputbox.textContent

// var requestWeather = 
var requestGeoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + 'charlotte' + '&limit=1&appid=b2888db4f0baa774a62c34dc4c426cad';

var location = '';


function fetchCoordinates (){

fetch(requestGeoUrl, {
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
requestGeoUrl();
// function displayWeather (){
    
//     for (i=0; i > data.length; i++)
//     const dayDiv = document.createElement('div');
// }

inputButton.addEventListener('click', fetchcoordinates);
