import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface Vacation {
  id: number;
  description: string;
  daysNum: number;
  done: boolean;
  taskStatus: string
}

const MainMenu = styled.div`
  width: 100%;
  right: 0px;
  display: flex;
  flex-direction: column;
`;

const CustomersTitle = styled.div`
  width: 100%;
  padding: 15px;
  font-size: 20px;
  font-weight: bold;
  color: #565454;
`;
const CustomersContainer = styled.div`
  width: 100%;
  padding: 15px;
  display: flex;
`;
const CustomerElement = styled.div`
  display: flex;
  justify-content: start;
  margin: 10px;
  -webkit-box-shadow: 0px 0px 40px -29px rgba(66, 68, 90, 1);
  -moz-box-shadow: 0px 0px 40px -29px rgba(66, 68, 90, 1);
  box-shadow: 0px 0px 40px -29px rgba(66, 68, 90, 1);
`;
const CustomerInitiated = styled.div`
  box-sizing: border-box;
  width: 90px;
  height: 90px;
  background-color: ${({ color }) => color};
  color: white;
  font-size: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CustomerName = styled.div`
  box-sizing: border-box;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #565454;
  padding: 10px;
`;
const CustomerVacationsContainer = styled.div`
  box-sizing: border-box;
  padding: 10px;
`;
const CustomerVacationsAccepts = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const VacationsAcceptsColor = styled.div`
  height: 10px;
  width: 60px;
  background-color: green;
`;
const VacationsAcceptsNumber = styled.div`
  font-size: 16px;
  font-weight: 400;
`;

const VacationsDuringColor = styled.div`
  height: 10px;
  width: 60px;
  background-color: orange;
`;
const VacationsRejectedColor = styled.div`
  height: 10px;
  width: 60px;
  background-color: brown;
`;

const CustomerVacationsDuring = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const CustomerVacationsRejected = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const CustomerVacationsState = styled.div`
  font-size: 16px;
  color: grey;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.thead`
  background-color: #ede7e7;
`;

const TableHeaderCell = styled.th`
  padding: 10px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f0ebeb;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: center;
  font-weight: 500;
  border-bottom: 1px solid #ddd;
  color: #565454;
  text-decoration: none;
`;
const NavLinkName = styled.a`
  font-size: 15px;
  margin: 5px;
  color: #a19b9b;
  font-weight: bold;
  text-decoration: none;
`;
const getColorByTaskStatus = (taskStatus: string) => {
  switch (taskStatus) {
    case "Zrealizowano":
      return "green";
    case "Odrzucono":
      return "red";
    default:
      return "orange";
  }
};

const Menu = () => {
  const [vacations, setVacations] = useState<Vacation[]>([]);
 

  useEffect(() => {
    fetch("http://localhost:8080/vacations")
      .then((response) => response.json())
      .then((data) => {
        setVacations(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  
  }, []);

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
  return (
    <MainMenu>
      <CustomersTitle>Lista urlopów</CustomersTitle>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Opis</TableHeaderCell>
            <TableHeaderCell>Dni</TableHeaderCell>
            <TableHeaderCell>Stan</TableHeaderCell>
            <TableHeaderCell>Szczegóły</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
        {vacations.map((vacation) => (
          <TableRow key={vacation.id}>
            <TableCell>{vacation.id}</TableCell>
            <TableCell>{vacation.description}</TableCell>
            <TableCell>{vacation.daysNum}</TableCell>
            <TableCell
              style={{
                color: getColorByTaskStatus(vacation.taskStatus), 
                fontWeight: "bold",
              }}
            >
              {vacation.taskStatus}
            </TableCell>
            <TableCell>
              <NavLinkName as={NavLink} to={`/vacationId/${vacation.id}`}>Podgląd</NavLinkName>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      </Table>
    </MainMenu>
  );
};

export default Menu;
