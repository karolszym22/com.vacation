import { useEffect, useState } from 'react';
import axios from 'axios';
import { Vacation } from '../../Types/Vacations/Vacation';

const useFetchVacationData = (paramValue: string | undefined) => {
    const [vacationData, setVacationData] = useState<Vacation | null>(null);
  const [error, setError] = useState<Error | null>(null); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/vacations/${paramValue}`
        );
        const data = response.data;
        setVacationData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error instanceof Error ? error : new Error(String(error)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [paramValue]);

  return { vacationData, error, isLoading };
};

export default useFetchVacationData;

