

function populateRaces(year){
    fetch(`https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season=${year}`)
    .then(resp=>resp.json())
    .then(data=>{
        data.forEach(dataItem => {
            createRacesHTML(dataItem.round, dataItem.name, year, dataItem.id, dataItem.circuit);           
        });
    });
};

function createRacesHTML(round, name, year, id, circuit){
    raceTitle = document.querySelector("#raceTitle");
    raceTitle.textContent = `Races for the year: ${year}`;

    racelist = document.querySelector("#race-list");
        newRow = document.createElement("tr");
        
            newRaceRoundRace = document.createElement("td");
            newRaceRoundRace.textContent = round;

            newDataName = document.createElement("td");
            newDataName.textContent = name;
            newDataName.setAttribute('class','fav');
            checkFavorite(newDataName);

            newDataLink = document.createElement("td");

            newDataButton = document.createElement("button");
            newDataButton.setAttribute("value", id);
            newDataButton.textContent = "Results";

            // Add circuit button
            const circuitButton = document.createElement("button");
            circuitButton.textContent = "View Circuit";
            circuitButton.addEventListener("click", () => {
                event.stopPropagation();
                dialogs.showCircuitDialog(circuit); 
            });

        racelist.appendChild(newRow);
        newRow.appendChild(newRaceRoundRace);
        newRow.appendChild(newDataName);

        newRow.appendChild(newDataLink);
        newDataLink.appendChild(newDataButton);
        newDataLink.appendChild(circuitButton);
}
    function populateQualifyReal(fetchedData){
    const qualifyTitle = document.querySelector("#qualifyTitle");
    qualifyTitle.textContent = `Qualifying results for ${fetchedData[0]?.race?.name}`;

    const qualifyList = document.querySelector("#qualifying-list");
    qualifyList.innerHTML = ""; // Clear previous content
    fetchedData.forEach(dataItem =>{
        const row = document.createElement("tr");

                const positionCell = document.createElement("td");
                positionCell.textContent = dataItem.position;

                const nameCell = document.createElement("td");
                nameCell.textContent = `${dataItem.driver.forename} ${dataItem.driver.surname}`;
                nameCell.setAttribute('class', 'fav');
                checkFavorite(nameCell);

                // Add driver button
                const driverButton = document.createElement("button");
                driverButton.textContent = "View Driver";
                driverButton.addEventListener("click", () => {
                    dialogs.showDriverDialog(dataItem.driver); // Use the driver object
                });
                nameCell.appendChild(driverButton);

                const constructorCell = document.createElement("td");
                constructorCell.textContent = dataItem.constructor.name;
                constructorCell.setAttribute('class', 'fav');
                checkFavorite(constructorCell);

                // Add constructor button
                const constructorButton = document.createElement("button");
                constructorButton.textContent = "View Constructor";
                constructorButton.addEventListener("click", () => {
                    dialogs.showConstructorDialog(dataItem.constructor); // Use the constructor object
                });
                constructorCell.appendChild(constructorButton);

                const q1Cell = document.createElement("td");
                q1Cell.textContent = dataItem.q1 || "N/A";

                const q2Cell = document.createElement("td");
                q2Cell.textContent = dataItem.q2 || "N/A";

                const q3Cell = document.createElement("td");
                q3Cell.textContent = dataItem.q3 || "N/A";

                row.appendChild(positionCell);
                row.appendChild(nameCell);
                row.appendChild(constructorCell);
                row.appendChild(q1Cell);
                row.appendChild(q2Cell);
                row.appendChild(q3Cell);

                qualifyList.appendChild(row);
            
    });
    makeTableSortable("#qualifying-list", ["number", "text", "text", "time", "time", "time"]);
}
function createQualifyHTML(position, fname, lname, cName, q1, q2, q3, race){
    const qualifyTitle = document.querySelector("#qualifyTitle");
    qualifyTitle.textContent = `Qualifying results for ${race}`;

    qualifyList = document.querySelector("#qualifying-list");
    newRow = document.createElement("tr");

        const newPosition = document.createElement("td");
        newPosition.textContent = position;

        const newName = document.createElement("td");
        newName.textContent = fname+" "+lname;
        
        const newConstructorName = document.createElement("td");
        newConstructorName.textContent = cName;

        const newQ1 = document.createElement("td");
        newQ1.textContent = q1;

        const newQ2 = document.createElement("td");
        newQ2.textContent = q2;

        const newQ3 = document.createElement("td");
        newQ3.textContent = q3;

    qualifyList.appendChild(newRow);
    newRow.appendChild(newPosition);
    newRow.appendChild(newName);
    newRow.appendChild(newConstructorName);
    newRow.appendChild(newQ1);
    newRow.appendChild(newQ2);
    newRow.appendChild(newQ3);

}
function populateResults(raceId) {
    fetch(`https://www.randyconnolly.com/funwebdev/3rd/api/f1/results.php?race=${raceId}`)
        .then(resp => resp.json())
        .then(data => {
            const resultsTitle = document.querySelector("#resultsTitle");
            resultsTitle.textContent = `Results for ${data[0]?.race?.name || "this race"}`;

            const resultsList = document.querySelector("#results-list");
            resultsList.innerHTML = ""; // Clear previous content
            const top3 = [];
            data.forEach(dataItem => {
                if(dataItem.position < 4){
                    top3.push(dataItem);
                }
                const row = document.createElement("tr");

                const nameCell = document.createElement("td");
                nameCell.textContent = `${dataItem.driver.forename} ${dataItem.driver.surname}`;

                // Add driver button
                const driverButton = document.createElement("button");
                driverButton.textContent = "View Driver";
                driverButton.addEventListener("click", () => {
                    dialogs.showDriverDialog(dataItem.driver); // Use the driver object
                });
                nameCell.appendChild(driverButton);

                const constructorCell = document.createElement("td");
                constructorCell.textContent = dataItem.constructor.name;

                // Add constructor button
                const constructorButton = document.createElement("button");
                constructorButton.textContent = "View Constructor";
                constructorButton.addEventListener("click", () => {
                    dialogs.showConstructorDialog(dataItem.constructor); // Use the constructor object
                });
                constructorCell.appendChild(constructorButton);

                const positionCell = document.createElement("td");
                positionCell.textContent = dataItem.position;

                const lapsCell = document.createElement("td");
                lapsCell.textContent = dataItem.laps;

                const pointsCell = document.createElement("td");
                pointsCell.textContent = dataItem.points;

                row.appendChild(positionCell);
                row.appendChild(nameCell);
                row.appendChild(constructorCell);
                row.appendChild(lapsCell);
                row.appendChild(pointsCell);

                resultsList.appendChild(row);
            });
            createTop3HTML(top3);

            makeTableSortable("#results-list", ["number", "text", "text", "number", "number"]);
        });
}
function populateResultsReal(fetchedData) {
    const resultsTitle = document.querySelector("#resultsTitle");
    resultsTitle.textContent = `Results for ${fetchedData[0]?.race?.name || "this race"}`;

    const resultsList = document.querySelector("#results-list");
    resultsList.innerHTML = ""; // Clear previous content
    const top3 = [];
    
    fetchedData.forEach(dataItem=>{

        if(dataItem.position < 4){
            top3.push(dataItem);
        }
        const row = document.createElement("tr");

        const positionCell = document.createElement("td");
        positionCell.textContent = dataItem.position;

        const nameCell = document.createElement("td");
        nameCell.textContent = `${dataItem.driver.forename} ${dataItem.driver.surname}`;
        nameCell.setAttribute('class', 'fav');
        checkFavorite(nameCell);

        // Add driver button
        const driverButton = document.createElement("button");
        driverButton.textContent = "View Driver";
        driverButton.addEventListener("click", () => {
            dialogs.showDriverDialog(dataItem.driver); // Use the driver object
        });
        nameCell.appendChild(driverButton);
    
        const constructorCell = document.createElement("td");
        constructorCell.textContent = dataItem.constructor.name;
        constructorCell.setAttribute('class', 'fav');
        checkFavorite(constructorCell);

    
        // Add constructor button
        const constructorButton = document.createElement("button");
        constructorButton.textContent = "View Constructor";
        constructorButton.addEventListener("click", () => {
            dialogs.showConstructorDialog(dataItem.constructor); // Use the constructor object
        });
        constructorCell.appendChild(constructorButton);
    
        const lapsCell = document.createElement("td");
        lapsCell.textContent = dataItem.laps;
    
        const pointsCell = document.createElement("td");
        pointsCell.textContent = dataItem.points;
    
        row.appendChild(positionCell);
        row.appendChild(nameCell);
        row.appendChild(constructorCell);
        row.appendChild(lapsCell);
        row.appendChild(pointsCell);
    
        resultsList.appendChild(row);
    });
    createTop3HTML(top3);

    makeTableSortable("#results-list", ["number", "text", "text", "number", "number"]);
}
function createResultsHTML(position, fname, lname, constructor,laps,points, raceName){
    resultsTitle = document.querySelector("#resultsTitle");
    resultsTitle.textContent = `Results for ${raceName}`;

    resultlist = document.querySelector("#results-list");
    newRow = document.createElement("tr");
        const newPosition = document.createElement("td");
        newPosition.textContent = position;

        const newName = document.createElement("td");
        newName.textContent = fname + " " + lname;
                
        newConstructorName = document.createElement("td");
        newConstructorName.textContent = constructor;

        const newLaps = document.createElement("td");
        newLaps.textContent = laps;

        const newPoints = document.createElement("td");
        newPoints.textContent = points;

    resultlist.appendChild(newRow);
    newRow.appendChild(newPosition);
    newRow.appendChild(newName);
    newRow.appendChild(newConstructorName);
    newRow.appendChild(newLaps);
    newRow.appendChild(newPoints);



}
function createTop3HTML(top3){
    const span3 = document.querySelector("span#top3");
    span3.replaceChildren();

    top3.forEach(d =>{
        const top3Div = document.createElement("div");
            const topName = document.createElement("p");
            topName.textContent = d.driver.forename+" "+ d.driver.surname;
            switch (d.position){
                case 1:
                    top3Div.style.backgroundColor = "gold"
                    break
                case 2:
                    top3Div.style.backgroundColor = "silver"
                    break;
                case 3:
                    top3Div.style.backgroundColor = "#FF5733"
                    break;
            }
            

        span3.appendChild(top3Div);
        // top3Div.appendChild(place);
        top3Div.appendChild(topName);
    });
    
}

function makeTableSortable(tableSelector, columnTypes) {
    const table = document.querySelector(tableSelector).closest("table");
    const headers = table.querySelectorAll("th");

    headers.forEach((header, index) => {
        header.style.cursor = "pointer"; // Add visual indication that it's clickable
        header.addEventListener("click", () => {
            const rows = Array.from(table.querySelector("tbody").rows);
            const type = columnTypes[index];

            const sortedRows = rows.sort((a, b) => {
                const aText = a.cells[index].textContent.trim();
                const bText = b.cells[index].textContent.trim();

                if (type === "number") {
                    return parseFloat(aText) - parseFloat(bText);
                } else if (type === "time") {
                    return timeToSeconds(aText) - timeToSeconds(bText);
                } else {
                    return aText.localeCompare(bText);
                }
            });
            const tbody = table.querySelector("tbody");
            tbody.innerHTML = "";
            sortedRows.forEach(row => tbody.appendChild(row));
        });
    });
}

function timeToSeconds(time) {
    if (time === "N/A") return Number.MAX_SAFE_INTEGER;
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + seconds;
}