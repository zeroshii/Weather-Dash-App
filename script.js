var currentDate = moment().format('MM/DD/YYYY')

// Display current date on top of scheduler

/* function todaysDate() {
     document.getElementById("currentDay").innerHTML = currentDate
}
todaysDate() */

//
var apiKey ="b8aa68ac9122184fa6c779ea02ec9c0f"
var name = "Toronto"
var forecastqueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + name + "&appid=" + apiKey
var currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&units=metric"+ "&appid=" + apiKey


$.ajax({
     url: currentWeatherAPI,
     method: "GET"
 })
 .then(function(response) {
      console.log(response)
     $(`<div class="card" style="width: 100%;">
          <div class="card-body">
          <p id="currentDay"></p>
          <p>Temperature: ${response.main.temp} &#730;C</p>
          <p>Humidity: ${response.main.humidity}%</p>
          <p>Wind Speed: ${response.wind.speed} MPH</p>
          <p>UV Index:</p>
          </div>
     </div>`).appendTo('.today')
     

 });
