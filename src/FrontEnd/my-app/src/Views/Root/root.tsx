import { BrowserRouter, Routes, Route,  useNavigate } from "react-router-dom";
import SignIn from "../../Views/SignIn/SigIn";
import "../../index.css"
import Register from "../../Views/Register/Register";
import { Provider } from "react-redux";
import store from "../../Reducers/Store/index";
import NewVacation from "../../Views/NewVacation/NewVacation";
import VacationPreview from "../../Components/VacationPreview/VacationPreview";
import MainTemplate from "../MainTemplate/MainTemplate";
import Main from "../MainSite/Main";
import OverlayVisibleProvider from "../../Components/Context/OverlayVisibleContext";

const Root = () => {
 
  return (
    <Provider store={store}>
      <BrowserRouter>
        <OverlayVisibleProvider>
          <MainTemplate>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/newVacation" element={<NewVacation />} />
              <Route
                path="/vacationId/:paramValue"
                element={<VacationPreview />}
              />
            </Routes>
          </MainTemplate>
        </OverlayVisibleProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
