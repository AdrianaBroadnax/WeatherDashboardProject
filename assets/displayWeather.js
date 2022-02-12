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

function find(c){
    for (var i=0; i<showCity.length; i++){
      if(c.toUpperCase()===showCity[i]){
        return -1;
      }
    }
    return 1;
  }