interface Vacation {
  id: number;
  daysNum: number;
  done: boolean;
  taskStatus: string;
  startDate: string;
  endDate: string;
  employerName: string;
  personId: number;
  descritpion: string;
}
  export const user = (employerContent: object) => {

    return {
      type: "EMPLOYEE_AUTHORIZATION",
      payload: {
        user: {
          ...employerContent,
        },
      },
    };
  };
  export const vacationsList = (vacationsContent: Vacation[]) => {
    return {
      type: "VACATIONS_LIST",
      payload: vacationsContent, 
    };
  };

export {};