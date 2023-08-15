import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import Menu  from './Components/SideMenu/SideMenu';
import Header from './Components/Header/Header';
import MainMenu from './Components/Main/Main'

const MainWrapper = styled.div`
width: 100%;
height: 100vh;
display:flex ;
`;

const Wrapper = styled.div`
  width: 100%;
  display:flex ;
  flex-direction: column;
`



interface Vacation {
  id: number;
  description: string;
  days: number;
  done: boolean;
}

function App() {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [description, setDescription] = useState<string>('');
  const [days, setDays] = useState<number>(0);
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:8080/vacations")
      .then(response => response.json())
      .then(data => {
        setVacations(data);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleAddVacation = (e: React.FormEvent) => {
    e.preventDefault();
    const newVacation: Vacation = {
      id: vacations.length + 1,
      description: description,
      days: days,
      done: done,
    };
    setVacations([...vacations, newVacation]);
    setDescription('');
    setDays(0);
    setDone(false);
  };

  const handleDeleteVacation = (id: number) => {
    fetch(`http://localhost:8080/vacations/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      const updatedVacations = vacations.filter(vacation => vacation.id !== id);
      setVacations(updatedVacations);
    })
    .catch(error => console.error("Error deleting vacation:", error));
  };

  return (
    <div>
   
   <MainWrapper>
    <Menu/>
     <Wrapper>
      <Header/>
      <MainMenu></MainMenu>
      
      </Wrapper>
      </MainWrapper>
    </div>
  );
}

export default App;
