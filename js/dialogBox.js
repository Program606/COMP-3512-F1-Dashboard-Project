const dialogs = {
    showDriverDialog(driver) {
        const dialog = document.querySelector("#driver-dialog");

        let storedDrivers = retrieveStorage("drivers");
        const driverData = storedDrivers.find((d) => d.driverId === driver.driverId);

        if (driverData) {
            this.populateDriverDialog(driverData, dialog);
        } else {
            fetch(`https://www.randyconnolly.com/funwebdev/3rd/api/f1/drivers.php?ref=${driver.ref}`)
                .then((resp) => resp.json())
                .then((data) => {
                    storedDrivers.push(data);
                    updateStorage("drivers", storedDrivers);
                    this.populateDriverDialog(data, dialog);
                });
        }
    },

    populateDriverDialog(driverData, dialog) {
        fetch(`https://www.randyconnolly.com/funwebdev/3rd/api/f1/driverResults.php?driver=${driverData.driverRef}&season=${driverData.season || 2023}`)
            .then((resp) => resp.json())
            .then((resultsData) => {
                let resultsTable = `
                    <h4>Races Participated:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Round</th>
                                <th>Race Name</th>
                                <th>Position</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                resultsData.forEach(result => {
                    resultsTable += `
                        <tr>
                            <td>${result.round}</td>
                            <td>${result.name}</td>
                            <td>${result.positionOrder || "N/A"}</td>
                        </tr>
                    `;
                });

                resultsTable += `
                        </tbody>
                    </table>
                `;

                dialog.innerHTML = `
                    <button class="close-btn top-right" id="close-driver-dialog-top">×</button>
                    <h3>${driverData.forename} ${driverData.surname}</h3>
                    <p><strong>Driver Number:</strong> ${driverData.driverId}</p>
                    <p><strong>Code:</strong> ${driverData.code}</p>
                    <p><strong>Date of Birth:</strong> ${driverData.dob}</p>
                    <p><strong>Nationality:</strong> ${driverData.nationality}</p>
                    <p><a href="${driverData.url}" target="_blank">Learn more on Wikipedia</a></p>
                    ${resultsTable}
                    <button class="close-btn bottom" id="close-driver-dialog-bottom">Close</button>
                `;

                document.querySelector("#close-driver-dialog-top").addEventListener("click", () => {
                    this.closeDialog(dialog);
                });

                document.querySelector("#close-driver-dialog-bottom").addEventListener("click", () => {
                    this.closeDialog(dialog);
                });

                this.showDialog(dialog);
            });
    },

    showConstructorDialog(constructor) {
        const dialog = document.querySelector("#constructor-dialog");

        let storedConstructors = retrieveStorage("constructors");
        const constructorData = storedConstructors.find((c) => c.constructorId === constructor.constructorId);

        if (constructorData) {
            this.populateConstructorDialog(constructorData, dialog);
        } else {
            fetch(`https://www.randyconnolly.com/funwebdev/3rd/api/f1/constructors.php?ref=${constructor.ref}`)
                .then((resp) => resp.json())
                .then((data) => {
                    storedConstructors.push(data);
                    updateStorage("constructors", storedConstructors);
                    this.populateConstructorDialog(data, dialog);
                });
        }
    },

    populateConstructorDialog(constructorData, dialog) {
        fetch(`https://www.randyconnolly.com/funwebdev/3rd/api/f1/constructorResults.php?constructor=${constructorData.constructorRef}&season=${constructorData.season || 2023}`)
            .then((resp) => resp.json())
            .then((resultsData) => {
                let resultsTable = `
                    <h4>Races Participated:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Round</th>
                                <th>Race Name</th>
                                <th>Driver</th>
                                <th>Position</th>
                                <th>Grid</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                resultsData.forEach(result => {
                    resultsTable += `
                        <tr>
                            <td>${result.round}</td>
                            <td>${result.name}</td>
                            <td>${result.forename} ${result.surname}</td>
                            <td>${result.positionOrder || "N/A"}</td>
                            <td>${result.grid || "N/A"}</td>
                        </tr>
                    `;
                });

                resultsTable += `
                        </tbody>
                    </table>
                `;

                dialog.innerHTML = `
                    <button class="close-btn top-right" id="close-constructor-dialog-top">×</button>
                    <h3>${constructorData.name}</h3>
                    <p><strong>Nationality:</strong> ${constructorData.nationality}</p>
                    <p><a href="${constructorData.url}" target="_blank">Learn more on Wikipedia</a></p>
                    ${resultsTable}
                    <button class="close-btn bottom" id="close-constructor-dialog-bottom">Close</button>
                `;

                document.querySelector("#close-constructor-dialog-top").addEventListener("click", () => {
                    this.closeDialog(dialog);
                });

                document.querySelector("#close-constructor-dialog-bottom").addEventListener("click", () => {
                    this.closeDialog(dialog);
                });

                this.showDialog(dialog);
            });
    },

    showCircuitDialog(circuit) {
        const dialog = document.querySelector("#circuit-dialog");

        let storedCircuits = retrieveStorage("circuits");
        const circuitData = storedCircuits.find((c) => c.id === circuit.id);

        if (circuitData) {
            this.populateCircuitDialog(circuitData, dialog);
        } else {
            fetch(`https://www.randyconnolly.com/funwebdev/3rd/api/f1/circuits.php?id=${circuit.id}`)
                .then((resp) => resp.json())
                .then((data) => {
                    storedCircuits.push(data);
                    updateStorage("circuits", storedCircuits);
                    this.populateCircuitDialog(data, dialog);
                });
        }
    },

    populateCircuitDialog(circuitData, dialog) {
        dialog.innerHTML = `
            <button class="close-btn top-right" id="close-circuit-dialog-top">×</button>
            <h3>${circuitData.name}</h3>
            <p><strong>Location:</strong> ${circuitData.location}, ${circuitData.country}</p>
            <p><a href="${circuitData.url}" target="_blank">Learn more on Wikipedia</a></p>
            <button class="close-btn bottom" id="close-circuit-dialog-bottom">Close</button>
        `;

        document.querySelector("#close-circuit-dialog-top").addEventListener("click", () => {
            this.closeDialog(dialog);
        });

        document.querySelector("#close-circuit-dialog-bottom").addEventListener("click", () => {
            this.closeDialog(dialog);
        });

        this.showDialog(dialog);
    },

    showDialog(dialog) {
        const overlay = this.getOrCreateOverlay();
        dialog.style.display = "block";
        overlay.style.display = "block";
    },
    
    closeDialog(dialog) {
        dialog.style.display = "none";
        const overlay = document.querySelector(".dialogbox-overlay");
        if (overlay) overlay.style.display = "none";
    },
    
    getOrCreateOverlay() {
        let overlay = document.querySelector(".dialogbox-overlay");
        if (!overlay) {
            overlay = document.createElement("div");
            overlay.className = "dialogbox-overlay";
            document.body.appendChild(overlay);
            overlay.addEventListener("click", () => {
                document.querySelectorAll(".dialogbox").forEach((dialog) => {
                    dialog.style.display = "none";
                });
                overlay.style.display = "none";
            });
        }
        return overlay;
    } 
};
