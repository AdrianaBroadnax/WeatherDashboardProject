var searchInput = $("#searchInput");
var searchButton = $("#searchButton");
var clearButton = $("#clearHistory");
var currentCity = $("#currentCity");
var curentWeather = $("#currentWeather")
var currentTemperature = $("#temperature");
var currentHumidty= $("#humidity");
var currentWSpeed=$("#windSpeed");
var currentUvindex= $("#uvIndex");
var showCity=[];
var APIKey="a0aca8a89948154a4182dcecc780b513";


function find(c){
    for (var i=0; i<showCity.length; i++){
      if(c.toUpperCase()===showCity[i]){
        return -1;
      }
    }
    return 1;
  }

  function displayWeather(event){
    event.preventDefault();
    if(searchCity.val().trim()!==""){
      city=searchCity.val().trim();
      currentWeather(city);
    }
  }

