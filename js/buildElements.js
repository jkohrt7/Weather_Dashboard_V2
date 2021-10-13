//TODO: Break this up into the 3 functions declared beneath it
function buildWeatherCards(data) {
    //DEBUG: console.log(data)
    //set values from response
    let temp = data.current.temp;
    let wind = data.current.wind_speed;
    let humidity = data.current.humidity;
    let icon = data.current.weather[0].icon;
    let icon_caption = data.current.weather[0].main;
    let uvi = data.current.uvi;
    let sunrise = luxon.DateTime.fromSeconds(data.current.sunrise);
    let sunset = luxon.DateTime.fromSeconds(data.current.sunset);

    //get the stuff you'll be adding to 
    let currentWeatherContainer = document.querySelector("#current-weather-card");
    let dailyIcon = document.querySelector("#daily-icon")
    let dailyInfo = document.querySelector("#daily-info");
    let timeCard = document.querySelector("#time-card")
    let sunriseContainer = document.querySelector("#sunrise-section");
    let sunsetContainer = document.querySelector("#sunset-section")
    let forecastContainer = document.querySelector("#forecast-card");

    //clear out existing content
    dailyIcon.innerHTML = "";
    dailyInfo.innerHTML = "";
    timeCard.innerHTML = "";
    forecastContainer.innerHTML = "";

    //instantiate some variables
    let node;
    let textNode;
    let att = document.createAttribute("class");

    //Add city name
    let searchVal = document.querySelector("#search-bar").value;
    node = document.createElement("H2");
    node.setAttribute("class","text-xl text-white bold");
    textNode = document.createTextNode(`${searchVal.charAt(0).toUpperCase() +searchVal.slice(1)}`);
    node.appendChild(textNode);
    dailyInfo.appendChild(node);

    //add temperature, humidity, wind, and uvi
    //temp
    node = document.createElement("H1");
    node.setAttribute("class","text-5xl text-white p-4");
    textNode = document.createTextNode(`${temp} °F`);
    node.appendChild(textNode);
    dailyInfo.appendChild(node);

    //humidity
    node = document.createElement("H1");
    node.setAttribute("class","text-xl text-white bold pb-1");
    textNode = document.createTextNode(`Humidity: ${humidity}%`);
    node.appendChild(textNode);
    dailyInfo.appendChild(node);

    //wind
    node = document.createElement("H1");
    node.setAttribute("class","text-xl text-white bold pb-1");
    textNode = document.createTextNode(`Wind: ${wind} mph`);
    node.appendChild(textNode);
    dailyInfo.appendChild(node);

    //uvi
    node = document.createElement("P");

    //Need a span for the title...
    let titleSpanNode = document.createElement("SPAN");
    titleSpanNode.setAttribute("class","text-xl text-white bold pb-1");
    textNode = document.createTextNode("UV Index: ");
    titleSpanNode.appendChild(textNode);
    node.appendChild(titleSpanNode);
    
    //...and for the dynamically colored UV Index
    let colorSpanNode = document.createElement("SPAN");
    if(uvi <= 4) {
        //colorSpanNode.style = "background-color: green; color: white; border-radius: 3px; padding: 2px";
        colorSpanNode.setAttribute("class","text-xl text-white bg-green-800 rounded-lg px-2")
    } 
    else if (uvi <=7 ) {
        colorSpanNode.setAttribute("class","text-xl text-white bg-orange-800 rounded-lg px-2")
    }
    else {
        colorSpanNode.setAttribute("class","text-xl text-white bg-red-800 rounded-lg px-2")
    }
    textNode = document.createTextNode(uvi);
    colorSpanNode.appendChild(textNode);
    node.appendChild(colorSpanNode);
    
    dailyInfo.appendChild(node);

    //icon and header
    //icon
    node = document.createElement("IMG");
    node.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    node.setAttribute("class", "h-32");
    dailyIcon.appendChild(node);

    //header
    node = document.createElement("H1");
    node.setAttribute("class","text-3xl text-white bold");
    textNode = document.createTextNode(`${icon_caption}`);
    node.appendChild(textNode);
    dailyIcon.appendChild(node);
    
    /* Sunrise/Sunset card */
    //Sunrise
    node = document.createElement("IMG");
    node.src = "img/sunrise.png"
    node.setAttribute("class", "h-24 filter invert");
    timeCard.appendChild(node);

    node = document.createElement("H1");
    node.setAttribute("class","text-xl bold text-white");
    textNode = document.createTextNode(`${sunrise.toLocaleString(luxon.DateTime.TIME_SIMPLE)}`);
    node.appendChild(textNode);
    timeCard.appendChild(node);

    //Sunset
    node = document.createElement("IMG");
    node.src = "img/sunset.png"
    node.setAttribute("class", "h-24 filter invert");
    timeCard.appendChild(node);

    node = document.createElement("H1");
    node.setAttribute("class","text-xl bold text-white");
    textNode = document.createTextNode(`${sunset.toLocaleString(luxon.DateTime.TIME_SIMPLE)}`);
    node.appendChild(textNode);
    timeCard.appendChild(node);

    /* Weekly Forecast Card */
    //forecast data
    let forecastArray = data.daily;

    for(let i = 0; i < forecastArray.length - 3; i++) {
        
        highTemp = forecastArray[i].temp.max;
        lowTemp = forecastArray[i].temp.min;
        wind = forecastArray[i].wind_speed;
        humidity = forecastArray[i].humidity;
        icon = forecastArray[i].weather[0].icon;
        date = forecastArray[i].dt;

        dayNode = document.createElement("div");

        //add date
        let node = document.createElement("h4");
        node.setAttribute("class", "text-center text-white text-xl text-bold pt-6 md:py-0")
        let textnode = document.createTextNode(luxon.DateTime.fromSeconds(date).toLocaleString({weekday: 'long'}));
        node.appendChild(textnode);
        dayNode.appendChild(node);
        
        //add icon
        node  = document.createElement("IMG");
        node.src =  "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        node.setAttribute("class", 'block ml-auto mr-auto')
        dayNode.appendChild(node);

        //add High Temp
        node = document.createElement("P");
        node.setAttribute("class", "text-white text-lg text-bold")
        textnode = document.createTextNode("High: " + Math.floor(highTemp) + " °F");
        node.appendChild(textnode);
        dayNode.appendChild(node);

        //Add low temp
        node = document.createElement("P");
        node.setAttribute("class", "text-white text-lg text-bold")
        textnode = document.createTextNode("Low: " + Math.floor(lowTemp) + " °F");
        node.appendChild(textnode);
        dayNode.appendChild(node);

        //add wind
        node = document.createElement("P");
        node.setAttribute("class", "text-white text-lg text-bold")
        textnode = document.createTextNode("Wind: " + wind + " MPH");
        node.appendChild(textnode);
        dayNode.appendChild(node);

        //add humidity
        node = document.createElement("P");
        node.setAttribute("class", "text-white text-lg text-bold")
        textnode = document.createTextNode("Humidity: " + humidity + "%");
        node.appendChild(textnode);
        dayNode.appendChild(node);

        forecastContainer.appendChild(dayNode);
    };
}

function buildCurrentWeatherCard(data) {

}

function buildSunriseSunsetCard(data) {

}

function buildForecastCard(data) {

}

//permanently change visibility after search
function changeVisibility() {
    //make starting screen invis
    let postSearch = document.querySelector("#post-search-cards");
    let preSearch = document.querySelector("#pre-search-cards");

    if(!preSearch.classList.contains("hidden")){
        preSearch.classList.add("hidden")
    } 
    if(postSearch.classList.contains("hidden")) {
        postSearch.classList.remove("hidden");
    } 
}

function buildElements(data) {
    buildCurrentWeatherCard();
    buildSunriseSunsetCard();
    buildForecastCard();
    changeVisibility();
}

