import { useEffect, useState } from "react";

interface Vacation {
  id: number;
  description: string;
  daysNum: number;
  done: boolean;
  taskStatus: string;
  employerName:string;
  personId: number
}

export const useVacations = () => {
  const [vacations, setVacations] = useState<Vacation[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/vacations")
      .then((response) => response.json())
      .then((data) => {
        setVacations(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return { vacations, setVacations };
};

export const usePreviewClick = () => {
  const handlePreviewClick = (vacationId: number) => {
    fetch(`http://localhost:8080/vacationsPreview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vacationId }),
    })
      .then((response) => response.json())
      .then((data) => {});
  };

  return handlePreviewClick;
};
