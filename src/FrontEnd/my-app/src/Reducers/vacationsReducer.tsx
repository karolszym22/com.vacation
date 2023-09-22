

export interface Vacation {
  id?: number;
  description?: string;
  daysNum?: number;
  done?: boolean;
  taskStatus: string;
  startDate?: string;
  endDate?: string;
  employerName: string;
  personId: number;
}

interface State {
  vacations: Vacation[];
  vacationsCount: number;
}

type Action =
  | { type: "VACATIONS_LIST"; payload: Vacation[] }
  | { type: "SET_VACATIONS_COUNT"; payload: number };

const initialState: State = {
  vacations: [],
  vacationsCount: 0,
};

const vacationReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "VACATIONS_LIST":
      return { ...state, vacations: action.payload, vacationsCount: action.payload.length };
    case "SET_VACATIONS_COUNT":
      return { ...state, vacationsCount: action.payload };
    default:
      return state;
  }
};

export default vacationReducer;

