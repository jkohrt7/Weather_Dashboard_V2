//import local modules
import {submitSearch} from "./search.js"

function init() {
    //add listener to search button
    let searchIcon = document.querySelector("#search-icon");
    searchIcon.addEventListener("click", submitSearch); //TODO: submit search

    //add listener to search bar on enter
    let searchBar = document.querySelector("#search-bar");
    searchBar.addEventListener("keypress", (e) => {
        if(e.key === 'Enter') {submitSearch(e)}
    });

    //get all localStorage items into the subheader
    buildHistory();

    //add submitSearch listener to each; the search will use their attribute data
    let historyArr = document.querySelector("#city-history").childNodes;
    historyArr.forEach(node => node.onclick = submitSearch);
}



init();