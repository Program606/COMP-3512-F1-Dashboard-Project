const dialogs = {
    showDriverDialog(driver) {
        const dialog = document.getElementById("driver-dialog");

        fetch(`https://www.randyconnolly.com/funwebdev/3rd/api/f1/drivers.php?ref=${driver.ref}`)
            .then(resp => resp.json())
            .then(data => {
                dialog.innerHTML = `
                    <h3>${data.forename} ${data.surname}</h3>
                    <p><strong>Driver Number:</strong> ${data.driverId}</p>
                    <p><strong>Code:</strong> ${data.code}</p>
                    <p><strong>Date of Birth:</strong> ${data.dob}</p>
                    <p><strong>Nationality:</strong> ${data.nationality}</p>
                    <p><a href="${data.url}" target="_blank">Learn more on Wikipedia</a></p>
                    <button id="close-driver-dialog">Close</button>
                `;

                this.showDialog(dialog);
                document.getElementById("close-driver-dialog").addEventListener("click", () => {
                    this.closeDialog(dialog);
                });
            })
    },

    showConstructorDialog(constructor) {
        const dialog = document.getElementById("constructor-dialog");

        fetch(`https://www.randyconnolly.com/funwebdev/3rd/api/f1/constructors.php?ref=${constructor.ref}`)
            .then(resp => resp.json())
            .then(data => {
                dialog.innerHTML = `
                    <h3>${constructor.name}</h3>
                    <p><strong>Nationality:</strong> ${constructor.nationality}</p>
                    <p><a href="${data.url}" target="_blank">Learn more on Wikipedia</a></p>
                    <button id="close-constructor-dialog">Close</button>
                `;

                this.showDialog(dialog);
                document.getElementById("close-constructor-dialog").addEventListener("click", () => {
                    this.closeDialog(dialog);
                });
            })
    },

    showCircuitDialog(circuit) {
        const dialog = document.getElementById("circuit-dialog");
        dialog.innerHTML = `
          <h3>${circuit.name}</h3>
          <p><strong>Location:</strong> ${circuit.location}, ${circuit.country}</p>
          <p><strong>Altitude:</strong> ${circuit.alt || "N/A"} m</p>
          <p><a href="${circuit.url}" target="_blank">Learn more on Wikipedia</a></p>
          <button id="close-circuit-dialog">Close</button>
        `;

        this.showDialog(dialog);
        document.getElementById("close-circuit-dialog").addEventListener("click", () => {
            this.closeDialog(dialog);
        });
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
