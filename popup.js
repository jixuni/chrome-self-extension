
let apiKey = "&appid=";

let queryAddress = "new york";

let url = "http://api.openweathermap.org/data/2.5/weather?q=" + queryAddress + apiKey;

// kevlin to fahrenheight (K − 273.15) × 9/5 + 32 = °F
//function for coverting kelvins into F
let temp = function(kelvin) {
  temp = (kelvin - 273.15) * (9 / 5);
  temp += 32;
  return temp;
}

let content = document.getElementById("midContent");

//create htmls tag for weather icon
let weatherIcon = document.createElement("i");

//Using fetch to grab api data, since this is a chrome extension I decided to use fetch.
//It is supported in chrome and keeps me from importing another library

fetch(url)
.then(response => response.json())
.then(data => {
  //Grabs the temperature from the api storing it in dataTemp. Takes that value and pass it into temp function to covert it into fahrenheight
  //using toFixed so only show 1 deicimal value.
  let dataTemp = data.main.temp;
  dataTemp = temp(dataTemp).toFixed(1);

  let dataWeatherCondition = data.weather[0].id;
  
  //calls the weather function and pass the the weather id from the api, it will determind which icon to display.
  changeWeatherIcon(dataWeatherCondition);
  // appending the tempearture after its converted to the DOM and concatenate hexidecimal value for the degree symbol;
  content.append(dataTemp + "\xB0");
  
  console.log(dataTemp);
  console.log(data.weather[0].id);
});


let changeWeatherIcon = function(dataWeatherCondition){
  console.log(dataWeatherCondition === 800)

  
  switch(true) {
    // 801 - 804 clouds
    case (dataWeatherCondition >= 801 && dataWeatherCondition <= 804):
      weatherIcon.setAttribute("class", "wi wi-day-cloudy");
      content.appendChild(weatherIcon);
      break;
    // 800 clear skies
    case dataWeatherCondition === 800:
      weatherIcon.setAttribute("class", "wi wi-day-sunny");
      content.appendChild(weatherIcon);
      break;
    // 701-781 atmosphere condition, i.g sand, dust, tornado. Will code in all conditon in future, alien symbol for now
    case dataWeatherCondition >= 701 && dataWeatherCondition <= 781:
      weatherIcon.setAttribute("class", "wi wi-alien");
      content.appendChild(weatherIcon);
      break;
    // 600-622 snow 
    case dataWeatherCondition >= 600 && dataWeatherCondition <= 622:
      weatherIcon.setAttribute("class", "wi day-snow");
      content.appendChild(weatherIcon);
      break;
    //500-531 rain
    case dataWeatherCondition === 500 || dataWeatherCondition <= 531:
      weatherIcon.setAttribute("class", "wi wi-rain");
      content.appendChild(weatherIcon);
      break;
    //300-321 drizzle/ light rain
    case dataWeatherCondition >= 300 && dataWeatherCondition <= 321:
      weatherIcon.setAttribute("class", "wi wi-sprinkle");
      content.appendChild(weatherIcon);
      break;
    //200-232 heavy rain/ t-storm
    case dataWeatherCondition >= 200 && dataWeatherCondition <= 232:
      weatherIcon.setAttribute("class", "wi wi-thunderstorm");
      content.appendChild(weatherIcon);
      break;
    //if no id codd is found, set to N/A
    default: 
      weatherIcon.setAttribute("class", "wi wi-na");
      content.appendChild(weatherIcon);
      break;
  };
}



