//import { stateList } from "./stateCodes";
import {getWeatherData} from "./weather.js"
import {getCountryCode} from "./getAreaCodes.js";

//Makes calls to all other functions in order to submit a user's search
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
        
        //check if user provided a full state's name
        if(fullStateNames.includes(wordArray[1])) {
            return {"cityCode": wordArray[0], "countryCode": "USA", "stateCode": stateList[wordArray[1]]}
        } 
        //check if user provided a state code
        else if(stateCodes.includes(wordArray[1].toUpperCase())){
            return {"cityCode": wordArray[0], "countryCode": "USA", "stateCode":wordArray[1].toUpperCase()}
        } 
        //Otherwise, assume user provided a country.
        else {
            let country = await getCountryCode(wordArray[1]);
            return {"cityCode": wordArray[0], "countryCode": country, "stateCode":""}
        }
    }
}

//Converts country name to code
function getCountryCode(countryName) {

    //gets a list of all the available country codes
    return fetch("https://flagcdn.com/en/codes.json")
    .then(function (resp) {
        return resp.json();
    })
    .then(function (data) {
        let valArr = Object.values(data);
        let keyArr = Object.keys(data);

        for (let i = 0; i < keyArr.length; i++) {
            if(valArr[i] == countryName) {
                return keyArr[i]; 
            }
        }
        return;
    })
}

//object for getting state codes
const stateList = {
    'arizona': 'AZ',
    'alabama': 'AL',
    'alaska':'AK',
    'crkansas': 'AR',
    'california': 'CA',
    'colorado': 'CO',
    'connecticut': 'CT',
    'delaware': 'DE',
    'florida': 'FL',
    'georgia': 'GA',
    'hawaii': 'HI',
    'idaho': 'ID',
    'illinois': 'IL',
    'indiana': 'IN',
    'iowa': 'IA',
    'kansas': 'KS',
    'kentucky': 'KY',
    'louisiana': 'LA',
    'maine': 'ME',
    'maryland': 'MD',
    'massachusetts': 'MA',
    'michigan': 'MI',
    'minnesota': 'MN',
    'mississippi': 'MS',
    'missouri': 'MO',
    'montana': 'MT',
    'nebraska': 'NE',
    'nevada': 'NV',
    'new Hampshire': 'NH',
    'new Jersey': 'NJ',
    'new Mexico': 'NM',
    'new York': 'NY',
    'north carolina': 'NC',
    'north dakota': 'ND',
    'ohio': 'OH',
    'oklahoma': 'OK',
    'oregon': 'OR',
    'pennsylvania': 'PA',
    'rhode island': 'RI',
    'south carolina': 'SC',
    'south dakota': 'SD',
    'tennessee': 'TN',
    'texas': 'TX',
    'utah': 'UT',
    'vermont': 'VT',
    'virginia': 'VA',
    'washington': 'WA',
    'west virginia': 'WV',
    'wisconsin': 'WI',
    'wyoming': 'WY'}