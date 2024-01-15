import { useState, useEffect } from "react";

export interface UserState {
  id: number;
  username: string;
  email: string;
  employerType: string;
  employerInitialsColor?: string
}


const useFetchUserList = () => {
  const [userList, setUsersList] = useState<UserState[]>([]);

  const fetchUserList = async () => {
    try {
      const response = await fetch("http://localhost:8080/NewUser");
      const data = await response.json();
      setUsersList(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return { userList };
};

export default useFetchUserList;
