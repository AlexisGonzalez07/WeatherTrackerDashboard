// Declare all my variables I need to interact with
var userSearchBtn = document.getElementById('search');
var userSearchTerm = document.getElementById('search-term');
var pastCities = document.getElementsByTagName('button');
var storageList = document.getElementById('storage-list')
console.log(pastCities)
var apiCity = "";
var upperCard = document.getElementById('upper-card')
var bottomCards = document.getElementById('bottom-card');
var forecastDays = 5;
var forecastIndex = 1;
var longitude = '';
var latitude = '';
var cities = [];
var uv=''
var apiKey = "137290e1f98143701448952087a7ef29";
var uvArray =[]
var cityName = '';

// When I press the button, I'm going to perform two seperate API searches
// Need to disect the code to call for the city and get temperature, wind, humidity
// Need to need a condition for the UV, it's own formula before appending to the card

// Need to call for a 5-day forecast
// Need to create columns in there as cards with each one being in there
// The cards need to be small and with padding and margin. Probably a dark navy background colorscheme is appropriate


// When I press the button, I need to add my search to an array
// I need to check if it exists in local storage, and if not remove it, I need to make local storage only 8 long
// It needs to call for the function to call the existing API and get all the storage
// Then I have to get that API call, convert it to JSON, and inspect the response
// After I inspect the response, I need to make the div on the top and the bottom simultaneously
// I'll need a formula to decide on a weather icon and then return the "list element back"

function fetchAPI (event) {
  event.preventDefault();
  uvArray.splice(0,uvArray.length)
  upperCard.innerHTML=''
  bottomCards.innerHTML=''
    var element = event.target;
    if (element.matches('#search')){
        cityName=userSearchTerm.value;
        cities.push(cityName);
        console.log(cityName);
        cityName.trim();
        storeCities();
        renderCities()
    }
    else if (element.matches('button')){
        cityName = element.value;
        cityName.trim();
    } 

    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=` + cityName + `&units=imperial&appid=` + apiKey;
    console.log(apiURL);
    fetch(apiURL)
    .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var longitude = data.city.coord.lon;
        console.log(longitude);
        var latitude = data.city.coord.lat;
        console.log(latitude)
        uvAPI(longitude,latitude)
        return data
      })
}

function uvAPI (long,lat) {
  console.log(long);
  console.log(lat);

  var uvURL = `https://api.openweathermap.org/data/2.5/onecall?lat=` + lat +`&lon=`+long+ `&units=imperial&exclude=minutely,hourly&appid=` + apiKey;
  console.log(uvURL);
  fetch(uvURL)
  .then(function (answer) {
      console.log(answer);
      return answer.json();
    })
    .then(function (onecall) {
      console.log("this the one call:")
      console.log(onecall);
      // uv = onecall.current.uvi
      // console.log("This is uv:" + uv)
      // uvArray.push(uv)
      populatePage(onecall)
    });
}


