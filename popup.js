chrome.runtime.onInstalled.addListener(function() {
  let apiKey = "&appid=";

  let queryAdress = "Seattle";

  let url =
    "http://api.openweathermap.org/data/2.5/weather?q=" + queryAdress + apiKey;

  fetch(url).then(function(reponse) {
    console.log(reponse);
  });
});
