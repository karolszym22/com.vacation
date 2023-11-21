import { useEffect } from "react";
import { useNavigate, BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "../../Views/SignIn/SigIn";
import "../../index.css";
import Register from "../../Views/Register/Register";
import { Provider } from "react-redux";
import store from "../../Reducers/Store/index";
import NewVacation from "../../Views/NewVacation/NewVacation";
import VacationPreview from "../../Components/VacationPreview/VacationPreview";
import MainTemplate from "../MainTemplate/MainTemplate";
import Main from "../MainSite/Main";
import OverlayVisibleProvider from "../../Components/Context/OverlayVisibleContext";
import Messages from "../Messages/Messages";
import Calendar from "../Calendar/Calendar";

const Root: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    if (!user && window.location.pathname !== "/register" && window.location.pathname !== "/signIn") {
      navigate("/signIn");
    }
  }, [navigate]);

  return (
    <OverlayVisibleProvider>
      <MainTemplate>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/newVacation" element={<NewVacation />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/vacationId/:paramValue" element={<VacationPreview />} />
        </Routes>
      </MainTemplate>
    </OverlayVisibleProvider>
  );
};

export default Root;
