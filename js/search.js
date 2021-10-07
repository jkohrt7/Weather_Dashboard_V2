//import { stateList } from "./stateCodes";
//import { getCountryCode } from "./getAreaCodes";

//converts user input into a standard, usable format of country code, city coordinates, and state code.
export function processSearchInput(str) {
    let wordArray = str.split(",");
    wordArray.map((element) => {
        return (element.toLowerCase().trim())
    })

    //Single word entries treated as cities
    if(wordArray.length === 1) {
        return {cityCode: wordArray[0], countryCode: "",stateCode:""}
    }
    else {
        fullStateNames = Object.keys(stateList);
        stateCodes = Object.values(stateList);
        
        //check if user provided a full state's name
        if(fullStateNames.includes(wordArray[1])) {
            return {"cityCode": wordArray[0], "countryCode": "USA", "stateCode": stateList[wordArray[1]]}
        } 
        //check if user provided a state code
        else if(stateCodes.includes(wordArray[1])){
            return {"cityCode": wordArray[0], "countryCode": "USA", "stateCode":wordArray[1]}
        } 
        //Otherwise, assume user provided a country.
        else {
            let country = getCountryCode(wordArray[1]);
            return {"cityCode": wordArray[0], "countryCode": wordArray[1], "stateCode":""}
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