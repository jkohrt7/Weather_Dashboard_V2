//import local modules
import {processSearchInput} from "./search.js";
import {getWeatherData} from "./weather.js"

function init() {
    //add listener to search button
    let searchIcon = document.querySelector("#search-icon");
    searchIcon.addEventListener("click", (e) => submitSearch(e.target)); //TODO: submit search

    //add listener to search bar on enter
    let searchBar = document.querySelector("#search-bar");
    searchBar.addEventListener("keypress", (e) => {
        if(e.key === 'Enter') {submitSearch(e)}
    });

    //get all localStorage items into the subheader
    buildHistory();

    //add submitSearch listener to each; the search will use their attribute data
    let historyArr = document.querySelector("#city-history").childNodes;
    historyArr.forEach(node => node.onclick = ((e) => submitSearch(e)));
}

//Makes calls to all other functions in order to submit a user's search
async function submitSearch(e) {
    //Get the search val. Either from history, or search bar.
    let userInput;
    if(e.target.hasAttribute("data-search")) {
        userInput = e.target.dataset.search;
        document.querySelector("#search-bar").value = userInput;
    } else {
        userInput = document.querySelector("#search-bar").value;
    }

    //Do not submit blank searches
    if(!userInput) {
        console.log("No value entered")
        return;
    }

    //process the results to get standardized countrycode, cityname, statecode
    let searchArgs = await processSearchInput(userInput);

    //give these to getWeather and await results
    let weatherData;
    try{
        weatherData = await getWeatherData(searchArgs["countryCode"], searchArgs["cityCode"], searchArgs["stateCode"])
        addCity(searchArgs)
    } catch(error) {
        console.log(error);
        return;
    }

    //build HTML elements using the information
    await buildWeatherCards(weatherData);
    await buildHistory(submitSearch);

    //change visible elements to hidden when complete
    //change invisible elements to visible when complete
    await changeVisibility()
}

init();