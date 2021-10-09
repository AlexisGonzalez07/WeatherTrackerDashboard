// Declare all my variables I need to interact with
var userSearchBtn = document.getElementById('search')
var userSearchTerm = document.getElementById('search-term')
var apiCity = ""
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
    event.preventDefault()
    var apiKey = "137290e1f98143701448952087a7ef29"
    var element = event.target
    var cityName = ''
    if (element.matches('#search')){
        cityName=userSearchTerm.value
        console.log(cityName)
        cityName.trim()
    }
    else if (element.matches('button')){
        cityName = element.value
        cityName.trim()
    } 

    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=` + cityName + `&appid=` + apiKey;
    console.log(apiURL)
    fetch(apiURL)
    .then(function (response) {
        console.log(response)
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
}


userSearchBtn.addEventListener('click', fetchAPI)