import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import SignIn from "./Views/SignIn/SigIn"
import Register from './Views/Register/Register';
import { Provider } from 'react-redux'
import store from './Reducers/Store/index'
import NewVacation from './Views/NewVacation/NewVacation';
import VacationPreview from './Components/VacationPreview/VacationPreview';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    
      <Routes>
      <Route path="/" element={<App />} />
              <Route path="/signIn" element={<SignIn/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/newVacation" element={<NewVacation/>}/>
              <Route path="/vacationId/:paramValue" element={<VacationPreview />} />

      </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
 
);

reportWebVitals();
