function initRacesView(races, year) {
    const raceList = document.getElementById("race-list");
    raceList.innerHTML = "";

    races.forEach((race) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${race.round}:</strong> ${race.name} (${race.date})
            <button class="view-details" data-race-id="${race.Id}">View Details</button>
        `;
        raceList.appendChild(li);

        // Event listener for View Details button
        li.querySelector(".view-details").addEventListener("click", () => {
            fetchRaceDetails(race.Id).then((details) => {
                showRaceDialog(race, details);             
            });
        });
    });

    // Update section headers
    document.querySelector("#races h2").textContent = `${year} Races`;
}

function fetchRaceDetails(raceId) {
    const details = {};

    // Fetch qualifying data
    return fetch(`${apiUrl}qualifying.php?race=${raceId}`)
        .then((resp) => resp.json())
        .then((qualifyingData) => {
            // Log qualifying data to debug its structure
            console.log(`Qualifying Data for Race ${raceId}:`, qualifyingData);

            // Ensure qualifyingData is an array
            details.qualifyingData = Array.isArray(qualifyingData) ? qualifyingData : [];

            // Fetch results data after qualifying is fetched
            return fetch(`${apiUrl}results.php?race=${raceId}`);
        })
        .then((resp) => resp.json())
        .then((resultsData) => {
            // Log results data to debug its structure
            console.log(`Results Data for Race ${raceId}:`, resultsData);

            // Ensure resultsData is an array
            details.resultsData = Array.isArray(resultsData) ? resultsData : [];
            return details;
        })
        .catch((error) => {
            console.error(`Error fetching race details for Race ${raceId}:`, error);
            alert("Failed to fetch race details. Please try again.");
        });
}

function showRaceDialog(race, details) {
    const qualifyingData = details;
    const resultsData = details;

    // Populate Qualifying Table
    const qualifyingTable = document.getElementById("qualifying-list");
    qualifyingTable.innerHTML = "";

    if (qualifyingData.length > 0) {
        qualifyingData.forEach((qualifier) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${qualifier.position || "N/A"}</td>
                <td>${qualifier.driver.name || "Unknown"}</td>
                <td>${qualifier.constructor.name || "Unknown"}</td>
                <td>${qualifier.q1 || "N/A"}</td>
                <td>${qualifier.q2 || "N/A"}</td>
                <td>${qualifier.q3 || "N/A"}</td>
            `;
            qualifyingTable.appendChild(row);
        });
    } else {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="6">No qualifying data available.</td>`;
        qualifyingTable.appendChild(row);
    }

    // Populate Results Table
    const resultsTable = document.getElementById("results-list");
    resultsTable.innerHTML = "";

    if (resultsData.length > 0) {
        resultsData.forEach((result) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${result.position || "N/A"}</td>
                <td>${result.driver?.name || "Unknown"}</td>
                <td>${result.constructor?.name || "Unknown"}</td>
                <td>${result.laps || "N/A"}</td>
                <td>${result.points || "N/A"}</td>
            `;
            resultsTable.appendChild(row);
        });
    } else {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="5">No race results available.</td>`;
        resultsTable.appendChild(row);
    }

    // Update section headers with race details
    document.getElementById("qualifying").querySelector("h2").textContent = `Qualifying - ${race.name}`;
    document.getElementById("results").querySelector("h2").textContent = `Results - ${race.name}`;

    // Show the Qualifying and Results sections
    document.getElementById("qualifying").hidden = false;
    document.getElementById("results").hidden = false;
}
