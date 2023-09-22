
type AppAction = { type: "EMPLOYEE_AUTHORIZATION"; payload: object }


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

export {};