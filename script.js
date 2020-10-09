
const apiKey ="b8aa68ac9122184fa6c779ea02ec9c0f"
var cities = localStorage.cities ? JSON.parse(localStorage.cities) : []

$(document).ready(function(){
     showCities()
     $("button").click(function(event){
          event.preventDefault()
         var input = $("input").val().toUpperCase() 
         if (!input || input == "") return 
         cities.push(input)
         localStorage.cities = JSON.stringify(cities)
         showWeather(input)
         showForecast(input)
         showCities()  
     });
 });

 // Create sidebar list of searched cities
function showCities(){
     $("#historyList").html('')
     for(i=0; i < cities.length; i++){
          $("#historyList").append(`<li class="list-group-item" onclick="showWeather('${cities[i]}'); showForecast('${cities[i]}');">${cities[i]}</li>`);
     }
}

// Current weather API call and display
function showWeather(name){
     const currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&units=metric"+ "&appid=" + apiKey
     
     $.ajax({
          url: currentWeatherAPI,
          method: "GET"
      })
      .then(function(response) {
          // console.log(response)
          $('#today').html('')
          $(`
          <div class="card" style="width: 100%;">
               <div class="card-body">
               <h2>${name} &#40;${moment().format('MM/DD/YYYY')}&#41;<img src="http://openweathermap.org/img/wn/${response.weather[0].icon}.png"/></h2>
               <p>Temperature: ${response.main.temp} &#730;C</p>
               <p>Humidity: ${response.main.humidity}%</p>
               <p>Wind Speed: ${response.wind.speed} MPH</p>
               <p>UV Index:</p>
               </div>
          </div>`).appendTo('#today')
      });
}

// 5-day Forecast API call and display
function showForecast (city){
     const forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=" + city + "&appid=" + apiKey

     $.ajax({
          url: forecastAPI,
          method: "GET"
     })
     .then(function(response) {
          console.log(response)
          
          $('#forecast').html('')
          for (var i = 0; i < 5; i++){
               let forecastIndex = ((i + 1) * 8) - 3               
           $(`<div class="col-weather-day">
               <div class="card text-white bg-primary mb-3">
               <img src="http://openweathermap.org/img/wn/${response.list[`${forecastIndex}`].weather[0].icon}.png" class="card-image" style="margin: 0 10px; width: auto; height:auto;"/>
               <div class="card-body">
                    <h5>${moment().add((i+1),'days').format('MM/DD/YYYY')}</h5>
                    <p>Temp: ${response.list[`${forecastIndex}`].main.temp}&#730;C</p>
                    <p>Humidity: ${response.list[`${forecastIndex}`].main.humidity}%</p>
               </div>
               </div>
          </div>`).appendTo('#forecast')  
          }
     });
}