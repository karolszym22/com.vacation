import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';

interface Vacation {
  description: string;
  employerName: string;
  daysNum: number;
}

const MainMenu = styled.div`
  width: 100%;
  right: 0px;
  display: flex;
  flex-direction: column;
`;

const VacationPreview: React.FC = () => {
  const { paramValue } = useParams<{ paramValue: string }>();
  const [vacationData, setVacationData] = useState<Vacation | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/vacations/${paramValue}`);
        const data = await response.json();
        setVacationData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [paramValue]);

  return (
    <div>
      {vacationData ? (
        <div>
          <h2>Vacation Details</h2>
          <p>Description: {vacationData.description}</p>
          <p>Employer: {vacationData.employerName}</p>
          <p>Days: {vacationData.daysNum}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VacationPreview;
