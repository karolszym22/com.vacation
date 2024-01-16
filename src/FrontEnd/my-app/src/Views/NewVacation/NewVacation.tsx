import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import RootState from "../../Reducers/Store/index";
import Menu from "../../Components/SideMenu/SideMenu";
import { NavLink } from "react-router-dom";
import Overlay from "../../Components/Overlay/Overlay";
import { Vacation } from "../../Types/Vacations/Vacation";
import { AuthorizationState } from "../../Types/User/AuthorizationState";
import HeaderTop from "../../Components/Header/HeaderTop";
import { OverlayVisibleContext } from "../../Components/Context/OverlayVisibleContext";
import { getColorByTaskStatus } from "../../Utils/getColorByStatus";
import usePersonVacations from "../../Hooks/NewVacation/useFetchPersonVacations";
import { calculateBusinessDays } from "../../Utils/calculateBusinessDays";
import useDateValidation from "../../Hooks/NewVacation/useDateValidate";

interface Overlay {
  overlayVisible: boolean;
  modalVisible: boolean;
  hamburgerVisible: boolean;
}

interface VacationDescriptionI {
  selectedOption: string;
}

interface RootState {
  authorization: AuthorizationState;
}

function NewVacation() {
  const userName = useSelector(
    (state: RootState) => state.authorization.user.name
  );
  const personId = useSelector(
    (state: RootState) => state.authorization.user.id
  );
  const employerName = useSelector(
    (state: RootState) => state.authorization.user.name
  );

  const personVacations = usePersonVacations(personId);
  const [vacations, setVacations] = useState<any[]>([]);

  const [description, setDescription] = useState("");
  const [done, setDone] = useState<boolean>(false);
  const [taskStatus, setTaskStatus] = useState("W realizacji");
  const [startDate, setStartDate] = useState<string>("");

  const [, setDaysNum] = useState<number>(0);

  const { hamburgerVisible } = useContext(OverlayVisibleContext);
  const { setOverlayVisible } = useContext(OverlayVisibleContext);
  const { setModalVisible } = useContext(OverlayVisibleContext);

  const [selectedOption, setSelectedOption] = useState("Okolicznościowy");

  const {
    endDate,
    errorMessage,
    modalVisible,
    overlayVisible,
    setEndDate,
    handleEndDateChange,
  } = useDateValidation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const vacationData = {
      description,
      daysNum: calculateBusinessDays(new Date(startDate), new Date(endDate)),
      done,
      personId,
      employerName,
      taskStatus,
      startDate,
      endDate,
    };

    try {
      const response = await fetch("http://localhost:8080/vacations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vacationData),
      });

      const newVacation: Vacation = await response.json();
      setVacations([...vacations, newVacation]);
      setDescription("");
      setDaysNum(0);
      setStartDate("");
      setEndDate("");
      setDone(false);
    } catch (error) {
      console.error("Error adding vacation:", error);
    }
  };

  const closeOverlay = () => {
    setOverlayVisible(false);
    setModalVisible(false);
  };

  return (
    <div>
      <MainWrapper>
        <Overlay
          overlayVisible={overlayVisible}
          modalVisible={modalVisible}
          hamburgerVisible={hamburgerVisible}
          onClose={closeOverlay}
          errorMessage={errorMessage}
        />
        <Menu />
        <FormWrapper>
          <HeaderTop userName={userName} headerText="Generator urlopów" />
          <Header>
            <HeaderTitle>Nowy urlop</HeaderTitle>
          </Header>
          <StyledForm onSubmit={handleSubmit}>
            <BottomTitle>Dodaj nowy urlop</BottomTitle>
            <label htmlFor="endDate">Data rozpoczęcia urlopu:</label>
            <Input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label htmlFor="endDate">Data zakończenia urlopu:</label>
            <Input
              type="date"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={(e) => handleEndDateChange(personId, startDate, endDate)}
            />
            <Select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Typ urlopu</option>
              <option value="Wypoczynkowy">Wypoczynkowy</option>
              <option value="Macierzyński">Macierzyński</option>
              <option value="Okolicznościowy">Okolicznościowy</option>
            </Select>
            <DescriptionContainer selectedOption={selectedOption}>
              <label htmlFor="description">Przyczyna:</label>
              <DescriptionInput
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required={selectedOption === "Okolicznościowy"}
              />
            </DescriptionContainer>
            <Button type="submit">Dodaj urlop</Button>
          </StyledForm>
          <TableTitle>
            <h2>Twoje wcześniejsze urlopy</h2>
          </TableTitle>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Dni</TableHeaderCell>
                <TableHeaderCell>Data rozpoczęcia</TableHeaderCell>
                <TableHeaderCell>Data zakończenia</TableHeaderCell>
                <TableHeaderCell>Stan</TableHeaderCell>
                <TableHeaderCell>Szczegóły</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {personVacations.map((personVacation) => (
                <TableRow key={personVacation.id}>
                  <TableCell>{personVacation.daysNum}</TableCell>
                  <TableCell>{personVacation.startDate}</TableCell>
                  <TableCell>{personVacation.endDate}</TableCell>
                  <TableCell
                    style={{
                      color: getColorByTaskStatus(personVacation.taskStatus),
                      fontWeight: "bold",
                    }}
                  >
                    {personVacation.taskStatus}
                  </TableCell>
                  <TableCell>
                    <NavLinkName
                      as={NavLink}
                      to={`/vacationId/${personVacation.id}`}
                    >
                      Podgląd
                    </NavLinkName>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </FormWrapper>
      </MainWrapper>
    </div>
  );
}

export default NewVacation;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  @media (max-width: 800px) {
    font-size: 12px;
  }
  @media (max-width: 525px) {
    font-size: 10px;
  }
  @media (max-width: 460px) {
    font-size: 8px;
  }
  @media (max-width: 350px) {
    font-size: 7px;
  }
  @media (max-width: 310px) {
    font-size: 6px;
  }
`;

const TableHeader = styled.thead`
  background-color: #ede7e7;
`;

const TableTitle = styled.div`
  margin-top: 5%;
  width: 100%;
  height: 50px;
  background-color: rgb(180, 175, 175);
  display: flex;
  align-items: center;
  @media (max-width: 800px) {
    font-size: 14px;
  }
  @media (max-width: 525px) {
    font-size: 12px;
  }
  @media (max-width: 325px) {
    font-size: 11px;
  }
`;
const TableHeaderCell = styled.th`
  padding: 10px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  @media (max-width: 460px) {
    padding: 5px;
  }
  @media (max-width: 350px) {
    padding: 2%.5;
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
  @media (max-width: 460px) {
    padding: 5px;
  }
  @media (max-width: 350px) {
    padding: 2%.5;
  }
`;

const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: space-between;
`;
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-family: sans-serif;
  color: #646262;
`;
const Header = styled.div`
  width: 100%;
  height: 70px;
  background-color: rgb(248, 244, 244);
`;
const HeaderTitle = styled.h1`
  margin: 10px;
  color: #696666;
`;


const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  justify-content: center;
  width: 30%;
  @media (max-width: 800px) {
    width: 60%;
  }
  label {
    margin-bottom: 4px;
  }

  input,
  button {
    margin-bottom: 8px;
  }
`;
const Select = styled.select`
  padding: 5px;
  margin: 15px 10px;
  width: 150px;
  border: 1px solid #c7bfbf;
  border-radius: 5px;
  background-color: #ffffff;
  color: #646262;
`;

const Button = styled.button`
  background-color: orange;
  color: white;
  border: none;
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  width: 110px;
  border-radius: 5px;
`;

const DescriptionContainer = styled.div<VacationDescriptionI>`
  display: flex;
  flex-direction: column;
  width: 100%;
  display: ${({ selectedOption }) =>
    selectedOption === "Okolicznościowy" ? "flex" : "none"};
  position: ${({ selectedOption }) =>
    selectedOption === "Okolicznościowy" ? "static" : "absolute"};
`;

const DescriptionInput = styled.textarea`
  height: 130px;
  margin: 5px;
  resize: horizontal;
  resize: vertical;
  border: 1px solid #64626268;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5;
  color: #333;
  font-family: Arial, sans-serif;
  font-size: 14px;
  margin: 8px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;
const BottomTitle = styled.h2`
  color: #646262;
`;
const NavLinkName = styled.a`
  font-size: 15px;
  margin: 5px;
  color: #a19b9b;
  font-weight: bold;
  text-decoration: none;
  @media (max-width: 800px) {
    font-size: 13px;
  }
  @media (max-width: 525px) {
    font-size: 11px;
  }
  @media (max-width: 460px) {
    font-size: 9px;
  }
`;
