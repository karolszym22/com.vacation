import { AuthorizationState } from "../User/AuthorizationState";
import { Vacation } from "./Vacation";

export interface RootState {
  authorization: AuthorizationState;
  vacations: {
    list: Vacation[];
    vacationsCount: number;
  };
}