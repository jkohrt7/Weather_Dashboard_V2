//import local modules
import {processSearchInput} from "./search.js";
import {getWeatherData} from "./weather.js"

function init() {
    //add listener to search button
    let searchIcon = document.querySelector("#search-icon");
    searchIcon.addEventListener("click", submitSearch); //TODO: submit search

    //add listener to search bar on enter
    let searchBar = document.querySelector("#search-bar");
    searchBar.addEventListener("keypress", (e) => {
        if(e.key === 'Enter') {submitSearch()}
    });
}

async function submitSearch() {
    let userInput = document.querySelector("#search-bar").value;
    if(!userInput) {
        console.log("No value entered")
        return;
    }
    //throughly process the results to get countrycode, cityname, statecode
    let searchString = document.querySelector("#search-bar").value;
    let searchArgs = await processSearchInput(searchString);

    

    //give these to getWeather and await results
    let weatherData = await getWeatherData(searchArgs["countryCode"], searchArgs["cityCode"], searchArgs["stateCode"])

    //build HTML elements using the information
    await buildWeatherCards(weatherData)

    //change visible elements to hidden when complete
    //change invisible elements to visible when complete
    //changeVisibility()
}

function buildWeatherCards(data) {
    // //set values from response
    // let temp = response.current.temp;
    // let wind = response.current.wind_speed;
    // let humidity = response.current.humidity;
    // let icon = response.current.weather[0].icon;
    // let uvi = response.current.uvi;
    // let sunrise = "";
    // let sunset = "";

    // //get the stuff you'll be adding to 
    // let currentWeatherContainer = document.querySelector("#current-weather-card");
    // let dailyIcon = document.querySelector("#daily-icon")
    // let dailyInfo = document.querySelector("#daily-info")
    // let sunriseContainer = document.querySelector("#sunrise-card");
    // let forecastContainer = document.querySelector("#forecast-card");

    // //clear out existing content
    // dailyIcon.innerHTML = "";
    // dailyInfo.innerHTML = "";
    // sunriseContainer.innerHTML = "";
    // forecastContainer.innerHTML = "";

    // //instantiate some variables
    // let node;
    // let textNode;
    // let att = document.createAttribute("class");

    // //Add city name


    // //add temperature, humidity, wind, and uvi
    // let node = document.createElement("H2");
    // let textNode = document.createTextNode(`${temp} °F`);
    // att.value = "text-2xl text-white bold";
    // node.appendChild(textNode);
    // dailyInfo.appendChild();
}

function changeVisibility() {
    //make starting screen invis
}

init();