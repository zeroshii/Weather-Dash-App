
var apiKey ="b8aa68ac9122184fa6c779ea02ec9c0f"
var name = "Toronto"

var cities = localStorage.cities ? JSON.parse(localStorage.cities) : []



$(document).ready(function(){
     
     showCities()
     $("button").click(function(event){
          event.preventDefault()

         var input = $("input").val().toUpperCase() 
         console.log(input)
         if (!input || input == "") return 
         cities.push(input)
         localStorage.cities = JSON.stringify(cities)
         showWeather(input)
         showCities()
         

     });
 });

function showCities(){
     $("#historyList").html("")

     for(i=0; i < cities.length; i++){
          $("#historyList").append(`<li class="list-group-item" onclick="showWeather('${cities[i]}')">${cities[i]}</li>`);

     }
}
function showWeather(name){
     var forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?q=" + name + "&appid=" + apiKey
     var currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&units=metric"+ "&appid=" + apiKey
     
     $.ajax({
          url: currentWeatherAPI,
          method: "GET"
      })
      .then(function(response) {
           console.log(response)
          $('.today').html('');
          $(`
          <div class="card" style="width: 100%;">
               <div class="card-body">
               <h2>${name} &#40;${moment().format('MM/DD/YYYY')}&#41;<img src="http://openweathermap.org/img/wn/${response.weather[0].icon}.png"/></h2>

               <p>Temperature: ${response.main.temp} &#730;C</p>
               <p>Humidity: ${response.main.humidity}%</p>
               <p>Wind Speed: ${response.wind.speed} MPH</p>
               <p>UV Index:</p>
               </div>
          </div>`).appendTo('.today')
          
     
      });
}

/* 
/*  $.ajax({
     url: forecastAPI,
     method: "GET"
 })
 .then(function(response) {
      console.log(response.city.name)
    /*   $(`<div class="col-weather-day">
          <div class="card portfolioCard">
          <img src="" class="card-image" style="margin: 0 10px;">
          <div class="card-body">
               <h5 class="card-title">Day 1</h5>
               <p class="card-temp">Temp: ${response.list[0].main.temp}</p>
               <p class="card-Humidity">Humidity:</p>
          </div>
          </div>
     </div>  `).appendTo('.weather') 

 ); */