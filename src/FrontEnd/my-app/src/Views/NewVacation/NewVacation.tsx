import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import RootState from "../../Reducers/Store/index";
import { addDays, isSaturday, isSunday } from "date-fns";
import Menu from "../../Components/SideMenu/SideMenu";
import { NavLink, useNavigate } from "react-router-dom";
import userIcon from "../../resources/user.png";
import Overlay from "../../Components/Overlay/Overlay"

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
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
`;

const HeaderTop = styled.div`
  width: 100%;
  height: 40px;
  background-color: white;
  top: 0px;
  display: flex;
  justify-content: end;
`;
const UserIcon = styled.div`
  background-image: url(${userIcon});
  color: white;
  height: 24px;
  width: 24px;
  margin: 5px 20px;
  background-color: white;
`;

const MainWrapper = styled.div`
  display: flex;
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

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  justify-content: center;
  width: 30%;

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
  padding: 12px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  width: 110px;
`;

const DescriptionInput = styled.textarea`
  height: 130px;
  margin: 5px;
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
`
interface Vacation {
  id: number;
  description: string;
  daysNum: number;
  done: boolean;
  taskStatus: string;
  startDate: string;
  endDate: string;
}
interface PersonVacation {
  id: number;
  description: string;
  daysNum: number;
  done: boolean;
  taskStatus: string;
  startDate: string;
  endDate: string;
}
interface UserState {
  id: number;
  name: string;
  email: string;
}
interface AuthorizationState {
  user: UserState;
}

interface RootState {
  authorization: AuthorizationState;
}

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

function NewVacation() {
  const [vacations, setVacations] = useState<any[]>([]);
  const [personVacations, setPersonVacations] = useState<Vacation[]>([]);
  const [description, setDescription] = useState("");
  const [done, setDone] = useState<boolean>(false);
  const [taskStatus, setTaskStatus] = useState("W realizacji");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [daysNum, setDaysNum] = useState<number>(0);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 



  const userName = useSelector(
    (state: RootState) => state.authorization.user.name
  );
  const personId = useSelector(
    (state: RootState) => state.authorization.user.id
  );
  const employerName = useSelector(
    (state: RootState) => state.authorization.user.name
  );

  useEffect(() => {
    fetch(`http://localhost:8080/vacations/personVacations/${personId}`)
      .then((response) => response.json())
      .then((data) => {
        setPersonVacations(data);
        console.log(personVacations);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const calculateBusinessDays = (start: Date, end: Date) => {
    let currentDate = new Date(start);
    let businessDays = 0;

    while (currentDate <= end) {
      if (!isSaturday(currentDate) && !isSunday(currentDate)) {
        businessDays++;
      }
      currentDate = addDays(currentDate, 1);
    }

    return businessDays;
  };
  const handleEndDateChange = async (newEndDate: string) => {
    setEndDate(newEndDate);
    console.log("Sending request with data:", {
      personId,
      startDate,
      endDate: newEndDate,
    });
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(newEndDate);
    try {
      const response = await fetch("http://localhost:8080/dateValidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personId,
          startDate: startDateObj,
          endDate: endDateObj,
        }),
      });

      if (!response.ok) {
        const responseData = await response.text();
        throw new Error(
          `Request failed with status: ${response.status}, Response data: ${responseData}`
        );
      }

      const validationResult = await response.text();
      console.log(validationResult);
    } catch (error) {
      console.error("Error validating date:", error);
      setOverlayVisible(true);
      setErrorMessage("Tworzony przez Ciebie urlop koliduje z innym urlopem dziejącym się w tym samym okresie"); 
    }
  };

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
  };
  return (
    <div>
<Overlay visible={overlayVisible} onClose={closeOverlay} errorMessage={errorMessage} />
    <MainWrapper>
      <Menu />
      <FormWrapper>
        <HeaderTop>
          <UserIcon as={NavLink} to="/SignIn"></UserIcon>
          <a>{userName}</a> {}
        </HeaderTop>
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
            onChange={(e) => handleEndDateChange(e.target.value)}
          />
          <Select>
            <option value="">Typ urlopu</option>
            <option value="HR">Wypoczynkowy</option>
            <option value="PRACOWNIK">Pracownik</option>
          </Select>
          <label htmlFor="description">Przyczyna:</label>
          <DescriptionInput
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit">Dodaj urlop</Button>
        </StyledForm>
        <TableTitle>
          <h2>Twoje wcześniejsze urlopy</h2>
        </TableTitle>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>Opis</TableHeaderCell>
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
                <TableCell>{personVacation.id}</TableCell>
                <TableCell>{personVacation.description}</TableCell>
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
                  <NavLinkName as={NavLink} to={`/vacationId/${personVacation.id}`}>
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
