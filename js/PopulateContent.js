

https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season=2023
function populateRaces(year){
    fetch(`https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season=${year}`)
    .then(resp=>resp.json())
    .then(data=>{
        data.forEach(e => {
            console.log(e.id)
            createRacesHTML(e.round, e.name, year, e.id);
        });
    });
};

function createRacesHTML(round, name, year, id){
    raceTitle = document.querySelector("#raceTitle");
    raceTitle.textContent = `Races for the year: ${year}`;

    racelist = document.querySelector("#race-list");
        newRow = document.createElement("tr");
        
            newRaceRoundRace = document.createElement("td");
            newRaceRoundRace.textContent = round;

            newDataName = document.createElement("td");
            newDataName.textContent = name;

            newDataLink = document.createElement("td");

            newDataButton = document.createElement("button");
            newDataButton.setAttribute("value", id);
            newDataButton.textContent = "Results";

        racelist.appendChild(newRow);
        newRow.appendChild(newRaceRoundRace);
        newRow.appendChild(newDataName);

        newRow.appendChild(newDataLink);
        newDataLink.appendChild(newDataButton);
}
https://www.randyconnolly.com/funwebdev/3rd/api/f1/qualifying.php?race=1100 
function populateQualify(raceId){
//
fetch(`https://www.randyconnolly.com/funwebdev/3rd/api/f1/qualifying.php?race=${raceId}`)
    .then(resp=>resp.json())
    .then(data=>{
        data.forEach(e=>{
            createQualifyHTML(
                e.position, 
                e.driver.forename, 
                e.driver.surname, 
                e.constructor.name, 
                e.q1, 
                e.q2, 
                e.q3,
                e.race.name
            );
        });
    });
}
function createQualifyHTML(position, fname, lname, cName, q1, q2, q3, race){
    qualifyTitle = document.querySelector("#qualifyTitle");
    qualifyTitle.textContent = `Qualifying results for ${race}`;

    qualifyList = document.querySelector("#qualifying-list");
    newRow = document.createElement("tr");

        newPosition = document.createElement("td");
        newPosition.textContent = position;

        newName = document.createElement("td");
        newName.textContent = fname+" "+lname;
        
        newConstructorName = document.createElement("td");
        newConstructorName.textContent = cName;

        newQ1 = document.createElement("td");
        newQ1.textContent = q1;

        newQ2 = document.createElement("td");
        newQ2.textContent = q2;

        newQ3 = document.createElement("td");
        newQ3.textContent = q3;

    qualifyList.appendChild(newRow);
    newRow.appendChild(newPosition);
    newRow.appendChild(newName);
    newRow.appendChild(newConstructorName);
    newRow.appendChild(newQ1);
    newRow.appendChild(newQ2);
    newRow.appendChild(newQ3);

}
https://www.randyconnolly.com/funwebdev/3rd/api/f1/results.php?race=1100
function populateResults(raceId){
    top3 = [];
fetch(`https:www.randyconnolly.com/funwebdev/3rd/api/f1/results.php?race=${raceId}`)
    .then(resp=> resp.json())
    .then(data=>{
        data.forEach(e=>{
            createResultsHTML(
                e.position,
                e.driver.forename,
                e.driver.surname,
                e.constructor.name,
                e.laps,
                e.points,
                e.race.name)
        });
    })
}
function createResultsHTML(position, fname, lname, constructor,laps,points, raceName){
    resultsTitle = document.querySelector("#resultsTitle");
    resultsTitle.textContent = `Results for ${raceName}`;

    resultlist = document.querySelector("#results-list");
    newRow = document.createElement("tr");
        newPosition = document.createElement("td");
        newPosition.textContent = position;

        newName = document.createElement("td");
        newName.textContent = fname + " " + lname;
        
        newConstructorName = document.createElement("td");
        newConstructorName.textContent = constructor;

        newLaps = document.createElement("td");
        newLaps.textContent = laps;

        newPoints = document.createElement("td");
        newPoints.textContent = points;

    resultlist.appendChild(newRow);
    newRow.appendChild(newPosition);
    newRow.appendChild(newName);
    newRow.appendChild(newConstructorName);
    newRow.appendChild(newLaps);
    newRow.appendChild(newPoints);



}
function createTop3HTML(top3){
    // <tr>
    //     <th>Pos</th>
    //     <th>Name</th>
    //     <th>Constructor</th>
    //     <th>Laps</th>
    //     <th>Points</th>
    // </tr>
}