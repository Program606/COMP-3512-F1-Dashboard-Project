const dialogs = {
    showDriverDialog(driver) {
        const dialog = document.getElementById("driver-dialog");
        dialog.innerHTML = `
          <h3>${driver.forename} ${driver.surname}</h3>
          <p><strong>Driver Number:</strong> ${driver.number}</p>
          <p><strong>Code:</strong> ${driver.code}</p>
          <p><strong>Date of Birth:</strong> ${driver.dob}</p>
          <p><strong>Nationality:</strong> ${driver.nationality}</p>
          <p><a href="${driver.url}" target="_blank">Learn more on Wikipedia</a></p>
          <button id="close-driver-dialog">Close</button>
        `;
        dialog.showModal();

        document.getElementById("close-driver-dialog").addEventListener("click", () => {
            dialog.close();
        });
    },

    showConstructorDialog(constructor) {
        const dialog = document.getElementById("constructor-dialog");
        dialog.innerHTML = `
          <h3>${constructor.name}</h3>
          <p><strong>Nationality:</strong> ${constructor.nationality}</p>
          <p><a href="${constructor.url}" target="_blank">Learn more on Wikipedia</a></p>
          <button id="close-constructor-dialog">Close</button>
        `;
        dialog.showModal();

        document.getElementById("close-constructor-dialog").addEventListener("click", () => {
            dialog.close();
        });
    },

    showCircuitDialog(circuit) {
        const dialog = document.getElementById("circuit-dialog");
        dialog.innerHTML = `
          <h3>${circuit.name}</h3>
          <p><strong>Location:</strong> ${circuit.location}, ${circuit.country}</p>
          <p><strong>Altitude:</strong> ${circuit.alt} m</p>
          <p><a href="${circuit.url}" target="_blank">Learn more on Wikipedia</a></p>
          <button id="close-circuit-dialog">Close</button>
        `;
        dialog.showModal();

        document.getElementById("close-circuit-dialog").addEventListener("click", () => {
            dialog.close();
        });
    }
};
