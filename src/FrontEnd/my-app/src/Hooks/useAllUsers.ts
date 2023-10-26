import { useState, useEffect } from 'react';
import axios from 'axios';

interface Employee {
  id: number;
  username: string;
  initialsColor: string;
}

const  useEmployeeList = () => {
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Employee[]>('http://localhost:8080/NewUser');
        setEmployeeList(response.data);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    };

    fetchData();
  }, []); 

  return employeeList;
}

export default useEmployeeList;