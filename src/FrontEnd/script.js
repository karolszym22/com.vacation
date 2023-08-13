document.addEventListener("DOMContentLoaded", () => {
    const vacationTable = document.getElementById("vacationTable").getElementsByTagName('tbody')[0];
    const addVacationForm = document.getElementById("addVacationForm");


    fetch("http://localhost:8080/vacations")
        .then(response => response.json())
        .then(data => {
            data.forEach(vacation => {
                const row = vacationTable.insertRow();
                row.innerHTML = `
          <td>${vacation.id}</td>
          <td>${vacation.description}</td>
          <td>${vacation.daysNum}</td>
          <td>${vacation.done}</td>
        `;
            });
        })
        .catch(error => console.error("Error fetching data:", error));

   
    addVacationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(addVacationForm);
        const vacationData = {
            description: formData.get("description"),
            daysNum: parseInt(formData.get("daysNum")),
            done: formData.get("done") === "on"
        };

        fetch("http://localhost:8080/vacations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vacationData)
        })
        .then(response => response.json())
        .then(newVacation => {
            const row = vacationTable.insertRow();
            row.innerHTML = `
                <td>${newVacation.id}</td>
                <td>${newVacation.description}</td>
                <td>${newVacation.daysNum}</td>
                <td>${newVacation.done}</td>
            `;
        })
        .catch(error => console.error("Error adding vacation:", error));

        addVacationForm.reset();
    });
});
