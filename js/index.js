const apiUrl = 'https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season='
const seasonsArray = ["2020", "2021", "2022", "2023"];

document.addEventListener("DOMContentLoaded", () => {
    const select = document.querySelector("#season");

    //hiding Races View
    // document.querySelector("main section#races").style.display = "none";
    // document.querySelector("main section#qualifying").style.display = "none";
    // document.querySelector("main section#results").style.display = "none";

    //hiding Popups
    // document.querySelector("main aside#constructor").style.display = "none";
    // document.querySelector("main aside#driver").style.display = "none";
    // document.querySelector("main aside#circuit").style.display = "none";

    hideViews();
    document.querySelector("main section#intro").style.display = "block"

    //populating seasons
    seasonsArray.forEach(year => {
        const opt = document.createElement("option");
        opt.setAttribute("value", year);
        opt.textContent = year;
        select.appendChild(opt);
    });

    //when user clicks a season
    //change to Race View---------------------------------------------------------
    select.addEventListener("change", e => {
        const selectedYear = e.target.value;

        console.log(`Selected Year: ${selectedYear}`);
        if(seasonInLS(selectedYear)){
            console.log(`Loading ${selectedYear} from localStorage`);
            const raceData = getSeasonFromLS(selectedYear);
            initRacesView(raceData, selectedYear);
        } else {
            console.log(`Fetching ${selectedYear} from API.`);
            fetchSeasonData(selectedYear).then((data) => {
                saveSeasonToLS(selectedYear, data);
                initRacesView(data, selectedYear);
            });
        }
        
        toRacesView();


        // if (e.target.nodeName.toLowerCase() == "select") {

        //     //switching to RacesView
        //     toRacesView();
        //     //not done: retrieving (localStorage) i was thinking of adding a seperate function to handle retrieving
        //     //not done: check if entered in local storage or not
        //     console.log(selectedYear);
        //     fetch(apiUrl + selectedYear)
        //         .then(resp => resp.json())
        //         .then(data => {
        //             console.log(data);
        //         });
        // };
    });
});

function toRacesView() {
    // document.querySelector("main section#intro").style.display = "none";
    // document.querySelector("main section#img").style.display = "none";

    document.querySelector("main section#races").style.display = "block";
    document.querySelector("main section#qualifying").style.display = "block";
    document.querySelector("main section#results").style.display = "block";


};

function hideViews() {
    document.querySelectorAll("main section").forEach((section) => {
        section.style.display = "none"
    });
}

// Save season data to localStorage
function saveSeasonToLS(year, data) {
    localStorage.setItem(`season-${year}`, JSON.stringify(data));
}

// Retrieve season data from localStorage
function getSeasonFromLS(year) {
    const data = localStorage.getItem(`season-${year}`);
    return data ? JSON.parse(data) : null;
}

// Check if season data exists in localStorage
function seasonInLS(year) {
    return localStorage.getItem(`season-${year}`) !== null;
}

// Fetch season data from the API
function fetchSeasonData(year) {
    return fetch(`${apiUrl}races.php?season=${year}`)
        .then((resp) => {
            if (!resp.ok) {
                throw new Error(`Failed to fetch data for year ${year}`);
            }
            return resp.json();
        })
        .then((data) => {
            console.log(`Fetched Data for ${year}:`, data);
            return data;
        })
        .catch((error) => {
            console.error("Error fetching season data:", error);
            alert(`Could not load data for ${year}. Please try again.`);
        });
}