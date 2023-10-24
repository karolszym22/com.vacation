import { AuthorizationState } from "./AuthorizationState";
import { Vacation } from "./Vacation";

export interface RootState {
  authorization: AuthorizationState;
  vacations: {
    list: Vacation[];
    vacationsCount: number;
  };
}