function populatePage (search) {
  console.log(uvArray)
  console.log(search);
  // cardCity = search.city.name
  console.log(cityName)
  // console.log(uvText)
  var cardDate =''

  // Set up the upper card
  var upperBlock = document.createElement('div');
  upperBlock.className = 'card';
  // Set up the card header
  var topcardHeader = document.createElement('div')
  topcardHeader.classList.add('card-header')
  var topcardTitle = document.createElement('h3')
  topcardTitle.innerHTML =cityName +' ' + moment().format("MMM Do YY");  
  topcardHeader.append(topcardTitle);
  // Set up the card footer
  var topcardFooter = document.createElement('div')
  topcardFooter.classList.add('card-body')
  // Create list and populate
  var topcardList = document.createElement('ul')
  var toptemperatureElement = document.createElement('li')
  toptemperatureElement.textContent='Temp: ' +search.daily[0].temp.day+ ' \u00B0F'
  var topwindElement = document.createElement('li')
  topwindElement.textContent='Wind: '+search.daily[0].wind_speed+ ' MPH'
  var tophumidityElement = document.createElement('li')
  tophumidityElement.textContent='Humidity: '+search.daily[0].humidity+' %'
  var topUVElement = document.createElement('li')
  topUVElement.textContent='UV Index: '
  var uvElement = document.createElement('span')
  uvElement.classList.add('uv-index')
  uvElement.textContent = search.daily[0].uvi
  uvElement.value = search.daily[0].uvi
  console.log(uvElement.value)
  if (uvElement.value <=2){
    uvElement.setAttribute('style','background-color: green')
  } else  if (uvElement.value >2 && uvElement.value <=5){
    uvElement.setAttribute('style','background-color: yellow')
  } else {
    uvElement.setAttribute('style', 'background-color: red')
  }
  topUVElement.append(uvElement)
  topcardList.append(toptemperatureElement)
  topcardList.append(topwindElement)
  topcardList.append(tophumidityElement)
  topcardList.append(topUVElement)
  topcardFooter.append(topcardList)
  // Append header and footer to card
  upperBlock.append(topcardHeader)
  upperBlock.append(topcardFooter)
  // Append card to upper Div
  upperCard.append(upperBlock)

  // Set up the lower card so we move to index 1 in responses immediately
  for (var i = forecastIndex; i < forecastDays+1; i++) {
    // Set up card div
    var resultBlock = document.createElement('div');
    resultBlock.className = 'card';
    resultBlock.classList.add('col-5', 'col-md-3', 'col-lg-2')
    // Set up the card header
    var cardHeader = document.createElement('div')
    cardHeader.classList.add('card-header', 'solo-cards-title')
    var cardTitle = document.createElement('h3')
    // cardTitle.innerHTML = moment().format("MMM Do YY");   
    var x=  search.daily[i].dt * 1000
    let dateObj = new Date(x)
    let obj = JSON.stringify(dateObj)
    console.log(typeof dateObj)
    console.log(obj)
    console.log(obj.slice(3,11))
    cardTitle.innerHTML = obj.slice(1,11)
    // var trimmedDate =cardDate.substring(0,10)
    // cardTitle.textContent= trimmedDate;
    cardHeader.append(cardTitle);
    // Set up the card footer
    var cardFooter = document.createElement('div')
    cardFooter.classList.add('card-body')
    // Create list and populate
    var cardList = document.createElement('ul')
    var iconElement = document.createElement('li')
    iconElement.textContent='Icon: ' +search.daily[i].temp.day
    console.log(iconElement)
    var temperatureElement = document.createElement('li')
    temperatureElement.textContent='Temp: ' +search.daily[i].temp.day+ ' \u00B0F'
    var windElement = document.createElement('li')
    windElement.textContent='Wind: ' +search.daily[i].wind_speed+ ' MPH'
    var humidityElement = document.createElement('li')
    humidityElement.textContent='Humidity: '+search.daily[i].humidity+' %'
    cardList.append(iconElement)
    cardList.append(temperatureElement)
    cardList.append(windElement)
    cardList.append(humidityElement)
    cardFooter.append(cardList)
    // Append header and footer to card
    resultBlock.append(cardHeader)
    resultBlock.append(cardFooter)
    // Append card to upper Div
    bottomCards.append(resultBlock)
  };
}

function storeCities() {
  // Stringify and set key in localStorage to cities array
  localStorage.setItem("cities", JSON.stringify(cities));
}

function renderCities() {
    storageList.innerHTML='';

    for (let i=0; i < cities.length; i++) {
      var city = cities[i]
      var listButton = document.createElement('button')
      listButton.textContent=city;
      listButton.value=city;
      listButton.classList.add('list-group-item','list-group-item-action')
      storageList.appendChild(listButton)
    }
}

function init() {
  var storedCities = JSON.parse(localStorage.getItem('cities'))

  if (storedCities !== null) {
    cities=storedCities;
  }
  renderCities()
}

// Run init function
init();

// Click functions at bottom of Javascritp
userSearchBtn.addEventListener('click', fetchAPI)

storageList.addEventListener('click', fetchAPI)