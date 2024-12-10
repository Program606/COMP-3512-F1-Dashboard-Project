const dialogs = {
    showDriverDialog(driver) {
        const dialog = document.getElementById("driver-dialog");
    
        fetch(`https://www.randyconnolly.com/funwebdev/3rd/api/f1/drivers.php?ref=${driver.ref}`)
            .then(resp => resp.json())
            .then(driverData => {
                fetch(`https://www.randyconnolly.com/funwebdev/3rd/api/f1/driverResults.php?driver=${driver.ref}&season=2023`)
                    .then(resp => resp.json())
                    .then(resultsData => {
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
                            <h3>${driverData.forename} ${driverData.surname}</h3>
                            <p><strong>Driver Number:</strong> ${driverData.driverId}</p>
                            <p><strong>Code:</strong> ${driverData.code}</p>
                            <p><strong>Date of Birth:</strong> ${driverData.dob}</p>
                            <p><strong>Nationality:</strong> ${driverData.nationality}</p>
                            <p><a href="${driverData.url}" target="_blank">Learn more on Wikipedia</a></p>
                            ${resultsTable}
                            <button id="close-driver-dialog">Close</button>
                        `;
    
                        this.showDialog(dialog);
                        document.getElementById("close-driver-dialog").addEventListener("click", () => {
                            this.closeDialog(dialog);
                        });
                    });
            });
    },    

    showConstructorDialog(constructor) {
        const dialog = document.getElementById("constructor-dialog");
    
        fetch(`https://www.randyconnolly.com/funwebdev/3rd/api/f1/constructors.php?ref=${constructor.ref}`)
            .then(resp => resp.json())
            .then(constructorData => {
                fetch(`https://www.randyconnolly.com/funwebdev/3rd/api/f1/constructorResults.php?constructor=${constructor.ref}&season=2023`)
                    .then(resp => resp.json())
                    .then(resultsData => {
                        let resultsTable = `
                            <h4>Races Participated:</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Round</th>
                                        <th>Race Name</th>
                                        <th>Driver</th>
                                        <th>Position</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                        `;
                        console.log(constructor.ref);
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
                            <h3>${constructorData.name}</h3>
                            <p><strong>Nationality:</strong> ${constructorData.nationality}</p>
                            <p><a href="${constructorData.url}" target="_blank">Learn more on Wikipedia</a></p>
                            ${resultsTable}
                            <button id="close-constructor-dialog">Close</button>
                        `;
    
                        this.showDialog(dialog);
                        document.getElementById("close-constructor-dialog").addEventListener("click", () => {
                            this.closeDialog(dialog);
                        });
                    });
            });
    },    

    showCircuitDialog(circuit) {
        const dialog = document.getElementById("circuit-dialog");

        fetch(`https://www.randyconnolly.com/funwebdev/3rd/api/f1/constructors.php?id=${circuit.id}`)
            .then(resp => resp.json())
            .then(data => {
                dialog.innerHTML = `
                    <h3>${circuit.name}</h3>
                    <p><strong>Location:</strong> ${circuit.location}, ${circuit.country}</p>
                    <p><a href="${circuit.url}" target="_blank">Learn more on Wikipedia</a></p>
                    <button id="close-circuit-dialog">Close</button>
                `;

                this.showDialog(dialog);
                document.getElementById("close-circuit-dialog").addEventListener("click", () => {
                    this.closeDialog(dialog);
                });
            })
    },

    showDialog(dialog) {
        const overlay = this.getOrCreateOverlay();
        dialog.style.display = "block";
        overlay.style.display = "block";
    },

    closeDialog(dialog) {
        dialog.style.display = "none";
        const overlay = document.querySelector(".modal-overlay");
        if (overlay) overlay.style.display = "none";
    },

    getOrCreateOverlay() {
        let overlay = document.querySelector(".modal-overlay");
        if (!overlay) {
            overlay = document.createElement("div");
            overlay.className = "modal-overlay";
            document.body.appendChild(overlay);
            overlay.addEventListener("click", () => {
                document.querySelectorAll(".modal").forEach((dialog) => {
                    dialog.style.display = "none";
                });
                overlay.style.display = "none";
            });
        }
        return overlay;
    }
};
