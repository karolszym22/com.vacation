interface User {
  id: number;
  name: string;
  email: string;
}

interface AppState {
  user: User; 
}
  
type AppAction =
   { type: "EMPLOYEE_AUTHORIZATION"; payload: { userData: User } }

export const initialState: AppState = {
  user: { id: 0, name: '', email: '' },
};

const authorizationReducer = (state: AppState = initialState, action: AppAction): AppState => {
  switch (action.type) {
    case 'EMPLOYEE_AUTHORIZATION':
    
      return { ...state, user: action.payload.userData };
      
    default:
      return state;
  }
};

export default authorizationReducer;
