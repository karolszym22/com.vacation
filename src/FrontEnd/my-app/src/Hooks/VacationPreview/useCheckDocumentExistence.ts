
import { useState, useEffect } from 'react';
import { Vacation } from '../../Types/Vacations/Vacation';
import axios from 'axios';

const useCheckDocumentExistence = (userId: number, vacationData: Vacation | null) => {
  const [documentExistence, setDocumentExistence] = useState(null);

  useEffect(() => {
    const checkDocumentExistence = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/document/word/exist?personId=${userId}&vacationId=${vacationData?.id}`
        );

        const data = response.data;
        setDocumentExistence(data);
      } catch (error) {
        console.error("Error checking document existence:", error);
      }
    };

    if (vacationData) {
      checkDocumentExistence();
    }
  }, [userId, vacationData]);

  return documentExistence;
};

export default useCheckDocumentExistence;
