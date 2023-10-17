import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useVacations, usePreviewClick } from "../../Hooks/useVacationsHooks";
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
  padding: 15px 0px;
  font-size: 20px;
  font-weight: bold;
  color: #565454;
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
  @media (max-width: 530px) {
    font-size: 13px;
  }
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
  @media (max-width: 530px) {
    font-size: 13px;
  }
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
  const { vacations } = useVacations();

  return (
    <MainMenu>
      <CustomersTitle>Lista urlopów</CustomersTitle>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Opis</TableHeaderCell>
            <TableHeaderCell>Dni</TableHeaderCell>
            <TableHeaderCell>Stan</TableHeaderCell>
            <TableHeaderCell>Szczegóły</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
        {vacations.map((vacation) => (
          <TableRow key={vacation.id}>
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
