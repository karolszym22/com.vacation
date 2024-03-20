import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useVacations } from "../../Hooks/useVacationsHooks";
import useEmployeeList from "../../Hooks/useAllUsers";
import { getInitials } from "../../Utils/getInitials.";
import { countAcceptedVacations } from "../../Utils/getAcceptedNumber";
import { countRejectedVacations } from "../../Utils/getRejectedNumber";
import { countDuringVacations } from "../../Utils/getDuringNumber";
import { getColorByTaskStatus } from "../../Utils/getColorByStatus";
import { FaExclamation } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { TbExclamationMark } from "react-icons/tb";
export interface HeaderTopProps {
  userType: string;
}

const Menu: React.FC<HeaderTopProps> = ({ userType }) => {
  const { vacations } = useVacations();
  const employeeList = useEmployeeList();

  const renderUserRoleIcon = (userType: string, vacationStep: string) => {
    if (
      ((userType === "TESTER" || userType === "HR") &&
        vacationStep === "Akcpetacja HR") ||
      ((userType === "TESTER" || userType === "PRACODAWCA") &&
        vacationStep === "Akcpetacja Pracodawcy")
    ) {
      return (
        <TableCell>
          <WordIcon />
        </TableCell>
      );
    } else {
      return <TableCell />;
    }
  };

  return (
    <MainMenu>
      <CustomersTitle>Pracownicy</CustomersTitle>
      <CustomersContainer>
        {employeeList.map((employee) => (
          <CustomerElement>
            <CustomerInitiated color={employee.initialsColor}>
              {getInitials(employee.username)}
            </CustomerInitiated>
            <CustomerName>{employee.username}</CustomerName>
            <CustomerVacationsContainer>
              <CustomerVacationsAccepts>
                <VacationsAcceptsColor />
                <VacationsAcceptsNumber>
                  {countAcceptedVacations(vacations, employee.id)}
                </VacationsAcceptsNumber>
                <LegendInfo>Skończone</LegendInfo>
                <CustomerVacationsState />
              </CustomerVacationsAccepts>
            </CustomerVacationsContainer>
            <CustomerVacationsContainer>
              <CustomerVacationsDuring>
                <VacationsDuringColor />
                <VacationsAcceptsNumber>
                  {countDuringVacations(vacations, employee.id)}
                </VacationsAcceptsNumber>
                <LegendInfo>W trakcie</LegendInfo>
                <CustomerVacationsState />
              </CustomerVacationsDuring>
            </CustomerVacationsContainer>
            <CustomerVacationsContainer>
              <CustomerVacationsRejected>
                <VacationsRejectedColor />
                <VacationsAcceptsNumber>
                  {countRejectedVacations(vacations, employee.id)}
                </VacationsAcceptsNumber>
                <LegendInfo>Odrzucone</LegendInfo>
                <CustomerVacationsState />
              </CustomerVacationsRejected>
            </CustomerVacationsContainer>
          </CustomerElement>
        ))}
      </CustomersContainer>
      <CustomersTitle>Lista urlopów</CustomersTitle>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Pracownik</TableHeaderCell>
            <TableHeaderCell>Dni</TableHeaderCell>
            <TableHeaderCell>Stan</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
            <TableHeaderCell>Szczegóły</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vacations.map((vacation) => (
            <TableRow key={vacation.id}>
              <TableCell>{vacation.employerName}</TableCell>
              <TableCell>{vacation.daysNum}</TableCell>
              <TableCell
                style={{
                  color: getColorByTaskStatus(vacation.taskStatus),
                  fontWeight: "bold",
                }}
              >
                {vacation.taskStatus}
              </TableCell>
              {renderUserRoleIcon(userType, vacation.step)}
              <TableCell>
                <NavLinkName as={NavLink} to={`/vacationId/${vacation.id}`}>
                  Podgląd
                </NavLinkName>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </MainMenu>
  );
};

export default Menu;

const MainMenu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CustomersTitle = styled.div`
  width: 100%;
  padding: 15px 5px;
  font-size: 20px;
  font-weight: bold;
  color: #565454;
`;

const CustomersContainer = styled.div`
  width: 100%;
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
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
  background-color: ${(props) => props.color};
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
  width: 170px;
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

const WordIcon = styled(FaExclamation)`
  width: 25px;
  height: 25px;
  border-bottom: 1px solid #ddd;
  animation: slideIn 0.75s infinite alternate;
  @keyframes slideIn {
    from {
      fill: #e7ca78;
    }
    to {
      fill: #ce2626;
    }
  }
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

const LegendInfo = styled.div`
  font-size: 13px;
  font-weight: bold;
  color: #504f4f;
`

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
