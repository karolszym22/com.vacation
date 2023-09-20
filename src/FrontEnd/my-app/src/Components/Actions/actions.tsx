import axios from "axios";
import { UserState } from "../../Types/UserState";
import { RootState } from "../../Types/RootState";
import { Dispatch } from "redux"; 
import { ThunkAction } from '@reduxjs/toolkit';
type UserData = UserState; 

export type AppAction =
   { type: "LOGIN_SUCCESS"; payload: { user: UserState } }


export type AppThunk = ThunkAction<void, RootState, null, AppAction>


export const loginSuccess = (userData: UserData) => ({
  type: "LOGIN_SUCCESS",
  payload: {user: userData},
});

export const fetchUserData = (token: string) => async (dispatch: any) => {
  console.log("tutaj działa");
  try {
    const response = await axios.get("http://localhost:8080/user-data", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(loginSuccess(response.data));
    console.log("działa!");

    return response.data; // Zwracamy dane z serwera
  } catch (error) {
    console.error("Fetch user data error:", error);
    console.log("nie działa!");
    throw error; // Rzuć błąd, aby można było go obsłużyć gdzie indziej
  }
};


export {};