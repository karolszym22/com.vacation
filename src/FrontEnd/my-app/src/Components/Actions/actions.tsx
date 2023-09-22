
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
  export const vacationsList = (vacationsContent: []) => {

    return {
      type: "VACATIONS_LIST",
      payload: {
        vacationsListContent: [
          ...vacationsContent,
        ],
      },
    };
  };

export {};