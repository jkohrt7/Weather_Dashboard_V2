//Uses local storage to populate bar with recent cities
let buildHistory = function(onClick) {
    
    //get the cities from localStorage into an array
    let cityArr = window.localStorage.getItem("WeatherSearchHistory"); //string
    if(cityArr) {
        cityArr = JSON.parse(window.localStorage.getItem("WeatherSearchHistory")); //arr of string
        cityArr = cityArr.map(obj => JSON.parse(obj))
    } else {
        cityArr = [];
    }

    let cityElement = document.querySelector("#city-history");
    cityElement.innerHTML = "";
    let node;
    let textnode;
    
    for (let i = cityArr.length - 1; i >= 0; i--){
        currSearch = cityArr[i];
        //DEBUG: console.log(currSearch)
        node = document.createElement("div");
        node.setAttribute("class", "text-white hover:text-gray-400 cursor-pointer whitespace-nowrap")

        //need to format data before saving it to dataset
        if(currSearch["stateCode"]) {
            node.setAttribute("data-search", `${currSearch["cityCode"]}, ${currSearch["stateCode"]}`);
        } 
        else if(currSearch["countryCode"]) {
            node.setAttribute("data-search", `${currSearch["cityCode"]}, ${currSearch["countryCode"]}`);
        }
        else{
            node.setAttribute("data-search", `${currSearch["cityCode"]}`);
        }

        node.onclick = onClick;

        textnode = document.createTextNode(`${currSearch["cityCode"].charAt(0).toUpperCase() + currSearch["cityCode"].slice(1)}`);
        node.appendChild(textnode);
        cityElement.appendChild(node);
    }
};

//Adds a city to local storage and to the 
let addCity = function(searchArgs) {

    //get the cities from localStorage into an array
    let cityArr = window.localStorage.getItem("WeatherSearchHistory");
    cityArr = JSON.parse(window.localStorage.getItem("WeatherSearchHistory"));
    if (!cityArr) {
        cityArr = [];
    }

    //check the length. If it is greater than 10, slice off the first element before appending
    if (cityArr.length >= 10) {
        cityArr = cityArr.slice(1);
    }
    
    for(let i = 0; i < cityArr.length; i++) {
        //Make sure the city doesn't already exist
        if(cityArr[i].includes(capitalize(searchArgs["cityCode"]))) {
            return;
        }
    }

    //standardize format before converting to string
    searchArgs["cityCode"] = capitalize(searchArgs["cityCode"]);
    searchArgs["countryCode"] = capitalize(searchArgs["countryCode"]);
    searchArgs["stateCode"] = searchArgs["stateCode"].toUpperCase();
    cityArr.push(JSON.stringify(searchArgs));

    //DEBUG: console.log(searchArgs)

    //add it back to localStorage
    localStorage.setItem("WeatherSearchHistory", JSON.stringify(cityArr));
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

    return returnStr;

}