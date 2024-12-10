# COMP-3512-F1-Dashboard-Project


F1 Website

Welcome to the F1 Website repository for COMP 3512 at Mount Royal University!

This project is designed to provide an interactive and programatical dynamic 
experience for F1 fans primarily using Javascript and JSON files.

This project uses APIs to determine Races, Constructors, a
nd Drivers based on a given year in the context of F1 data. 

Features

Race Display: 
Displays races for a selected 
season, sorted by round.

Qualifying and Results Display: 
Shows qualifying results and race results 
when a race is selected, 1st, 2nd, and 3rd 
positions are shown prominently.

Favorites Feature: 
Showcases favorited drivers, 
constructors, and circuits in the races view, 
with a green background.

Sorting Feature: 
Allows users to sort the race, 
qualifying, and results lists 
by clicking on column headings.

Popups: 
Displays information 
about drivers and constructors 
in modal-style popups.

Technologies Used:
HTML, CSS, JavaScript, Fetch API, Local Storage


Problems Occurred:

For the favorites feature, eventListener chooses the whole textContent of the container.
How I resolved is this, I determined fetched data text and made the program look for that specified identifier. 

Instruction was looking for appending a text symbol next to the container TextContent
I implemented the requirement although, frequent clicks of the favorite feature somehow 
removes the button for the container. I went more of a style.backgroundColor route, to 
handle this problem (as there was little time left) to visually show client their chosen 
favorite favorites