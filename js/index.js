
apiUrl = 'https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season='



array=["2020","2021","2022","2023"];

document.addEventListener("DOMContentLoaded", () =>{
    select = document.querySelector("#season");

    //hiding Races View
    document.querySelector("main section#races").style.display = "none";
    document.querySelector("main section#qualifying").style.display = "none";
    document.querySelector("main section#results").style.display = "none";

    //populating seasons
    array.forEach(year => {
        opt = document.createElement("option");
        opt.setAttribute("value", year);
        opt.textContent = year;
        select.appendChild(opt);
    });
    const localSavedData = retrieveStorage('races');
    //Event Listenerts
    select.addEventListener("change", e=>{
    selectedYear = e.target.value;
    if(e.target.nodeName.toLowerCase() == "select"){
        toRacesView();
        fetchingData(localSavedData, selectedYear);
        };
    });

    resultPortion = document.querySelector("#races");
    
    resultPortion.addEventListener("click", e=>{
    if(e.target.nodeName.toLowerCase() == "button"){
        raceId = e.target.value;
        document.querySelector("main section#qualifying").style.display = "block";
        document.querySelector("main section#results").style.display = "block";

        fetchingQualify(raceId);
        fetchingResults(raceId);
    };
    });
});

function toRacesView(){
    document.querySelector("main section#intro").style.display = "none";
    document.querySelector("main section#img").style.display = "none";

    document.querySelector("main section#races").style.display = "block";
    
};

function fetchingData(localSavedData, year){
        //fetching

        //if data is not found in local storage
        if(localSavedData.length == 0){
            //fetching Races
            races = [];
            fetch(`https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season=${year}`)
                .then(resp=>resp.json())
                .then(data=>{
                    
                    //add Races to local storage
                    data.forEach(e => {
                        localSavedData.push(e);
                        races.push(e.id)
                        createRacesHTML(e.round, e.name, selectedYear, e.id, e.circuit);
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
            
                
        }else{ //fetch from local storage
            console.log('we have it alr');
            const races = retrieveStorage('races');
            races.forEach(e => {
                localSavedData.push(e);
                createRacesHTML(e.round, e.name, year, e.id, e.circuit);  
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
function removeStorage(){
    localStorage.removeItem('races');
}