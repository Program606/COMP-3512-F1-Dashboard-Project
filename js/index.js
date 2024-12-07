
apiUrl = 'https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season='



array=["2020","2021","2022","2023"];

document.addEventListener("DOMContentLoaded", () =>{
    select = document.querySelector("#season");

    //hiding Races View
    document.querySelector("main section#races").style.display = "none";
    document.querySelector("main section#qualifying").style.display = "none";
    document.querySelector("main section#results").style.display = "none";

    //hiding Popups
    // document.querySelector("main aside#constructor").style.display = "none";
    // document.querySelector("main aside#driver").style.display = "none";
    // document.querySelector("main aside#circuit").style.display = "none";

    //populating seasons
    array.forEach(year => {
        opt = document.createElement("option");
        opt.setAttribute("value", year);
        opt.textContent = year;
        select.appendChild(opt);
    });

    //when user clicks a season
    //change to Race View---------------------------------------------------------
    select.addEventListener("change", e=>{
    selectedYear = e.target.value;
    if(e.target.nodeName.toLowerCase() == "select"){
        
        //switching to RacesView
        toRacesView();
        //not done: retrieving (localStorage) i was thinking of adding a seperate function to handle retrieving
        //not done: check if entered in local storage or not
        console.log(selectedYear);
        fetch(apiUrl+selectedYear)
            .then(resp=>resp.json())
            .then(data=>{
                console.log(data);
            });
    };
    });
});

function toRacesView(){
document.querySelector("main section#intro").style.display = "none";
document.querySelector("main section#img").style.display = "none";

document.querySelector("main section#races").style.display = "block";
document.querySelector("main section#qualifying").style.display = "block";
document.querySelector("main section#results").style.display = "block";


};