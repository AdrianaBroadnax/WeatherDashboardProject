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
          showCity=JSON.parse(localStorage.getItem("cityname"));
          console.log(showCity);
          if (sCity==null){
            showCity=[];
            showCity.push(city.toUpperCase()
            );
            localStorage.setItem("cityname",JSON.stringify(showCity));
            addToList(city);
          }
          else {
            if(find(city)>0){
              showCity.push(city.toUpperCase());
              localStorage.setItem("cityname",JSON.stringify(showCity));
              addToList(city);
            }
          }
        }

        // response 4 uvIndex
        function UVIndex(ln,lt){
            var uvqURL="https://api.openweathermap.org/data/2.5/uvi?appid="+ APIKey+"&lat="+lt+"&lon="+ln;
            $.ajax({
                url:uvqURL,
                method:"GET"
                }).then(function(response){
                  $(currentUvindex).html(response.value);
                });
          }

        // 5 day forecast
          function forecast(cityid){
            var dayover= false;
            var queryforcastURL="https://api.openweathermap.org/data/2.5/forecast?id="+cityid+"&appid="+APIKey;
            $.ajax({
              url:queryforcastURL,
              method:"GET"
            }).then(function(response){
              for (i=0;i<5;i++){
                var date= new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
                var piccode= response.list[((i+1)*8)-1].weather[0].icon;
                var picurl="https://openweathermap.org/img/wn/"+piccode+".png";
                var tempA= response.list[((i+1)*8)-1].main.temp;
                var tempB=(((tempA-273.5)*1.80)+32).toFixed(2);
                var humidity= response.list[((i+1)*8)-1].main.humidity;
                $("#fDate"+i).html(date);
                $("#fImg"+i).html("<img src="+picurl+">");
                $("#fTemp"+i).html(tempB+"&#8457");
                $("#fHumidity"+i).html(humidity+"%");
              }
            });
          }

        //   search history
        function addToList(c){
            var listEl= $("<li>"+c.toUpperCase()+"</li>");
            $(listEl).attr("class","listGroupItem");
            $(listEl).attr("data-value",c.toUpperCase());
            $(".listGroup").append(listEl);
          }
          function PastSearch(event){
            var liEl=event.target;
            if (event.target.matches("li")){
              city=liEl.textContent.trim();
              currentWeather(city);
            }
          }

        //   clearHistory
          function clearHistory(event){
            event.preventDefault();
            sCity=[];
            localStorage.removeItem("cityName");
            document.location.reload();
          }

        // save to console
        function loadPrevCity(){
            $("ul").empty();
            var showCity = JSON.parse(localStorage.getItem("cityName"));
            if(showCity!==null){
              showCity=JSON.parse(localStorage.getItem("cityName"));
              for(i=0; i<sCity.length;i++){
                addToList(sCity[i]);
              }
              city=showCity[i-1];
              currentWeather(city);
            }
          }

        //   buttons
        $("#clearHistory").on("click",clearHistory);
        $("#searchButton").on("click",displayWeather);
        $(window).on("load",loadPrevCity);
        $(document).on("click",PastSearch);
        