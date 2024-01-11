import { useState, useEffect } from "react";
import { Vacation } from "../../Types/Vacation";

const usePersonVacations = (personId: number) => {
  const [personVacations, setPersonVacations] = useState<Vacation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/vacations/personVacations/${personId}`);
        const data = await response.json();
        setPersonVacations(data);
        console.log(personVacations);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [personId]);

  return personVacations;
};

export default usePersonVacations;
