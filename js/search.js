import {getWeatherData} from "./weather.js"
import { stateList } from "./areaCodes.js";
import { countryList } from "./areaCodes.js";

//Modifies site components using the user's search values
export async function submitSearch(e) {
    //Get the search val. Either from history, or search bar.
    let userInput;

    //Determine if the search was a history event or regular search
    if(e.type == "click" && e.target.hasAttribute("data-search")) {
        userInput = e.target.dataset.search;
        document.querySelector("#search-bar").value = userInput;
    } else {
        userInput = document.querySelector("#search-bar").value;
    }

    //User did not type
    if(userInput === "") {
        console.log("No value entered")
        return;
    }

    //process the results to get standardized countrycode, cityname, statecode
    let searchArgs;
    try{
        searchArgs = await processSearchInput(userInput);
    } 
    catch(err) {
        console.log(err);
        return;
    }
    

    //give these to getWeather and await results
    let weatherData;
    try{
        weatherData = await getWeatherData(searchArgs["countryCode"], searchArgs["cityCode"], searchArgs["stateCode"])
        addCity(searchArgs)
    } 
    catch(error) {
        console.log(error);
        return;
    }

    //build HTML elements using the information
    await buildWeatherCards(weatherData);
    await buildHistory(submitSearch);
    await changeVisibility()
}

//converts user input into a standard, usable format of country code, city coordinates, and state code.
async function processSearchInput(str) {
    let wordArray = str.split(",");
    wordArray = wordArray.map((element) => {
        return (element.toLowerCase().trim())
    })

    //Single word entries treated as cities
    if(wordArray.length === 1) {
        return {cityCode: wordArray[0], countryCode: "",stateCode:""}
    }
    else {
        let fullStateNames = Object.keys(stateList);
        let stateCodes = Object.values(stateList);
        let countryNames = Object.keys(countryList);
        
        //check if user provided a full state's name after the city
        if(fullStateNames.includes(wordArray[1])) {
            return {"cityCode": wordArray[0], "countryCode": "USA", "stateCode": stateList[wordArray[1]]}
        } 
        //check if user provided a state code after the city
        else if(stateCodes.includes(wordArray[1].toUpperCase())){
            return {"cityCode": wordArray[0], "countryCode": "USA", "stateCode":wordArray[1].toUpperCase()}
        } 
        //check if user provided a country after the city
        else if(countryNames.includes(capitalize(wordArray[1]))){
            let country = countryList[capitalize(wordArray[1])];
            return {"cityCode": wordArray[0], "countryCode": country, "stateCode":""}
        }
        else {
            throw new Error("Location DNE");
        }
    }
}

function capitalize(str) {
    //str is blank
    if(str.length < 1){
        return str;
    }

    let strArr = str.split(" ");
    let returnStr = "";
    strArr.forEach((word) => {
        let firstLetter = word.slice(0,1);
        firstLetter = firstLetter.toUpperCase();
        returnStr += (firstLetter + word.slice(1) + " ");
    })

    return returnStr.trim();
}