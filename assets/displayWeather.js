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
// API KEY
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

    // CALLING API
    function currentWeather(city){
        //URL GIVEN
        var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
        $.ajax({
          url:queryURL,
          method:"GET",
        }).then(function(response){
         })}

         var weatherpic= response.weather[0].icon;
         var picurl="https://openweathermap.org/img/wn/"+weatherpic +"@2x.png";

        //  DATE
        var date=new Date(response.dt*1000).toLocaleDateString();
        $(currentCity).html(response.name +"("+date+")" + "<img src="+picurl+">");

        // Temp convert
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(currentTemperature).html((tempF).toFixed(2)+"&#8457");

        // Humidity
        $(currentHumidty).html(response.main.humidity+"%");

        //  Wind
        var ws=response.wind.speed;
        var windsmph=(ws*2.237).toFixed(1);
        $(currentWSpeed).html(windsmph+"MPH");

        // uvIndex Display
        UVIndex(response.coord.lon,response.coord.lat);
        forecast(response.id);
        if(response.cod==200){
          sCity=JSON.parse(localStorage.getItem("cityname"));
          console.log(sCity);
          if (sCity==null){
            sCity=[];
            sCity.push(city.toUpperCase()
            );
            localStorage.setItem("cityname",JSON.stringify(sCity));
            addToList(city);
          }
          else {
            if(find(city)>0){
              sCity.push(city.toUpperCase());
              localStorage.setItem("cityname",JSON.stringify(sCity));
              addToList(city);
            }
          }
        }
