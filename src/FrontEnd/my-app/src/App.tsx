import React, { useState, useEffect } from 'react';
import './App.css';

interface Vacation {
  id: number;
  description: string;
  days: number;
  done: boolean;
}

function App() {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [description, setDescription] = useState<string>('');
  const [days, setDays] = useState<number>(0);
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:8080/vacations")
      .then(response => response.json())
      .then(data => {
        setVacations(data);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleAddVacation = (e: React.FormEvent) => {
    e.preventDefault();
    const newVacation: Vacation = {
      id: vacations.length + 1,
      description: description,
      days: days,
      done: done,
    };
    setVacations([...vacations, newVacation]);
    setDescription('');
    setDays(0);
    setDone(false);
  };

  const handleDeleteVacation = (id: number) => {
    fetch(`http://localhost:8080/vacations/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      const updatedVacations = vacations.filter(vacation => vacation.id !== id);
      setVacations(updatedVacations);
    })
    .catch(error => console.error("Error deleting vacation:", error));
  };

  return (
    <div>
      <h1>Vacation List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Days</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {vacations.map((vacation) => (
            <tr key={vacation.id}>
              <td>{vacation.id}</td>
              <td>{vacation.description}</td>
              <td>{vacation.days}</td>
              <td>{vacation.done ? 'Yes' : 'No'}</td>
              <td><button onClick={() => handleDeleteVacation(vacation.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleAddVacation}>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <label htmlFor="daysNum">Days:</label>
        <input
          type="number"
          id="daysNum"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
        />
        <br />
        <label htmlFor="done">Done:</label>
        <input
          type="checkbox"
          id="done"
          checked={done}
          onChange={(e) => setDone(e.target.checked)}
        />
        <br />
        <button type="submit">Add Vacation</button>
      </form>
    </div>
  );
}

export default App;
