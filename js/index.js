arrayYear=["2020","2021","2022","2023"];

document.addEventListener("DOMContentLoaded", () =>{
    const select = document.querySelector("#season");

    document.querySelector("#back-to-home").addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default anchor behavior
    
        // Hide other sections
        document.querySelector("main section#races").style.display = "none";
        document.querySelector("main section#qualifying").style.display = "none";
        document.querySelector("main section#results").style.display = "none";
    
        // Show home section
        document.querySelector("main section#intro").style.display = "block";
        document.querySelector("main section#img").style.display = "block";
    }); 

    //hiding Races View
    document.querySelector("main section#races").style.display = "none";
    document.querySelector("main section#qualifying").style.display = "none";
    document.querySelector("main section#results").style.display = "none";

    //populating seasons
    arrayYear.forEach(year => {
        const opt = document.createElement("option");
        opt.setAttribute("value", year);
        opt.textContent = year;
        select.appendChild(opt);
    });
    const localSavedData = retrieveStorage('races');
    //Event Listeners
    select.addEventListener("change", event=>{
    let selectedYear = event.target.value;
    if(event.target.nodeName.toLowerCase() == "select"){
        toRacesView();
        fetchingData(localSavedData, selectedYear);
        };
    });
    const resultPortion = document.querySelector("#races");
    
    resultPortion.addEventListener("click", event=>{
    if(event.target.nodeName.toLowerCase() == "button"){
        let raceId = event.target.value;
        document.querySelector("main section#qualifying").style.display = "block";
        document.querySelector("main section#results").style.display = "block";

        fetchingQualify(raceId);
        fetchingResults(raceId);
    };
    });
    const favoritesList = retrieveStorage('favorites');

    browse = document.querySelector('#browse');
    browse.addEventListener("click", event=>{
        if (event.target.getAttribute('class') === 'fav') { 
            if (event.target.style.backgroundColor === "green"){
                event.target.style.backgroundColor = ""; 
                favoritesList.pop(event.target.textContent);
            }else { 
                event.target.style.backgroundColor = "green";
                favoritesList.push(event.target.textContent); 
            }
            checkFavorite(newDataName);
        }
        updateStorage('favorites', favoritesList);
    });
});
function toRacesView(){
    document.querySelector("main section#intro").style.display = "none";
    document.querySelector("main section#img").style.display = "none";
    document.querySelector("main section#races").style.display = "block";
    
};
function fetchingData(localSavedData, year){
        //if data is not found in local storage
        if(localSavedData.length == 0){
            //fetching Races
            races = [];
            fetch(`https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season=${year}`)
                .then(resp=>resp.json())
                .then(data=>{
                    
                    //add Races to local storage
                    data.forEach(dataItem => {
                        localSavedData.push(dataItem);
                        races.push(dataItem.id)
                        createRacesHTML(dataItem.round, dataItem.name, year, dataItem.id, dataItem.circuit);
                        updateStorage('races', localSavedData)
                    });
                    races.forEach(raceId=>{
                        fetch(`https://www.randyconnolly.com/funwebdev/3rd/api/f1/qualifying.php?race=${raceId}`)
                            .then(resp => resp.json())
                            .then(data => {
                                updateStorage('qualifyData'+raceId, data);
                        });
                    });
                    races.forEach(raceId=>{
                        fetch(`https://www.randyconnolly.com/funwebdev/3rd/api/f1/results.php?race=${raceId}`)
                            .then(resp => resp.json())
                            .then(data => {
                                updateStorage('resultData'+raceId, data);
                        });
                    });
                });
            
                
        }else{
            const races = retrieveStorage('races');
            races.forEach(dataItem => {
                localSavedData.push(dataItem);
                createRacesHTML(dataItem.round, dataItem.name, year, dataItem.id, dataItem.circuit);  
            });
        }
}
function fetchingQualify(raceId){
        populateQualifyReal(retrieveStorage('qualifyData'+raceId));
}
function fetchingResults(raceId){
        populateResultsReal(retrieveStorage('resultData'+raceId));
}
function retrieveStorage(key){
    return JSON.parse(localStorage.getItem(key)) || []; 
}
function updateStorage(key,fetchedData){
    localStorage.setItem(key, JSON.stringify(fetchedData));
}
function checkFavorite(favData){
    if(retrieveStorage('favorites').includes(favData.textContent) || 
        retrieveStorage('favorites').includes(favData.textContent +"View Driver") ||
        retrieveStorage('favorites').includes(favData.textContent +"View Constructor")) {
        favData.style.backgroundColor = "green";
    }
};