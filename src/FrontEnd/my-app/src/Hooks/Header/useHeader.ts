import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../Types/Vacations/RootState";
import { Vacation } from "../../Reducers/vacationsReducer";

export const useHeaderData = () => {
  const [realizedVacations, setRealizedVacations] = useState<Vacation[]>([]);
  const [rejectedVacations, setRejectedVacations] = useState<Vacation[]>([]);
  const userName = useSelector(
    (state: RootState) => state.authorization.user.name
  );
  const vacationsCount = useSelector(
    (state: RootState) => state.vacations.vacationsCount
  );
  const duringVacationCount = vacationsCount - realizedVacations.length - rejectedVacations.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const realizedResponse = await axios.get(
          "http://localhost:8080/vacations/status/Zrealizowano"
        );

        if (realizedResponse.status === 200) {
          const realizedData = realizedResponse.data;
          setRealizedVacations(realizedData);
        } else {
          console.error("Failed to fetch realized vacations.");
        }
      } catch (error) {
        console.error("Error fetching realized vacations:", error);
      }
      try {
        const rejectedResponse = await axios.get(
          "http://localhost:8080/vacations/status/Odrzucono"
        );

        if (rejectedResponse.status === 200) {
          const rejectedData = rejectedResponse.data;
          setRejectedVacations(rejectedData);
        } else {
          console.error("Failed to fetch rejected vacations.");
        }
      } catch (error) {
        console.error("Error fetching rejected vacations:", error);
      }
    };

    fetchData();
  }, []);

  return { userName, realizedVacations, rejectedVacations, duringVacationCount };
};
