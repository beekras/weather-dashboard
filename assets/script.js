var currentDate = dayjs().format("DD/MM/YYYY")
var weatherCards = $("weather-cards")
var apiKey = "ea87c29ef3d21ba02b7bd76afa1d20ad";
// -------------------------------------------------------
// CURRENT WEATHER
// -------------------------------------------------------
$("#search-button").on("click", function (event) {
 var city = $("#search-input").val();
 var currentURL ="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey;
  event.preventDefault();
  fetch(currentURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $("#city").text(data.name + " " + currentDate);
      $("#wind").text("Wind: " + data.wind.speed + " KPH");
      $("#humidity").text("Humidity: " + data.main.humidity + "%");
    
      // Convert the temp to Celsius
      var tempC = data.main.temp - 273.15;
      $("#temp").text("Temperature: " + tempC.toFixed(2) + " °C");
    });

});

// -------------------------------------------------------
//  5 DAY FORECAST
// -------------------------------------------------------


// insert findForecast function into on jquery function ?
 $("#search-button").on("click", function (event) {
   var city = $("#search-input").val();
  var forecastURL ="https://api.openweathermap.org/data/2.5/forecast?q=" + city +"&appid="+apiKey;
  event.preventDefault();

  fetch(forecastURL)
     .then(function (response) {
       return response.json();
    })
     .then( data => findForecast(data));
    

// Function  (findForecast) - Loop through data.list array and find average of temp, wind speed and humidity
function findForecast(data) {
  var forecastURL ="https://api.openweathermap.org/data/2.5/forecast?q=" + city +"&appid="+apiKey;

  for (var i = 0; i < data.list.length; i+=8) {
    var forecast = data.list[i];
    var forecastDate = new Date(forecast.dt_txt);
    
    var forecastDate = $("<div>").text(forecast)
    $("#forecast").append(forecastDate)
  }
}


 });
