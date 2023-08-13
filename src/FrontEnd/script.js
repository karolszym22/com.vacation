document.addEventListener("DOMContentLoaded", () => {
    const vacationTable = document.getElementById("vacationTable").getElementsByTagName('tbody')[0];

    // Pobierz dane z serwera (zakładamy, że serwer działa na http://localhost:8080)
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
});